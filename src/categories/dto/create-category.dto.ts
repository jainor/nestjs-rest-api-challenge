import { Expose, Exclude } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  IsNumber,
  IsPositive,
  IsDecimal,
} from 'class-validator';

@Exclude()
export class CreateCategoryDto {
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly id: number;

  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @Expose()
  @IsString()
  readonly description: string;

}
