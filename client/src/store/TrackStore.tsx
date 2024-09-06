import { createContext, useContext, useState } from 'react';

const TrackContext = createContext();

export const useTrack = () => {
    return useContext(TrackContext);
};

export const TrackProvider = ({ children }) => {
    const [currentTrack, setCurrentTrack] = useState(null);

    return (
        <TrackContext.Provider value={{ currentTrack, setCurrentTrack }}>
            {children}
        </TrackContext.Provider>
    );
};
