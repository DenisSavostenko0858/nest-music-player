import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import {PrismaService} from "../prisma.service";
import {FileService} from "../file/file.service";

@Module({
  controllers: [TrackController],
  providers: [TrackService, FileService, PrismaService],
})
export class TrackModule {}
