import NavBar from "@src/components/navbar/navBar";
import horseVideo from "@src/assets/horse.mp4";

const Home = () => {
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
