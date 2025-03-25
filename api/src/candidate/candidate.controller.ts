import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Delete,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CandidateService } from './candidate.service';
import { CandidateEntity, CandidateBody } from './candidate.entity';
import { Express } from 'express';
// import { CandidateDto, Seniority } from './candidate.dto';
import { validate } from 'class-validator';
import { excelToCandidateFile } from './candidate.utils';
@Controller('candidates')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CandidateBody,
  ) {
    const candidateFile = excelToCandidateFile(file);

    // Excel content validation
    const candidate = new CandidateEntity();
    candidate.name = body.name;
    candidate.surname = body.surname;
    candidate.seniority = candidateFile.seniority;
    candidate.years = candidateFile.years;
    candidate.availability = candidateFile.availability;

    const errors = await validate(candidate);

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
      return this.candidateService.create(candidate);
    }
  }

  @Get()
  async findAll(): Promise<CandidateEntity[]> {
    return this.candidateService.findAll();
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.candidateService.remove(id);
  }
}
