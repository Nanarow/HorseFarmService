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
import AddCourse from "../components/coursesetting/addCourse";
import CourseAlert from "@src/components/coursesetting/CourseAlert";
import { useEffect, useState } from "react";
import { http } from "@src/services/httpRequest";
import CourseEdit from "@src/components/coursesetting/CourseEdit";
import { XSquare } from "lucide-react";
import { addDays, addHours } from "date-fns";
import { Label } from "@shadcn/ui";

const courseSetting = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [schedules, setSchedules] = useState<Schedule[] | undefined>(undefined);

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
    return () => {
      fetchSchedules();
      fetchCourses();
    };
  }, []);

  async function handleChange(time: Date, value: string | undefined) {
    // console.log(time, value);
    if (!schedules) {
      return;
    }
    for (let i = 0; i < schedules.length; i++) {
      const s = schedules[i];
      const start_time = new Date(s.StartTime);
      // check ว่าเวลาที่เลือกเหมือนกันกับ schedule ใด
      if (time.getTime() === start_time.getTime()) {
        // delete schedule ที่เลือก แล้วเพิ่ม schedule ใหม่
        await http.Delete("/schedules", s.ID!);
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
    <main className="w-full h-screen p-16">
      <div className="flex items-center justify-between space-x-2">
        <Label className="text-3xl font-bold text-center">
          Course Setting
        </Label>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="hover:scale-110">Add Course</Button>
        </DialogTrigger>
        <AddCourse></AddCourse>
      </Dialog>
      </div>
      <DragDrop>
        <section className=" w-full flex gap-2 my-4">
          {courses.length > 0 &&
            courses.map((course, index) => (
              <DraggableCard
                key={index}
                value={course.ID.toString()}
                className="h-10 flex items-center justify-between px-4"
              >
                <div>
                {course.Name}
                </div>

                <div className="flex items-center space-x-2">
                <CourseEdit course={course} onSave={fetchCourses}></CourseEdit>
                <Dialog>
                  <DialogTrigger asChild>
                    <XSquare className="text-red-500 hover:scale-110 cursor-pointer"></XSquare>
                  </DialogTrigger>
                  <CourseAlert
                    courseID={course.ID!}
                    onCancel={fetchCourses}
                  ></CourseAlert>
                </Dialog>
                </div>
              </DraggableCard>
            ))}
        </section>
        <Table className=" border">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[20%] border text-center">Day</TableHead>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => {
                const start_time = addHours(
                  new Date().setHours(0, 0, 0, 0),
                  index + 9
                );
                // const start_time = addTimeToDate(
                //   new Date(new Date().toDateString()),
                //   {
                //     hours: index + 9,
                //   }
                // );
                // console.log(test_time.getTime(), start_time.getTime());
                // console.log(test_time.getTime() == start_time.getTime());
                return (
                  <TableHead key={index} className="border text-center w-[10%]">
                    {start_time.toTimeString().slice(0, 8)}
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
                    <TableCell className=" w-[20%]">
                      {day.toDateString()}
                    </TableCell>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((_, time_index) => {
                      const start_time = addHours(day, time_index + 9);
                      return (
                        <TableCell
                          key={time_index}
                          className="border h-10 w-[10%]"
                        >
                          <DropZone
                            value={getCourse(start_time)}
                            onValueChange={(value) =>
                              handleChange(start_time, value)
                            }
                            render={({ value, clear }) => (
                              <>
                                <p key={value}>{getCourseName(+value)}</p>
                                <button onClick={clear}>-</button>
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
    </main>
  );
};

export default courseSetting;

// backup
// import { DragDrop, DraggableCard, DropZone } from "@shadcn/simplify/drag-drop";
// import { Button } from "@shadcn/ui";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@shadcn/ui/table";
// import { Course, Schedule } from "@src/interfaces";
// import { addTimeToDate } from "@src/utils";
// import { Dialog, DialogTrigger } from "@shadcn/ui/dialog";
// import AddCourse from "../components/coursesetting/addCourse";
// import { Star, XSquare } from "lucide-react";
// import { useEffect, useState } from "react";
// import { http } from "@src/services/httpRequest";

// const courseSetting = () => {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [schedules, setSchedules] = useState<Schedule[]>([]);

//   async function fetchSchedules() {
//     const res = await http.Get<Schedule[]>("/schedules");
//     if (res.ok) {
//       setSchedules(res.data);
//     }
//   }
//   async function fetchCourses() {
//     const res = await http.Get<Course[]>("/courses");
//     if (res.ok) {
//       setCourses(res.data);
//     }
//   }

//   useEffect(() => {
//     return () => {
//       fetchSchedules();
//       fetchCourses();
//     };
//   }, []);

//   async function handleChange(time: Date, value: string | undefined) {
//     for (let i = 0; i < schedules.length; i++) {
//       const s = schedules[i];
//       const start_time = new Date(s.StartTime);
//       // check ว่าเวลาที่เลือกเหมือนกันกับ schedule ใด
//       if (time.getTime() === start_time.getTime()) {
//         // delete schedule ที่เลือก แล้วเพิ่ม schedule ใหม่
//         await http.Delete("/schedules", s.ID!);
//         if (value) {
//           await http.Post<Schedule>("/schedules", {
//             Date: s.Date,
//             StartTime: s.StartTime,
//             CourseID: +value,
//           });
//         }
//         await fetchSchedules();
//         return;
//       }
//     }
//     // ถ้าเข้าใน loop แล้วไม่เจอ ให้เพิ่ม schedule
//     if (value) {
//       const res = await http.Post<Schedule>("/schedules", {
//         Date: time,
//         StartTime: time,
//         CourseID: +value,
//       });
//       if (res.ok) {
//         await fetchSchedules();
//       }
//     }
//   }
//   function getCourse(time: Date) {
//     for (let i = 0; i < schedules.length; i++) {
//       const s = schedules[i];
//       const start_time = new Date(s.StartTime);
//       if (time.getTime() === start_time.getTime()) {
//         return String(s.CourseID);
//       }
//     }
//     return;
//   }

//   function getCourseName(id: number) {
//     for (let i = 0; i < courses.length; i++) {
//       const c = courses[i];
//       if (c.ID === id) {
//         return c.Name;
//       }
//     }
//   }

//   return (
//     <main className="w-full h-screen p-16">
//       <DragDrop>
//         <section className=" w-full flex gap-2 my-4">
//           {courses.length > 0 &&
//             courses.map((course) => (
//               <DraggableCard
//                 key={course.ID}
//                 value={course.ID.toString()}
//                 className="h-10"
//               >
//                 {course.Name}
//               </DraggableCard>
//             ))}
//         </section>
//         <Table className=" border">
//           <TableCaption>A list of your recent invoices.</TableCaption>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-[20%] border">Day</TableHead>
//               <TableHead className="w-[10%] border">time 1</TableHead>
//               {/* {days[0].map((head, index) => (
//                 <TableHead key={index} className="border text-center w-[10%]">
//                   {head.StartTime.toLocaleTimeString()}
//                 </TableHead>
//               ))} */}
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {[1, 2, 3, 4, 5, 6, 7].map((_, index) => {
//               const day = addTimeToDate(new Date(), {
//                 days: index + 1,
//               });
//               return (
//                 <TableRow key={index} className="border text-center">
//                   <TableCell className=" w-[20%]">
//                     {day.toDateString()}
//                   </TableCell>
//                   {schedules.length > 0 &&
//                     [1, 2, 3, 4, 5, 6, 7, 8].map((_, time_index) => {
//                       const start_time = addTimeToDate(
//                         new Date(day.toDateString()),
//                         {
//                           hours: time_index + 9,
//                         }
//                       );
//                       return (
//                         <TableCell
//                           key={time_index}
//                           className="border h-10 w-[10%]"
//                         >
//                           <DropZone
//                             value={getCourse(start_time)}
//                             onValueChange={(value) =>
//                               handleChange(start_time, value)
//                             }
//                             render={({ value, setValue }) =>
//                               value && (
//                                 <>
//                                   <p className=" " key={value}>
//                                     {getCourseName(+value)}
//                                   </p>
//                                   <button onClick={() => setValue(undefined)}>
//                                     -
//                                   </button>
//                                 </>
//                               )
//                             }
//                           ></DropZone>
//                         </TableCell>
//                       );
//                     })}
//                 </TableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//       </DragDrop>
//       {/* <Button onClick={onSave}>Save</Button> */}
//       <Dialog>
//         <DialogTrigger asChild>
//           <XSquare className="text-red-500 abs-center hover:scale-110 cursor-pointer" />
//         </DialogTrigger>
//         <AddCourse></AddCourse>
//       </Dialog>
//     </main>
//   );
// };
