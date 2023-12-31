import { Tabs, TabsContent } from "@radix-ui/react-tabs";
import Enrollment from "@src/components/course-enrollment/Enrollment";
import EnrollmentList from "@src/components/course-enrollment/EnrollmentList";
import NavBar from "@src/components/navbar/navBar";
import { useState } from "react";

const Course = () => {
  const [tab, setTab] = useState("enroll");
  return (
    <main className="w-full h-screen">
      <NavBar />
      <Tabs
        className="w-full h-[calc(100%-58px)] overflow-x-hidden"
        onValueChange={setTab}
        value={tab}
      >
        <TabsContent value="enroll" className="w-full h-full slide-in-right ">
          <Enrollment onClickChangeTab={() => setTab("enrollments")} />
        </TabsContent>
        <TabsContent
          value="enrollments"
          className="w-full h-full animate-slide-in-left"
        >
          <EnrollmentList onClickChangeTab={() => setTab("enroll")} />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default Course;
