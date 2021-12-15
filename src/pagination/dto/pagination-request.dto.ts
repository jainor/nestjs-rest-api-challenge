import { IsInt, IsPositive } from 'class-validator';

import { Type } from 'class-transformer';

export class PaginationRequest {
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  readonly page: number;

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  readonly perPage: number;
}
