import NavBar from "../components/navbar/navBar";
import { Tabs, TabsContent } from "@shadcn/ui/tabs";
import TourList from "../components/tour/TourList";
import { useState } from "react";
import TourRegister from "../components/tour/TourRegister";

const Tour = () => {
  const [tabs, setTabs] = useState("register");

  return (
    <main className="w-full h-screen">
      <NavBar></NavBar>
      <Tabs
        className="  w-full h-[calc(100%-58px)]"
        onValueChange={setTabs}
        value={tabs}
      >
        <TabsContent
          value="register"
          className="w-full h-full mt-0 slide-in-right "
        >
          <TourRegister onClick={() => setTabs("list")} />
        </TabsContent>
        <TabsContent value="list" className="w-full h-full mt-0 slide-in-left">
          <div className="w-full h-full flex">
            <TourList onClick={() => setTabs("register")} />
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default Tour;
