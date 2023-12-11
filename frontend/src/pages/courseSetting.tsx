import { DragDrop, DraggableCard, DropZone } from "@shadcn/simplify/drag-drop";
import { Button } from "@shadcn/ui";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@shadcn/ui/table";
import { Course, Schedule } from "@src/interfaces";
import { addTimeToDate } from "@src/utils";
import { Dialog, DialogTrigger } from "@shadcn/ui/dialog";
import AddCourse from "../components/coursesetting/addCourse";
import { XSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { http } from "@src/services/httpRequest";



const courseSetting = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => {
    async function fetchCourses() {
      const res = await http.Get<Course[]>("/courses");
      if (res.ok) {
        setCourses(res.data);
      }
    }

    fetchCourses();
  }, []);

  function initSchedule() {
    const dayList: Schedule[][] = [];
    // day
    for (let j = 0; j < 10; j++) {
      const scheduleList: Schedule[] = [];
      // hour
      for (let i = 0; i < 8; i++) {
        const day = addTimeToDate(new Date(new Date().setHours(0, 0, 0, 0)), {
          days: j,
        });
        scheduleList.push({
          CourseID: 0,
          Description: "",
          LocationID: 0,
          Date: day,
          StartTime: addTimeToDate(day, {
            hours: i + 9,
          }),
        });
      }
      dayList.push(scheduleList);
    }
    return dayList;
  }

  const [days, setDays] = useState<Schedule[][]>(initSchedule());
  // const courses = () => {
  //   const courseList: Course[] = [];
  //   for (let i = 0; i < 7; i++) {
  //     courseList.push({
  //       id: i,
  //       title: `Course ${i}`,
  //     });
  //   }
  //   return courseList;
  // };

  const onSave = () => {
    days.forEach((day) => {
      day
        .filter((time) => time.CourseID !== 0)
        .forEach((time) => {
          console.log("save this :", time);
        });
    });
  };

  return (
    <main className="w-full h-screen p-16">
      <DragDrop>
        <section className=" w-full flex gap-2 my-4">
          {/* {courses().map((course) => (
            <DraggableCard
              key={course.id}
              value={course.id.toString()}
              className="h-10"
            >
              {course.title}
            </DraggableCard>
          ))} */}
          {
            courses.map((course,index) => (
              <DraggableCard
                key={index}
                value={String(course.ID)}
                className="h-10"
              >
                {course.Name}
              </DraggableCard>
            ))}
        </section>
        <Table className=" border">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[20%] border">Day</TableHead>
              {days[0].map((head, index) => (
                <TableHead key={index} className="border text-center w-[10%]">
                  {head.StartTime.toLocaleTimeString()}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {days.map((day, day_index) => (
              <TableRow key={day_index}>
                <TableCell className=" w-[20%]">
                  {day[0].Date.toLocaleDateString()}
                </TableCell>
                {day.map((_, sch_index) => (
                  <td className="border h-10 w-[10%]" key={sch_index}>
                    <DropZone
                      onValueChange={(value) => {
                        days[day_index][sch_index].CourseID = value
                          ? +value
                          : 0;
                        setDays([...days]);
                      }}
                      render={({ value, clear }) => (
                        <div className="bg-blue-200 w-full h-full flex gap-4 items-center justify-between p-2">
                          <p>
                            {value}
                          </p>
                          <button onClick={clear}>-</button>
                        </div>
                      )}
                    ></DropZone>
                  </td>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DragDrop>
      <Button onClick={onSave}>Save</Button>  
      <Dialog>
        <DialogTrigger asChild>
          <XSquare className="text-red-500 abs-center hover:scale-110 cursor-pointer" />
        </DialogTrigger>
        <AddCourse>
        </AddCourse>
      </Dialog>
    </main>
  );
};

export default courseSetting;
