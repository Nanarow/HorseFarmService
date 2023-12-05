import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@shadcn/ui/table";
import React, { useState } from "react";
interface Course {
  id: number;
  title: string;
}

type DropZoneState = "empty" | "added" | "adding" | "replacing";

type DropZoneStateRender = {
  [x in DropZoneState]: React.ReactNode;
};

const DragDropTable = () => {
  const [first, setFirst] = useState<string | undefined>(undefined);
  const [state, setState] = useState<DropZoneState>("empty");
  const [data, setData] = useState<string | undefined>(undefined);
  const courses: Course[] = [
    {
      id: 1,
      title: "Course 1",
    },
    {
      id: 2,
      title: "Course 2",
    },
    {
      id: 3,
      title: "Course 3",
    },
    {
      id: 4,
      title: "Course 4",
    },
    {
      id: 5,
      title: "Course 5",
    },
  ];
  const renderItems: DropZoneStateRender = {
    empty: (
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setState("adding");
        }}
        className="w-full h-full bg-red-200"
      >
        <p>Drop here</p>
        <p>or</p>
        <p>Click to add</p>
      </div>
    ),
    added: (
      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (data !== first) {
            setState("replacing");
          }
        }}
      >
        {first}
      </div>
    ),
    adding: (
      <div
        className=" bg-gray-200 w-full h-full outline-dashed rounded-sm outline-zinc-400"
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => {
          setFirst(data);
          setState("added");
          console.log("add", data);
        }}
      >
        <p className=" text-center">+</p>
      </div>
    ),
    replacing: (
      <div
        className=" bg-gray-200 w-full h-full outline-dashed rounded-sm outline-zinc-400"
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => {
          setFirst(data);
          setState("added");
        }}
      >
        <p className=" text-center">replace</p>
      </div>
    ),
  };
  return (
    <main className="w-full h-screen p-16">
      <section className=" w-full flex gap-2 my-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className=" w-32 h-8 border rounded "
            draggable
            onDragStart={() => {
              setData(course.title);
            }}
            onDragEnd={() => {
              setData(undefined);
              if (state === "adding") {
                setState("empty");
              }
              if (state === "replacing") {
                setState("added");
              }
            }}
          >
            <p className="text-center">{course.title}</p>
          </div>
        ))}
      </section>
      <Table className=" border">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] border">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <td className="border p-1 h-10">{renderItems[state]}</td>

            {/* <TableCell className=" border">
              <div className=" bg-red-400 w-full h-full"></div>
            </TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell> */}
          </TableRow>
        </TableBody>
      </Table>
      {/* <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Contact</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
          </tr>
          <tr>
            <td>Centro comercial Moctezuma</td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
          </tr>
        </tbody>
      </table> */}
    </main>
  );
};

export default DragDropTable;
