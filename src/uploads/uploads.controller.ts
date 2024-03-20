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
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadsService } from './uploads.service';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

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
    return { message: 'File uploaded successfully!', file: `/${file.path}` };
  }

  @Delete()
  deleleFile(): string {
    return;
  }
}
