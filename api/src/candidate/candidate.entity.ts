import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import {
  IsString,
  IsInt,
  IsBoolean,
  IsEnum,
  IsOptional,
  Min,
} from 'class-validator';

export interface CandidateBody {
  name: string;
  surname: string;
}

export interface CandidateFileData {
  seniority: Seniority;
  years: number;
  availability: boolean;
}

export enum Seniority {
  Junior = 'junior',
  Senior = 'senior',
}

@Entity()
export class CandidateEntity {
  @IsString()
  @IsOptional()
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column()
  name: string;

  @Column()
  surname: string;

  @IsEnum(Seniority)
  @Column()
  seniority: Seniority;

  @IsInt()
  @Min(0)
  @Column()
  years: number;

  @IsBoolean()
  @Column()
  availability: boolean;
}

// export class CandidateDto {
//   @IsString()
//   @IsOptional()
//   name: string;

//   @IsString()
//   @IsOptional()
//   surname: string;

//   @IsEnum(Seniority)
//   seniority: Seniority;

//   @IsInt()
//   @Min(0)
//   years: number;

//   @IsBoolean()
//   availability: boolean;
// }
