import { Tabs, TabsContent } from "@radix-ui/react-tabs";
import NavBar from "@src/components/navbar/navBar";
import { useState } from "react";

const Course = () => {
  const [tab, setTab] = useState("enroll");
  return (
    <main className="w-full h-screen">
      <NavBar />
      <Tabs
        className="w-full h-[calc(100%-58px)]"
        onValueChange={setTab}
        value={tab}
      >
        <TabsContent value="enroll" className="w-full h-full slide-in-right ">
          {/*// TODO
           */}
        </TabsContent>
        <TabsContent
          value="enrollments"
          className="w-full h-full animate-slide-in-left"
        >
          {/*// TODO
           */}
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default Course;
