"use client";

import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

const Home = () => {
  const container = useRef(null);

  useLayoutEffect(() => { // Hook pour que l'animation commence seulement apres le rendu, mais avant le paint.
    
    const context = gsap.context(() => {
      const timeline = gsap.timeline();
      
      timeline
        .from("#slider-screen", { // slider de -100% à la position normal selon l'axe x pour une duree de 1.3s. 
          xPercent: "-100",
          duration: 1.3,
          delay: 0.3
        })
        .from(["#title-1", "#title-2", "#title-3"], {// Anime chaque titre de sa position eloigné de 30px de la position normal à la position normale. Ces animations seront echelonné de 0.5s.
          opacity: 0,
          y: "+=30",
          stagger: 0.5
        })
        .to(["#title-1", "#title-2", "#title-3"], { // Animer ces titres en les faisant sortir
          opacity: 0,
          y: "-=30",
          delay: 0.3,
          stagger: 0.5
        })
        .to("#slider-screen", { // slider de la position normale à la position -100% selon x.
          xPercent: "-100",
          duration: 1.3
        })
        .from("#welcome-title", {// Afficher le titre de l'ecran de bienvenue
          opacity: 0,
          duration: 0.5
        })
    }, container)

    return () => {
      context.revert();
    }
  }, [])
  
  return (
    <div className="relative" ref={container}>

      {/* Ecran de glissement */}
      <div id="slider-screen" className="absolute top-0 left-0 h-screen w-full z-10 flex flex-col gap-10 tracking-tight p-10 bg-gray-500">
        <h3 id="title-1" className="text-9xl">Software Enginer</h3>

        <h3 id="title-2" className="text-9xl">Designer</h3>

        <h3 id="title-3" className="text-9xl">Freelancer</h3>
      </div>

      {/* Écran principal de bienvenue */}
      <div className="h-screen flex justify-center place-items-center bg-amber-700">
        <h1 id="welcome-title" className="text-9xl font-bold text-gray-100">Welcome</h1>
      </div>

    </div>
  )
}

export default Home