'use client';

import { useEffect, useRef, useState } from 'react';

const FRAME_COUNT = 120; // 283 - 164 + 1
const START_FRAME = 164;

export default function ScrollSequence() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Preload Images
    useEffect(() => {
        let loadedCount = 0;
        const imgs: HTMLImageElement[] = [];

        // Parallel loading
        for (let i = 0; i < FRAME_COUNT; i++) {
            const img = new Image();
            // Ensure specific frame ID format matches file names provided
            const frameId = START_FRAME + i;
            const basePath = process.env.NODE_ENV === 'production' ? '/Clever-Cup' : '';
            img.src = `${basePath}/images/sequence/ezgif-frame-${frameId}.jpg`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === FRAME_COUNT) {
                    setIsLoaded(true);
                }
            };
            // Handle error just in case
            img.onerror = () => {
                console.error(`Failed to load frame ${frameId}`);
                loadedCount++; // Count explicitly to allow partial play? Better to log.
                if (loadedCount === FRAME_COUNT) setIsLoaded(true);
            }
            imgs.push(img);
        }
        setImages(imgs);
    }, []);

    // Canvas Drawing & Scroll Logic
    useEffect(() => {
        if (!isLoaded || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Resize canvas to window size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            calculateFrame();
        };

        const renderFrame = (index: number) => {
            const img = images[index];
            if (!img) return;

            // Draw Image "Cover" Logic
            const hRatio = canvas.width / img.width;
            const vRatio = canvas.height / img.height;
            const ratio = Math.max(hRatio, vRatio);
            const centerShift_x = (canvas.width - img.width * ratio) / 2;
            const centerShift_y = (canvas.height - img.height * ratio) / 2;

            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous
            ctx.drawImage(
                img,
                0,
                0,
                img.width,
                img.height,
                centerShift_x,
                centerShift_y,
                img.width * ratio,
                img.height * ratio
            );
        };

        const calculateFrame = () => {
            const scrollTop = window.scrollY;
            // FIXED Logic: The animation plays over exactly 4 viewport heights (the 4 sections)
            // We want it to finish exactly when section 4 is done.
            // Section 1 starts at 0. Section 4 ends at 4 * innerHeight.
            // But usually "sticky" scroll logic implies the element is stuck for N screens.
            // Here, the page builds up with content sections of 100vh each.
            // So at scrollTop = 3 * innerHeight, we are at the START of the 4th section.
            // At scrollTop = 4 * innerHeight, we are at the END of the 4th section (and looking at footer).
            // So range is 0 to (4 * innerHeight).

            // However, we want the animation to hold the last frame if we scroll past.
            const animationScrollDistance = window.innerHeight * 4;
            const scrollFraction = Math.min(1, Math.max(0, scrollTop / animationScrollDistance));

            const frameIndex = Math.min(
                FRAME_COUNT - 1,
                Math.floor(scrollFraction * (FRAME_COUNT - 1))
            );

            requestAnimationFrame(() => renderFrame(frameIndex));
        }

        const handleScroll = () => {
            calculateFrame();
        };

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('scroll', handleScroll);

        // Initial Setup
        resizeCanvas();
        handleScroll();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isLoaded, images]);

    return (
        <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[#e8e7e2]">
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center text-[#2d2420] animate-pulse">
                    <span className="font-serif text-xl tracking-widest">LOADING EXPERIENCE...</span>
                </div>
            )}
            <canvas ref={canvasRef} className="block w-full h-full" />
        </div>
    );
}
