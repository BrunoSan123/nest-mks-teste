import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin)
        private adminRepository:Repository<Admin>
    ){}

    async  createAdmin(admin:Admin):Promise<Admin>{
        const saltOrRounds = 10;
        const password = admin.senha;
        const hash = await bcrypt.hash(password, saltOrRounds)
        admin.senha=hash;

        return await this.adminRepository.save(admin);
    }

    async findOneAdmin(id:string):Promise<Admin>{
        const oneAdmin= await this.adminRepository.findOne({where:{id}})

        return oneAdmin;
    }

    async findAllAdmins():Promise<Admin[]>{
        const admin= await this.adminRepository.find();
        return admin;
    }

    async updateAdmin(id:string,admin:Admin){
        const existentMovie=await this.adminRepository.findOne({where:{id}})
        if(!existentMovie){
            throw new NotFoundException(`Admin com o id ${id} não foi encontrado`);
        }else{
            const adminToUpdate=await this.adminRepository.update(id,admin);
            return adminToUpdate;
        }
    }

    async deleteAdmin(id:string){
        const existentMovie=await this.adminRepository.findOne({where:{id}})
        if(!existentMovie){
            throw new NotFoundException(`Admin com o id ${id} não foi encontrado`);
        }else{
            await this,this.adminRepository.delete(id);
            return 'Admin deletado com sucesso'
        }
    }
}
