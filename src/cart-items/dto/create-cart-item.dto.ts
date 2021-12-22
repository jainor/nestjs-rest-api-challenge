import { Expose, Exclude } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

@Exclude()
export class CreateCartItemDto {
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly id: number;
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly productId: number;
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly amount: number;
}
