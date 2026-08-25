/* eslint-disable  @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return */
import { Injectable, BadRequestException } from '@nestjs/common';
import mammoth from 'mammoth';
import { GoogleGenAI } from '@google/genai';
import { ConfigService } from '@nestjs/config';
import { Cv } from './entities/cv.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
const { PDFParse } = require('pdf-parse');

@Injectable()
export class CvService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Cv) private readonly cvRepository: Repository<Cv>,
  ) {}
  async extractText(file: Express.Multer.File): Promise<string> {
    if (file.mimetype === 'application/pdf') {
      const parser = new PDFParse({ data: file.buffer });
      try {
        const result = await parser.getText();
        return result.text;
      } finally {
        await parser.destroy();
      }
    }

    if (
      file.mimetype ===
        // eslint-disable-next-line prettier/prettier
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.originalname.toLowerCase().endsWith('.docx')
    ) {
      const { value } = await mammoth.extractRawText({ buffer: file.buffer });
      return value;
    }

    throw new BadRequestException(
      'Unsupported file type. Upload a PDF or DOCX.',
    );
  }
  async parseWithAI(text: string): Promise<Record<string, unknown>> {
    const ai = new GoogleGenAI({
      apiKey: this.configService.get<string>('GEMINI_API_KEY'),
    });

    const prompt = `
You are a CV parsing assistant. Extract structured information from the CV text below.
Return ONLY valid JSON, no markdown formatting, no code blocks, no explanation — just the raw JSON object.

Use this exact shape:
{
  "fullName": "string",
  "email": "string",
  "phone": "string",
  "location": "string", (add country if it isin't mentioned e.g. "City, Country") 
  "skills": ["string"],
  "education": [{ "degree": "string", "institution": "string", "year": "string" }],
  "workExperience": [{ "title": "string", "company": "string", "duration": "string", "description": "string" }],
  "languages": ["string"]
}

If a field isn't present in the CV, use null or an empty array as appropriate.

CV TEXT:
"""
${text}
"""
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
    });

    const responseText = response.text ?? '';
    const cleaned = responseText.replace(/```json|```/g, '').trim();

    try {
      return JSON.parse(cleaned) as Record<string, unknown>;
    } catch {
      throw new Error('Failed to parse AI response as JSON');
    }
  }
  async processCv(file: Express.Multer.File): Promise<Cv> {
    const rawText = await this.extractText(file);
    const parsedProfile = await this.parseWithAI(rawText);

    const cv = this.cvRepository.create({
      originalFilename: file.originalname,
      rawText,
      parsedProfile,
    });

    return this.cvRepository.save(cv);
  }
}
