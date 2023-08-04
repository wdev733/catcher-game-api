import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ErrorResponseDto {
  @ApiProperty({
    description: 'The status code of the error.',
    required: true,
    example: 500,
  })
  @IsNumber()
  statusCode: number;

  @ApiProperty({
    description: 'The error message.',
    required: true,
    example: 'Internal Server Error.',
  })
  @IsString()
  message: string;
}
