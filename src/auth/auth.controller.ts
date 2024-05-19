import {
  Controller,
  UseGuards,
  Request,
  Post,
  Body,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Prisma, User } from '@prisma/client';
import { Public } from './constants';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserDto } from './dto/user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccessTokenDto } from './dto/access-token.dto';
import { plainToInstance } from 'class-transformer';
import { UserLoginDto } from './dto/user-login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @ApiOperation({
    summary: 'Login',
    description: 'Login to the application with user email and password',
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: AccessTokenDto,
  })
  @Public()
  @Post('login')
  async login(@Body() body: UserLoginDto): Promise<AccessTokenDto> {
    const loginData = await this.authService.login(body);
    return plainToInstance(AccessTokenDto, loginData);
  }

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register', description: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User registered',
    type: UserDto,
  })
  async register(@Body() body: UserRegisterDto): Promise<UserDto> {
    return plainToInstance(UserDto, await this.authService.register(body));
  }
}
