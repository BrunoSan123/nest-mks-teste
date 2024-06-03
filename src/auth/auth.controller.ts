import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtPayload } from './jwt-payload.interface';
import { Admin } from 'src/admin/entities/admin.entity';
import { ApiTags } from '@nestjs/swagger';
import { JwtDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}
    @ApiTags('/generate_token')
    @Post('/generate_token')
    async generateToken(@Body() credential:JwtDto){
        const generatedToken=this.authService.login(credential);
        return generatedToken;
    }    
    
}
