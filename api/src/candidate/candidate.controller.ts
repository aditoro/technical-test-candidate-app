/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  // Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CandidateService } from './candidate.service';
import { CandidateEntity } from './candidate.entity';
import * as XLSX from 'xlsx';
import { Express } from 'express';
import { CandidateDto, Seniority } from './candidate.dto';
import { validate } from 'class-validator';
@Controller('candidates')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    // FILE FORMAT VALIDATION
    if (!file || !file.buffer) {
      throw new BadRequestException({
        errors: ['No excel uploaded'],
      });
    }
    const buffer: Buffer = file.buffer;

    let workbook;
    try {
      workbook = XLSX.read(buffer, { type: 'buffer' });
    } catch {
      throw new BadRequestException({
        errors: ['Error reading the Excel file'],
      });
    }

    const sheetName = workbook.SheetNames[0] as string;
    const sheet = workbook.Sheets[sheetName] as XLSX.WorkSheet;

    const data: any[] = XLSX.utils.sheet_to_json(sheet);
    if (!data[0] || data.length > 1) {
      throw new BadRequestException({
        errors: ['Excel need one line of data'],
      });
    }
    // Excel content validation
    const candidateDto = new CandidateDto();
    candidateDto.name = body.name as string;
    candidateDto.surname = body.surname as string;
    candidateDto.seniority = data[0].seniority as Seniority;
    candidateDto.years = data[0].years as number;
    candidateDto.availability = data[0].availability === 1;

    const errors = await validate(candidateDto);

    if (errors.length > 0) {
      const errorsMessages: string[] = [];
      for (const error of errors) {
        for (const k in error.constraints) {
          errorsMessages.push(error.constraints[k]);
        }
      }
      throw new BadRequestException({
        errors: errorsMessages,
      });
    } else {
      return this.candidateService.create(candidateDto);
    }
  }

  @Get()
  async findAll(): Promise<CandidateEntity[]> {
    return this.candidateService.findAll();
  }

  // @Delete(':id')
  // async remove(@Param('id') id: number): Promise<void> {
  //   return this.usersService.remove(id);
  // }
}
