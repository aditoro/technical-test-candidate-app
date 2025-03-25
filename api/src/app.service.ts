import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <h1>Welcome to candidate REST api</h1>
      Available endpoints:
      <ul>
        <li>[GET] /candidates</li>
        <li>[POST] /candidates</li>
        <li>[DELETE] /candidates/{id}</li>
      </ul>
    `;
  }
}
