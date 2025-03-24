import { read, WorkBook, utils } from 'xlsx';
import { BadRequestException } from '@nestjs/common';
import { CandidateFileData } from './candidate.entity';

export function excelToCandidateFile(
  file: Express.Multer.File,
): CandidateFileData {
  // validate file is present
  try {
    if (!file || !file?.buffer) {
      throw new BadRequestException({
        errors: ['You must upload an Excel file'],
      });
    }
    const buffer: Buffer = file.buffer;

    let workbook: WorkBook;
    try {
      workbook = read(buffer, { type: 'buffer' });
    } catch {
      throw new BadRequestException({
        errors: ['The file must be an Excel file'],
      });
    }

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const data = utils.sheet_to_json<CandidateFileData>(sheet);
    if (!data[0] || !(data.length === 1)) {
      throw new BadRequestException({
        errors: ['Excel must contain 1 header and 1 line of data'],
      });
    }
    return data[0];
  } catch {
    throw new BadRequestException({
      errors: ['Something went wrong during excel parsing'],
    });
  }
}
