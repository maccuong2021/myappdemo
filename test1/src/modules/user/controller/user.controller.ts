import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../model/user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
        
    }    

    @Get('all')
    async findAll() : Promise<User[]>{
        return await this.userService.findAll();
    }

    @Get(':id')
    async findOne(id: number) : Promise<User | null> {
        return await this.userService.findOne(id);
    }

    @Get('update/:id')
    async updateUser(id: number, name: string, email: string) : Promise<User> {
        return await this.userService.updateUser(id, name, email);
    }

    @Get('delete/:id')
    async deleteUser(id: number) {
        return await this.userService.deleteUser(id);
    }

    @Post()
    async createUser(@Body() user: User) : Promise<User> {
        return await this.userService.createUser(user);
    }
}
