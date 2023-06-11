"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import { PropsWithChildren, useEffect, useRef, useState } from "react";

export function AnimatedImage({ src, alt }: { src: string, alt: string }) {
    const { scrollYProgress } = useScroll();
    const [scrollY, setScrollY] = useState(scrollYProgress.get());
    const [multiplier, setMultiplier] = useState(0);

    const imageRef = useRef<HTMLImageElement>(null);

    useMotionValueEvent(scrollYProgress, "change", (progress) => {
        setScrollY(progress);
    });

    useEffect(() => {
        setMultiplier(window.innerWidth > window.innerHeight 
        ? window.innerHeight / 500 // For landscape
        : window.innerWidth / 40); // For portrait
    }, []);

    return (
        <motion.div
            style={{
                opacity: 1 - scrollY * multiplier,
            }}
        >
            <Image ref={imageRef} src={src} alt={alt} width={900} height={500} className="md:max-w-content md:rounded-md aspect-video w-full" />
        </motion.div>
    )
}