import { useEffect, useState } from 'react';
import { InterfaceTrack } from './interface/interface-track.tsx';
import {observer} from "mobx-react-lite";

const TrackList = observer(({ onTrackSelect }) => {
    const [tracks, setTracks] = useState<InterfaceTrack[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const response = await fetch('http://localhost:5000/track/list');
                if (!response.ok) {
                    console.log('Нет ответа от сервера');
                }
                const data = await response.json();
                setTracks(data);
            } catch (err: any) {
                setErrorMessage("Ошибка: " + err.response.data?.message);
            } finally {
                setLoading(false);
            }
        };
        fetchTracks()
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="track-list">
            <div className="track-container">
                {tracks.map(track => (
                    <div key={track.id} className="track-item">
                        <div className="track-bar-left" onClick={() => onTrackSelect(track)}>
                            <img className="image-track" src={'http://localhost:5000/' + track.picture} alt={track.name}/>
                            <div className="info">
                                <p style={{marginRight:'10px'}}>{track.name}</p>
                                <a href='' style={{textDecoration:"none"}}>{track.user.name}</a>
                            </div>
                        </div>
                        <div className='track-bar-right'>
                            <audio controls>
                                <source src={'http://localhost:5000/' + track.audio} type="audio/mpeg"/>
                            </audio>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
});

export default TrackList;
