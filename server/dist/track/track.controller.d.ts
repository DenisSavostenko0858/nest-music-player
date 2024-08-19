import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
export declare class TrackController {
    private readonly trackService;
    constructor(trackService: TrackService);
    create(createTrackDto: CreateTrackDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateTrackDto: UpdateTrackDto): string;
    remove(id: string): string;
}
