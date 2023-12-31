import { Button } from "@shadcn/ui";
import { Card } from "@shadcn/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@shadcn/ui/table";
import { useCourse, useSchedule } from "@src/hooks";
import { addDays, addHours } from "date-fns";
import { ChevronsRightIcon } from "lucide-react";
import EnrollmentAlert from "./EnrollmentAlert";

const Enrollment = ({ onClickChangeTab }: { onClickChangeTab: () => void }) => {
  const { schedules } = useSchedule();
  const { courses } = useCourse();
  function getCourse(time: Date) {
    if (!schedules) {
      return;
    }
    for (let i = 0; i < schedules.length; i++) {
      const s = schedules[i];
      const start_time = new Date(s.StartTime);
      if (time.getTime() === start_time.getTime()) {
        return courses.find((c) => c.ID === s.CourseID);
      }
    }
    return;
  }

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
    <section className="w-full h-full px-8 py-10 flex flex-col items-end">
      <Button size={"icon"} variant={"ghost"} onClick={onClickChangeTab}>
        <ChevronsRightIcon />
      </Button>
      <Card className="w-full h-full mt-4">
        <Table className=" border">
          <TableHeader>
            <TableRow>
              <TableHead className=" text-center">Day/Time</TableHead>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => {
                const start_time = addHours(
                  new Date().setHours(0, 0, 0, 0),
                  index + 9
                );
                return (
                  <TableHead key={index} className="border text-center w-[10%]">
                    {start_time.toTimeString().slice(0, 5)}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedules &&
              [1, 2, 3, 4, 5, 6, 7].map((_, index) => {
                const day = addDays(new Date().setHours(0, 0, 0, 0), index + 1);
                return (
                  <TableRow key={index} className="border text-center">
                    <TableCell>{day.toDateString()}</TableCell>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((_, time_index) => {
                      const start_time = addHours(day, time_index + 9);
                      return (
                        <TableCell
                          key={time_index}
                          className="border w-[10%] h-20 "
                        >
                          {getCourse(start_time) ? (
                            <div className="flex flex-col gap-2">
                              {getCourse(start_time)?.Name}
                              <EnrollmentAlert
                                ScheduleID={getSchedule(start_time)?.ID!}
                              />
                            </div>
                          ) : null}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Card>
    </section>
  );
};

export default Enrollment;
