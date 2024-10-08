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
exports.TrackService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const file_service_1 = require("../file/file.service");
let TrackService = class TrackService {
    constructor(prisma, fileService) {
        this.prisma = prisma;
        this.fileService = fileService;
    }
    async create(createTrackDto, picture, audio) {
        const audioPath = this.fileService.createFile(file_service_1.FileType.AUDIO, audio);
        const imagePath = this.fileService.createFile(file_service_1.FileType.IMAGE, picture);
        const { name, artistId, text } = createTrackDto;
        const validMusic = await this.prisma.music.findFirst({
            where: { text: text }
        });
        if (validMusic) {
            throw new common_1.UnauthorizedException('Плагиат!');
        }
        const newtrack = await this.prisma.music.create({
            data: { name, artistId: 1, picture: imagePath, text, audio: audioPath },
        });
        return newtrack;
    }
    async findAll(count = 10, offset = 0) {
        return this.prisma.music.findMany({
            skip: Number(offset),
            take: Number(count),
            include: {
                user: true,
            }
        });
    }
    findOne(id) {
        return this.prisma.music.findUnique({
            where: { id },
            include: {
                comments: {
                    include: {
                        user: true
                    }
                }
            }
        });
    }
    async listen(id) {
        const track = await this.prisma.music.findUnique({
            where: { id }
        });
        if (!track) {
            throw new common_1.UnauthorizedException('Аудиозапись не найдена');
        }
        track.listens += 1;
        await this.prisma.music.update({
            where: { id: track.id },
            data: { listens: track.listens }
        });
        return track;
    }
    async search(query) {
        const tracks = await this.prisma.music.findMany({
            where: {
                name: {
                    contains: query,
                    mode: 'insensitive'
                }
            }
        });
        return tracks;
    }
    async remove(id) {
        await this.prisma.comment.deleteMany({
            where: { musicId: id }
        });
        const track = await this.prisma.music.delete({
            where: { id },
        });
        return track;
    }
};
exports.TrackService = TrackService;
exports.TrackService = TrackService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        file_service_1.FileService])
], TrackService);
//# sourceMappingURL=track.service.js.map