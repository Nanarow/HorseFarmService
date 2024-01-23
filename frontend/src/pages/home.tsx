import NavBar from "@src/components/navbar/navBar";
import horseVideo from "@src/assets/horse.mp4";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useToast } from "@shadcn/ui/use-toast";
// import Game from "@src/components/game/Game";

const Home = () => {
  const { state } = useLocation();
  const { toast } = useToast();
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
        <p className=" text-8xl abs-center font-black mix-blend-difference text-white z-30 tracking-widest">
          KhunMa Farm
        </p>
        <video
          className=" w-full h-full object-cover rounded-md z-10"
          autoPlay
          loop
          muted
          src={horseVideo}
        />
        {/* <Game className=" abs-center w-3/4 h-1/2 bg-white/20 z-40" /> */}
      </section>
    </main>
  );
};

export default Home;
