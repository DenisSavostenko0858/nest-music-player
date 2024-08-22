import {Injectable, UnauthorizedException} from '@nestjs/common';
import { CreateNewTrackDto } from './dto/create-new-track.dto';
// import { UpdateTrackDto } from './dto/update-track.dto';
import {PrismaService} from "../prisma.service";

@Injectable()
export class TrackService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTrackDto: CreateNewTrackDto) {
    const {name, artistId, picture, text, audio} = createTrackDto;

    const validMusic = await this.prisma.music.findFirst({
      where: { text: text, audio: audio }
    })

    if (validMusic) {
      throw new UnauthorizedException('Плагиат!')
    }

    const newtrack = await this.prisma.music.create({
      data: {name, artistId, picture, text, audio},
    })

    return newtrack
  }

  async findAll() {
    return this.prisma.music.findMany()
  }

  findOne(id: number) {
    return this.prisma.music.findUnique({
      where: {id},
      include: {
        comments: {
          include:{
            user: true
          }
        }
      }
    })
  }

  // update(id: number, updateTrackDto: UpdateTrackDto) {
  //   return `This action updates a #${id} track`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} track`;
  // }
}
