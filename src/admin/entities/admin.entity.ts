import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  nome: string;

  @ApiProperty()
  @Column()
  sobrenome: string;

  @ApiProperty()
  @Column()
  senha: string;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @CreateDateColumn()
  dataDeCriação:Date;


  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}
