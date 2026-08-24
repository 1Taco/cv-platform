import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('cv')
export class CvController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadCv(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    // Here you can handle the uploaded file, e.g., save it to disk or process it
    return {
      message: 'File uploaded successfully',
      filename: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
    };
  }
}
