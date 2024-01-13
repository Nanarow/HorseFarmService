import { Employee } from "../../interfaces";
import { http } from "../../services/httpRequest";
import { useEffect, useState } from "react";
import EmployeeAlert from "../Employee/EmployeeAlert";
import { LogOut } from 'lucide-react';
import {  XSquare } from "lucide-react";
import { format } from "date-fns";
import {  useNavigate } from "react-router-dom";
import EmployeePage from "@src/pages/employee";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@shadcn/ui/table";
import { Dialog, DialogTrigger } from "@shadcn/ui/dialog";
import { Tooltip } from "@shadcn/simplify/tooltip";
import EmployeeEdit from "./EmployeeEdit";
import { useAuth } from "@src/providers/authProvider";



function EmployeeList() {
    const { logout} = useAuth();
    const navigate = useNavigate();
    const [employees, setEmployee] = useState<Employee[]>([]);
    async function fetchEmployee() {
        const res = await http.Get<Employee[]>("/employees");
        if (res.ok) {
            setEmployee(res.data);
        }
    }
    useEffect(() => {
        return () => {
            fetchEmployee();
        };
    }, []);

    // const handleClick = () => {
    //     // Use navigate to redirect to "/employee"
    //     navigate('/employee');
    //   };

    
    
    return (
        <div className="w-full h-full relative p-14">
            {/* <Tooltip content={"เพิ่มข้อมูลพนักงาน"} side="right">
                <UserPlus 
                    onClick={handleClick}
                    className="absolute top-4 left-8 text-blue-500 h-8 w-6" />
            </Tooltip> */}
            <EmployeePage/>

            <Tooltip content={"Log out"}>
                <LogOut onClick={() => {
                    console.log("logout");
                    logout();
                  }}
                  className=" absolute top-4 right-8  text-red-500 h-8 w-6" />  
            </Tooltip>

            <Table className="border mt-6">
                <TableCaption>A list of your recent Employee.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[12%] text-center">Percede</TableHead>
                        <TableHead className="w-[12%] text-center">FirstName</TableHead>
                        <TableHead className="w-[12%] text-center">LastName</TableHead>
                        <TableHead className="w-[12%] text-center">Gender</TableHead>
                        <TableHead className="w-[12%] text-center">Day of birth</TableHead>
                        <TableHead className="w-[12%] text-center hidden md:table-cell">
                            Position
                        </TableHead>
                        <TableHead className="w-[12%] text-center">Email</TableHead>
                        <TableHead className="w-[12%] text-center">Phone</TableHead>

                        <TableHead className="w-[5%] text-center">Edit</TableHead>
                        <TableHead className="w-[5%] text-center">Delete</TableHead>
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
                                    {format(new Date(employee.DayOfBirth), "PPP")}
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
                                    
                                    <EmployeeEdit employees={employee} onSave={fetchEmployee}></EmployeeEdit>
                                    
                                </TableCell>
                                <TableCell className=" relative">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <XSquare className="text-red-500 abs-center hover:scale-110 cursor-pointer" />
                                        </DialogTrigger>
                                        <EmployeeAlert
                                            employeeID={employee.ID!}
                                            onCancel={fetchEmployee}
                                        ></EmployeeAlert>
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
