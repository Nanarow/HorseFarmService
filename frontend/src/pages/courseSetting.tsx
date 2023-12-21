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
import { Course, Schedule } from "../../src/interfaces";
import { addTimeToDate } from "@src/utils";
import { Dialog, DialogTrigger } from "@shadcn/ui/dialog";
import AddCourse from "../components/coursesetting/addCourse";
import CourseAlert from "@src/components/coursesetting/CourseAlert";
import { useEffect, useState } from "react";
import { http } from "@src/services/httpRequest";
import CourseEdit from "@src/components/coursesetting/CourseEdit";
import { XSquare } from "lucide-react";

const courseSetting = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  async function fetchCourses() {
      const res = await http.Get<Course[]>("/courses");
      if (res.ok) {
        setCourses(res.data);
      }
    }
  useEffect(() => {
    return () => {
      fetchCourses();
    }
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
      <Dialog>
        <DialogTrigger asChild>
          <Button className="hover:scale-110">Add Course</Button>
        </DialogTrigger>
        <AddCourse>
        </AddCourse>
      </Dialog>
      <DragDrop>
        <section className=" w-full flex gap-2 my-4">
          {courses.map((course,index) => (
              <DraggableCard
                key={index}
                value={String(course.Name)}
                className="h-10 reletive"
              >
                {course.Name}
                <span>--</span>
                {course.Description}
                <CourseEdit course={course} onSave={fetchCourses}></CourseEdit>
                <Dialog>
                  <DialogTrigger asChild>
                    <XSquare className="text-red-500 hover:scale-110 cursor-pointer"></XSquare>
                  </DialogTrigger>
                  <CourseAlert courseID={course.ID!} onCancel={fetchCourses}></CourseAlert>
                </Dialog>
              </DraggableCard>
            ))}
        </section>
        {/* <Table className=" border">
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
        </Table> */}
      </DragDrop>
      <Button onClick={onSave}>Save</Button>  
    </main>
  );
};

export default courseSetting;
