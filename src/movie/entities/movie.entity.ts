import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  titulo: string;

  @ApiProperty()
  @Column()
  descricao: string;

  @ApiProperty()
  @Column()
  diretor: string;

  @ApiProperty()
  @Column()
  dataDeLancamento: string;

  @ApiProperty()
  @Column({nullable:true})
  postDofilme:string;
}
