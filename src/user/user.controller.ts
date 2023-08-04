import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BadRequestResponseDto } from 'common/dto/bad-request-response.dto';
import { IServiceResponse } from 'common/interfaces/service-response.interface';
import { PageQueryDto } from 'pagination/dto/page-query.dto';
import { CreateUserDto } from 'user/dto/create-user.dto';
import { GetUserResponseDto } from 'user/dto/get-user-response.dto';
import { UserService } from 'user/user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register-score')
  @ApiOperation({
    summary: 'create a new user with score',
    description: 'Creates a user with score',
  })
  @ApiBody({
    type: CreateUserDto,
  })
  @ApiOkResponse({ type: String })
  @ApiBadRequestResponse({
    description: 'Error creating user in db, check the createUserDto for more details.',
    type: BadRequestResponseDto,
  })
  async registerScore(@Body() createUserDto: CreateUserDto): Promise<IServiceResponse<string>> {
    return this.userService.create(createUserDto);
  }

  @Get('/')
  @ApiOperation({
    summary: 'Get all users',
    description: 'Get all users',
  })
  @ApiOkResponse({ type: [GetUserResponseDto] })
  async findAll(@Query() params?: PageQueryDto): Promise<GetUserResponseDto[]> {
    return this.userService.findAll(params);
  }
}
