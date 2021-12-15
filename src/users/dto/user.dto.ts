import { Expose, Exclude, Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class UserDto {
  readonly id: number;

  readonly firstName: string;

  readonly lastName: string;

  readonly email: string;

  @Exclude()
  readonly password: string;

  @Exclude()
  @Type(() => Date)
  readonly createdAt: Date;

  readonly isPublicEmail: boolean;

  readonly isVerified: boolean;

  @Exclude()
  @Type(() => String)
  readonly role: string;
}
