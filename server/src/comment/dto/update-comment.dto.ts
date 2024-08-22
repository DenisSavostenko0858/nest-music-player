import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import {IsInt, IsOptional, IsString, Max, Min} from "class-validator";

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
    @IsOptional()
    @IsString()
    text: string

    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(5)
    rating: number
}
