"use client"
import { motion } from "framer-motion";

function WritingParagraphWordsAnimation() {
  const text = "Framer Motion is a really cool tool".split(" ");

  return (
    <div className="text-center text-[30px] font-bold border">
      
      {text.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.25,
            delay: i / 10,
          }}
        >

          {word}{" "}

        </motion.span>
      ))}

    </div>
  );
}

export default WritingParagraphWordsAnimation;
