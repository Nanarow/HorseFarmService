import { Button } from "@shadcn/ui/button";
import { Position, Precede, Gender } from "../../interfaces";
import { http } from "../../services/httpRequest";
import { useToast } from "@shadcn/ui/use-toast";
import { useEffect, useState } from "react";
import Form from "@shadcn/simplify/form";
import { UserPlus } from "lucide-react";
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
import { ToItemList } from "@src/utils";
const EmployeeCreateDialog = ({ onCreated }: { onCreated: () => void }) => {
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

  async function onValid(formData: EmployeeFormData) {
    const res = await http.Post<string>("/employees", formData);
    if (res.ok) {
      toast({
        title: res.data,
        duration: 1500,
        variant: "success",
      });
      onCreated();
      setOpen(false);
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <UserPlus className="text-green-500 absolute top-4 left-12 hover:scale-110 cursor-pointer" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-[480px] h-[80%] overflow-auto">
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
                    <Form.Label>Precede</Form.Label>
                    <Form.Select
                      valueAsNumber
                      useForm={form}
                      items={ToItemList(precede)}
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
                <Form.Label>FirstName</Form.Label>
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
                <Form.Label>LastName</Form.Label>
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
                    <Form.Label>Gender</Form.Label>
                    <Form.Select
                      valueAsNumber
                      useForm={form}
                      items={ToItemList(gender)}
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
                <Form.Label>Day Of Birth</Form.Label>
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
                    <Form.Label>Position</Form.Label>
                    <Form.Select
                      valueAsNumber
                      useForm={form}
                      items={ToItemList(position)}
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
                <Form.Label>Email</Form.Label>
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
                <Form.Label>Phone</Form.Label>
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
                <Form.Label>Password</Form.Label>
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

export default EmployeeCreateDialog;
