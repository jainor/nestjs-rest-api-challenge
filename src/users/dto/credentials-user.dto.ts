import { Expose, Exclude } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  IsNumber,
  IsPositive,
} from 'class-validator';

@Exclude()
export class CredentialsUserDto {
  @Expose()
  @IsEmail()
  readonly email: string;

  @Expose()
  @IsString()
  @Length(6, 20)
  readonly password: string;
}
