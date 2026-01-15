import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Havan = ({ nextScene }) => {
    const containerRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(textRef.current, { opacity: 0, y: 30 });
            gsap.set(".fire-glow", { opacity: 0.5, scale: 0.8 });

            const tl = gsap.timeline({
                onComplete: () => {
                    gsap.to(".continue-btn", { opacity: 1, duration: 1, pointerEvents: "auto" });
                }
            });

            // Fire animation
            gsap.to(".fire-glow", {
                opacity: 0.8,
                scale: 1.1,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            // Text reveal
            tl.to(textRef.current, {
                opacity: 1,
                y: 0,
                duration: 3,
                ease: "power2.out"
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-between py-20 relative bg-black">
            {/* Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <img src="/assets/bg-havan.png" className="w-full h-full object-cover opacity-80" alt="Havan" />
                <div className="fire-glow absolute inset-0 bg-gradient-to-t from-orange-600/40 via-transparent to-transparent mix-blend-screen"></div>
            </div>

            {/* Spacer for top */}
            <div className="flex-1"></div>

            <div className="z-10 text-center px-6 mb-10 bg-black/40 p-6 rounded-xl backdrop-blur-sm border border-gold/30 max-w-2xl mx-4">
                <p ref={textRef} className="text-2xl md:text-3xl font-serif text-cream italic drop-shadow-lg leading-relaxed">
                    “With fire as witness, I ask for forgiveness <br />and a new beginning.”
                </p>
            </div>

            <div className="z-20 h-20 flex items-center">
                <button
                    onClick={nextScene}
                    className="continue-btn opacity-0 bg-gold/20 hover:bg-gold/40 text-gold border border-gold px-6 py-2 rounded-full transition-all pointer-events-none"
                >
                    Take the Vows
                </button>
            </div>
        </div>
    );
};

export default Havan;
