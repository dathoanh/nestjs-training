import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiResponse({
    status: 500,
    description: 'Lỗi trong quá trình tạo tài khoản.',
  })
  @ApiResponse({
    status: 409,
    description: 'Tài khoản đã tồn tại.',
  })
  @ApiResponse({
    status: 200,
    description: 'Tạo tài khoản thành công.',
  })
  @ApiOperation({ summary: 'Tạo tài khoản người dùng.' })
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ statusCode: number; message: string }> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  @ApiResponse({
    status: 500,
    description: 'Lỗi trong quá trình đăng nhập.',
  })
  @ApiResponse({
    status: 200,
    description: 'Đăng nhập thành công.',
  })
  @ApiOperation({ summary: 'Đăng nhập' })
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }
}
