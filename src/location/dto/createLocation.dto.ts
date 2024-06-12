import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateLocationDto {
  @IsNotEmpty()
  @IsString()
  building: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  location_number: string;

  @IsNotEmpty()
  @IsNumber()
  area: number;

  @IsOptional()
  @IsNumber()
  parent_id?: number;
}
