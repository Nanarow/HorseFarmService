import React from "react";
import { z } from "zod";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@shadcn/ui/table"
import { Button } from "@shadcn/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,} from "@shadcn/ui/dialog"
import { Input } from "@shadcn/ui/input"
import { Label } from "@shadcn/ui/label"
import Form from "@shadcn/simplify/form";
import { useEffect, useState } from "react";
import { Bleed , Employee, Sex,Horse, Stable} from "@src/interfaces";
import { http } from "../services/httpRequest";
import { useToast } from "@shadcn/ui/use-toast";

const HorsePage = () => {
  const { toast } = useToast();

  const formHorse = z.object({
    Name: z.string(),
    Age: z.number(),
    Date: z.date(),
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

  async function fetchEmployees() {
    const res = await http.Get<Employee[]>("/employees");
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

  useEffect(() => {
    return () => {
      fetchEmployees();
      fetchBleeds();
      fetchSexs();
      fetchStables();
    }
  })

  async function onValid(formData: z.infer<typeof formHorse>) {
    const horseData: Horse = {
      ...formData,
      ID: 0,
      Name: "cyan",
      Age: "",
      Date: new Date(),
      Image: " ",
      EmployeeID: 1,
      BleedID: 1,
      SexID: 1,
      StableID: 1,
    };

    const res = await http.Post<Horse, Horse>("/horse", horseData);

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
      <div className="ml-10 mt-1 mr-10 flex flex-row-reverse space-x-9 space-x-reverse">
        <Form
          validator={formHorse}
          onValid={onValid}
          fields={({ form }) => (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Add</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>เพิ่มข้อมูลม้า</DialogTitle>              
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      วันนที่เข้ามา
                    </Label>
                    <Form.DatePicker useForm={form} name="Date"></Form.DatePicker>
                  </div>
                </div>
                
                </DialogContent>
            </Dialog>
          )}
          ></Form>
          
      </div>
    </div>
  );
};

export default HorsePage;
