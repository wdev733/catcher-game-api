import { SuccessResponseDto } from 'common/dto/success-response';
import { CreateUserDto } from 'user/dto/create-user.dto';

export const UserIdMock = '1a2e139c-9dd4-4fae-8c7b-4eacf18a6375';

export const CreateUserMock: CreateUserDto = {
  userName: 'user1',
  score: 200,
};

export const CreateUserSuccessResponseMock: SuccessResponseDto = {
  success: true,
  message: 'Create a new user successfully',
};
