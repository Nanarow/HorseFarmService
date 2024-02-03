import { http } from "@src/services/httpRequest";
import { useState, useEffect } from "react";
import { useAuth } from "@src/providers/authProvider";
import { Stable } from "@src/interfaces";
import { Tooltip } from "@shadcn/simplify/tooltip";
import { Button } from "@shadcn/ui"; 
import { LogOut } from "lucide-react";
import Stableimage from "./../assets/bg8.jpg";
import StableEdit from "@src/components/stable/StableEdit";

const StablePage = () => {
  const { logout } = useAuth();
  const [stables, setStables] = useState<Stable[]>([]);

  async function fetchStables() {
    const res = await http.Get<Stable[]>("/stables");
    if (res.ok) {
      setStables(res.data);
    }
  }

  useEffect(() => {
    fetchStables();
  }, [])

  return (
    <section className="w-full h-full absolute">
      <img
        src={Stableimage}
        className="w-full h-full abs-center object-cover rounded"
        alt="Stable"
      />
      <div className="w-full h-full border backdrop-blur-none supports-[backdrop-filter]:bg-background/60 px-4 ">
        <h1 className="text-2xl font-bold text-left uppercase ml-5 mt-10">Stable Management</h1>
        <div className=" h-44 grid grid-rows-0 grid-cols-4 ml-20 mr-20">
          {stables.length > 0 &&
            stables.map((stable, index) => (
              <StableEdit stable={stable} onSave={() => null} key={index}/>
              
            ))}
        </div>
      </div>
      <div className="absolute right-10 bottom-10 w-8 h-8 cursor-pointer">
        <Tooltip 
          content={"Log Out"} 
          className="bg-white text-primary">
          <Button
            variant={"secondary"}
            onClick={logout}
            size={"icon"}
            className=" bg-white-500"><LogOut />
          </Button>
        </Tooltip>
      </div>
    </section>
  );
};

export default StablePage;