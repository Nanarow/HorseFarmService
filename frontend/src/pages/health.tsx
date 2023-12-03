import React from "react";
import { z } from "zod";
import { Button } from "@shadcn/ui/button";
import { Healths, Horse, Employee } from "../interfaces";
import { http } from "../services/httpRequest";
import { useEffect, useState } from "react";
import { Label } from "@shadcn/ui";
import { useToast } from "@shadcn/ui/use-toast";
import Form, { ItemList } from "@shadcn/simplify/form";

const Health = () => {
  const { toast } = useToast();
  const formHealth = z.object({
    Vital: z.string().min(3, "Vital must be at least 3 characters"),
    Tooth: z.string().min(3, "Tooth must be at least 3 characters"),
    Vaccine: z.string().min(3, "Vaccine must be at least 3 characters"),
    Parasite: z.string().min(3, "Parasite must be at least 3 characters"),
    Blood: z.string().min(3, "Blood must be at least 3 characters"),
    Remark: z.string(),
    Date: z.date().min(new Date(), "Date must be in the future"),
    HorseID: z.number(),
    EmployeeID: z.number(),
  });


  const [horses, setHorses] = useState<Horse[] | undefined>(undefined);
  const [employee, setEmployees] = useState<Employee[] | undefined>(undefined);

  useEffect(() => {
    async function fetchHorses() {
      const res = await http.Get<Horse[]>("/horse");
      if (res.ok) {
        setHorses(res.data);
      }
    }

    async function fetchEmployees() {
      const res = await http.Get<Employee[]>("/employee");
      if (res.ok) {
        setEmployees(res.data);
      }
    }

    fetchHorses();
    fetchEmployees();
  }, []);

  function HorseToSelectItems(Horse: { ID: number; Name: string }[]): ItemList[] {
    return Horse.map((Horse) => ({
      value: Horse.ID.toString(),
      label: Horse.Name,
    }));
  }



  function EmployeeToSelectItems(Employee: { ID: number; FirstName: string }[]): ItemList[] {
    return Employee.map((Employee) => ({
      value: Employee.ID.toString(),
      label: Employee.FirstName,
    }));
  }

  async function onValid(formData: z.infer<typeof formHealth>) {
    const healthData: Healths = {
      ...formData,
      ID: 1,
      Vital: "Some vital info",
      Tooth: "Tooth details",
      Vaccine: "Vaccine details",
      Parasite: "Parasite details",
      Blood: "Blood details",
      Remark: "Some remarks",
      Date: new Date(),
      HorseID: 1,
      EmployeeID: 4,
    };



    const res = await http.Post<Healths, Healths>("/health", healthData);
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
    <Form
      validator={formHealth}
      onValid={onValid}
      fields={({ form }) => (
        <div className="w-full h-screen flex flex-col gap-2">
          <h1 className="text-4xl font-black text-primary mb-2 mt-48 mx-48">
            บันทึกการตรวจสุขภาพม้า
          </h1>
          <div className="flex flex-col justify-center mx-72 gap-y-16">
            <Label>
              วันที่ทำการตรวจสุขภาพม้า
              <span className="text-red-500">*</span>
            </Label>
            <Form.DatePicker useForm={form} name="Date" />
            {horses && (
              <>
                <Label>
                  Horse Name<span className="text-red-500">*</span>
                </Label>
                <Form.Select
                  useForm={form}
                  items={HorseToSelectItems(horses)}
                  name="HorseID"
                  placeholder="choose horse name"
                />
              </>
            )}

            {employee && (
              <>
                <Label>
                  Employee Name<span className="text-red-500">*</span>
                </Label>
                <Form.Select
                  useForm={form}
                  items={EmployeeToSelectItems(employee)}
                  name="EmployeeID"
                  placeholder="choose employee name"
                />
              </>
            )}
            {/* Other form fields... */}
            <Button
              type="submit"
              className="w-48 h-16 text-2xl ml- text-center bg-green-500 rounded-md	"
            >บันทึกข้อมูล
            </Button>
          </div>
        </div>
      )}
    />
  );

};
export default Health;
