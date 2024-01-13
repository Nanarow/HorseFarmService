import { Button } from "@shadcn/ui/button";
import { Position, Precede, Gender, Employee } from "../interfaces";
import { http } from "../services/httpRequest";
import { useToast } from "@shadcn/ui/use-toast";
import { useEffect, useState } from "react";
import Form, { ItemList } from "@shadcn/simplify/form";
import { Label } from "@shadcn/ui";
import EmployeeImage from "./../assets/healthbg.jpg";
import { UserPlus} from 'lucide-react';
import { Link } from "react-router-dom";
import { Tooltip } from "@shadcn/simplify/tooltip";
import { EmployeeFormData, employeeFormSchema } from "@src/validator";
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
const EmployeePage = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<Position[]>([]);
  const [precede, setPrecede] = useState<Precede[]>([]);
  const [gender, setGender] = useState<Gender[]>([]);
  // const [formData, setFormData] = useState<Employee>
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

  async function onValid(formData: EmployeeFormData) {
    const employeeData: Employee = {
      ...formData,
    };

    const res = await http.Post<Employee, Employee>("/employees", employeeData);
    if (res.ok) {
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(employeeData, null, 2)}
            </code>
          </pre>
        ),
        duration: 1500,
      });
    }

    // const resetForm = () => {
    //   formData({
    //     FirstName: '',
    //     LastName: '',
    //     Email: '',
    //     Phone: '',
    //     Password: '',
    //     DayOfBirth: '',
    //     PositionID:  '',
    //     PrecedeID:  '',
    //     GenderID: '',
    //     // Reset other fields as needed
    //   });
    // };
    
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <UserPlus className="text-yellow-500 absolute top-8 left-8 hover:scale-110 cursor-pointer" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Create Employee Data</DialogTitle>
          <DialogDescription>
            Make changes to your Employee here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form
          className="grid gap-2 mt-4"
          validator={employeeFormSchema}
          onValid={onValid}
          onInvalid={(data) => console.log(data)}
          fields={({ form, errors }) => (
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
                      name="PrecedeID"
                      placeholder="Pick type of tour"
                      className="col-span-3"
                    ></Form.Select>
                    <Form.Error
                      field={errors.PrecedeID}
                      className="col-span-3 col-start-2 mt-2 "
                    />
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
                  className="col-span-3"
                ></Form.Input>
                <Form.Error
                      field={errors.FirstName}
                      className="col-span-3 col-start-2 mt-2"
                    />
              </div>
              <div className=" grid grid-cols-4 items-center">
                <Label>LastName<span className="text-red-500">*</span></Label>
                <Form.Input
                  useForm={form}
                  name="LastName"
                  type="text"
                  className="col-span-3"
                ></Form.Input>
                <Form.Error
                      field={errors.LastName}
                      className="col-span-3 col-start-2 mt-2"
                    />
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
                      name="GenderID"
                      placeholder="Pick Gender"
                      className="col-span-3"
                    ></Form.Select>
                    <Form.Error
                      field={errors.GenderID}
                      className="col-span-3 col-start-2 mt-2"
                    />
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
                  className="col-span-3"
                ></Form.DatePicker>
                <Form.Error
                      field={errors.DayOfBirth}
                      className="col-span-3 col-start-2 mt-2"
                    />
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
                      name="PositionID"
                      placeholder="Pick Position"
                      className="col-span-3"
                    ></Form.Select>
                     <Form.Error
                      field={errors.PositionID}
                      className="col-span-3 col-start-2 mt-2"
                    />
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
                  className="col-span-3"
                ></Form.Input>
                 <Form.Error
                      field={errors.Email}
                      className="col-span-3 col-start-2 mt-2"
                    />
              </div>
              <div className="grid grid-cols-4 items-center">
                <Label>
                  Phone<span className="text-red-500">*</span>
                </Label>
                <Form.Input
                  useForm={form}
                  name="Phone"
                  type="text"
                  className="col-span-3"
                ></Form.Input>
                 <Form.Error
                      field={errors.Phone}
                      className="col-span-3 col-start-2 mt-2"
                    />
              </div>
              <div className="grid grid-cols-4 items-center">
                <Label>
                  Password<span className="text-red-500">*</span>
                </Label>
                <Form.Input
                  useForm={form}
                  name="Password"
                  type="text"
                  className="col-span-3"
                ></Form.Input>
                <Form.Error
                      field={errors.Password}
                      className="col-span-3 col-start-2 mt-2"
                    />
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

export default EmployeePage;
