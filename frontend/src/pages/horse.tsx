import { z } from "zod";
import { Card } from "@shadcn/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose} from "@shadcn/ui/dialog"
import { Button }from "@shadcn/ui/button"
import { Label } from "@shadcn/ui/label"
import Form from "@shadcn/simplify/form";
import { useEffect, useState} from "react";
import { Bleed , Employee, Sex, Horse, Stable} from "@src/interfaces";
import { http } from "../services/httpRequest";
import { useToast } from "@shadcn/ui/use-toast";
import { ToItemList } from "@src/utils";
import HorseEdit from "@src/components/Horse/HorseEdit";
import HorseAlert from "@src/components/Horse/HorseAlert";
import { Trash2, LogOutIcon} from 'lucide-react';
import { useAuth } from "@src/providers/authProvider";
import { Tooltip } from "@shadcn/simplify/tooltip";
import { horseFormSchema } from "@src/validator";

const HorsePage = () => {
  const {toast} = useToast();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [bleeds, setBleeds] = useState<Bleed[]>([]);
  const [sexs, setSexs] = useState<Sex[]>([]);
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
  
  async function fetchSexs() {
    const res = await http.Get<Sex[]>("/horses/sexes");
    if (res.ok) {
      setSexs(res.data);
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
    return () => {
      fetchEmployees();
      fetchBleeds();
      fetchSexs();
      fetchStables();
      fetchHorses();
    }
  },[])
  
  async function onValid(formData: z.infer<typeof horseFormSchema>) {  
    console.log(formData)

    const res = await http.Post<string>("/horses", formData);
    if (res.ok) {
      setOpen(false);
      toast({
        title: res.data,
        duration: 1500,
        });
    }else{
      toast({
        title: res.error,
        duration: 1500,
      });
    }
    fetchHorses()
  }

  function StableTolist() {
    const res = stables.map((stable) => {
      return {ID:stable.ID,Name:String(stable.ID)}
    })
    return res
  }
  
  function empTolist() {
    const res = employees.map((emp) => {
      return {ID:emp.ID!,Name:emp.FirstName + " " + emp.LastName}
    })
    return res
  }

  return (
    <div className="w-full h-screen flex flex-col gap-4">
      <div className="flex flex-row-reverse mt-4 mr-4 text-red-500 ">
        <Tooltip content={("Logout")}>
          <LogOutIcon onClick={logout}/>
        </Tooltip>
      </div>
      <h1 className="text-left text-2xl font-blod ml-5 uppercase"></h1>        
      <div className="ml-5 -mt-2 flex flex-row ">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="bg-green-500">ADD+</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Horse Information</DialogTitle>              
            </DialogHeader>
            <Form
              className="grid gap-5"
              validator={horseFormSchema}
              onValid={onValid}
              onInvalid={(data) => console.log(data)}
              fields={({ form }) => (
                <>
                  <div className="grid grid-cols-5 items-center gap-4 ">
                    <Label className="text-right">Name</Label>
                    <Form.Input
                      useForm={form}
                      name="Name"
                      type="text"
                      className="col-span-3 font-extralight"  
                      placeholder="enter your name"
                    />   
                  </div>
                  <div className="grid grid-cols-5 items-center gap-4">
                    {sexs.length > 0  && (
                      <>
                        <Label className="text-right">Sex</Label>
                        <Form.Select
                          valueAsNumber
                          useForm={form}
                          name="SexID"
                          items={ToItemList(sexs)}
                          className="col-span-3 font-extralight"  
                          placeholder="Sex"
                        ></Form.Select> 
                      </>
                    )}
                  </div>
                  <div className="grid grid-cols-5 items-center gap-4">
                    <Label  className="text-right">Age</Label>
                    <Form.Input
                      useForm={form}
                      type="number"
                      name="Age"
                      className="col-span-3 font-extralight"  
                      placeholder="Age"
                    /> 
                  </div>
                  <div className="grid grid-cols-5 items-center gap-4">
                    {bleeds.length > 0 && (
                      <>                      
                        <Label className="text-right">Bleed</Label>
                        <Form.Select
                          valueAsNumber
                          useForm={form}
                          items={ToItemList(bleeds)}
                          name="BleedID"
                          className="col-span-3 font-extralight"  
                          placeholder="Bleed"
                        ></Form.Select>                          
                      </>
                    )}
                  </div>
                  <div className="grid grid-cols-5 items-center gap-4">
                    <Label className="text-right">Stable</Label>
                      <Form.Select
                      items={ToItemList(StableTolist())}
                        valueAsNumber
                        useForm={form}
                        name="StableID"
                        className="col-span-3 font-extralight"  
                        placeholder="Stable"
                     ></Form.Select>                                
                  </div>
                  <div className="grid grid-cols-5 items-center gap-4">
                    {employees.length > 0 && (
                      <>
                        <Label className="text-right">Employee</Label>
                        <Form.Select
                          valueAsNumber
                          useForm={form}
                          items={ToItemList(empTolist())}
                          name="EmployeeID"
                          className="col-span-3 font-extralight"  
                          placeholder="Employee"
                    ></Form.Select>
                      </>
                    )}
                  </div>
                  <div className="grid grid-cols-5 items-center gap-4">
                    <Label className="text-right">Date</Label>
                    <Form.DatePicker 
                      className="col-span-3 font-extralight" 
                      useForm={form} 
                      name="Date">
                    </Form.DatePicker>
                  </div>
                  <div className="grid grid-cols-5 items-center gap-4">
                    <Label className="text-right">Image</Label>
                    <Form.Input
                      useForm={form}
                      type="file"
                      name="Image"
                      accept="image/*"      
                      className="col-span-3 font-extralight"  
                      placeholder="image"                     
                    />
                  </div>
                  <DialogFooter className="items-center grid grid-row-reverse justify-between" >
                    <div className="space-x-4" >
                      <DialogClose asChild>
                        <Button variant="destructive" type="reset" >Cancle</Button>
                      </DialogClose>
                        <Button variant="outline" type="submit" className=" bg-green-500">Save</Button>
                    </div>           
                  </DialogFooter>
                </>
              )}>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="h-56 grid grid-cols-3 gap-4 content-start ml-5 mr-5">
        {horses.length > 0 && horses.map((horse) => (
          <Card 
            key={horse.ID}
            className="place-items-center object-center p-4">
            <div className="col-span-3 font-extralight float-left">
              <img 
              src={horse.Image} 
              alt={horse.Name}
              className=" h-40 w-28 m-5 rounded-lg"
              />
            </div>
            <div className="mt-5">
              <Label>Name: </Label>{horse.Name}
            </div>
            <div>Stable: {horse.Stable.ID}</div>
            <div>Age: {horse.Age}</div>
            <div>Bleed: {horse.Bleed.Name}</div>
            <div className="absolute -m-28 ml-96" >
              <Dialog>
                <HorseEdit
                  horse={horse} 
                  onSave={fetchHorses} 
                ></HorseEdit>
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
