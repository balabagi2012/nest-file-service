import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadsService } from './uploads.service';

@Controller('uploads')
export class UploadsController {
  constructor(
    private readonly uploadsService: UploadsService,
    private configService: ConfigService,
  ) {}

  @Get(':imgPath')
  getFile(@Param('imgPath') imgPath, @Res() res): string {
    return res.sendFile(imgPath, { root: './uploads' });
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const fileExtName = file.originalname.split('.')[1];
          const randomName = Date.now().toString();
          callback(null, `${randomName}.${fileExtName}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadsService.uploadFile(file.filename);
  }

  @Delete(':imgPath')
  deleleFile(@Param('imgPath') imgPath) {
    return this.uploadsService.deleteFile(imgPath);
  }
}
