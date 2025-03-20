import {
  IsString,
  IsInt,
  IsBoolean,
  IsEnum,
  Min,
  IsOptional,
} from 'class-validator';

export enum Seniority {
  Junior = 'junior',
  Senior = 'senior',
}

export class CandidateDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  surname: string;

  @IsEnum(Seniority)
  seniority: Seniority;

  @IsInt()
  @Min(0)
  years: number;

  @IsBoolean()
  availability: boolean;
}
