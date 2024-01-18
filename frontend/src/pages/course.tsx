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
import tourImage from "@src/assets/bg12.jpg";
import ScheduleItem from "@src/components/course-enrollment/ScheduleItem";

const Course = () => {
  const { schedules } = useSchedule();

  function getSchedule(time: Date) {
    if (!schedules) {
      return;
    }
    return schedules.find(
      (s) => new Date(s.StartTime).getTime() === time.getTime()
    );
  }
  return (
    <main className="w-full h-screen">
      <NavBar />
      <section className="w-full h-with-nav px-6 py-8 flex flex-col items-end relative">
        <img
          src={tourImage}
          className="w-full h-full abs-center object-cover rounded "
          alt="Tour"
        />
        <Table className=" border rounded-md overflow-hidden">
          <TableHeader className=" rounded border bg-white">
            <TableRow>
              <TableHead className=" text-center text-primary">
                Day/Time
              </TableHead>
              {Array.from({ length: 8 }).map((_, index) => {
                const day = new Date().setHours(0, 0, 0, 0);
                const start_time = addHours(day, index + 9);
                const end_time = addHours(day, index + 10);
                return (
                  <TableHead
                    key={index}
                    className=" text-center w-[10%] border text-primary"
                  >
                    {start_time.toTimeString().slice(0, 5)} -{" "}
                    {end_time.toTimeString().slice(0, 5)}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody className=" bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/20 rounded">
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
    </main>
  );
};

export default Course;
