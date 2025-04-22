"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

const Home = () => {
  const container = useRef(null);

  useEffect(() => {
    const context = gsap.context(() => {
      const timeline = gsap.timeline();
      timeline
        .from("#slider", { // slider de -100% a la position normal selon l'axe x pour une duree de 1.3s. 
          xPercent: "-100",
          duration: 1.3,
          delay: 0.3
        })
        .from(["#title-1", "#title-2", "#title-3"], {
          opacity: 0,
          stagger: 0.5,
          y: "+=30"
        })
        .to("#slider", { // slider de la position normale à la position -100% selon x.
          xPercent: "-100",
          duration: 1.3
        })
    }, container)

    return () => {
      context.revert();
    }
  }, [])
  
  return (
    <div className="relative" ref={container}>
      <div id="slider" className="absolute top-0 left-0 h-screen w-full z-10 flex flex-col gap-10 tracking-tight p-10 bg-gray-500">

        <h3 id="title-1" className="text-9xl">Software Enginer</h3>

        <h3 id="title-2" className="text-9xl">Designer</h3>

        <h3 id="title-3" className="text-9xl">Freelancer</h3>

        <div className="h-screen flex justify-center place-items-center bg-amber-700">
          <h1 id="welcome-title" className="text-9xl font-bold text-gray-100">Welcome</h1>
        </div>

      </div>
    </div>
  )
}

export default Home