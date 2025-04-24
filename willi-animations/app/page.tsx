"use client";

import Link from "next/link";

const Home = () => {
  
  return (
    <div className="h-screen flex justify-center place-items-center">
      <div className="flex flex-col gap-4 text-[2rem] text-red-400">
        <Link href="/anim1">Anim 1</Link>
        <Link href="/anim2">Anim 2</Link>
        <Link href="/anim3">Anim 3</Link>
      </div>
    </div>
  )
}

export default Home