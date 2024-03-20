import { Controller, Delete, Get, Post } from '@nestjs/common';
import { UploadsService } from './uploads.service';
@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}
  @Get()
  getFile(): string {
    return;
  }

  @Post()
  uploadFile(): string {
    return;
  }

  @Delete()
  deleleFile(): string {
    return;
  }
}
