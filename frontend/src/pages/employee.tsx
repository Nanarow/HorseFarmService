import { Employee } from "../interfaces";
import { http } from "../services/httpRequest";
import { useEffect, useState } from "react";
import { XSquare } from "lucide-react";
import { format } from "date-fns";
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
import EmployeeEdit from "@src/components/employee/EmployeeEdit";
import EmployeeAlert from "@src/components/employee/EmployeeAlert";
import EmployeeCreateDialog from "@src/components/employee/EmployeeCreateDialog";
import NavBar from "@src/components/navbar/navBar";

function EmployeePage() {
  const [employees, setEmployee] = useState<Employee[]>([]);
  async function fetchEmployee() {
    const res = await http.Get<Employee[]>("/employees");
    if (res.ok) {
      setEmployee(res.data);
    }
  }
  useEffect(() => {
    fetchEmployee();
  }, []);

  return (
    <main className="w-full h-screen">
      <NavBar />
      <div className="w-full h-with-nav relative px-10 py-8">
        <EmployeeCreateDialog onCreated={fetchEmployee} />
        <Table className="border mt-6">
          <TableCaption>A list of your recent Employee.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[12%] text-center">Precede</TableHead>
              <TableHead className="w-[12%] text-center">FirstName</TableHead>
              <TableHead className="w-[12%] text-center">LastName</TableHead>
              <TableHead className="w-[12%] text-center">Gender</TableHead>
              <TableHead className="w-[12%] text-center">
                Day of birth
              </TableHead>
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
            {employees.map((employee) => (
              <TableRow key={employee.ID}>
                <TableCell className=" text-center">
                  {employee.Precede?.Name}
                </TableCell>
                <TableCell className="font-medium text-center">
                  {employee.FirstName
                    ? employee.FirstName
                    : "employee " + employee.ID}
                </TableCell>
                <TableCell className="font-medium text-center">
                  {employee.LastName
                    ? employee.LastName
                    : "employee " + employee.ID}
                </TableCell>
                <TableCell className=" text-center">
                  {employee.Gender.Name}
                </TableCell>
                <TableCell className=" text-center">
                  {format(new Date(employee.DayOfBirth), "PPP")}
                </TableCell>
                <TableCell className=" text-center">
                  {employee.Position.Name}
                </TableCell>
                <TableCell className=" text-center hidden md:table-cell">
                  {employee.Email}
                </TableCell>
                <TableCell className=" text-center hidden md:table-cell">
                  {employee.Phone}
                </TableCell>

                <TableCell className=" relative">
                  <EmployeeEdit
                    employees={employee}
                    onSave={fetchEmployee}
                  ></EmployeeEdit>
                </TableCell>
                <TableCell className=" relative">
                  <Dialog>
                    <DialogTrigger asChild>
                      <XSquare className="text-red-500 abs-center hover:scale-110 cursor-pointer" />
                    </DialogTrigger>
                    <EmployeeAlert
                      employeeID={employee.ID}
                      onCancel={fetchEmployee}
                    ></EmployeeAlert>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}

export default EmployeePage;
