import { Button } from "@shadcn/ui/button";
import { Health, Horse, Employee } from "../interfaces";
import { http } from "../services/httpRequest";
import { useEffect, useState } from "react";
import { Label } from "@shadcn/ui";
import { useToast } from "@shadcn/ui/use-toast";
import Form, { ItemList } from "@shadcn/simplify/form";
import HealthImage from "./../assets/health3.jpg";
import { LogOut } from "lucide-react";
import { Tooltip } from "@shadcn/simplify/tooltip";
import { useAuth } from "@src/providers/authProvider";
import { HealthFormData,healthFormSchema } from "@src/validator";

const HealthPage = () => {
  const { logout } = useAuth();
  const { toast } = useToast();
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

  function HorseToSelectItems(
    Horse: { ID: number; Name: string }[]
  ): ItemList[] {
    return Horse.map((Horse) => ({
      value: Horse.ID,
      label: Horse.Name,
    }));
  }

  function EmployeeToSelectItems(
    Employee: { ID?: number; FirstName: string }[]
  ): ItemList[] {
    return Employee.map((Employee) => ({
      value: Employee.ID!,
      label: Employee.FirstName,
    }));
  }

  async function onValid(formData: HealthFormData) {
    
    const res = await http.Post<Health, Health>("/healths", formData);
    if (res.ok) {
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
    }
  }

  return (
    <div className="relative">
      <section className="w-full h-screen  bg-cover bg-center absolute ">
        <img
          src={HealthImage}
          className="w-full h-screen object-cover rounded mx-auto  shadow-sm blur-sm"
          alt="Health"
        />
      </section>

      <Form
        className="flex justify-center  "
        validator={healthFormSchema}
        onValid={onValid}
        onInvalid={console.log}
        fields={({ form,errors }) => (
          <div className="flex flex-col relative ">
            <h1 className="text-3xl font-bold text-black text-primary mb-2 mt-14 mx-64">
              บันทึกการตรวจสุขภาพม้า
            </h1>
            <div className="flex ">
              <Label className=" text-xl text-primary mx-64 flex mt-6">
                วันที่ทำการตรวจสุขภาพม้า:
                <span className="text-red-500 ">*</span>
                <div className=" px-14 ">
                  <Form.DatePicker
                    className="w-96 h-10 border rounded-md focus:outline-none bg-white focus:border-black"
                    useForm={form}
                    name="Date"
                  />
                </div>
              </Label>
            </div>

            
          <div className=" items-center justify-center"> 
            {horses && (
              <>
                <div className="flex gap-6 mx-64 mt-6"> 
                  <Label className="text-xl text-primary w-48 ">
                    ชื่อม้า:<span className="text-red-500">*</span>
                  </Label>
                  <Form.Select
                    valueAsNumber
                    className="h-10 border rounded-md text-1xl focus:outline-none bg-white focus:border-black"
                    useForm={form}
                    items={HorseToSelectItems(horses)}
                    name="HorseID"
                    placeholder="Choose horse name"
                    />
                </div>
                <Form.Error
                      field={errors.HorseID}
                      className=" flex "
                    />
              </>
            )}             
            {employee && (
              <>
                <div className=" flex gap-6 mx-64 mt-6">
                  <Label className="text-xl text-primary w-48">
                    ผู้ตรวจ:<span className="text-red-500">*</span>
                  </Label>
                  <Form.Select
                    valueAsNumber
                    className="h-10 border rounded-md text-1xl focus:outline-none bg-white focus:border-black"
                    useForm={form}
                    items={EmployeeToSelectItems(employee)}
                    name="EmployeeID"
                    placeholder="Choose employee name"
                  />
                </div>
                <Form.Error
                      field={errors.EmployeeID}
                      className="col-span-3 col-start-2 mt-2"
                    />
              </>
            )}

             
            <div className="flex flex-col  relative " >
              <Label className="flex text-primary text-xl mx-64 mt-6 ">
                สัญญาณชีพ:<span className="text-red-500">*</span>
                <Form.Input className="w-3/4 h-10 px-2 ml-12 border rounded-md text-1xl focus:outline-none bg-white focus:border-black" useForm={form} name="Vital" type="text"></Form.Input>
              </Label>
              <Label className="flex text-xl mt-6 text-primary mx-64 ">
                สุขภาพฟัน:<span className="text-red-500">*</span>
                <Form.Input className="w-3/4 h-10  ml-16 border  rounded-md text-1xl focus:outline-none bg-white focus:border-black" useForm={form} name="Tooth" type="text"></Form.Input>
              </Label >
              <Label className="flex text-primary text-xl mt-6 mx-64 ">
                วัคซีนป้องกัน:<span className="text-red-500">*</span>
                <Form.Input className="w-3/4 h-10  ml-12 border rounded-md text-1xl focus:outline-none bg-white focus:border-black" useForm={form} name="Vaccine" type="text"></Form.Input>
              </Label>
              <Label className="flex text-primary text-xl mt-6 mx-64 gap-1">
                ถ่ายพยาธิ:<span className="text-red-500">*</span>
                <Form.Input className="w-3/4 h-10 ml-16  border rounded-md text-1xl focus:outline-none bg-white focus:border-black" useForm={form} name="Parasite" type="text"></Form.Input>
              </Label>
              <Label className="flex text-primary text-xl mt-6 mx-64 ">
                ตรวจเลือด:<span className="text-red-500">*</span>
                <Form.Input className="w-3/4 h-10 ml-16 border gap-5 rounded-md text-1xl focus:outline-none bg-white focus:border-black" useForm={form} name="Blood" type="text"></Form.Input>
              </Label>
                <Button
                  type="submit"
                  className="w-32 h-10 text-2sm  text-center bg-green-600 rounded-md	mt-7 mx-auto	text-primary text-white	 	"
                >
                  บันทึกข้อมูล
                </Button>
              </div>
                <Tooltip content={"Log out"}>
                <LogOut 
                  onClick={() => {
                  console.log("logout");
                  logout();
                }}
                className=" fixed bottom-12 right-16 w-8 h-8  cursor-pointer  text-red-500" />
                </Tooltip>
            </div>
          </div>
        )}
      />
    </div>
  );
};
export default HealthPage;
