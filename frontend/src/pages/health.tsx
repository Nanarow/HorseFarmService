import React from "react";
import { z } from "zod";
import { Button } from "@shadcn/ui/button";
import { Healths, Horse, Employee } from "../interfaces";
import { http } from "../services/httpRequest";
import { useEffect, useState } from "react";
import { Label } from "@shadcn/ui";
import { useToast } from "@shadcn/ui/use-toast";
import Form, { ItemList } from "@shadcn/simplify/form";
import HealthImage from "./../assets/healthbg2.jpg";
import { LogOut } from 'lucide-react';
import { Link } from "react-router-dom";


const Health = () => {
  const { toast } = useToast();
  const formHealth = z.object({
    Vital: z.string().min(3, "Vital must be at least 3 characters"),
    Tooth: z.string().min(3, "Tooth must be at least 3 characters"),
    Vaccine: z.string().min(3, "Vaccine must be at least 3 characters"),
    Parasite: z.string().min(3, "Parasite must be at least 3 characters"),
    Blood: z.string().min(3, "Blood must be at least 3 characters"),
    Date: z.date().min(new Date(), "Date must be in the future"),
    HorseID: z.number(),
    EmployeeID: z.number(),
  });


  const [horses, setHorses] = useState<Horse[] | undefined>(undefined);
  const [employee, setEmployees] = useState<Employee[] | undefined>(undefined);

  useEffect(() => {
    async function fetchHorses() {
      const res = await http.Get<Horse[]>("/horses");
      if (res.ok) {
        setHorses(res.data);
      }
    }

    async function fetchEmployees() {
      const res = await http.Get<Employee[]>("/employees");
      if (res.ok) {
        setEmployees(res.data);
      }
    }

    fetchHorses();
    fetchEmployees();
  }, []);

  function HorseToSelectItems(Horse: { ID: number; Name: string }[]): ItemList[] {
    return Horse.map((Horse) => ({
      value: Horse.ID,
      label: Horse.Name,
    }));
  }



  function EmployeeToSelectItems(Employee: { ID: number; FirstName: string }[]): ItemList[] {
    return Employee.map((Employee) => ({
      value: Employee.ID,
      label: Employee.FirstName,
    }));
  }

  async function onValid(formData: z.infer<typeof formHealth>) {
    const healthData: Healths = {
      ...formData,
      // Vital: "",
      // Tooth: "",
      // Vaccine: "",
      // Parasite: "",
      // Blood: "",
      // Date: new Date(),
      // HorseID: ,
      // EmployeeID: ,
    };



    const res = await http.Post<Healths, Healths>("/healths", healthData);
    if (res.ok) {
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(healthData, null, 2)}</code>
          </pre>
        ),
        duration: 1500,
      });
    }
  }


  return (
    <div className="relative">
      <section className="w-2/5 h-full  bg-cover bg-center absolute   	">
        <img
          src={HealthImage}
          className="w-full h-full object-cover rounded "
          alt="Health"
        />
      </section>
        
        
      <Form
        className="flex justify-end"
        validator={formHealth}
        onValid={onValid}
        onInvalid={console.log}
        fields={({ form }) => (

          <div className="flex flex-col relative">
            <h1 className="text-4xl font-black text-primary mb-2 mt-8 text-center">
              บันทึกการตรวจสุขภาพม้า
            </h1>
            <div className="flex">
              <Label className=" text-2xl text-primary mx-64 flex mt-16">
                วันที่ทำการตรวจสุขภาพม้า:<span className="text-red-500 ">*</span>
                <div className=" px-14 ">
                  <Form.DatePicker className="w-96 h-14" useForm={form} name="Date" />
                </div>
              </Label>
            </div>

            
          <div className=" items-center justify-center"> 
            {horses && (
              <>
                <div className="flex gap-14 mx-64 mt-6"> 
                  <Label className="text-2xl text-primary ">
                    ชื่อม้า:<span className="text-red-500">*</span>
                  </Label>
                  <Form.Select
                    valueAsNumber
                    className="h-14 px-16 text-2xl text-primary"
                    useForm={form}
                    items={HorseToSelectItems(horses)}
                    name="HorseID"
                    placeholder="Choose horse name"
                    />
                </div>

              </>
            )}
             
            {employee && (
              <>
                <div className=" flex gap-14 mx-64 mt-6">
                  <Label className="text-2xl text-primary ">
                    ผู้ตรวจ:<span className="text-red-500">*</span>
                  </Label>
                  <Form.Select
                    valueAsNumber
                    className="h-14 px-24 text-2xl text-primary"
                    useForm={form}
                    items={EmployeeToSelectItems(employee)}
                    name="EmployeeID"
                    placeholder="Choose employee name"
                  />
                </div>
              </>
            )}

             
            <div className="flex flex-col  relative " >
              <Label className="flex text-primary text-2xl mx-64 mt-6">
                การตรวจสัญญาณชีพ:<span className="text-red-500">*</span>
                <Form.Input className="w-3/4 h-14 px-4 ml-12 border rounded-md text-1xl focus:outline-none bg-white focus:border-black" useForm={form} name="Vital" type="text"></Form.Input>
              </Label>
              <Label className="flex text-2xl mt-6 text-primary mx-64 ">
                การตรวจสุขภาพฟัน:<span className="text-red-500">*</span>
                <Form.Input className="w-3/4 h-14 px-4 ml-12 border rounded-md text-1xl focus:outline-none bg-white focus:border-black" useForm={form} name="Tooth" type="text"></Form.Input>
              </Label >
              <Label className="flex text-primary text-2xl mt-6 mx-64 ">
                การฉีดวัคซีนป้องกันโรค :<span className="text-red-500">*</span>
                <Form.Input className="w-3/4 h-14 px-4 ml-12 border rounded-md text-1xl focus:outline-none bg-white focus:border-black" useForm={form} name="Vaccine" type="text"></Form.Input>
              </Label>
              <Label className="flex text-primary text-2xl mt-6 mx-64 ">
                การถ่ายพยาธิและตรวจนับไข่พยาธิ:<span className="text-red-500">*</span>
                <Form.Input className="w-3/4 h-14 px-4 ml-12 border rounded-md text-1xl focus:outline-none bg-white focus:border-black" useForm={form} name="Parasite" type="text"></Form.Input>
              </Label>
              <Label className="flex text-primary text-2xl mt-6 mx-64 ">
                การตรวจเลือด:<span className="text-red-500">*</span>
                <Form.Input className="w-3/4 h-14 px-4 ml-12 border rounded-md text-1xl focus:outline-none bg-white focus:border-black" useForm={form} name="Blood" type="text"></Form.Input>
              </Label>
            


            <Button
              type="submit"
              className="w-48 h-12 text-2xl  text-center bg-green-600 rounded-md	mt-5 mx-auto	text-primary text-white	 	"
            >บันทึกข้อมูล
            </Button>
            </div>
            <Link to="/login/employee">
              <LogOut className=" fixed bottom-9 right-16 w-10 h-10  cursor-pointer  text-red-500"/>
              <Label className="fixed bottom-2 right-16 text-primary text-1xl text-red-500 cursor-pointer">Log out</Label>
            </Link>
          </div>
        </div> 
        )}
      />
    </div>
  );

};
export default Health;
