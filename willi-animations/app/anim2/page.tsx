"use client";
import {motion, useAnimation, useInView} from "framer-motion";
import {useRef, useEffect} from "react";

const title = "SAIBOU AZIM";
const wordStyle = "text-[50px] font-extrabold ";

const TitleAnimationComponent = () => {
    const fullTextRef = useRef(null);
    const animationController = useAnimation();
    const isInView = useInView(fullTextRef);

    useEffect(() => {
        if(isInView){
            animationController.start("animate")
        }
    }, [isInView, animationController])

    const wordVariants = {
        initial: {
            opacity: 0,
            y: 150
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 6,
                ease: [0.2, 0.65, 0.3, 0.9],
                duration: 1
            }
        }
    }

    return (
        <h1>  
            <motion.span 
            ref={fullTextRef}
            className="flex flex-col max-w-[500px] text-center border"
            >

                {
                    title.split(" ").map((word, index) => (
                        <motion.span
                            key={index}
                            className="flex flex-col items-center justify-center"
                            initial="initial" // Placer ici pour qu'il soit passé aux animations enfants
                            transition={{
                                staggerChildren: index * 0.25
                            }}
                            animate={animationController}
                        >
                            <motion.span 
                                className={wordStyle}
                                variants={wordVariants}
                            >
                                {word}
                            </motion.span>
                        </motion.span>
                    ))
                }
                
            </motion.span>
        </h1>
    )
}

export default TitleAnimationComponent;