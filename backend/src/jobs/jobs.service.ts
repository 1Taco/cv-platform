import { Injectable } from '@nestjs/common';

@Injectable()
export class JobsService {
  findAll() {
    return [
      {
        id: 1,
        title: 'Frontend Developer',
        company: 'Acme Corp',
        location: 'Vilnius',
      },
      {
        id: 2,
        title: 'Backend Developer',
        company: 'Baltic Tech',
        location: 'Kaunas',
      },
      {
        id: 3,
        title: 'Fullstack Developer',
        company: 'Vega Labs',
        location: 'Klaipėda',
      },
    ];
  }
}
