import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
export declare class TrackService {
    create(createTrackDto: CreateTrackDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateTrackDto: UpdateTrackDto): string;
    remove(id: number): string;
}
