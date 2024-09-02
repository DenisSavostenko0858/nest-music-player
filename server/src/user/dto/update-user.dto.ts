import { PartialType } from '@nestjs/mapped-types';
import { RegisterUserDto } from './register-user.dto';
import {IsNumber } from "class-validator";

export class UpdateUserDto extends PartialType(RegisterUserDto) {
    @IsNumber()
    id: number
}
