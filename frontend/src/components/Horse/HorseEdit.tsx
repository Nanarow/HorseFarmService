import { z } from "zod";import { Button }from "@shadcn/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose, DialogDescription} from "@shadcn/ui/dialog"
import { Label } from "@shadcn/ui/label"
import Form from "@shadcn/simplify/form";
import { useEffect, useState} from "react";
import { Bleed , Employee, Sex, Horse, Stable} from "@src/interfaces";
import { http } from "../../services/httpRequest";
import { useToast } from "@shadcn/ui/use-toast";
import { ToItemList } from "@src/utils";
import { Edit } from "lucide-react";
import { horseUpdateFormSchema } from "@src/validator";

interface Props {
  horse: Horse;
  onSave(): void;
}

const HorseEdit = ({ horse, onSave }: Props) => {
  const { toast } = useToast();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [bleeds, setBleeds] = useState<Bleed[]>([]);
  const [sexs, setSexs] = useState<Sex[]>([]);
  const [stables, setStables] = useState<Stable[]>([]);

  const [open, setOpen] = useState(false);

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

  useEffect(() => {
    return () => {
      fetchEmployees();
      fetchBleeds();
      fetchSexs();
      fetchStables();
      
    }
  },[])

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

  async function onEditValid(formData: z.infer<typeof horseUpdateFormSchema>, ID: number) {
    const newHorse ={
      ...formData,

    }
    const res = await http.Put<string>("/horses", ID, newHorse);
    if (res.ok) {
      onSave();
      setOpen(false);
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
    <div className="ml-10 mt-1 mr-10 flex flex-row-reverse">
      <Dialog open={open} onOpenChange={setOpen} >
        <DialogTrigger asChild>
          <Edit className="text-yellow-500 cursor-pointer " />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Horse Data</DialogTitle> 
            <DialogDescription>
              Make changes to your horse here. Click save when you're done.
            </DialogDescription>             
          </DialogHeader>
          <Form
            className="grid gap-3 mt-1"
            validator={horseUpdateFormSchema}
            onValid={(data)=>onEditValid(data,horse.ID)}
            onInvalid={(data) => console.log(data)}
            fields={({ form }) => (
              <>
                <div className="grid grid-cols-4 items-center gap-1">
                  <Label>Name<span className="text-red-500">*</span></Label>
                  <Form.Input
                    defaultValue={horse.Name} 
                    useForm={form}
                    name="Name"
                    type="text"
                    className="col-span-3 font-extralight"  
                    placeholder="enter your name"
                  />                   
                </div>
                <div className="grid grid-cols-4 items-center gap-1">
                  {sexs.length > 0  && (
                    <>
                      <Label>Sex<span className="text-red-500">*</span></Label>
                      <Form.Select
                        defaultValue={String(horse.Sex.ID)}
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
                  <div className="grid grid-cols-4 items-center gap-1">
                    <Label>Age<span className="text-red-500">*</span></Label>
                    <Form.Input
                      defaultValue={horse.Age}
                      useForm={form}
                      type="number"
                      name="Age"
                      className="col-span-3 font-extralight"  
                      placeholder="Age"
                    />   
                  </div>
                  <div className="grid grid-cols-4 items-center gap-1">
                    {bleeds.length > 0 && (
                      <>                      
                        <Label>Bleed<span className="text-red-500">*</span></Label>
                          <Form.Select
                            defaultValue={String(horse.Bleed.ID)}
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
                  <div className="grid grid-cols-4 items-center gap-1">
                    <Label>Stable<span className="text-red-500">*</span></Label>
                    <Form.Select
                      defaultValue={horse.Stable.ID}
                      items={ToItemList(StableTolist())}
                      valueAsNumber
                      useForm={form}
                      name="StableID"
                      className="col-span-3 font-extralight"  
                      placeholder="Stable"
                    ></Form.Select>                                
                  </div>
                  <div className="grid grid-cols-4 items-center gap-1">
                    {employees.length > 0 && (
                      <>
                        <Label>Employee<span className="text-red-500">*</span></Label>
                        <Form.Select
                          defaultValue={String(horse.Employee.ID)}
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
                  <div className="grid grid-cols-4 items-center gap-1">
                    <Label>Date<span className="text-red-500">*</span></Label>
                      <Form.DatePicker 
                        defaultValue={new Date(horse.Date)}
                        className="col-span-3 font-extralight" 
                        useForm={form} 
                        name="Date">
                      </Form.DatePicker>
                  </div>  
                  <div className="grid grid-cols-4 items-center gap-1 ">
                    <Label>Image<span className="text-red-500">*</span></Label>
                      <Form.Input
                        useForm={form}
                        type="file"
                        name="Image"
                        accept="image/*"      
                        className="col-span-3 font-extralight "  
                        placeholder="image"  
                        defaultValue={horse.Image}
                      />
                  </div>
                  <DialogFooter>
                    <div className="space-x-4">
                      <DialogClose asChild>
                        <Button variant="secondary" className=" bg-red-500" type="reset" >Cancle</Button>
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

  );
};

export default HorseEdit;
