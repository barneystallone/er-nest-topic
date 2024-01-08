import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

/**
 * @todo social
 */
export class RegisterUserDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsStrongPassword()
  password?: string;
}
