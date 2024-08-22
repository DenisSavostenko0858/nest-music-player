import { TrackService } from './track.service';
import { CreateNewTrackDto } from './dto/create-new-track.dto';
export declare class TrackController {
    private readonly trackService;
    constructor(trackService: TrackService);
    create(createTrackDto: CreateNewTrackDto): Promise<{
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
    findAll(): Promise<{
        id: number;
        name: string;
        artistId: number;
        text: string;
        listens: number;
        picture: string;
        audio: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__MusicClient<{
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
}
