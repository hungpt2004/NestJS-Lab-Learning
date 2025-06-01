import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new NotFoundException(`Không thể tìm thấy user`);
    }

    const posts = await this.userRepository.findPostsByUserId(id);
    if (posts.length > 0) {
      throw new BadRequestException('Không thể xóa vì có bài viết');
    }

    await this.userRepository.deleteUserById(id);

    return {
      message: 'Xóa thành công',
      status: 'success',
      data: user,
    };
  }

}