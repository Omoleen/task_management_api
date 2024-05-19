import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenDto } from './dto/access-token.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.databaseService.user.findUnique({
      where: { email },
    });
    // console.log(user);
    const isMatch = bcrypt.compareSync(pass, user.password);
    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(UserLoginDto: UserLoginDto): Promise<AccessTokenDto> {
    const user = await this.validateUser(
      UserLoginDto.email,
      UserLoginDto.password,
    );
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: UserRegisterDto) {
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    const existingUser = await this.databaseService.user.findUnique({
      where: { email: user.email },
    });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const newUser = await this.databaseService.user.create({
      data: {
        email: user.email,
        password: hashedPassword,
        name: user.name,
      },
    });
    const { password, ...result } = newUser;
    return result;
  }
  async verifyJwt(jwt: string) {
    return this.jwtService.verifyAsync(jwt);
  }
}
