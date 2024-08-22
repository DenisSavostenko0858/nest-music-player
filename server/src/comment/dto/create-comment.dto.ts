import {IsInt, IsNumber, IsOptional, IsString, Max, Min} from "class-validator";

export class CreateCommentDto {
    @IsString()
    text: string

    @IsNumber()
    musicId: number

    @IsNumber()
    userId: number

    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(5)
    rating: number
}
