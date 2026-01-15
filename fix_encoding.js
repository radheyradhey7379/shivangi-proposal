
const fs = require('fs');
const path = require('path');

const files = {
    'src/components/scenes/Jaimala.jsx': `import React, { useEffect, useRef } from 'react';
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
                    <img src="/assets/tripuresh.png" alt="Tripuresh" className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(255,215,0,0.3)]" />
                </div>

                {/* Bride */}
                <div ref={brideRef} className="w-1/3 md:w-1/4 aspect-[3/4] relative">
                    <img src="/assets/shivangi.png" alt="Shivangi" className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(255,215,0,0.3)]" />
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

export default Jaimala;`,

    'src/components/scenes/Apology.jsx': `import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Apology = ({ nextScene }) => {
    const containerRef = useRef(null);
    const textLinesRef = useRef([]);

    const lines = [
        "Shivangi,",
        "I know I made mistakes...",
        "But my heart has always chosen only you.",
        "This is not just an apology,",
        "It’s my promise."
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
                    \`+=\${index === 0 ? 0.5 : 1}\` // Delay between lines
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
                        className={\`font-hand text-gold drop-shadow-md \${idx === 0 ? 'text-4xl md:text-5xl font-bold' : 'text-2xl md:text-3xl'}\`}
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

export default Apology;`,

    'src/components/scenes/Havan.jsx': `import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Havan = ({ nextScene }) => {
    const containerRef = useRef(null);
    const fireRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(textRef.current, { opacity: 0, y: 30 });
            gsap.set(".fire-glow", { opacity: 0.5, scale: 0.8 });

            const tl = gsap.timeline({
                onComplete: () => {
                     // Auto advance or show button
                     gsap.to(".continue-btn", { opacity: 1, duration: 1 });
                }
            });

            // Fire animation (breathing glow)
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
        <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center relative bg-black">
             {/* Background */}
             <div className="absolute inset-0 z-0">
                 <img src="/assets/bg-havan.png" className="w-full h-full object-cover opacity-80" alt="Havan" />
                 {/* Fire Glow Overlay */}
                 <div className="fire-glow absolute inset-0 bg-gradient-to-t from-orange-600/40 via-transparent to-transparent mix-blend-screen"></div>
            </div>

            <div className="z-10 text-center px-6 mt-64 md:mt-80 bg-black/40 p-6 rounded-xl backdrop-blur-sm border border-gold/30">
                <p ref={textRef} className="text-2xl md:text-3xl font-serif text-cream italic drop-shadow-lg leading-relaxed">
                    “With fire as witness, I ask for forgiveness <br/>and a new beginning.”
                </p>
            </div>

            <button 
                onClick={nextScene}
                className="continue-btn absolute bottom-8 z-20 opacity-0 bg-gold/20 hover:bg-gold/40 text-gold border border-gold px-6 py-2 rounded-full transition-all"
            >
                Take the Vows
            </button>
        </div>
    );
};

export default Havan;`,

    'src/components/scenes/Pheras.jsx': `import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Pheras = ({ nextScene }) => {
    const containerRef = useRef(null);
    const vows = [
        "Trust", "Respect", "Patience", "Understanding", "Care", "Support", "Forever"
    ];
    const [currentVowIndex, setCurrentVowIndex] = useState(0);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate vows sequentially
            const tl = gsap.timeline({
                onComplete: () => {
                    gsap.to(".finish-btn", { opacity: 1, y: 0, duration: 1 });
                }
            });

            // We mimic 7 pheras by showing texts one by one
            vows.forEach((vow, i) => {
                tl.to(\`.vow-\${i}\`, {
                    opacity: 1,
                    scale: 1,
                    duration: 1.5,
                    ease: "power2.out",
                    onStart: () => setCurrentVowIndex(i)
                })
                .to(\`.vow-\${i}\`, {
                    color: "#FFD700", // Gold highlight
                    textShadow: "0 0 20px #FFD700",
                    duration: 0.5
                }, "-=0.5");
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center relative bg-maroon overflow-hidden">
             {/* Circular decorative element */}
             <div className="absolute w-[600px] h-[600px] rounded-full border-2 border-gold/20 opacity-20 animate-spin-slow"></div>
             
             <div className="z-10 flex flex-col gap-6 text-center">
                 <h2 className="text-xl text-gold/60 uppercase tracking-widest mb-8">The Seven Vows</h2>
                 
                 <div className="flex flex-col gap-4">
                    {vows.map((vow, idx) => (
                        <div 
                            key={idx} 
                            className={\`vow-\${idx} text-4xl md:text-5xl font-hand opacity-0 scale-90 transition-all\`}
                        >
                            {vow}
                        </div>
                    ))}
                 </div>
             </div>

             <button 
                onClick={nextScene}
                className="finish-btn absolute bottom-10 opacity-0 transform translate-y-10 bg-gold text-maroon px-8 py-3 rounded-full font-bold hover:scale-110 transition-all shadow-lg"
            >
                My Final Question
            </button>
        </div>
    );
};

export default Pheras;`,

    'src/components/scenes/FinalProposal.jsx': `import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Heart, MessageCircle } from 'lucide-react';

const FinalProposal = () => {
    const containerRef = useRef(null);
    const [accepted, setAccepted] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.fromTo(".char-img", 
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 2, ease: "power2.out" }
            )
            .fromTo(".proposal-text",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1.5 },
                "-=1"
            )
            .fromTo(".action-btn",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.2 },
                "-=0.5"
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleAccept = () => {
        setAccepted(true);
        gsap.to(".proposal-content", { opacity: 0, duration: 0.5 });
        gsap.to(".celebration", { opacity: 1, display: "flex", duration: 1 });
    };

    return (
        <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center relative bg-cream/10">
             <div className="absolute inset-0 z-0 bg-maroon">
                <div className="absolute inset-0 bg-[url('/assets/bg-wedding.png')] bg-cover opacity-20"></div>
             </div>

             {/* Celebration Overlay */}
             <div className="celebration hidden absolute inset-0 z-50 flex-col items-center justify-center bg-black/80 opacity-0">
                 <h1 className="text-6xl md:text-8xl text-gold font-hand animate-bounce mb-4">Forever & Always! ❤️</h1>
                 <p className="text-white text-xl">Thank you for forgiving me, Shivangi.</p>
             </div>

             <div className="proposal-content z-10 w-full max-w-4xl flex flex-col items-center gap-8 px-4">
                 <div className="flex justify-center items-end gap-4 md:gap-12 mb-4">
                     <img src="/assets/tripuresh.png" className="char-img w-32 md:w-56" alt="Tripuresh" />
                     <img src="/assets/shivangi.png" className="char-img w-32 md:w-56" alt="Shivangi" />
                 </div>

                 <div className="proposal-text text-center bg-black/40 p-8 rounded-2xl backdrop-blur-md border border-gold/30">
                     <p className="text-3xl md:text-5xl font-hand text-gold mb-6">
                        “Shivangi, will you forgive me and walk this journey with me?”
                     </p>
                     <p className="text-right text-cream font-serif text-lg">— Tripuresh ❤️</p>
                 </div>

                 <div className="flex flex-col md:flex-row gap-6 mt-4">
                     <button 
                        onClick={handleAccept}
                        className="action-btn flex items-center gap-3 bg-red-600 text-white px-8 py-4 rounded-full font-bold text-xl hover:bg-red-700 hover:scale-110 transition-all shadow-lg ring-4 ring-red-600/30"
                     >
                         <Heart fill="white" /> YES!
                     </button>
                     
                     <button 
                        className="action-btn flex items-center gap-3 bg-transparent border-2 border-white/50 text-white px-8 py-4 rounded-full font-bold text-xl hover:bg-white/10 hover:border-white transition-all"
                        onClick={() => alert("Let's talk! Call me.")}
                     >
                         <MessageCircle /> Let's Talk
                     </button>
                 </div>
             </div>
        </div>
    );
};

export default FinalProposal;`
};

for (const [filePath, content] of Object.entries(files)) {
    const fullPath = path.resolve(filePath);
    console.log('Writing ' + fullPath);
    fs.writeFileSync(fullPath, content.trim(), { encoding: 'utf8' });
}
console.log('All files rewritten with UTF-8');
