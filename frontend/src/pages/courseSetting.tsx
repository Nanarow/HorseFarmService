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
import { Dialog, DialogTrigger } from "@shadcn/ui/dialog";
import AddCourse from "../components/course-setting/addCourse";
import CourseAlert from "@src/components/course-setting/CourseAlert";
import { useEffect, useState } from "react";
import { http } from "@src/services/httpRequest";
import CourseEdit from "@src/components/course-setting/CourseEdit";
import { addDays, addHours } from "date-fns";
import { Label } from "@shadcn/ui";
import ScheduleImage from "../assets/schedulebg.jpg";
import { LogOut, PlusIcon, XSquare } from "lucide-react";
import { Tooltip } from "@shadcn/simplify/tooltip";
import { useAuth } from "@src/providers/authProvider";

const courseSetting = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [schedules, setSchedules] = useState<Schedule[] | undefined>(undefined);
  const { logout } = useAuth();

  async function fetchSchedules() {
    const res = await http.Get<Schedule[]>("/schedules");
    if (res.ok) {
      setSchedules(res.data);
    }
  }
  async function fetchCourses() {
    const res = await http.Get<Course[]>("/courses");
    if (res.ok) {
      setCourses(res.data);
    }
  }

  useEffect(() => {
    fetchSchedules();
    fetchCourses();
  }, []);

  async function handleChange(time: Date, value: string | undefined) {
    if (!schedules) {
      return;
    }
    for (let i = 0; i < schedules.length; i++) {
      const s = schedules[i];
      const start_time = new Date(s.StartTime);
      // check ว่าเวลาที่เลือกเหมือนกันกับ schedule ใด
      if (time.getTime() === start_time.getTime()) {
        // delete schedule ที่เลือก แล้วเพิ่ม schedule ใหม่
        await http.Delete("/schedules", s.ID);
        if (value) {
          await http.Post<Schedule>("/schedules", {
            Date: s.Date,
            StartTime: s.StartTime,
            CourseID: +value,
          });
        }
        await fetchSchedules();
        return;
      }
    }
    // ถ้าเข้าใน loop แล้วไม่เจอ ให้เพิ่ม schedule
    if (value) {
      const res = await http.Post<Schedule>("/schedules", {
        Date: time,
        StartTime: time,
        CourseID: +value,
      });
      if (res.ok) {
        await fetchSchedules();
      }
    }
  }
  function getCourse(time: Date) {
    if (!schedules) {
      return;
    }
    for (let i = 0; i < schedules.length; i++) {
      const s = schedules[i];
      const start_time = new Date(s.StartTime);
      if (time.getTime() === start_time.getTime()) {
        return String(s.CourseID);
      }
    }
    return;
  }

  function getCourseName(id: number) {
    for (let i = 0; i < courses.length; i++) {
      const c = courses[i];
      if (c.ID === id) {
        return c.Name;
      }
    }
  }

  return (
    <main className="w-full h-screen relative">
      <Tooltip content={"Log out"} className="bg-white text-primary">
        <Button
          size={"icon"}
          variant={"secondary"}
          className="absolute bottom-8 right-8 z-10 bg-white/50"
          onClick={logout}
        >
          <LogOut />
        </Button>
      </Tooltip>
      <section className="w-full h-full absolute" style={{ zIndex: -1 }}>
        <img
          src={ScheduleImage}
          className="w-full h-full abs-center object-cover rounded"
          alt="Schedule"
        />
      </section>
      <div className="w-full h-full bg-white border backdrop-blur-none supports-[backdrop-filter]:bg-background/60 px-4">
        <div className="flex items-center justify-between space-x-2 mt-4 z-[1]">
          <Label className="text-3xl font-bold text-center">
            Course Management
          </Label>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"secondary"}>
                <PlusIcon className="mr-2" />
                Add Course
              </Button>
            </DialogTrigger>
            <AddCourse />
          </Dialog>
        </div>
        <DragDrop>
          <section className=" w-full flex gap-2 my-4 flex-wrap">
            {courses.length > 0 &&
              courses.map((course, index) => (
                <DraggableCard
                  key={index}
                  value={course.ID.toString()}
                  className="h-16 flex items-center justify-between px-4 w-1/6"
                >
                  <div>
                    <p className="text-lg font-bold">{course.Name}</p>
                    <p className="text-sm text-gray-500">
                      participants: {course.Participants}
                    </p>
                  </div>
                  <div>
                    <CourseEdit course={course} onSave={fetchCourses} />
                    <CourseAlert courseID={course.ID} onCancel={fetchCourses} />
                  </div>
                </DraggableCard>
              ))}
          </section>
          <Table className="border">
            <TableCaption>Drag and Drop to change schedule</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[20%] border text-center text-black text-base">
                  Day
                </TableHead>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => {
                  const start_time = addHours(
                    new Date().setHours(0, 0, 0, 0),
                    index + 9
                  );
                  return (
                    <TableHead
                      key={index}
                      className="border text-center w-[10%] text-black text-base"
                    >
                      {start_time.toTimeString().slice(0, 8)}
                    </TableHead>
                  );
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedules &&
                [1, 2, 3, 4, 5, 6, 7].map((_, index) => {
                  const day = addDays(
                    new Date().setHours(0, 0, 0, 0),
                    index + 1
                  );
                  return (
                    <TableRow key={index} className="border text-center">
                      <TableCell className=" w-[20%] text-base">
                        {day.toDateString()}
                      </TableCell>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((_, time_index) => {
                        const start_time = addHours(day, time_index + 9);
                        return (
                          <TableCell
                            key={time_index}
                            className="border h-16 w-[10%]"
                          >
                            <DropZone
                              value={getCourse(start_time)}
                              onValueChange={(value) =>
                                handleChange(start_time, value)
                              }
                              
                              render={({ value, clear }) => (
                                <>
                                <div className="bg-white blur-none supports-[backdrop-filter]:bg-background/60 h-12 flex flex-col items-center text-base font-semibold">
                                  <p key={value}>{getCourseName(+value)}</p>
                                    <XSquare onClick={clear} className="text-black h-5 w-5"/>
                                </div>
                                </>
                              )}
                            ></DropZone>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </DragDrop>
      </div>
    </main>
  );
};

export default courseSetting;
