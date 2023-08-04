import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsUUID } from 'class-validator';
import { Schema } from 'morphism';

export class GetUserResponseDto {
  @IsUUID()
  @ApiProperty({
    description: 'User Id',
    required: true,
    example: '3067cd0a-ccd5-4729-8a42-350e62545ec5',
  })
  id: string;

  @IsString()
  @ApiProperty({
    description: 'User name',
    required: true,
    example: 'user1',
  })
  userName: string;

  @IsInt()
  @ApiProperty({
    description: 'Score',
    required: true,
    example: 200,
  })
  score: number;
}

export const UserDTOSchema: Schema = {
  id: 'id',
  userName: 'userName',
  score: 'score',
};
