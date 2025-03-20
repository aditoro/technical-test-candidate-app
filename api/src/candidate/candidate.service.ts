// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CandidateEntity } from './candidate.entity';
import { CandidateDto } from './candidate.dto';
@Injectable()
export class CandidateService {
  constructor(
    @InjectRepository(CandidateEntity)
    private candidateRepository: Repository<CandidateEntity>,
  ) {}

  async create(candidate: CandidateDto): Promise<CandidateEntity> {
    return this.candidateRepository.save(candidate);
  }

  async findAll(): Promise<CandidateEntity[]> {
    return this.candidateRepository.find();
  }

  // async remove(id: number): Promise<void> {
  //   await this.candidateRepository.delete(id);
  // }
}
