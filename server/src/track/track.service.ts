import {Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateNewTrackDto} from './dto/create-new-track.dto';
// import { UpdateTrackDto } from './dto/update-track.dto';
import {PrismaService} from "../prisma.service";
import {FileService, FileType} from "../file/file.service";
import {Track} from "./entities/track.entity";

@Injectable()
export class TrackService {
  constructor(private readonly prisma: PrismaService,
              private readonly fileService: FileService,) {}

  async create(createTrackDto: CreateNewTrackDto, picture:any, audio:any) {
    const audioPath = this.fileService.createFile(FileType.AUDIO, audio)
    const imagePath = this.fileService.createFile(FileType.IMAGE, picture)

    const {name, artistId, text} = createTrackDto;

    const validMusic = await this.prisma.music.findFirst({
      where: { text: text}
    })

    if (validMusic) {
      throw new UnauthorizedException('Плагиат!')
    }

    const newtrack = await this.prisma.music.create({
      data: {name, artistId: 1, picture: imagePath, text, audio: audioPath},
    })

    return newtrack
  }

  async findAll(count = 10, offset = 0) {
    return this.prisma.music.findMany({
      skip: Number(offset),
      take: Number(count),
      include:{
        user: true,
      }
    })
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

  async listen(id: number){
    const track = await this.prisma.music.findUnique({
      where:{id}
    })

    if (!track){
      throw new UnauthorizedException('Аудиозапись не найдена')
    }
    track.listens += 1;

    await this.prisma.music.update({
      where: { id: track.id },
      data: { listens: track.listens}
    })
    return track;
  }

  async search(query: string): Promise<Track[]> {
    const tracks = await this.prisma.music.findMany({
      where:{
        name: {
          contains: query,
          mode: 'insensitive'
        }
      }
    })
    return tracks
  }
  // update(id: number, updateTrackDto: UpdateTrackDto) {
  //   return `This action updates a #${id} track`;
  // }
  //
  async remove(id: number) {
    await this.prisma.comment.deleteMany({
      where: {musicId: id}
    })
    const track = await this.prisma.music.delete({
      where:{id},
    })
    return track
  }
}
