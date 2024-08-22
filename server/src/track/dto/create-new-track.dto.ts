import {IsInt, IsNumber, IsOptional, IsString, Min} from "class-validator";

export class CreateNewTrackDto {
    @IsString()
    name: string

    @IsNumber()
    artistId: number

    @IsString()
    text: string

    @IsNumber()
    @IsOptional()
    @IsInt()
    @Min(0)
    listing: number

    @IsOptional()
    @IsString()
    picture: string

    @IsString()
    audio: string
}
