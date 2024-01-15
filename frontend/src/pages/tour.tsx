import NavBar from "../components/navbar/navBar";
import { Tabs, TabsContent } from "@shadcn/ui/tabs";
import TourList from "../components/tour-registration/TourList";
import { useState } from "react";
import TourRegister from "../components/tour-registration/TourRegister";

const Tour = () => {
  const [tabs, setTabs] = useState("register");

  return (
    <main className="w-full h-screen">
      <NavBar></NavBar>
      <Tabs
        className="  w-full h-with-nav overflow-x-hidden"
        onValueChange={setTabs}
        value={tabs}
      >
        <TabsContent
          value="register"
          className="w-full h-full mt-0 animate-slide-in-left"
        >
          <TourRegister onClick={() => setTabs("list")} />
        </TabsContent>
        <TabsContent
          value="list"
          className="w-full h-full mt-0 animate-slide-in-right "
        >
          <div className="w-full h-full flex">
            <TourList onClick={() => setTabs("register")} />
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default Tour;
