import { PartialType } from '@nestjs/mapped-types';
import { CreateNewTrackDto } from './create-new-track.dto';
import {IsInt, IsNumber, IsOptional, IsString, Min} from "class-validator";

export class UpdateTrackDto extends PartialType(CreateNewTrackDto) {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsNumber()
    artistId?: number;

    @IsOptional()
    @IsString()
    text?: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    listens?: number;

    @IsOptional()
    @IsString()
    picture?: string;

    @IsOptional()
    @IsString()
    audio?: string;
}
