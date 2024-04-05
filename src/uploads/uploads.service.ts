import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { unlink } from 'fs/promises';
import * as path from 'path';
@Injectable()
export class UploadsService {
  constructor(private configService: ConfigService) {}

  async uploadFile(
    filePath: string,
  ): Promise<{ message: string; file: string }> {
    const hostName = this.configService.get<string>('HOST_NAME');
    return {
      message: 'File uploaded successfully!',
      file: `${hostName}/uploads/${filePath}`,
    };
  }

  async deleteFile(
    imgPath: string,
  ): Promise<{ message: string; file: string }> {
    const hostName = this.configService.get<string>('HOST_NAME');

    try {
      const filePath = path.join(process.cwd(), 'uploads/' + imgPath);
      await unlink(filePath);
      return {
        message: 'File deleted successfully!',
        file: `${hostName}/uploads/${imgPath}`,
      };
    } catch (error) {
      return {
        message: error.message,
        file: `${hostName}/uploads/${imgPath}`,
      };
    }
  }
}
