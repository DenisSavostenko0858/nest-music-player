"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    generateToken(userId) {
        const payload = { id: userId };
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    }
    async register(registerUserDto) {
        const { name, email, password } = registerUserDto;
        const userValid = await this.prisma.user.findUnique({
            where: { email }
        });
        if (userValid) {
            throw new common_1.UnauthorizedException('Данные почты уже были зарегистрированы!');
        }
        const hashpwd = await bcrypt.hash(password, 12);
        const userNew = await this.prisma.user.create({
            data: {
                name, email, password: hashpwd
            }
        });
        const token = this.generateToken(userNew.id);
        return { userNew, token };
    }
    async login(loginUserDto) {
        const { email, password } = loginUserDto;
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new common_1.UnauthorizedException('Данные не были зарегистрированы');
        }
        const token = this.generateToken(user.id);
        return { user, token };
    }
    async checkUser(updateUserDto) {
        const { id } = updateUserDto;
        const user = await this.prisma.user.findUnique({
            where: { id }
        });
        if (!user) {
            throw new Error('Пользователь не найден');
        }
        const token = this.generateToken(user.id);
        return { token };
    }
    async findAll() {
        return this.prisma.user.findMany();
    }
    async findOne(id) {
        return this.prisma.user.findUnique({
            where: { id },
            include: {
                comments: {
                    include: {
                        music: true,
                    }
                }
            }
        });
    }
    async update(id, updateUserDto) {
        const { name, email, password, about, age, lastName } = updateUserDto;
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new Error('Пользователь не найден');
        }
        const newDateUser = {};
        if (name)
            newDateUser.name = name;
        if (lastName)
            newDateUser.lastName = lastName;
        if (about)
            newDateUser.about = about;
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
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map