import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Lock, Heart, Sparkles } from 'lucide-react';

const PasscodePage = ({ onUnlock }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const containerRef = useRef(null);
    const inputRef = useRef(null);

    const CORRECT_PASSWORD = 'Shivivedstripu@2027';

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate the lock icon
            gsap.fromTo('.lock-icon',
                { scale: 0, rotation: -180 },
                { scale: 1, rotation: 0, duration: 1.2, ease: 'elastic.out(1, 0.5)' }
            );

            // Animate the title
            gsap.fromTo('.passcode-title',
                { opacity: 0, y: -30 },
                { opacity: 1, y: 0, duration: 1, delay: 0.3 }
            );

            // Animate the subtitle
            gsap.fromTo('.passcode-subtitle',
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.8, delay: 0.5 }
            );

            // Animate the input container
            gsap.fromTo('.input-container',
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 0.8, delay: 0.7 }
            );

            // Floating hearts animation
            const hearts = document.querySelectorAll('.floating-heart-passcode');
            hearts.forEach((heart, i) => {
                gsap.to(heart, {
                    y: -1000,
                    x: `random(-150, 150)`,
                    rotation: `random(-60, 60)`,
                    opacity: 0,
                    duration: `random(8, 12)`,
                    delay: i * 0.4,
                    repeat: -1,
                    ease: 'power1.inOut'
                });
            });

            // Sparkles animation
            gsap.to('.sparkle-passcode', {
                scale: 1.3,
                opacity: 0.4,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                stagger: 0.2
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password === CORRECT_PASSWORD) {
            setError('');
            // Success animation before unlock
            gsap.to('.passcode-container', {
                scale: 1.1,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    gsap.to('.passcode-container', {
                        opacity: 0,
                        scale: 0.8,
                        duration: 0.5,
                        onComplete: onUnlock
                    });
                }
            });
        } else {
            setError('Incorrect passcode. Try again! 💕');
            setPassword('');

            // Shake animation for error
            gsap.fromTo('.input-container',
                { x: -10 },
                { x: 10, duration: 0.1, repeat: 5, yoyo: true, ease: 'power1.inOut' }
            );
        }
    };

    return (
        <div ref={containerRef} className="w-full h-screen flex items-center justify-center relative overflow-hidden">
            {/* Beautiful gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-900 via-rose-800 to-red-900">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-pink-500/20"></div>
            </div>

            {/* Floating hearts */}
            {[...Array(15)].map((_, i) => (
                <div
                    key={i}
                    className="floating-heart-passcode absolute bottom-0 text-pink-300/30"
                    style={{
                        left: `${Math.random() * 100}%`,
                        fontSize: `${Math.random() * 25 + 20}px`,
                    }}
                >
                    ❤️
                </div>
            ))}

            {/* Sparkles */}
            <div className="sparkle-passcode absolute top-20 left-20 text-yellow-300 text-3xl">✨</div>
            <div className="sparkle-passcode absolute top-32 right-24 text-yellow-300 text-4xl">✨</div>
            <div className="sparkle-passcode absolute bottom-40 left-32 text-yellow-300 text-3xl">✨</div>
            <div className="sparkle-passcode absolute bottom-24 right-28 text-yellow-300 text-4xl">✨</div>

            {/* Passcode container */}
            <div className="passcode-container relative z-10 w-full max-w-md mx-4">
                {/* Lock icon */}
                <div className="lock-icon flex justify-center mb-6">
                    <div className="bg-gradient-to-br from-pink-500 to-red-500 p-6 rounded-full shadow-2xl">
                        <Lock className="w-12 h-12 text-white" />
                    </div>
                </div>

                {/* Title */}
                <h1 className="passcode-title text-center mb-3">
                    <span className="text-4xl md:text-5xl font-hand text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-200 to-pink-100">
                        A Special Journey Awaits
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="passcode-subtitle text-center text-pink-200 text-lg font-serif italic mb-8">
                    Enter the passcode to unlock this romantic story 💕
                </p>

                {/* Input form */}
                <form onSubmit={handleSubmit} className="input-container">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border-2 border-pink-300/30">
                        <input
                            ref={inputRef}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter passcode..."
                            className="w-full bg-white/20 text-white text-center text-xl font-serif px-6 py-4 rounded-xl border-2 border-pink-300/50 focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400/50 placeholder-pink-200/50 backdrop-blur-sm transition-all duration-300"
                            autoFocus
                        />

                        {error && (
                            <p className="text-pink-300 text-center mt-4 text-sm animate-pulse">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="w-full mt-6 bg-gradient-to-r from-pink-600 via-red-600 to-pink-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-pink-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
                        >
                            <Heart fill="white" className="w-5 h-5 animate-pulse" />
                            Unlock Story
                            <Sparkles className="w-5 h-5" />
                        </button>
                    </div>
                </form>

                {/* Romantic note */}
                <p className="text-center text-pink-300/60 text-sm font-hand mt-6">
                    ✨ Created with love for someone special ✨
                </p>
            </div>
        </div>
    );
};

export default PasscodePage;
