import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class BadRequestResponseDto {
  @ApiProperty({
    description: 'The status code of the error.',
    required: true,
    example: 400,
  })
  @IsNumber()
  statusCode: number;

  @ApiProperty({
    description: 'The error message',
    required: true,
    example: 'Invalid data',
  })
  @IsString({ each: true })
  message: Array<string>;

  @ApiProperty({
    description: 'The error type.',
    required: true,
    example: 'Bad Request',
  })
  @IsString()
  error: string;
}
