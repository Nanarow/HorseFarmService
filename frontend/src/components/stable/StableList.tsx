import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@shadcn/ui/table";
import { useState, useEffect } from "react";
import { Stable } from "@src/interfaces";
import { http } from "../../services/httpRequest";
import StableEdit from "./StableEdit";
import { Link } from "react-router-dom";
import { Tooltip } from "@shadcn/simplify/tooltip";
import { ChevronLeftCircle } from "lucide-react";

const StableList = () => {
  const [stables, setStables] = useState<Stable[]>([]);

  async function fetchStables() {
    const res = await http.Get<Stable[]>("/stables");
    if (res.ok) {
      setStables(res.data);
    }
  }

  useEffect(() => {
    fetchStables();
  }, []);

  return (
    <div className=" flex flex-col gap-4 p-14 ">
      <h1 className="text-xl text-center font-black mb-10">List Of Stable</h1>
      <Table className="border items-center">
        <TableCaption>A list of Stable.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[13%] text-center">Employee</TableHead>
            <TableHead className="w-[13%] text-center">Maintenance</TableHead>
            <TableHead className="w-[13%] text-center">Cleaning</TableHead>
            <TableHead className="w-[13%] text-center">Temperature</TableHead>
            <TableHead className="w-[13%] text-center">Humidity</TableHead>
            <TableHead className="w-[22%] text-center">Description</TableHead>
            <TableHead className="w-[11%] text-center">Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-center">
          {stables.map((stable) => (
            <TableRow key={stable.ID}>
              <TableCell>{stable.Employee.ID}</TableCell>
              <TableCell>
                {new Date(stable.Maintenance).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(stable.Cleaning).toLocaleDateString()}
              </TableCell>
              <TableCell>{stable.Temperature}</TableCell>
              <TableCell>{stable.Humidity}</TableCell>
              <TableCell>{stable.Description}</TableCell>
              <TableCell className="p-2">
                <StableEdit stable={stable} onSave={fetchStables}></StableEdit>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link to="/stable">
        <Tooltip content={"Stable input data"}>
          <ChevronLeftCircle className=" text-red-500 bottom-4 fixed right-10 w-7 h-7" />
        </Tooltip>
      </Link>
    </div>
  );
};
export default StableList;
