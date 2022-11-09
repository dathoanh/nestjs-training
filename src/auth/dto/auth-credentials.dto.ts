import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, Matches, IsOptional, IsInt } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsOptional()
  @ApiProperty()
  username: string;

  @IsString()
  @MinLength(8, {
    message: 'Mật khẩu phải đủ ít nhất 8 kí tự trở lên',
  })
  @MaxLength(20)
  @ApiProperty({ minLength: 8, maxLength: 20 })
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'password too weak',
  // })
  password: string;
}
