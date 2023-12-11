//import React from "react";
import { z } from "zod";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,} from "@shadcn/ui/table"
import { Button }from "@shadcn/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter} from "@shadcn/ui/dialog"
import { Label } from "@shadcn/ui/label"
import Form from "@shadcn/simplify/form";
import { useEffect, useState} from "react";
import { Bleed , Employee, Sex, Horse, Stable} from "@src/interfaces";
import { http } from "../services/httpRequest";
import { useToast } from "@shadcn/ui/use-toast";
import { ToItemList } from "@src/utils";

const HorsePage = () => {
  const { toast } = useToast();

  const formHorse = z.object({
    ID: z.number(),
    Name: z.string(),
    Age: z.number(),
    Date: z.date().min(new Date(), "Date must be in the future"),
    Image: z.string(),
    EmployeeID: z.number(),
    BleedID: z.number(),
    SexID: z.number(),
    StableID: z.number(),
  });
  
  const [employee, setEmployees] = useState<Employee[] | undefined>(undefined);
  const [bleed, setBleeds] = useState<Bleed[] | undefined>(undefined);
  const [sex, setSexs] = useState<Sex[] | undefined>(undefined);
  const [stable, setStables] = useState<Stable[] | undefined>(undefined);

  const [horse, setHorses] = useState<Horse[] | undefined>(undefined);

  async function fetchEmployees() {
    const res = await http.Get<Employee[]>("/employees/id/" + employee);
    if (res.ok) {
      setEmployees(res.data);
    }
  }

  async function fetchBleeds() {
    const res = await http.Get<Bleed[]>("/bleeds");
    if (res.ok) {
      setBleeds(res.data);
    }
  }
  
  async function fetchSexs() {
    const res = await http.Get<Sex[]>("/sexes");
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
    const horseData: Horse = {
      ...formData,
    
    };

    const res = await http.Post<Horse, Horse>("/horses", horseData);
    if (res.ok) {
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(horseData, null, 2)}</code>
          </pre>
        ),
        duration: 1500,
      });
    }
  }

  return (
    <div className="w-full h-screen flex flex-col item-center justify-item">
      <h1 className="text-center text-2xl font-sans mt-10 ml-20">จัดการข้อมูลม้า</h1>
      {/* เพิ่มข้อมูลม้า*/}
      <div className="ml-10 mt-1 mr-10 flex flex-row-reverse">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">เพิ่มข้อมูล</Button>
          </DialogTrigger>
          <DialogContent className="mt-10 mb-20 ">
            <DialogHeader>
              <DialogTitle>เพิ่มข้อมูลม้า</DialogTitle>              
            </DialogHeader>
            <Form
              className="grid gap-2"
              validator={formHorse}
              onValid={onValid}
              onInvalid={(data) => console.log(data)}
              fields={({ form }) => (
                <>
                  <div className="grid grid-cols-6 items-center gap-4 ">
                    <Label className="text-right">ชื่อ</Label>
                    <Form.Input
                      useForm={form}
                      name="Name"
                      type="text"
                      className="col-span-3 font-extralight"  
                      placeholder="enter your name"
                    />   
                  </div>
                  <div className="grid grid-cols-6 items-center gap-4">
                    {sex && (
                      <>
                        <Label className="text-right">เพศ</Label>
                        <Form.Select
                          defaultValue={String(sex)}
                          valueAsNumber
                          useForm={form}
                          name="SexID"
                          items={ToItemList(sex)}
                          className="col-span-3 font-extralight"  
                          placeholder="Sex"
                        ></Form.Select> 
                      </>
                    )}
                  </div>
                  <div className="grid grid-cols-6 items-center gap-4">
                    <Label  className="text-right">อายุ</Label>
                    <Form.Input
                      useForm={form}
                      type="number"
                      name="Age"
                      className="col-span-3 font-extralight"  
                      placeholder="Age"
                    />   
                  </div>
                  <div className="grid grid-cols-6 items-center gap-4">
                    {bleed && (
                      <>                      
                        <Label className="text-right">สายพันธุ์</Label>
                        <Form.Select
                          defaultValue={String(bleed)}
                          valueAsNumber
                          useForm={form}
                          items={ToItemList(bleed)}
                          name="BleedID"
                          className="col-span-3 font-extralight"  
                          placeholder="Bleed"
                        ></Form.Select>                          
                      </>
                    )}
                  </div>
                  <div className="grid grid-cols-6 items-center gap-4">
                    <Label className="text-right">คอกม้า</Label>
                      <Form.Input
                        defaultValue={String(stable)}
                        useForm={form}
                        name="StableID"
                        type="number"
                        className="col-span-3 font-extralight"  
                        placeholder="Stable"
                     ></Form.Input>                                
                  </div>
                  <div className="grid grid-cols-6 items-center gap-4">
                    {employee && (
                      <>
                        <Label className="text-right">ผู้ดูแล</Label>
                        {/*<Form.Select
                          defaultValue={String(employee)}
                          valueAsNumber
                          useForm={form}
                          items={ToItemList(employee)}
                          name="EmployeeID"
                          className="col-span-3 font-extralight"  
                          placeholder="Employee"
                    ></Form.Select>*/}
                      </>
                    )}
                  </div>
                  <div className="grid grid-cols-6 items-center gap-4">
                    <Label className="text-right">วันที่เข้ามา</Label>
                    <Form.DatePicker 
                      className="col-span-3 font-extralight" 
                      useForm={form} 
                      name="Date">
                    </Form.DatePicker>
                  </div>
                  <div className="grid grid-cols-6 items-center gap-4">
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
                  <DialogFooter className="items-center grid grid-row-reverse justify-between">
                    <div className="space-x-4">
                      <Button variant="secondary" className=" bg-red-500">ยกเลิก</Button>
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
        <Table className="border mt-6 items-center">
          <TableCaption className="text-center" >ข้อมูลม้า</TableCaption>
            <TableHeader>
              <TableRow className="font-medium">
                <TableHead className="w-[5%] text-center">รหัส</TableHead>
                <TableHead className="w-[15%] text-center">รูป</TableHead>
                <TableHead className="w-[8%] text-center">ชื่อ</TableHead>
                <TableHead className="w-[9%] text-center">เพศ</TableHead>
                <TableHead className="w-[9%] text-center">อายุ</TableHead>
                <TableHead className="w-[9%] text-center">สายพันธุ์</TableHead>
                <TableHead className="w-[9%] text-center">คอกม้า</TableHead>
                <TableHead className="w-[9%] text-center">วันที่เข้ามา</TableHead>
                <TableHead className="w-[9%] text-center">ผู้ดูแล</TableHead>
                <TableHead className="w-[9%] text-center">แก้ไข</TableHead>
                <TableHead className="w-[9%] text-center">ลบ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {horse && horse.map((horse) => (
                <TableRow key={horse.ID}>
                  <TableCell className=" text-center ">{horse.ID}</TableCell>
                  <TableCell className=" text-center "><img src={horse.Image} alt={horse.Name} /></TableCell>
                  <TableCell className=" text-center ">{horse.Name}</TableCell>
                  <TableCell className=" text-center ">{horse.SexID}</TableCell>
                  <TableCell className=" text-center ">{horse.Age}</TableCell>
                  <TableCell className=" text-center ">{horse.BleedID}</TableCell>
                  <TableCell className=" text-center ">{horse.StableID}</TableCell>
                  <TableCell className=" text-center ">{`${horse.Date}`}</TableCell>
                  <TableCell className=" text-center ">{horse.EmployeeID}</TableCell>
                  <TableCell className=" text-center ">
                    
                    
                  </TableCell>
                  <TableCell className=" text-center ">
                    
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
