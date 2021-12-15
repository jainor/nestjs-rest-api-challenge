import { Expose, Exclude } from 'class-transformer';

export class PaginationResponse<ResourceType> {
  @Expose()
  readonly results: number;

  @Expose()
  readonly page: number;

  @Expose()
  readonly data: ResourceType[];
}
