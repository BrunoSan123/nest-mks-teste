import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titulo: string;

  @Column()
  descrição: string;

  @Column()
  diretor: string;

  @Column()
  dataDeLançamento: string;

  @Column()
  postDofilme:string;
}
