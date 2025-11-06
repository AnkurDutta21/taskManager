import { ApiProperty } from '@nestjs/swagger';

export class UploadFileResponseDto {
  @ApiProperty({ description: 'URL of the uploaded file' })
  fileUrl: string;

  @ApiProperty({ description: 'Name of the uploaded file' })
  fileName: string;

  @ApiProperty({ description: 'Size of the file in bytes' })
  fileSize: number;

  @ApiProperty({ description: 'MIME type of the file' })
  fileType: string;
}
