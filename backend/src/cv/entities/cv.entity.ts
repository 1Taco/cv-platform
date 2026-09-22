import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('cvs')
export class Cv {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, { nullable: true, onDelete: 'CASCADE' })
  user?: User;

  @Column({ nullable: true })
  originalFilename!: string;

  @Column('text')
  rawText!: string;

  @Column('jsonb')
  parsedProfile!: Record<string, unknown>;

  @CreateDateColumn()
  uploadedAt!: Date;
}
