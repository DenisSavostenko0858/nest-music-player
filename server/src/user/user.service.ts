import {Injectable, UnauthorizedException} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import {UpdateUserDto} from "./dto/update-user.dto";
import {PrismaService} from "../prisma.service";

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private generateToken(userId: number){
    const payload = {id: userId}
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});
  }

  async register(registerUserDto: RegisterUserDto) {
    const { name, email, password } = registerUserDto;

    const userValid = await this.prisma.user.findUnique({
      where: { email }
    })

    if (userValid) {
      throw new UnauthorizedException('Данные почты уже были зарегистрированы!');
    }

    const hashpwd = await bcrypt.hash(password, 12);

    const userNew = await this.prisma.user.create({
      data: {
        name, email, password: hashpwd
      }
    })

    const token = this.generateToken(userNew.id);

    return {userNew, token}
  }

  async login(loginUserDto: LoginUserDto) {
    const {email, password} = loginUserDto;

    const user = await this.prisma.user.findUnique({
      where: {email},
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Данные не были зарегистрированы');
    }

    const token = this.generateToken(user.id)

    return {user, token}
  }

  async checkUser(updateUserDto: UpdateUserDto) {
    const { id } = updateUserDto;

    const user: any = await this.prisma.user.findUnique({
      where: {id}
    })

    if (!user) {
      throw new Error('Пользователь не найден');
    }

    const token = this.generateToken(user.id);

    return { token };
  }

  async findAll() {
    return this.prisma.user.findMany()
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include:{
        comments: {
          include: {
            music: true,
          }
        }
      }
    })
  }
  
  async update(id: number, updateUserDto: UpdateUserDto) {
    const { name, email, password, about, age, lastName } = updateUserDto;
  
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
  
    if (!user) {
      throw new Error('Пользователь не найден');
    }
  
    const newDateUser: any = {};
    
    // Добавления данных в объект
    if (name) newDateUser.name = name;
    
    if (lastName) newDateUser.lastName = lastName;

    if (about) newDateUser.about = about;

    // if (age) newDateUser.age = age;
    
    if (email) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email },
      });
      
      if (existingUser && existingUser.id !== id) {
        throw new Error('Данные почты уже были зарегистрированы!');
      }
      newDateUser.email = email;
    }

    if (password) {
      newDateUser.password = await bcrypt.hash(password, 12);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: newDateUser,
    });
  
    return updatedUser;
  }
  
  // async remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
