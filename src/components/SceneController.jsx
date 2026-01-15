import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import Opening from './scenes/Opening';
import Jaimala from './scenes/Jaimala';
import Apology from './scenes/Apology';
import Havan from './scenes/Havan';
import Pheras from './scenes/Pheras';
import FinalProposal from './scenes/FinalProposal';

const SceneController = () => {
    const [currentScene, setCurrentScene] = useState(0);
    const [audioPlaying, setAudioPlaying] = useState(false);
    const [userInteracted, setUserInteracted] = useState(false);
    const audioRef = useRef(null);

    // Background Music: "Tum Hi Ho" from Aashiqui 2
    // To use this song:
    // 1. Download "Tum Hi Ho.mp3" from YouTube/Spotify or your preferred source
    // 2. Place it in the public/assets/ folder as "tum-hi-ho.mp3"
    // 3. The path below will automatically work
    // 
    // Alternatively, use any online MP3 link or keep the placeholder instrumental below
    const audioUrl = "/assets/tum-hi-ho.mp3"; // Local file path
    // Fallback instrumental if song not available:
    // const audioUrl = "https://cdn.pixabay.com/download/audio/2022/11/22/audio_febc508520.mp3?filename=wedding-dream-127986.mp3";

    const scenes = [
        Opening,
        Jaimala,
        Apology,
        Havan,
        Pheras,
        FinalProposal
    ];

    const nextScene = () => {
        if (currentScene < scenes.length - 1) {
            setCurrentScene(prev => prev + 1);
        }
    };

    const toggleAudio = () => {
        if (audioRef.current) {
            if (audioPlaying) {
                audioRef.current.pause();
                setAudioPlaying(false);
            } else {
                audioRef.current.play().catch(e => console.log("Audio play failed:", e));
                setAudioPlaying(true);
            }
        }
    };

    // Auto-play attempt on interaction
    const handleInteraction = () => {
        if (!userInteracted && audioRef.current) {
            audioRef.current.play().then(() => {
                setAudioPlaying(true);
                setUserInteracted(true);
            }).catch(() => {
                // Autoplay blocked
            });
        }
    };

    const CurrentComponent = scenes[currentScene];

    return (
        <div
            className="w-full h-screen relative overflow-hidden bg-black text-gold font-serif"
            onClick={handleInteraction}
        >
            <audio ref={audioRef} loop src={audioUrl} />

            {/* Audio Control */}
            <div
                className="absolute top-4 right-4 z-50 p-3 cursor-pointer bg-maroon/80 rounded-full hover:bg-maroon hover:scale-110 transition-all border border-gold"
                onClick={(e) => { e.stopPropagation(); toggleAudio(); }}
            >
                {audioPlaying ? <Volume2 size={24} color="#FFD700" /> : <VolumeX size={24} color="#FFD700" />}
            </div>

            {/* Scene Container */}
            <div className="w-full h-full">
                <CurrentComponent nextScene={nextScene} />
            </div>

            {/* Progress Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 z-40">
                {scenes.map((_, idx) => (
                    <div
                        key={idx}
                        className={`transition-all duration-300 rounded-full ${idx === currentScene ? 'bg-gold w-4 h-4 shadow-[0_0_10px_#FFD700]' : 'bg-gray-600 w-2 h-2'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default SceneController;
