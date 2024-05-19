import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserRegisterDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({})
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({})
  password: string;

  @IsNotEmpty()
  @ApiProperty({})
  name: string;
}
