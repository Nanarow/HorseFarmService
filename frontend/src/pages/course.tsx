// import { Tabs, TabsContent } from "@radix-ui/react-tabs";
// import Enrollment from "@src/components/course-enrollment/Enrollment";
// import EnrollmentList from "@src/components/course-enrollment/EnrollmentList";
// import { useState } from "react";
import NavBar from "@src/components/navbar/navBar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@shadcn/ui/table";
import { useSchedule } from "@src/hooks";
import { addDays, addHours } from "date-fns";
import tourImage from "@src/assets/tourbg-4.jpg";
import ScheduleItem from "@src/components/course-enrollment/ScheduleItem";

const Course = () => {
  const { schedules } = useSchedule();

  function getSchedule(time: Date) {
    if (!schedules) {
      return;
    }
    for (let i = 0; i < schedules.length; i++) {
      const s = schedules[i];
      const start_time = new Date(s.StartTime);
      if (time.getTime() === start_time.getTime()) {
        return s;
      }
    }
    return;
  }
  return (
    <main className="w-full h-screen">
      <NavBar />
      <section className="w-full h-[calc(100%-58px)] px-6 py-8 flex flex-col items-end relative">
        <img
          src={tourImage}
          className="w-full h-full abs-center object-cover rounded "
          alt="Tour"
        />
        {/* <Card className="w-full h-full mt-4">
        
      </Card> */}
        <Table className=" border rounded ">
          <TableHeader className="bg-white rounded border">
            <TableRow>
              <TableHead className=" text-center">Day/Time</TableHead>
              {Array.from({ length: 8 }).map((_, index) => {
                const day = new Date().setHours(0, 0, 0, 0);
                const start_time = addHours(day, index + 9);
                const end_time = addHours(day, index + 10);
                return (
                  <TableHead
                    key={index}
                    className=" text-center w-[10%] border"
                  >
                    {start_time.toTimeString().slice(0, 5)} -{" "}
                    {end_time.toTimeString().slice(0, 5)}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody className=" bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded">
            {schedules &&
              Array.from({ length: 7 }).map((_, index) => {
                const day = addDays(new Date().setHours(0, 0, 0, 0), index + 1);
                return (
                  <TableRow key={index} className="border text-center rounded">
                    <TableCell>{day.toDateString()}</TableCell>
                    {Array.from({ length: 8 }).map((_, time_index) => {
                      const start_time = addHours(day, time_index + 9);
                      return (
                        <TableCell
                          key={time_index}
                          className="border w-[10%] h-20 rounded"
                        >
                          <ScheduleItem schedule={getSchedule(start_time)} />
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </section>
      {/* <Tabs
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
      </Tabs> */}
    </main>
  );
};

export default Course;
