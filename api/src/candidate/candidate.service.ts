// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CandidateEntity } from './candidate.entity';

@Injectable()
export class CandidateService {
  constructor(
    @InjectRepository(CandidateEntity)
    private candidateRepository: Repository<CandidateEntity>, // Inyectamos el repositorio de la entidad User
  ) {}

  async create(candidate: CandidateEntity): Promise<CandidateEntity> {
    return this.candidateRepository.save(candidate);
  }

  async findAll(): Promise<CandidateEntity[]> {
    return this.candidateRepository.find();
  }

  // async findOne(id: number): Promise<Candidate> {
  //   return this.candidateRepository.findOne(id);
  // }

  // // Actualizar un usuario
  // async update(id: number, user: Candidate): Promise<Candidate> {
  //   await this.candidateRepository.update(id, user);
  //   return this.candidateRepository.findOne(id);
  // }

  // Eliminar un usuario
  async remove(id: number): Promise<void> {
    await this.candidateRepository.delete(id);
  }
}
