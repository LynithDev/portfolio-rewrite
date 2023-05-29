"use client";

import { MotionProps, motion } from "framer-motion";
import { ComponentProps, PropsWithChildren, RefAttributes } from "react";

type AnimationType = "slide" | "slideLeftFar" | "fade";

type AnimateProps = {
    animations: AnimationType[],
    duration?: number,
    delay?: number,
}

type Variants = {
    [key in AnimationType]: {
        initial: {
            [key: string]: any
        },
        animate: {
            [key: string]: any
        }
    }
}

const variants: Variants = {
    slide: {
        initial: {
            y: -50,
        },
        animate: {
            y: 0,
        }
    },
    slideLeftFar: {
        initial: {
            x: -100,
        },
        animate: {
            x: 0,
        }
    },
    fade: {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
        }
    }
}

const getInitialProps = (name: AnimationType) => variants[name].initial;
const getAnimateProps = (name: AnimationType) => variants[name].animate;

export function Animate(props: PropsWithChildren<AnimateProps & ComponentProps<"div">>) {
    const { animations, ...rest } = props; 

    // Combine all selected animations into one object
    const initial = animations.reduce((prev, curr) => ({ ...prev, ...getInitialProps(curr) }), {});
    const animate = animations.reduce((prev, curr) => ({ ...prev, ...getAnimateProps(curr) }), {});

    const combined = {
        initial,
        animate,
    }

    return (
        <motion.div
            variants={combined}
            initial="initial"
            whileInView="animate"
            transition={{
                duration: props.duration ?? 0.5,
                delay: props.delay ?? 0.1,
                ease: "backInOut"
            }}
            viewport={{
                once: true
            }}
            {...rest as any}
        >
            {props.children}
        </motion.div>
    )
}