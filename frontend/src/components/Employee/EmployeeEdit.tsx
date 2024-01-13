import { Position, Precede, Gender, Employee } from "../../interfaces";
import { http } from "../../services/httpRequest";
import { useToast } from "@shadcn/ui/use-toast";
import { useEffect, useState } from "react";
import Form, { ItemList } from "@shadcn/simplify/form";
import { Button, Label } from "@shadcn/ui";
import { Edit } from "lucide-react";
import { employeeupdateFormSchema, EmployeeupdateFormData } from "@src/validator";
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

  function PrecedeToSelectItems(
    Precede: { ID: number; Name: string }[]
  ): ItemList[] {
    return Precede.map((Precede) => ({
      value: Precede.ID,
      label: Precede.Name,
    }));
  }

  function GenderToSelectItems(
    Gender: { ID: number; Name: string }[]
  ): ItemList[] {
    return Gender.map((Gender) => ({
      value: Gender.ID,
      label: Gender.Name,
    }));
  }

  function PositionToSelectItems(
    Position: { ID: number; Name: string }[]
  ): ItemList[] {
    return Position.map((Position) => ({
      value: Position.ID,
      label: Position.Name,
    }));
  }

  async function onValid(formData: EmployeeupdateFormData) {
    const newEmployee = {
      ...formData,

    };

    const res = await http.Put<string>("/employees", employees.ID!, newEmployee);
    if (res.ok) {
      onSave();
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(res.data, null, 2)}</code>
          </pre>
        ),
        duration: 1500,
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
          validator={employeeupdateFormSchema}
          onValid={onValid}
          onInvalid={(data) => console.log(data)}
          fields={({ form }) => (
            <>
              <div className="grid grid-cols-4 items-center">
                {precede.length > 0 && (
                  <>
                    <Label>
                      Precede<span className="text-red-500">*</span>
                    </Label>
                    <Form.Select
                      valueAsNumber
                      useForm={form}
                      items={PrecedeToSelectItems(precede)}
                      defaultValue={String(employees.Precede?.ID)}
                      name="PrecedeID"
                      placeholder="Pick type of tour"
                      className="col-span-3"
                    ></Form.Select>
                  </>
                )}
              </div>
              <div className="grid grid-cols-4 items-center">
                <Label>
                  FirstName<span className="text-red-500">*</span>
                </Label>
                <Form.Input
                  useForm={form}
                  name="FirstName"
                  type="text"
                  defaultValue={employees.FirstName}
                  className="col-span-3"
                ></Form.Input>
              </div>
              <div className=" grid grid-cols-4 items-center">
                <Label>LastName<span className="text-red-500">*</span></Label>
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
                    <Label>
                      Gender<span className="text-red-500">*</span>
                    </Label>
                    <Form.Select
                      valueAsNumber
                      useForm={form}
                      items={GenderToSelectItems(gender)}
                      defaultValue={String(employees.Gender?.ID)}
                      name="GenderID"
                      placeholder="Pick Gender"
                      className="col-span-3"
                    ></Form.Select>
                  </>
                )}
              </div>
              <div className="grid grid-cols-4 items-center">
                <Label>
                  Day Of Birth<span className="text-red-500">*</span>
                </Label>
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
                    <Label>
                      Position<span className="text-red-500">*</span>
                    </Label>
                    <Form.Select
                      valueAsNumber
                      useForm={form}
                      items={PositionToSelectItems(position)}
                      defaultValue={String(employees.Position?.ID)}
                      name="PositionID"
                      placeholder="Pick Position"
                      className="col-span-3"
                    ></Form.Select>
                  </>
                )}
              </div>


              <div className="grid grid-cols-4 items-center">
                <Label>
                  Email<span className="text-red-500">*</span>
                </Label>
                <Form.Input
                  useForm={form}
                  name="Email"
                  type="email"
                  defaultValue={employees.Email}
                  className="col-span-3"
                ></Form.Input>
              </div>
              <div className="grid grid-cols-4 items-center">
                <Label>
                  Phone<span className="text-red-500">*</span>
                </Label>
                <Form.Input
                  useForm={form}
                  name="Phone"
                  type="text"
                  defaultValue={employees.Phone}
                  className="col-span-3"
                ></Form.Input>
              </div>
              {/* <div className="grid grid-cols-4 items-center">
                <Label>
                  Password<span className="text-red-500">*</span>
                </Label>
                <Form.Input
                  useForm={form}
                  name="Password"
                  type="text"
                  defaultValue={employees.Password}
                  className="col-span-3"
                ></Form.Input>
              </div> */}


              {/* <Form.SubmitButton useForm={form}>Employee</Form.SubmitButton> */}
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
