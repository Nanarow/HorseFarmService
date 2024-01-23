import { Position, Precede, Gender, Employee } from "../../interfaces";
import { http } from "../../services/httpRequest";
import { useToast } from "@shadcn/ui/use-toast";
import { useEffect, useState } from "react";
import Form from "@shadcn/simplify/form";
import { Button } from "@shadcn/ui";
import { Edit } from "lucide-react";
import {
  employeeUpdateFormSchema,
  EmployeeUpdateFormData,
} from "@src/validator";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shadcn/ui/dialog";
import { ToItemList } from "@src/utils";

interface Props {
  employees: Employee;
  onSave(): void;
}

const EmployeeEdit = ({ employees, onSave }: Props) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<Position[]>([]);
  const [precede, setPrecede] = useState<Precede[]>([]);
  const [gender, setGender] = useState<Gender[]>([]);

  useEffect(() => {
    async function fetchPosition() {
      const res = await http.Get<Position[]>("/employees/positions");
      if (res.ok) {
        setPosition(res.data);
      }
    }

    async function fetchPrecede() {
      const res = await http.Get<Precede[]>("/employees/precedes");
      if (res.ok) {
        setPrecede(res.data);
      }
    }

    async function fetchGender() {
      const res = await http.Get<Gender[]>("/employees/genders");
      if (res.ok) {
        setGender(res.data);
      }
    }
    fetchGender();
    fetchPrecede();
    fetchPosition();
  }, []);

  async function onValid(formData: EmployeeUpdateFormData) {
    const res = await http.Put<string>("/employees", employees.ID, formData);
    if (res.ok) {
      onSave();
      toast({
        title: res.data,
        duration: 1500,
        variant: "success",
      });
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Edit className="text-yellow-500 abs-center hover:scale-110 cursor-pointer" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Edit Employee Data</DialogTitle>
          <DialogDescription>
            Make changes to your Employee here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form
          className="grid gap-2 mt-4"
          validator={employeeUpdateFormSchema}
          onValid={onValid}
          onInvalid={(data) => console.log(data)}
          fields={({ form }) => (
            <>
              <div className="grid grid-cols-4 items-center">
                {precede.length > 0 && (
                  <>
                    <Form.Label>Precede</Form.Label>
                    <Form.Select
                      valueAsNumber
                      useForm={form}
                      items={ToItemList(precede)}
                      defaultValue={String(employees.Precede.ID)}
                      name="PrecedeID"
                      placeholder="Pick type of tour"
                      className="col-span-3"
                    ></Form.Select>
                  </>
                )}
              </div>
              <div className="grid grid-cols-4 items-center">
                <Form.Label>FirstName</Form.Label>
                <Form.Input
                  useForm={form}
                  name="FirstName"
                  type="text"
                  defaultValue={employees.FirstName}
                  className="col-span-3"
                ></Form.Input>
              </div>
              <div className=" grid grid-cols-4 items-center">
                <Form.Label>LastName</Form.Label>
                <Form.Input
                  useForm={form}
                  name="LastName"
                  type="text"
                  defaultValue={employees.LastName}
                  className="col-span-3"
                ></Form.Input>
              </div>
              <div className="grid grid-cols-4 items-center">
                {gender.length > 0 && (
                  <>
                    <Form.Label>Gender</Form.Label>
                    <Form.Select
                      valueAsNumber
                      useForm={form}
                      items={ToItemList(gender)}
                      defaultValue={String(employees.Gender.ID)}
                      name="GenderID"
                      placeholder="Pick Gender"
                      className="col-span-3"
                    ></Form.Select>
                  </>
                )}
              </div>
              <div className="grid grid-cols-4 items-center">
                <Form.Label>Day Of Birth</Form.Label>
                <Form.DatePicker
                  useForm={form}
                  name="DayOfBirth"
                  defaultValue={new Date(employees.DayOfBirth)}
                  className="col-span-3"
                ></Form.DatePicker>
              </div>
              <div className="grid grid-cols-4 items-center">
                {position.length > 0 && (
                  <>
                    <Form.Label>Position</Form.Label>
                    <Form.Select
                      valueAsNumber
                      useForm={form}
                      items={ToItemList(position)}
                      defaultValue={String(employees.Position?.ID)}
                      name="PositionID"
                      placeholder="Pick Position"
                      className="col-span-3"
                    ></Form.Select>
                  </>
                )}
              </div>

              <div className="grid grid-cols-4 items-center">
                <Form.Label>Email</Form.Label>
                <Form.Input
                  useForm={form}
                  name="Email"
                  type="email"
                  defaultValue={employees.Email}
                  className="col-span-3"
                ></Form.Input>
              </div>
              <div className="grid grid-cols-4 items-center">
                <Form.Label>Phone</Form.Label>
                <Form.Input
                  useForm={form}
                  name="Phone"
                  type="text"
                  defaultValue={employees.Phone}
                  className="col-span-3"
                ></Form.Input>
              </div>
            </>
          )}
        >
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Close</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeEdit;
