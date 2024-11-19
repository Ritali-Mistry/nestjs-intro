import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQuaryDto {
  @IsOptional()
  @IsPositive()
  limit?: number = 10;

  @IsOptional()
  @IsPositive()
  page?: number = 1;
}
