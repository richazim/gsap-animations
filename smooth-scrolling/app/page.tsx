"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Lenis from "lenis";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const sectionRefs = useRef([]); // tableau de refs pour les sections
  const anchorLinkRefs = useRef([]); // tableau de refs pour les liens Links

  useEffect(() => {
    // Création d'une instance de Lenis (pour scroll fluide)
    const lenis = new Lenis({
      duration: 1, // Durée de l'animation du scroll
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // Fonction d’easing personnalisée (accélération/décélération)
      orientation: "vertical", // Scroll vertical
      smoothWheel: true, // Active le scroll fluide à la molette
      touchMultiplier: 1, // Multiplicateur pour la vitesse du scroll tactile
    });

    // Mise à jour de ScrollTrigger à chaque scroll de Lenis (sync GSAP <-> Lenis)
    lenis.on("scroll", ScrollTrigger.update);

    // Intègre Lenis dans la boucle de rendu de GSAP (raf = requestAnimationFrame)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // Lenis attend le temps en ms
    });

    // Ajoute un comportement smooth-scroll personnalisé à tous les liens ancrés
    document.querySelectorAll('a[href^="#"]').forEach((anchorEl) => {
      anchorEl.addEventListener("click", function (e) {
        e.preventDefault(); // Empêche le scroll automatique natif
        lenis.scrollTo(this.getAttribute("href"), {
          offset: 0, // Scroll jusqu’à la cible sans décalage
        });
      });
    });

    // Détection de la section visible pour activer le lien correspondant
    lenis.on("scroll", () => {
      let currentIdValue = ""; // Pour stocker l'ID de la section en cours

      sectionRefs.current.forEach((section) => {
        if (!currentIdValue && section) {
          const sectionTop = section.getBoundingClientRect().top; // Position de la section
          const sectionHeight = section.getBoundingClientRect().height; // Hauteur de la section
          const offsetSection = -sectionHeight; // Point de référence vertical

          // Si la section est partiellement visible, on la considère active
          if (sectionTop > offsetSection / 2) {
            currentIdValue = section.getAttribute("id"); // Récupère l'ID de la section

            // Parcourt tous les liens pour activer celui correspondant
            anchorLinkRefs.current.forEach((anchorLink) => {
              anchorLink.classList.remove("active"); // Supprime la classe "active" partout

              if (
                  anchorLink.getAttribute("href") === `#${currentIdValue}` // Si href correspond à la section visible
              ) {
                anchorLink.classList.add("active"); // Active le lien
              }
            });
          }
        }
      });
    });
  }, []); // Le tableau vide fait que le code ne s’exécute qu’une seule fois (au montage)


  const sections = ["home", "posts", "contact"];

  return (
      <div className="font-poppins font-normal text-[#111]">
        <nav className="fixed z-20 top-5 left-1/2 -translate-x-1/2 inline-block p-5 rounded-xl bg-[rgba(55,55,55,0.1)] backdrop-blur-md">
          <ul className="flex">
            {sections.map((id, i) => (
                <li key={id} className="mr-5 last:mr-0">
                  <Link
                      href={`#${id}`}
                      className="hover-line text-[#111] relative inline-block no-underline"
                      ref={(el) => (anchorLinkRefs.current[i] = el)}
                  >
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </Link>
                </li>
            ))}
          </ul>
        </nav>

        <main id="main" className="relative w-full h-full">
          {sections.map((id, i) => (
              <section
                  key={id}
                  id={id}
                  className="section relative w-full h-screen flex bg-white"
                  ref={(el) => (sectionRefs.current[i] = el)}
              >
                <h2 className="title-h2 m-auto text-[40px] inline-block">
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </h2>
              </section>
          ))}
        </main>
      </div>
  );
}
