import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponseDto {
  @ApiProperty({
    description: 'Is Success?',
    required: true,
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Success message',
    example: 'Create a new user successfully',
  })
  message: string;
}
