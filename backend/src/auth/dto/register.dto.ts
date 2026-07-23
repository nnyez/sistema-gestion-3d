import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  nombre: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(10)
  @MaxLength(20)
  telefono: string;

  @IsString()
  @MinLength(6)
  password: string;
}
