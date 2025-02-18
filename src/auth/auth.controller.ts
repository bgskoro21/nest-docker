import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { ApiResponse } from 'src/common/dtos/response.dto';
import { AuthService } from './auth.service';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  async signInn(@Body() loginDto: LoginDto) {
    return new ApiResponse(
      200,
      'Success',
      await this.authService.signIn(loginDto),
    );
  }
}
