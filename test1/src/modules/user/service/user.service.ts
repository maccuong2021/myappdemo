import { Controller, Get, Injectable } from '@nestjs/common';
import { User } from '../model/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

    async findAll(): Promise<User[]> {
        console.log('Fetching all users');
        return this.userRepo.find();
    }
   
    async findOne(id: number): Promise<User | null> {
        return await this.userRepo.findOneBy({ id });
    }
   
    async updateUser(id: number, name: string, email: string): Promise<User> {
        const user = await this.userRepo.findOneBy({ id });
        if (user) {
            user.name = name;
            user.email = email;
            return this.userRepo.save(user);
        }
        throw new Error('User not found');
    }

    async deleteUser(id: number): Promise<void> {
        const user = await this.userRepo.findOneBy({ id });
        if (user) {
            await this.userRepo.remove(user);
        } else {
            throw new Error('User not found');
        }
    }

    async createUser(user: User): Promise<User> {       
        return this.userRepo.save(user);
    }
}
