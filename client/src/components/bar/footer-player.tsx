import React, { useRef, useState, useEffect } from 'react';
import { Card, Box, CardMedia, CardContent, Typography, IconButton, Slider } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

const AudioPlayer = () => {
    const audioRef = useRef(null);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;

        const updateCurrentTime = () => {
            setCurrentTime(audio.currentTime);
        };

        audio.addEventListener('timeupdate', updateCurrentTime);
        audio.addEventListener('loadedmetadata', () => {
            setDuration(audio.duration);
        });

        return () => {
            audio.removeEventListener('timeupdate', updateCurrentTime);
        };
    }, []);

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSliderChange = (event, newValue) => {
        audioRef.current.currentTime = newValue;
    };

    return (
        <Card sx={{ display: 'flex', backgroundColor: '#383638', marginTop: '30px', boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <CardMedia
                    component="img"
                    sx={{ width: 121 }}
                    image="http://localhost:5000/image/bf323b7e-8e46-419d-8cc1-1b13c6a51f79.jpg"
                    alt="Live from space album cover"
                />
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        Live From Space
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Mac Miller
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            {Math.floor(currentTime / 60)}:{('0' + Math.floor(currentTime % 60)).slice(-2)} / {Math.floor(duration / 60)}:{('0' + Math.floor(duration % 60)).slice(-2)}
                        </Typography>
                    </Box>
                    <Slider
                        value={currentTime}
                        max={duration}
                        onChange={handleSliderChange}
                        sx={{ mt: 1 }}
                    />
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <IconButton aria-label="previous">
                        <SkipPreviousIcon />
                    </IconButton>
                    <IconButton aria-label="play/pause" onClick={handlePlayPause}>
                        <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                    </IconButton>
                    <IconButton aria-label="next">
                        <SkipNextIcon />
                    </IconButton>
                </Box>
            </Box>
            <audio ref={audioRef} src="http://localhost:5000/audio/e1f7846e-8c38-4d7e-b253-42a9ae12c3f5.mp3" preload="auto" />
        </Card>
    );
};

export default AudioPlayer;
