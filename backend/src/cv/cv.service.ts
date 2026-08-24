import { Injectable, BadRequestException } from '@nestjs/common';
import mammoth from 'mammoth';

const { PDFParse } = require('pdf-parse');

@Injectable()
export class CvService {
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
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      const { value } = await mammoth.extractRawText({ buffer: file.buffer });
      return value;
    }

    throw new BadRequestException(
      'Unsupported file type. Upload a PDF or DOCX.',
    );
  }
}
