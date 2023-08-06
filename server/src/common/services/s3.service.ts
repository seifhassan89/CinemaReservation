import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';

@Injectable()
export class S3Service {
  private s3: S3;

  constructor() {
    this.s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  }

  async uploadFile(file: Buffer, filename: string) {
    const result = await this.s3
      .upload({
        Bucket: process.env.S3_BUCKET,
        Body: file,
        Key: `${new Date().toISOString().replace(/[-T:.Z]/g, '')}-${filename}`,
      })
      .promise();

    return result;
  }
}
