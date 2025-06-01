import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user-dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findAll() {
    return this.userRepository.findAll();
  }

  async findByUserName(name: string) {
    return this.userRepository.findUserByName(name);  
  }

  async create(data: CreateUserDto) {
    return this.userRepository.create(data);
  }

  async update(id: number, data: UpdateUserDto) {
    return this.userRepository.update(id, data);
  }

  async findUserAndPostByUserId(id: number) {
    return this.userRepository.findUserAndPostByUserId(id);
  }

  async deleteUserById(id: number) {
    return this.userRepository.deleteUserById(id);
  }

}