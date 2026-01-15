import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Apology = ({ nextScene }) => {
    const containerRef = useRef(null);
    const textLinesRef = useRef([]);

    const lines = [
        "Shivangi,",
        "I know I made mistakes...",
        "But my heart has always chosen only you.",
        "This is not just an apology,",
        "It's my promise."
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    gsap.to(".next-arrow", { opacity: 1, duration: 1, repeat: -1, yoyo: true });
                }
            });

            // Animate each line
            textLinesRef.current.forEach((line, index) => {
                tl.fromTo(line,
                    { opacity: 0, y: 20, blur: 10 },
                    { opacity: 1, y: 0, blur: 0, duration: 1.5, ease: "power2.out" },
                    `+=${index === 0 ? 0.5 : 1}` // Delay between lines
                );
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const addToRefs = (el) => {
        if (el && !textLinesRef.current.includes(el)) {
            textLinesRef.current.push(el);
        }
    };

    return (
        <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center relative bg-maroon/95 text-center px-6">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')]"></div>

            <div className="z-10 max-w-2xl flex flex-col gap-6">
                {lines.map((line, idx) => (
                    <p
                        key={idx}
                        ref={addToRefs}
                        className={`font-hand text-gold drop-shadow-md ${idx === 0 ? 'text-4xl md:text-5xl font-bold' : 'text-2xl md:text-3xl'}`}
                    >
                        {line}
                    </p>
                ))}
            </div>

            <div
                onClick={nextScene}
                className="next-arrow absolute bottom-10 cursor-pointer opacity-0 z-20"
            >
                <div className="text-gold text-lg border-b border-gold pb-1">Accept & Continue</div>
            </div>
        </div>
    );
};

export default Apology;
