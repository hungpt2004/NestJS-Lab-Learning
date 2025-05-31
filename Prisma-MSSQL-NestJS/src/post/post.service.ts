import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.post.findMany({ include: { user: true } });
  }

  async create(data: CreatePostDto) {
    return this.prisma.post.create({ data });
  }
}
