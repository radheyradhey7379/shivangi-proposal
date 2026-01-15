import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Jaimala = ({ nextScene }) => {
    const containerRef = useRef(null);
    const groomRef = useRef(null);
    const brideRef = useRef(null);
    const garlandRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    // Show next button or auto advance
                    gsap.to(".next-btn", { opacity: 1, y: 0, duration: 0.5 });
                }
            });

            // Initial positions (off screen)
            gsap.set(groomRef.current, { x: -300, opacity: 0 });
            gsap.set(brideRef.current, { x: 300, opacity: 0 });
            gsap.set(textRef.current, { opacity: 0, y: 20 });

            // 1. Entry
            tl.to([groomRef.current, brideRef.current], {
                x: 0,
                opacity: 1,
                duration: 4,
                ease: "power2.out"
            })
                // 2. Pause & Smile (simulated delay)
                .to({}, { duration: 0.5 })

                // 3. Exchange (Simple scale/move animation to simulate garland exchange)
                .to([groomRef.current, brideRef.current], {
                    scale: 1.05,
                    duration: 0.5,
                    yoyo: true,
                    repeat: 1
                })

                // 4. Glow effect
                .to(".bg-overlay", {
                    backgroundColor: "rgba(255, 215, 0, 0.2)",
                    duration: 2
                }, "-=1")

                .to(textRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 1
                });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full flex items-center justify-center relative overflow-hidden bg-black/90">
            {/* Background */}
            <div className="absolute inset-0 z-0 opacity-50">
                <img src="/assets/bg-wedding.png" className="w-full h-full object-cover blur-sm" alt="Background" />
                <div className="bg-overlay absolute inset-0 transition-colors duration-1000"></div>
            </div>

            {/* Characters Container */}
            <div className="z-10 flex justify-center items-end h-full pb-20 gap-10 md:gap-32 w-full max-w-4xl mx-auto">
                {/* Groom */}
                <div ref={groomRef} className="w-1/3 md:w-1/4 aspect-[3/4] relative">
                    <img src="/assets/tripuresh.jpeg" alt="Tripuresh" className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(255,215,0,0.3)]" />
                </div>

                {/* Bride */}
                <div ref={brideRef} className="w-1/3 md:w-1/4 aspect-[3/4] relative">
                    <img src="/assets/shivangi.jpeg" alt="Shivangi" className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(255,215,0,0.3)]" />
                </div>
            </div>

            {/* Text Overlay */}
            <div className="absolute top-1/4 w-full text-center z-20 px-4">
                <h2 ref={textRef} className="text-3xl md:text-5xl font-hand text-gold drop-shadow-lg">
                    Two Souls, One Destiny
                </h2>
            </div>

            {/* Next Button */}
            <button
                onClick={nextScene}
                className="next-btn absolute bottom-10 z-30 opacity-0 transform translate-y-10 bg-transparent border-2 border-gold text-gold px-6 py-2 rounded-full hover:bg-gold hover:text-black transition-all"
            >
                Continue
            </button>

            {/* Falling Petals (CSS Particle effect could be added here later) */}
        </div>
    );
};

export default Jaimala;
