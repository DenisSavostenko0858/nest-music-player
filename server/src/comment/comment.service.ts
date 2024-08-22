import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
// import { UpdateCommentDto } from './dto/update-comment.dto';
import {PrismaService} from "../prisma.service";

@Injectable()
export class CommentService {

  constructor(private readonly prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto) {
    const {text, musicId, userId, rating} = createCommentDto;

    const newComment = await this.prisma.comment.create({
      data: {text, rating,
        music:{
        connect: {id: musicId}
        },
        user:{
        connect: {id: userId}
      }}
    })
    return newComment;
  }

  findAll() {
    return this.prisma.comment.findMany(
        {include:{
            user: true,
            music: true
          }}
    )
  }

  findOne(id: number) {
    return this.prisma.comment.findUnique({
      where: {id},
      include:{
        user: true,
        music: true
      }
    })
  }

  // update(id: number, updateCommentDto: UpdateCommentDto) {
  //   return `This action updates a #${id} comment`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} comment`;
  // }
}
