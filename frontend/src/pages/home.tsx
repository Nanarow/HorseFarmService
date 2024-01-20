import NavBar from "@src/components/navbar/navBar";
import horseVideo from "@src/assets/horse.mp4";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useToast } from "@shadcn/ui/use-toast";

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
      <section className="w-full h-with-nav p-2">
        <video
          className=" w-full h-full object-cover rounded-md"
          autoPlay
          loop
          muted
          src={horseVideo}
        />
      </section>
    </main>
  );
};

export default Home;
