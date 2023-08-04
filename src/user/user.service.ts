import { Injectable } from '@nestjs/common';
import { IServiceResponse } from 'common/interfaces/service-response.interface';
import { morphism } from 'morphism';
import { PageQueryDto, PrismaQuerySchema } from 'pagination/dto/page-query.dto';
import { PrismaService } from 'prisma/prisma.service';
import { UserCreateDTOSchema } from 'user/dto/create-user.dto';
import { CreateUserDto } from 'user/dto/create-user.dto';
import { GetUserResponseDto } from 'user/dto/get-user-response.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<IServiceResponse<string>> {
    const users = await this.prisma.user.findMany({
      where: {
        userName: {
          equals: data.userName,
          mode: 'insensitive',
        },
      },
    });

    if (users.length === 0) {
      const userCreateDto = morphism(UserCreateDTOSchema, data);

      await this.prisma.user.create({
        data: userCreateDto,
      });

      return {
        success: true,
        result: 'User created successfully',
      };
    }

    return {
      success: false,
      result: 'User already exists',
    };
  }

  async findAll(params?: PageQueryDto): Promise<GetUserResponseDto[]> {
    const mappedArgs = morphism(PrismaQuerySchema, {
      ...params,
    });

    const users = this.prisma.user.findMany({
      ...mappedArgs,
      orderBy: {
        score: 'desc',
      },
    });

    return users;
  }
}
