import { useEffect, useRef, useState } from "react";
import "./game.css";
import { Button } from "@shadcn/ui";
import { RotateCcwIcon } from "lucide-react";

function Game({
  className,
  onClick,
}: {
  className?: string;
  onClick: () => void;
}) {
  const horseRef = useRef<HTMLDivElement>(null);
  const hayRef = useRef<HTMLDivElement>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem("score") || "0")
  );
  const [collided, setCollided] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const jump = (e: KeyboardEvent) => {
    if (e.code !== "Space") {
      return;
    }
    // if (e.code === "ArrowDown") {
    //   if (horseRef.current) {
    //     horseRef.current.style.height = "32px";
    //     return;
    //   }
    // }
    if (horseRef.current?.style.animationPlayState === "paused") {
      onClick();
    }
    if (horseRef.current && !horseRef.current.classList.contains("jump")) {
      horseRef.current.classList.add("jump");
      setTimeout(function () {
        if (horseRef.current?.style.animationPlayState === "paused") {
          return;
        }
        horseRef.current?.classList.remove("jump");
      }, 600);
    }
  };

  useEffect(() => {
    const isAlive = setInterval(async function () {
      if (gameOver) {
        return;
      }
      const horseBottom = parseInt(
        getComputedStyle(horseRef.current!).getPropertyValue("bottom")
      );

      let hayLeft = parseInt(
        getComputedStyle(hayRef.current!).getPropertyValue("left")
      );

      // detect collision
      if (hayLeft < 192 && hayLeft > 128) {
        if (!collided) {
          setCollided(true);
        }
        if (horseBottom < 50) {
          if (!gameOver) {
            setGameOver(true);
            if (horseRef.current) {
              horseRef.current.style.animationPlayState = "paused";
            }
            if (hayRef.current) {
              hayRef.current.style.animationPlayState = "paused";
            }
            checkScore(score);
          }
        }
      } else {
        if (collided) {
          setScore(score + 1);
          setCollided(false);
        }
      }
    }, 10);

    return () => clearInterval(isAlive);
  });

  useEffect(() => {
    if (hayRef.current && horseRef.current) {
      if (score > 40) {
        hayRef.current.style.animationDuration = "1s";
      } else if (score > 10) {
        hayRef.current.style.animationDuration = "1.25s";
      } else if (score > 5) {
        hayRef.current.style.animationDuration = "1.5s";
      } else {
        hayRef.current.style.animationDuration = "2s";
      }
    }
  }, [score]);

  function checkScore(new_score: number) {
    const sc = localStorage.getItem("score");
    if (new_score > parseInt(sc || "0")) {
      setHighScore(new_score);
      localStorage.setItem("score", new_score.toString());
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", jump);
    return () => document.removeEventListener("keydown", jump);
  }, []);

  return (
    <div className={`game ${className} relative`}>
      <div className="flex justify-between">
        <div className="flex justify-start items-end p-4">
          <p className="text-3xl font-bold text-slate-900">Score:</p>
          <span className="ml-4 text-4xl text-slate-900 font-medium">
            {score}
          </span>
        </div>
        <div className="flex justify-end items-end p-4">
          <p className="text-3xl font-bold text-slate-900">High Score:</p>
          <span className="ml-4 text-4xl text-slate-900 font-medium">
            {highScore}
          </span>
        </div>
      </div>
      {gameOver && (
        <div className="flex flex-col justify-center abs-center">
          <p className="text-3xl font-bold text-slate-900">Game Over!</p>
          <Button onClick={onClick}>
            <RotateCcwIcon className="mr-2" />
            Play Again
          </Button>
        </div>
      )}
      <div
        id="horse"
        ref={horseRef}
        className="absolute w-24 h-16 bottom-0 left-28 bg-cover "
      />
      <div
        id="hay"
        ref={hayRef}
        className={`absolute w-8 h-12 bottom-0 bg-cover`}
      />
    </div>
  );
}

export default Game;
