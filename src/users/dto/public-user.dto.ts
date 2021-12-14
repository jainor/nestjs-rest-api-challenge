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
export class PublicUserDto {
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly id: number;

  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @Expose()
  @IsEmail()
  readonly email: string;
}
