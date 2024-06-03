// auth.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin/admin.service';
import { Admin } from 'src/admin/entities/admin.entity';
import * as bcrypt from 'bcrypt'
import { throwError } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService,
  ) {}

  async login(user: any) {
     const existentUser=this.adminService.findOneAdmin(user.id);
     
     const userPassword=await bcrypt.compare(user.senha,(await existentUser).senha);
     if(userPassword){
      const token=this.jwtService.sign(user);
      return {
        access_token: token,
      };
     }else{
        throw new NotFoundException('Usuário inexistente');
     }


  }
}
