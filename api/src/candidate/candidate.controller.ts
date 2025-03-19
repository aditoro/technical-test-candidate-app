import {
  Controller,
  Get,
  Post,
  Body,
  // Param,
  // Put,
  // Delete,
} from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CandidateEntity } from './candidate.entity';

@Controller('candidates')
export class CandidateController {
  constructor(private readonly usersService: CandidateService) {}

  @Post()
  async create(@Body() candidate: CandidateEntity): Promise<CandidateEntity> {
    return this.usersService.create(candidate);
  }

  @Get()
  async findAll(): Promise<CandidateEntity[]> {
    return this.usersService.findAll();
  }

  // @Get(':id')
  // async findOne(@Param('id') id: number): Promise<User> {
  //   return this.usersService.findOne(id);
  // }

  // @Put(':id')
  // async update(@Param('id') id: number, @Body() user: User): Promise<User> {
  //   return this.usersService.update(id, user);
  // }

  // @Delete(':id')
  // async remove(@Param('id') id: number): Promise<void> {
  //   return this.usersService.remove(id);
  // }
}
