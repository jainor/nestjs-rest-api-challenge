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
export class CreateProductDto {
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

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly categoryId: number;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  @IsDecimal()
  readonly price: number;

  @Expose()
  @IsNumber()
  @IsPositive()
  readonly stock: number;
}
