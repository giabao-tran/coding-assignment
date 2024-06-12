import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateLocationDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  location_number?: string;

  @IsOptional()
  @IsNumber()
  area?: number;

  @IsOptional()
  @IsString()
  building?: string;

  @IsOptional()
  @IsNumber()
  parent_id?: number;
}
