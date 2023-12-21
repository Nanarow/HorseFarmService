//import React from "react";
import { z } from "zod";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,} from "@shadcn/ui/table"
import { Button }from "@shadcn/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose} from "@shadcn/ui/dialog"
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

const HorsePage = () => {
  const { toast } = useToast();

  const formHorse = z.object({
    Name: z.string().min(1, "Name is required"),
    Age: z.number({ required_error: "Age is required" }),
    Date: z.date().min(new Date(), "Date must be in the future"),
    Image: z.string(),
    EmployeeID: z.number(),
    BleedID: z.number(),
    SexID: z.number(),
    StableID: z.number(),
  });
  
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [bleeds, setBleeds] = useState<Bleed[]>([]);
  const [sexs, setSexs] = useState<Sex[]>([]);
  const [stables, setStables] = useState<Stable[]>([]);

  const [horses, setHorses] = useState<Horse[]>([]);
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
  
  async function onValid(formData: z.infer<typeof formHorse>) {  
    console.log(formData)

    const res = await http.Post<Horse>("/horses", formData);
    if (res.ok) {
      setOpen(false);
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(res.data, null, 2)}
            </code>
          </pre>
        ),
        duration: 1500,
      });
      fetchHorses()
    }
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
    <div className="w-full h-screen flex flex-col item-center justify-item">
      <div className="flex flex-row-reverse mt-4 mr-4">
        <LogOutIcon 
          className="text-red-500"

        ></LogOutIcon>
      </div>
      <h1 className="text-center text-2xl font-sans mt-10 ml-20">จัดการข้อมูลม้า</h1>        
      <div className="ml-10 mt-1 mr-10 flex flex-row-reverse">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            {/* <FilePlus2 className="text-blue-500"></FilePlus2> */}
            <Button variant="outline" className="bg-blue-400">เพิ่มข้อมูล</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>เพิ่มข้อมูลม้า</DialogTitle>              
            </DialogHeader>
            <Form
              className="grid gap-5"
              validator={formHorse}
              onValid={onValid}
              onInvalid={(data) => console.log(data)}
              fields={({ form }) => (
                <>
                  <div className="grid grid-cols-5 items-center gap-4 ">
                    <Label className="text-right">ชื่อ</Label>
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
                        <Label className="text-right">เพศ</Label>
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
                    <Label  className="text-right">อายุ</Label>
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
                        <Label className="text-right">สายพันธุ์</Label>
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
                    <Label className="text-right">คอกม้า</Label>
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
                        <Label className="text-right">ผู้ดูแล</Label>
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
                    <Label className="text-right">วันที่เข้ามา</Label>
                    <Form.DatePicker 
                      className="col-span-3 font-extralight" 
                      useForm={form} 
                      name="Date">
                    </Form.DatePicker>
                  </div>
                  <div className="grid grid-cols-5 items-center gap-4">
                    <Label className="text-right">รูป</Label>
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
                        <Button variant="destructive" type="reset" >ยกเลิก</Button>
                      </DialogClose>
                        <Button variant="outline" type="submit" className=" bg-green-500">บันทึกข้อมูล</Button>
                    </div>           
                  </DialogFooter>
                </>
              )}>
            </Form>
          </DialogContent>
        </Dialog>
      </div> 
      {/*ตาราง*/}
      <div>
        <Table className="border mt-6 items-center ">
          <TableCaption className="text-center" >ข้อมูลม้า</TableCaption>
            <TableHeader>
              <TableRow className="font-medium">              
                <TableHead className="w-[10%] text-center">รูป</TableHead>
                <TableHead className="w-[9%] text-center">ชื่อ</TableHead>
                <TableHead className="w-[10%] text-center">เพศ</TableHead>
                <TableHead className="w-[9%] text-center">อายุ</TableHead>
                <TableHead className="w-[9%] text-center">สายพันธุ์</TableHead>
                <TableHead className="w-[9%] text-center">คอกม้า</TableHead>
                <TableHead className="w-[9%] text-center">ผู้ดูแล</TableHead>
                <TableHead className="w-[9%] text-center">แก้ไข</TableHead>
                <TableHead className="w-[9%] text-center">ลบ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {horses.length > 0 && horses.map((horse) => (
                <TableRow key={horse.ID} className="">
                  <TableCell className=" text-center ">
                    <img 
                      src={horse.Image} 
                      alt={horse.Name}
                      className="h-36 w-36"
                    />
                  </TableCell>
                  <TableCell className=" text-center ">{horse.Name}</TableCell>
                  <TableCell className=" text-center ">{horse.Sex.Name}</TableCell>
                  <TableCell className=" text-center ">{horse.Age}</TableCell>
                  <TableCell className=" text-center ">{horse.Bleed.Name}</TableCell>
                  <TableCell className=" text-center ">{horse.Stable.ID}</TableCell>
                  <TableCell className=" text-center ">{horse.Employee.FirstName}</TableCell>
                  <TableCell className=" text-center p-8">   
                    <Dialog >
                      <HorseEdit
                        horse={horse} 
                        onSave={fetchHorses}
                      ></HorseEdit>
                    </Dialog>
                  </TableCell>
                  <TableCell className="text-center p-9">
                    <Dialog>
                      <DialogTrigger asChild><Trash2 className="text-red-500 text-center" /></DialogTrigger>
                      <HorseAlert 
                        horseID={horse.ID}
                        onDelete={fetchHorses}
                      ></HorseAlert>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default HorsePage;
