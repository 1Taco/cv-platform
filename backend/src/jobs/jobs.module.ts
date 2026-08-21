import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPosting } from './entities/job-posting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobPosting])],
})
export class JobsModule {}
