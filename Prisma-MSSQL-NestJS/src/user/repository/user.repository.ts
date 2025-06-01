import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
      where: { id },
      include: { posts: true },
    });
  }

  async findUserByName(name: string) {
    return this.prisma.user.findFirst({
      where: { name },
      include: { posts: true },
    });
  }

  async findUserById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findPostsByUserId(userId: number) {
    return this.prisma.post.findMany({ where: { userId } });
  }

  async deleteUserById(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
