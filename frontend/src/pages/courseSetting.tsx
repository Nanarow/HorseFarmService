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
import { Star, XSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { http } from "@src/services/httpRequest";

const courseSetting = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);

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
    // เอาเวลาที่เลือกมาแยกออกก่อน
    const date = new Date(time).toDateString();
    const start_time = new Date(time).toTimeString().slice(0, 8);
    // loop schedules
    for (let i = 0; i < schedules.length; i++) {
      const s = schedules[i];
      const s_date = new Date(s.Date).toDateString();
      const s_time = new Date(s.StartTime).toTimeString().slice(0, 8);
      // check ว่าเวลาที่เลือกเหมือนกันกับ schedule ใด
      if (s_time === start_time && s_date === date) {
        // delete schedule ที่เลือก แล้วเพิ่ม schedule ใหม่
        await http.Delete("/schedules", s.ID!);
        if (value) {
          const res = await http.Post<Schedule>("/schedules", {
            Date: s.Date,
            StartTime: s.StartTime,
            CourseID: +value,
          });
          if (res.ok) {
            // refetch schedules
            return await fetchSchedules();
          }
        }
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
        return await fetchSchedules();
      }
    }
  }
  function getCourse(time: Date) {
    const date = new Date(time).toDateString();
    const start_time = new Date(time).toTimeString().slice(0, 8);
    for (let i = 0; i < schedules.length; i++) {
      const s = schedules[i];
      const s_date = new Date(s.Date).toDateString();
      const s_time = new Date(s.StartTime).toTimeString().slice(0, 8);
      if (s_time === start_time && s_date === date) {
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
      <DragDrop>
        <section className=" w-full flex gap-2 my-4">
          {courses.length > 0 &&
            courses.map((course) => (
              <DraggableCard
                key={course.ID}
                value={course.ID.toString()}
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
              <TableHead className="w-[10%] border">time 1</TableHead>
              {/* {days[0].map((head, index) => (
                <TableHead key={index} className="border text-center w-[10%]">
                  {head.StartTime.toLocaleTimeString()}
                </TableHead>
              ))} */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5, 6, 7].map((_, index) => {
              const day = addTimeToDate(new Date(), {
                days: index + 1,
              });
              return (
                <TableRow key={index} className="border text-center">
                  <TableCell className=" w-[20%]">
                    {day.toDateString()}
                  </TableCell>
                  {schedules.length > 0 &&
                    [1, 2, 3, 4, 5, 6, 7, 8].map((_, time_index) => {
                      const start_time = addTimeToDate(
                        new Date(day.toDateString()),
                        {
                          hours: time_index + 9,
                        }
                      );
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
                            render={({ value }) =>
                              value && <p>{getCourseName(+value)}</p>
                            }
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
      {/* <Button onClick={onSave}>Save</Button> */}
      <Dialog>
        <DialogTrigger asChild>
          <XSquare className="text-red-500 abs-center hover:scale-110 cursor-pointer" />
        </DialogTrigger>
        <AddCourse></AddCourse>
      </Dialog>
    </main>
  );
};

export default courseSetting;

// backup
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
//     // เอาเวลาที่เลือกมาแยกออกก่อน
//     const date = new Date(time).toDateString();
//     const start_time = new Date(time).toTimeString().slice(0, 8);
//     // loop schedules
//     for (let i = 0; i < schedules.length; i++) {
//       const s = schedules[i];
//       const s_date = new Date(s.Date).toDateString();
//       const s_time = new Date(s.StartTime).toTimeString().slice(0, 8);
//       // check ว่าเวลาที่เลือกเหมือนกันกับ schedule ใด
//       if (s_time === start_time && s_date === date) {
//         // delete schedule ที่เลือก แล้วเพิ่ม schedule ใหม่
//         await http.Delete("/schedules", s.ID!);
//         if (value) {
//           const res = await http.Post<Schedule>("/schedules", {
//             Date: s.Date,
//             StartTime: s.StartTime,
//             CourseID: +value,
//           });
//           if (res.ok) {
//             // refetch schedules
//             return await fetchSchedules();
//           }
//         }
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
//         return await fetchSchedules();
//       }
//     }
//   }
//   function getCourse(time: Date) {
//     const date = new Date(time).toDateString();
//     const start_time = new Date(time).toTimeString().slice(0, 8);
//     for (let i = 0; i < schedules.length; i++) {
//       const s = schedules[i];
//       const s_date = new Date(s.Date).toDateString();
//       const s_time = new Date(s.StartTime).toTimeString().slice(0, 8);
//       if (s_time === start_time && s_date === date) {
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
//                             render={({ value }) =>
//                               value && <p>{getCourseName(+value)}</p>
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

// export default courseSetting;
