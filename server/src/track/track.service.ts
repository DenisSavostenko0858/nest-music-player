import {Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateNewTrackDto} from './dto/create-new-track.dto';
// import { UpdateTrackDto } from './dto/update-track.dto';
import {PrismaService} from "../prisma.service";
import {FileService, FileType} from "../file/file.service";

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
      data: {name, artistId, picture: imagePath, text, audio: audioPath},
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
