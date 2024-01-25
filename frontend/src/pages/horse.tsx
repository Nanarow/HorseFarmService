import { z } from "zod";
import { Card } from "@shadcn/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@shadcn/ui/dialog";
import { Button } from "@shadcn/ui/button";
import { Label } from "@shadcn/ui/label";
import Form from "@shadcn/simplify/form";
import { useEffect, useState } from "react";
import { Bleed, Employee, Sex, Horse, Stable } from "@src/interfaces";
import { http } from "../services/httpRequest";
import { useToast } from "@shadcn/ui/use-toast";
import { ToItemList } from "@src/utils";
import HorseEdit from "@src/components/horse/HorseEdit";
import HorseAlert from "@src/components/horse/HorseAlert";
import { Trash2, LogOutIcon } from "lucide-react";
import { useAuth } from "@src/providers/authProvider";
import { Tooltip } from "@shadcn/simplify/tooltip";
import { horseFormSchema } from "@src/validator";

const HorsePage = () => {
  const { toast } = useToast();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [bleeds, setBleeds] = useState<Bleed[]>([]);
  const [sexes, setSexes] = useState<Sex[]>([]);
  const [stables, setStables] = useState<Stable[]>([]);

  const [horses, setHorses] = useState<Horse[]>([]);
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();

  async function fetchEmployees() {
    const res = await http.Get<Employee[]>("/employees");
    if (res.ok) {
      setEmployees(res.data);
    }
  }

  async function fetchBleeds() {
    const res = await http.Get<Bleed[]>("/horses/bleeds");
    if (res.ok) {
      setBleeds(res.data);
    }
  }

  async function fetchSexes() {
    const res = await http.Get<Sex[]>("/horses/sexes");
    if (res.ok) {
      setSexes(res.data);
    }
  }

  async function fetchStables() {
    const res = await http.Get<Stable[]>("/stables");
    if (res.ok) {
      setStables(res.data);
    }
  }

  async function fetchHorses() {
    const res = await http.Get<Horse[]>("/horses");
    if (res.ok) {
      setHorses(res.data);
    }
  }

  useEffect(() => {
    fetchEmployees();
    fetchBleeds();
    fetchSexes();
    fetchStables();
    fetchHorses();
  }, []);

  async function onValid(formData: z.infer<typeof horseFormSchema>) {
    console.log(formData);

    const res = await http.Post<string>("/horses", formData);
    if (res.ok) {
      setOpen(false);
      toast({
        title: res.data,
        duration: 1500,
      });
    } else {
      toast({
        title: res.error,
        duration: 1500,
        variant: "destructive",
      });
    }
    fetchHorses();
  }

  return (
    <div className="w-full h-screen flex flex-col gap-4">
      <div className="flex flex-row justify-between p-4">
        <h1 className="text-left text-2xl font-bold uppercase">
          Horse Management
        </h1>
        <Tooltip content={"Logout"}>
          <Button variant={"danger"} size={"icon"}>
            <LogOutIcon onClick={logout} />
          </Button>
        </Tooltip>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={"success"} className="w-36 ml-4 -mt-4">
            ADD+
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Horse Data</DialogTitle>
            <DialogDescription>
              Make add to your horse here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <Form
            className="grid gap-2 mt-1"
            validator={horseFormSchema}
            onValid={onValid}
            onInvalid={(data) => console.log(data)}
            fields={({ form, errors }) => (
              <>
                <div className="grid grid-cols-4 items-center">
                  <Label>
                    Name<span className="text-red-500">*</span>
                  </Label>
                  <Form.Input
                    useForm={form}
                    name="Name"
                    type="text"
                    className="col-span-3 font-extralight"
                    placeholder="enter your name"
                  />
                  <Form.Error
                    field={errors.Name}
                    className="col-span-2 col-start-2 text-sm"
                  ></Form.Error>
                </div>
                <div className="grid grid-cols-4 items-center gap-1">
                  {sexes.length > 0 && (
                    <>
                      <Label>
                        Sex<span className="text-red-500">*</span>
                      </Label>
                      <Form.Select
                        valueAsNumber
                        useForm={form}
                        name="SexID"
                        items={ToItemList(sexes)}
                        className="col-span-3 font-extralight"
                        placeholder="Sex"
                      ></Form.Select>
                      <Form.Error
                        field={errors.SexID}
                        className="col-span-3 col-start-2"
                      ></Form.Error>
                    </>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-1">
                  <Label>
                    Age<span className="text-red-500">*</span>
                  </Label>
                  <Form.Input
                    useForm={form}
                    type="number"
                    name="Age"
                    className="col-span-3 font-extralight"
                    placeholder="Age"
                  />
                  <Form.Error
                    field={errors.Age}
                    className="col-span-3 col-start-2"
                  ></Form.Error>
                </div>
                <div className="grid grid-cols-4 items-center gap-1">
                  {bleeds.length > 0 && (
                    <>
                      <Label>
                        Bleed<span className="text-red-500">*</span>
                      </Label>
                      <Form.Select
                        valueAsNumber
                        useForm={form}
                        items={ToItemList(bleeds)}
                        name="BleedID"
                        className="col-span-3 font-extralight"
                        placeholder="Bleed"
                      ></Form.Select>
                      <Form.Error
                        field={errors.BleedID}
                        className="col-span-3 col-start-2 "
                      ></Form.Error>
                    </>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-1">
                  <Label>
                    Stable<span className="text-red-500">*</span>
                  </Label>
                  <Form.Select
                    items={ToItemList(stables, (s) => "Stable " + s.ID)}
                    valueAsNumber
                    useForm={form}
                    name="StableID"
                    className="col-span-3 font-extralight"
                    placeholder="Stable"
                  ></Form.Select>
                  <Form.Error
                    field={errors.StableID}
                    className="col-span-3 col-start-2"
                  ></Form.Error>
                </div>
                <div className="grid grid-cols-4 items-center gap-1">
                  {employees.length > 0 && (
                    <>
                      <Label>
                        Employee<span className="text-red-500">*</span>
                      </Label>
                      <Form.Select
                        valueAsNumber
                        useForm={form}
                        items={ToItemList(
                          employees,
                          (emp) => emp.FirstName + " " + emp.LastName
                        )}
                        name="EmployeeID"
                        className="col-span-3 font-extralight"
                        placeholder="Employee"
                      ></Form.Select>
                      <Form.Error
                        field={errors.EmployeeID}
                        className="col-span-3 col-start-2"
                      ></Form.Error>
                    </>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-1">
                  <Label>
                    Date<span className="text-red-500">*</span>
                  </Label>
                  <Form.DatePicker
                    className="col-span-3 font-extralight"
                    useForm={form}
                    name="Date"
                  ></Form.DatePicker>
                  <Form.Error
                    field={errors.Date}
                    className="col-span-3 col-start-2"
                  ></Form.Error>
                </div>
                <div className="grid grid-cols-4 items-center gap-1">
                  <Label>
                    Image<span className="text-red-500">*</span>
                  </Label>
                  <Form.Input
                    useForm={form}
                    type="file"
                    name="Image"
                    accept="image/*"
                    className="col-span-3 font-extralight"
                    placeholder="image"
                  />
                  <Form.Error
                    field={errors.Image}
                    className="col-span-3 col-start-2"
                  ></Form.Error>
                </div>
                <DialogFooter>
                  <div className="space-x-4">
                    <DialogClose asChild>
                      <Form.SubmitButton useForm={form} variant="destructive" type="reset">Cancel</Form.SubmitButton>
                    </DialogClose>
                    <Form.SubmitButton useForm={form} variant={"success"} type="submit">Save</Form.SubmitButton>
                  </div>
                </DialogFooter>
              </>
            )}
          ></Form>
        </DialogContent>
      </Dialog>
      <div className="h-56 grid grid-cols-3 gap-4 content-start px-4">
        {horses.length > 0 &&
          horses.map((horse) => (
            <Card
              key={horse.ID}
              className="place-items-center object-center p-4"
            >
              <div className="col-span-3 font-extralight float-left">
                <img
                  src={horse.Image}
                  alt={horse.Name}
                  className=" h-40 w-28 m-5 rounded-lg"
                />
              </div>
              <div className="mt-5">
                <Label>Name: </Label>
                {horse.Name}
              </div>
              <div>Stable: {horse.Stable.ID}</div>
              <div>Age: {horse.Age}</div>
              <div>Bleed: {horse.Bleed.Name}</div>
              <div className="absolute -m-28 ml-96">
                <Dialog>
                  <HorseEdit horse={horse} onSave={fetchHorses}></HorseEdit>
                </Dialog>
              </div>
              <div>
                <Dialog>
                  <DialogTrigger asChild className="text-red-500 mt-10 -m-6">
                    <Trash2 />
                  </DialogTrigger>
                  <HorseAlert
                    horseID={horse.ID}
                    onDelete={fetchHorses}
                  ></HorseAlert>
                </Dialog>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default HorsePage;
