import { Expose, Exclude } from 'class-transformer';
import { IsNotEmpty, IsString, IsNumber, IsPositive } from 'class-validator';

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
  readonly price: number;

  @Expose()
  @IsNumber()
  @IsPositive()
  readonly stock: number;

  @Expose()
  @IsString()
  readonly imageUrl: string;
}
