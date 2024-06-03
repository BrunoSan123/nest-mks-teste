import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from './entities/admin.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService:AdminService){}

    @UseGuards(JwtAuthGuard)
    @Get('/list_admins')
    async listAdmins():Promise<Admin[]>{
        const allAdmins=await this.adminService.findAllAdmins();
        return  allAdmins;
    }

    @UseGuards(JwtAuthGuard)
    @Get('/list_admins/:id')
    async listOneAdmin(@Param('id') id:string):Promise<Admin>{
        const admin=await this.adminService.findOneAdmin(id);
        return admin;
    }

    @Post('/create_admin')
    async createAdmin(@Body() admin:Admin):Promise<Admin>{
        const newAdmin=await this.adminService.createAdmin(admin);
        return newAdmin;
    }

    @UseGuards(JwtAuthGuard)
    @Put('/update_admin')
    async updateAdmin(id:string,admin:Admin){
        const adminUpdated=await this.adminService.updateAdmin(id,admin);
        return adminUpdated;
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/delete_admin')
    async deleteAdmin(id:string){
        const adminDeleted=this.adminService.deleteAdmin(id);
        return adminDeleted;
    }
    
}
