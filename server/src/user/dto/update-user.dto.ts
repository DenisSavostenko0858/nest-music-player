import { PartialType } from '@nestjs/mapped-types';
import { RegisterUserDto } from './register-user.dto';
import {IsNumber, IsOptional, isString, IsString } from "class-validator";

export class UpdateUserDto extends PartialType(RegisterUserDto) {
    @IsNumber()
    id: number

    @IsOptional()
    @IsString()
    email: string

    @IsOptional()
    @IsString()
    password: string

    @IsOptional()
    @IsString()
    lastName: string
    
    @IsOptional()
    @IsString()
    about: string
    
    @IsOptional()
    @IsString()
    name: string
    
    @IsOptional()
    @IsString()
    age: string
}
