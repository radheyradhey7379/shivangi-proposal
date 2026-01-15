import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Heart, MessageCircle, Sparkles } from 'lucide-react';

const FinalProposal = () => {
    const containerRef = useRef(null);
    const [accepted, setAccepted] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Animate romantic quote first
            tl.fromTo(".romantic-quote",
                { opacity: 0, y: -30 },
                { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
            )
                // Then character images with heart pulse
                .fromTo(".char-img",
                    { opacity: 0, scale: 0.8 },
                    { opacity: 1, scale: 1, duration: 2, ease: "elastic.out(1, 0.5)" },
                    "-=0.5"
                )
                // Add heart glow animation
                .to(".heart-frame", {
                    boxShadow: "0 0 40px rgba(255, 0, 100, 0.6)",
                    duration: 1.5,
                    repeat: -1,
                    yoyo: true,
                    ease: "power1.inOut"
                }, "-=1")
                // Proposal text with emotional reveal
                .fromTo(".proposal-text",
                    { opacity: 0, scale: 0.9 },
                    { opacity: 1, scale: 1, duration: 1.5, ease: "back.out(1.2)" },
                    "-=1"
                )
                // Subtitle text
                .fromTo(".subtitle-text",
                    { opacity: 0, y: 10 },
                    { opacity: 1, y: 0, duration: 1 },
                    "-=0.5"
                )
                // Buttons with stagger
                .fromTo(".action-btn",
                    { opacity: 0, y: 30, scale: 0.9 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.2, ease: "back.out(1.5)" },
                    "-=0.3"
                );

            // Floating hearts animation
            const hearts = document.querySelectorAll('.floating-heart');
            hearts.forEach((heart, i) => {
                gsap.to(heart, {
                    y: -800,
                    x: `random(-100, 100)`,
                    rotation: `random(-45, 45)`,
                    opacity: 0,
                    duration: `random(6, 10)`,
                    delay: i * 0.5,
                    repeat: -1,
                    ease: "power1.inOut"
                });
            });

            // Sparkle animation
            gsap.to(".sparkle", {
                scale: 1.5,
                opacity: 0.3,
                duration: 2,
                repeat: -1,
                yoyo: true,
                stagger: 0.3
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleAccept = () => {
        setAccepted(true);
        // Create confetti-like celebration
        gsap.to(".proposal-content", {
            opacity: 0,
            scale: 0.95,
            duration: 0.8
        });
        gsap.to(".celebration", {
            opacity: 1,
            display: "flex",
            duration: 1.5,
            ease: "power2.out"
        });
        // Celebration text animation
        gsap.fromTo(".celebration-text",
            { scale: 0, rotation: -180 },
            { scale: 1, rotation: 0, duration: 1.2, ease: "elastic.out(1, 0.5)", delay: 0.5 }
        );
    };

    return (
        <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
            {/* Beautiful gradient background */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-pink-900 via-rose-800 to-red-900">
                <div className="absolute inset-0 bg-[url('/assets/bg-wedding.png')] bg-cover opacity-10"></div>
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-pink-500/20"></div>
            </div>

            {/* Floating hearts */}
            {[...Array(12)].map((_, i) => (
                <div
                    key={i}
                    className="floating-heart absolute bottom-0 text-pink-300/40"
                    style={{
                        left: `${Math.random() * 100}%`,
                        fontSize: `${Math.random() * 20 + 15}px`,
                    }}
                >
                    ❤️
                </div>
            ))}

            {/* Sparkles */}
            <div className="sparkle absolute top-20 left-20 text-yellow-300 text-2xl">✨</div>
            <div className="sparkle absolute top-40 right-32 text-yellow-300 text-3xl">✨</div>
            <div className="sparkle absolute bottom-40 left-40 text-yellow-300 text-2xl">✨</div>
            <div className="sparkle absolute bottom-32 right-20 text-yellow-300 text-3xl">✨</div>

            {/* Celebration Overlay */}
            <div className="celebration hidden absolute inset-0 z-50 flex-col items-center justify-center bg-gradient-to-br from-pink-900/95 via-red-900/95 to-purple-900/95">
                <div className="celebration-text text-center">
                    <h1 className="text-6xl md:text-8xl text-gold font-hand mb-6 drop-shadow-lg">
                        Forever & Always! 💕
                    </h1>
                    <p className="text-white text-2xl md:text-3xl font-serif mb-4">Thank you for forgiving me, Shivangi.</p>
                    <p className="text-pink-200 text-xl md:text-2xl font-hand">Our journey begins now... 🌹</p>
                    {/* Celebration hearts */}
                    <div className="mt-8 text-6xl animate-bounce">❤️</div>
                </div>
            </div>

            <div className="proposal-content z-10 w-full max-w-4xl flex flex-col items-center gap-2 px-4">
                {/* Romantic quote at top */}
                <div className="romantic-quote text-center mb-1">
                    <p className="text-pink-200 text-base md:text-lg font-hand italic">
                        "In your eyes, I found my home. In your heart, I found my love."
                    </p>
                </div>

                {/* Heart-framed images */}
                <div className="heart-frame relative flex justify-center items-end gap-3 md:gap-8 mb-2 p-3 rounded-3xl bg-white/5 backdrop-blur-sm border-2 border-pink-300/30">
                    {/* Decorative hearts around images */}
                    <div className="absolute -top-3 -left-3 text-3xl animate-pulse">💕</div>
                    <div className="absolute -top-3 -right-3 text-3xl animate-pulse" style={{ animationDelay: '0.5s' }}>💕</div>

                    <img src="/assets/tripuresh.jpeg" className="char-img w-24 md:w-44 rounded-2xl shadow-2xl border-4 border-gold/50 transform hover:scale-105 transition-transform" alt="Tripuresh" />
                    <img src="/assets/shivangi.jpeg" className="char-img w-24 md:w-44 rounded-2xl shadow-2xl border-4 border-gold/50 transform hover:scale-105 transition-transform" alt="Shivangi" />

                    <div className="absolute -bottom-3 -left-3 text-3xl animate-pulse" style={{ animationDelay: '1s' }}>💕</div>
                    <div className="absolute -bottom-3 -right-3 text-3xl animate-pulse" style={{ animationDelay: '1.5s' }}>💕</div>
                </div>

                {/* Enhanced proposal text */}
                <div className="proposal-text text-center bg-gradient-to-br from-black/60 to-pink-900/40 p-4 md:p-6 rounded-3xl backdrop-blur-md border-2 border-gold/40 shadow-2xl max-w-3xl">
                    <div className="mb-2 text-3xl">💝</div>
                    <p className="text-xl md:text-3xl font-hand text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-200 to-pink-100 mb-3 leading-relaxed">
                        "Shivangi, will you forgive me and walk this journey with me?"
                    </p>
                    <div className="subtitle-text">
                        <p className="text-pink-200/80 text-sm md:text-base font-serif italic mb-2">
                            Every moment with you is a blessing. Let's create our forever together.
                        </p>
                        <p className="text-right text-gold font-serif text-base md:text-lg">
                            — With all my heart, Tripuresh 💖
                        </p>
                    </div>
                </div>

                {/* Beautiful buttons */}
                <div className="flex flex-col md:flex-row gap-3 mt-3">
                    <button
                        onClick={handleAccept}
                        className="action-btn group relative flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 via-pink-600 to-red-600 text-white px-8 py-3 rounded-full font-bold text-base md:text-lg shadow-2xl hover:shadow-pink-500/50 hover:scale-110 transition-all duration-300 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <Heart fill="white" className="relative z-10 animate-pulse w-4 h-4" />
                        <span className="relative z-10">YES! 💕</span>
                    </button>

                    <button
                        className="action-btn group flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-pink-300/60 text-white px-8 py-3 rounded-full font-bold text-base md:text-lg hover:bg-pink-500/20 hover:border-pink-300 hover:scale-105 transition-all duration-300 shadow-xl"
                        onClick={() => window.open('https://www.instagram.com/tripuresh.05?igsh=MXU1a2djZXZ1Y3Judw==', '_blank')}
                    >
                        <MessageCircle className="group-hover:rotate-12 transition-transform w-4 h-4" />
                        <span>Let's Talk 💬</span>
                    </button>
                </div>


            </div>
        </div>
    );
};

export default FinalProposal;
