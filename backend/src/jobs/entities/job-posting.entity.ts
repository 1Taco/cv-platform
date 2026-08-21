import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('job_postings')
export class JobPosting {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  company!: string;

  @Column({ nullable: true })
  location!: string;

  @Column('text')
  description!: string;

  @Column({ nullable: true })
  sourceUrl!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
