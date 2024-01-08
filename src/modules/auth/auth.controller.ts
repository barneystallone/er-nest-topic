import { CREATED } from '@/common';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(201)
  @Post('sign-up')
  async registerUser(@Body() dto: RegisterUserDto) {
    const newUser = await this.authService.registerUser(dto);

    return new CREATED(newUser);
  }
}
