import { CreateNewTrackDto } from './dto/create-new-track.dto';
import { PrismaService } from "../prisma.service";
import { FileService } from "../file/file.service";
import { Track } from "./entities/track.entity";
export declare class TrackService {
    private readonly prisma;
    private readonly fileService;
    constructor(prisma: PrismaService, fileService: FileService);
    create(createTrackDto: CreateNewTrackDto, picture: any, audio: any): Promise<{
        id: number;
        name: string;
        artistId: number;
        text: string;
        listens: number;
        picture: string;
        audio: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(count?: number, offset?: number): Promise<({
        user: {
            id: number;
            name: string;
            email: string;
            password: string;
            lastName: string | null;
            age: Date | null;
            about: string | null;
        };
    } & {
        id: number;
        name: string;
        artistId: number;
        text: string;
        listens: number;
        picture: string;
        audio: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__MusicClient<{
        comments: ({
            user: {
                id: number;
                name: string;
                email: string;
                password: string;
                lastName: string | null;
                age: Date | null;
                about: string | null;
            };
        } & {
            id: number;
            text: string;
            musicId: number;
            userId: number;
            rating: number | null;
            createdAt: Date;
            updatedAt: Date;
        })[];
    } & {
        id: number;
        name: string;
        artistId: number;
        text: string;
        listens: number;
        picture: string;
        audio: string;
        createdAt: Date;
        updatedAt: Date;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    listen(id: number): Promise<{
        id: number;
        name: string;
        artistId: number;
        text: string;
        listens: number;
        picture: string;
        audio: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    search(query: string): Promise<Track[]>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        artistId: number;
        text: string;
        listens: number;
        picture: string;
        audio: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
