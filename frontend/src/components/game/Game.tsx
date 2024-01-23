import { useEffect, useRef, useState } from "react";
import "@src/components/game/game.css";

function Game({ className }: { className?: string }) {
  const dinoRef = useRef<HTMLDivElement>(null);
  const cactusRef = useRef<HTMLDivElement>(null);
  const [score, setScore] = useState(0);

  const jump = () => {
    if (dinoRef.current && !dinoRef.current.classList.contains("jump")) {
      dinoRef.current.classList.add("jump");
      setTimeout(function () {
        dinoRef.current?.classList.remove("jump");
      }, 300);
    }
  };

  useEffect(() => {
    const isAlive = setInterval(function () {
      // get current dino Y position
      const dinoTop = parseInt(
        getComputedStyle(dinoRef.current!).getPropertyValue("top")
      );

      // get current cactus X position
      let cactusLeft = parseInt(
        getComputedStyle(cactusRef.current!).getPropertyValue("left")
      );

      // detect collision
      if (cactusLeft < 40 && cactusLeft > 0 && dinoTop >= 140) {
        // collision
        // alert("Game Over! Your Score : " + score);
        setScore(0);
      } else {
        setScore(score + 1);
      }
    }, 10);

    return () => clearInterval(isAlive);
  });

  useEffect(() => {
    document.addEventListener("keydown", jump);
    return () => document.removeEventListener("keydown", jump);
  }, []);

  return (
    <div className={`game ${className}`}>
      Score : {score}
      <div
        id="dino"
        ref={dinoRef}
        // className=" w-12 h-12 bg-[url(../../assets/bg11.png)] bg-[length:48px_48px] relative top-[144px]"
      />
      <div id="cactus" ref={cactusRef} />
    </div>
  );
}

export default Game;
