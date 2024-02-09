import NavBar from "@src/components/navbar/navBar";
import horseVideo from "@src/assets/horse.mp4";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useToast } from "@shadcn/ui/use-toast";
import Game from "@src/components/game/Game";
import BG from "@src/assets/bg14.jpg";
import { Button } from "@shadcn/ui";

const Home = () => {
  const { state } = useLocation();
  const { toast } = useToast();
  const [id, setId] = useState(0);
  const [showGame, setShowGame] = useState(false);
  useEffect(() => {
    if (!state) {
      return;
    }
    const { status } = state;
    if (status === 403) {
      toast({
        title: "Access Denied",
        description: "You do not have permission to access this page",
        variant: "destructive",
        duration: 5000,
      });
    }
  }, []);

  return (
    <main className="w-full h-screen">
      <NavBar />
      <section className="w-full h-with-nav p-2 relative">
        {!showGame && (
          <>
            <p className=" text-6xl text-center sm:text-8xl abs-center font-black mix-blend-difference text-white z-30 tracking-widest">
              KhunMa Farm
            </p>
            <video
              className=" w-full h-full object-cover rounded-md z-10 "
              autoPlay
              loop
              muted
              src={horseVideo}
            />
            <Button
              className=" absolute bottom-4 right-4"
              onClick={() => setShowGame(true)}
            >
              {"🤚Don't Click❗"}
            </Button>
          </>
        )}
        {showGame && (
          <>
            <img src={BG} className=" w-full h-full object-cover" />
            <section className="w-full h-full px-4 lg:px-12 abs-center flex justify-center items-center">
              <Game
                key={id}
                className="w-full h-4/5  lg:h-1/2 bg-white/40 z-40 border backdrop-blur rounded"
                onClick={() => {
                  setId((prev) => prev + 1);
                }}
              />
            </section>
            <Button
              className=" absolute bottom-4 right-4"
              variant="secondary"
              onClick={() => setShowGame(false)}
            >
              {"back"}
            </Button>
          </>
        )}
      </section>
    </main>
  );
};

export default Home;
