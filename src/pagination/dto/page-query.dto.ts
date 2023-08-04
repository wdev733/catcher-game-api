import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Schema } from 'morphism';

export class PageQueryDto {
  @ApiPropertyOptional({
    name: 'offset',
    description:
      'The number of rows to skip before beginning to return rows in the response. Use this parameter to paginate large result sets.',
    required: false,
    example: 0,
    type: Number,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  offset = 0;
  @ApiPropertyOptional({
    name: 'limit',
    description: 'The maximum number of rows to return in the response. Defualt is 20',
    required: false,
    example: 100,
    type: Number,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  limit = 100;
}
export class UserPageQueryDto extends PageQueryDto {
  @IsString()
  userId?: string;
}
export const PrismaQuerySchema: Schema = {
  skip: 'offset',
  take: 'limit',
};
