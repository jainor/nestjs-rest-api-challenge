export class CreateCartItemDto {
  readonly id: number;
  readonly cartId: number;
  readonly productId: number;
  readonly amount: number;
}
