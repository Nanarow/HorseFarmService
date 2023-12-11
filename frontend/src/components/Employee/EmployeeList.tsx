import { ArrowLeftSquareIcon, Edit, XSquare } from "lucide-react";
import { Employee } from "../../interfaces";
import { http } from "../../services/httpRequest";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@shadcn/ui/table";
// import EmployeeEdit from "../Employee/EmployeeEdit";
import { Dialog, DialogTrigger } from "@shadcn/ui/dialog";
// import EmployeeAlert from "../Employee/EmployeeAlert";
import { useAuth } from "@src/providers/authProvider";
import { Tooltip } from "@shadcn/simplify/tooltip";

interface Props {
  setTabs: React.Dispatch<React.SetStateAction<string>>;
}

function EmployeeList() {
    const [employees, setEmployee] = useState<Employee[] | undefined>(undefined);
    const { employee } = useAuth();
    async function fetchEmployee() {
        const res = await http.Get<Employee[]>("/employee" + employee?.ID);
        if (res.ok) {
            setEmployee(res.data);
        }
    }
    useEffect(() => {
        return () => {
            fetchEmployee();
        };
    }, []);

    return (
        <div className="w-full h-full relative p-8">
            <Tooltip content={() => <span>Back to employee</span>} side="right">
                <ArrowLeftSquareIcon
                    // onClick={() => setTabs("employee")}
                    className="absolute top-4 left-8 text-blue-500" />
            </Tooltip>

            <Table className="border mt-6">
                <TableCaption>A list of your recent registration.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[10%] text-center">Percede</TableHead>
                        <TableHead className="w-[10%] text-center">FirstName</TableHead>
                        <TableHead className="w-[10%] text-center">LastName</TableHead>
                        <TableHead className="w-[10%] text-center">Gender</TableHead>
                        <TableHead className="w-[28%] text-center hidden md:table-cell">
                            Position
                        </TableHead>
                        <TableHead className="w-[12%] text-center">Email</TableHead>
                        <TableHead className="w-[12%] text-center">Phone</TableHead>

                        <TableHead className="w-[4%] text-center">Edit</TableHead>
                        <TableHead className="w-[4%] text-center">Delete</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {employees &&
                        employees.map((employee) => (
                            <TableRow key={employee.ID}>
                                <TableCell className=" text-center">
                                    {employee.Precede?.Name}
                                </TableCell>
                                <TableCell className="font-medium text-center">
                                    {employee.FirstName ? employee.FirstName : "employee " + employee.ID}
                                </TableCell>
                                <TableCell className="font-medium text-center">
                                    {employee.LastName ? employee.LastName : "employee " + employee.ID}
                                </TableCell>
                                <TableCell className=" text-center">
                                    {employee.Gender?.Name}
                                </TableCell>
                                <TableCell className=" text-center">
                                    {employee.Position?.Name}
                                </TableCell>
                                <TableCell className=" text-center hidden md:table-cell">
                                    {employee.Email}
                                </TableCell>
                                <TableCell className=" text-center hidden md:table-cell">
                                    {employee.Phone}
                                </TableCell>

                                <TableCell className=" relative">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Edit className="text-yellow-500 abs-center hover:scale-110 cursor-pointer" />
                                        </DialogTrigger>
                                        {/* <EmployeeEdit employees={employee} onSave={fetchEmployee}></EmployeeEdit> */}
                                    </Dialog>
                                </TableCell>
                                <TableCell className=" relative">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <XSquare className="text-red-500 abs-center hover:scale-110 cursor-pointer" />
                                        </DialogTrigger>
                                        {/* <EmployeeAlert
                                            employeeID={employee.ID!}
                                            onCancel={fetchEmployee}
                                        ></EmployeeAlert> */}
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default EmployeeList;
