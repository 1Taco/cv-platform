import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CvService } from './cv.service';

@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCv(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    const text = await this.cvService.extractText(file);
    // Here you can handle the uploaded file, e.g., save it to disk or process it
    return {
      message: 'File uploaded successfully',
      filename: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      extractedTextPreview: text.slice(0, 300),
    };
  }
}
