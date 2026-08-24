/* eslint-disable  @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return */
import { Injectable, BadRequestException } from '@nestjs/common';
import mammoth from 'mammoth';

const { PDFParse } = require('pdf-parse');

@Injectable()
export class CvService {
  async extractText(file: Express.Multer.File): Promise<string> {
    console.log('Received mimetype:', file.mimetype);
    console.log('Original filename:', file.originalname);
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
}
