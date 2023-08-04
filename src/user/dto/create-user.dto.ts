import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';
import { Schema } from 'morphism';

export class CreateUserDto {
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

export const UserCreateDTOSchema: Schema = {
  userName: 'userName',
  score: 'score',
};
