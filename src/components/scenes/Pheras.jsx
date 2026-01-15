import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Pheras = ({ nextScene }) => {
    const containerRef = useRef(null);
    const vows = [
        "Trust", "Respect", "Patience", "Understanding", "Care", "Support", "Forever"
    ];

    // We don't really need state for index if we just animate them

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    // Ensure button is clickable by animating pointerEvents if needed, 
                    // but standard opacity/y nav should work if z-index is good.
                    gsap.to(".finish-btn", { opacity: 1, y: 0, duration: 1, pointerEvents: "auto" });
                }
            });

            // Animate vows
            vows.forEach((vow, i) => {
                tl.to(`.vow-${i}`, {
                    opacity: 1,
                    scale: 1,
                    duration: 1.0,
                    ease: "power2.out"
                })
                    .to(`.vow-${i}`, {
                        color: "#FFD700",
                        textShadow: "0 0 20px #FFD700",
                        duration: 0.5
                    }, "-=0.2"); // Slight overlap for faster feel
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-between py-10 md:py-20 relative bg-maroon overflow-hidden">
            {/* Circular decorative element */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border-2 border-gold/20 opacity-20 animate-spin-slow pointer-events-none"></div>

            {/* Title */}
            <div className="z-10 text-center mt-4">
                <h2 className="text-xl md:text-2xl text-gold/60 uppercase tracking-widest">The Seven Vows</h2>
            </div>

            {/* Vows Container - using flex-1 to take available space and center content */}
            <div className="z-10 flex-1 flex flex-col justify-center gap-3 md:gap-5 text-center my-4 overflow-y-auto">
                {vows.map((vow, idx) => (
                    <div
                        key={idx}
                        className={`vow-${idx} text-3xl md:text-5xl font-hand opacity-0 scale-90 transition-all text-cream`}
                    >
                        {vow}
                    </div>
                ))}
            </div>

            {/* Button - Relative positioning within flex container to avoid overlap */}
            <div className="z-20 mb-4">
                <button
                    onClick={() => {
                        console.log("Button clicked!");
                        nextScene();
                    }}
                    className="finish-btn opacity-0 transform translate-y-10 bg-gold text-maroon px-8 py-3 rounded-full font-bold hover:scale-110 transition-all shadow-lg pointer-events-none"
                >
                    My Final Question
                </button>
            </div>
        </div>
    );
};

export default Pheras;
