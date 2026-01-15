import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Opening = ({ nextScene }) => {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const subTextRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Initial state
            gsap.set(textRef.current, { opacity: 0, scale: 0.8 });
            gsap.set(subTextRef.current, { opacity: 0, y: 20 });
            gsap.set(buttonRef.current, { opacity: 0, y: 20 });

            // Animation sequence
            tl.to(containerRef.current, {
                opacity: 1,
                duration: 2,
                ease: "power2.inOut"
            })
                .to(textRef.current, {
                    opacity: 1,
                    scale: 1,
                    duration: 1.5,
                    ease: "power3.out"
                }, "-=1")
                .to(subTextRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out"
                }, "-=0.5")
                .to(buttonRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "back.out(1.7)"
                }, "+=0.5");

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center relative opacity-0">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/60 z-10"></div>
                {/* Using the generated wedding background */}
                <img src="/assets/bg-wedding.png" className="w-full h-full object-cover" alt="Wedding Background" />
            </div>

            {/* Content */}
            <div className="z-20 text-center px-4">
                <h1 ref={textRef} className="text-5xl md:text-7xl font-hand text-gold mb-6 drop-shadow-lg">
                    Tripuresh & Shivangi
                </h1>
                <p ref={subTextRef} className="text-xl md:text-2xl text-cream font-light tracking-wider mb-12">
                    A story of love, regret, and forever
                </p>

                <button
                    ref={buttonRef}
                    onClick={nextScene}
                    className="bg-gold text-maroon px-8 py-3 rounded-full font-serif text-lg font-bold hover:bg-cream hover:scale-105 transition-all transform shadow-[0_0_15px_rgba(255,215,0,0.5)]"
                >
                    Begin Journey
                </button>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-maroon/30 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-maroon/30 to-transparent z-10 pointer-events-none"></div>
        </div>
    );
};

export default Opening;
