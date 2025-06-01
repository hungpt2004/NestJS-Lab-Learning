import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import UpdateUserDto from '../dto/update-user-dto';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({ include: { posts: true } });
  }

  async create(data: CreateUserDto) {
    return this.prisma.user.create({ data });
  }

  async update(id: number, data: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async findUserAndPostByUserId(id: number) {
    return this.prisma.user.findUnique({
      where: { id: id },
      include: { posts: true },
    });
  }

  async findUserByName(name: string) {
    return this.prisma.user.findFirst({
      where: { name: name },
      include: { posts: true },
    });
  }

  async deleteUserById(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`Không thể tìm thấy user`);
    }

    console.log(`User: ${JSON.stringify(user)}`);

    const postOfCurrentUser = await this.prisma.post.findMany({
      where: { userId: id },
    });

    if (postOfCurrentUser.length > 0) {
      throw new BadRequestException('Không thể xóa vì có bài viết');
    }

    await this.prisma.user.delete({
      where: { id },
    });

    return {
      message: 'Xóa thành công',
      status: 'success',
      data: user,
    }

  }
}
