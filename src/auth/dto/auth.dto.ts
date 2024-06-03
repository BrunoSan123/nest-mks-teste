import { ApiProperty } from '@nestjs/swagger'
export class JwtDto{
    @ApiProperty()
    nome: string;
    
    @ApiProperty()
    senha:string
    
    @ApiProperty()
    id:string;
}