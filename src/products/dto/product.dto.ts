import { Exclude, Type } from 'class-transformer';
import { IsDecimal } from 'class-validator';

export class ProductDto {
  readonly id: number;

  readonly name: string;

  readonly description: string;

  @IsDecimal()
  @Type(() => Number)
  readonly price: number;

  readonly categoryId: number;

  readonly stock: number;

  @Exclude()
  @Type(() => Date)
  readonly createdAt: Date;

  @Exclude()
  @Type(() => Date)
  readonly updatedAt: Date;
}
