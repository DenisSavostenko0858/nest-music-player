import {Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateNewTrackDto } from './dto/create-new-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import {FileFieldsInterceptor, FileInterceptor} from "@nestjs/platform-express";

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post('/create')
  @UseInterceptors(FileFieldsInterceptor([
    {name: 'picture', maxCount: 1},
    {name: 'audio', maxCount: 1}
  ]))
  create(@UploadedFiles() files, @Body() createTrackDto: CreateNewTrackDto) {
    const {picture, audio} = files;
    return this.trackService.create(createTrackDto, picture[0], audio[0]);
  }

  @Get('/list')
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trackService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
  //   return this.trackService.update(+id, updateTrackDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.trackService.remove(+id);
  // }
}
