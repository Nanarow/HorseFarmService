import { z } from "zod";
import { Button } from "@shadcn/ui/button";
import { Position, Precede, Gender, Employee } from "../interfaces";
import { http } from "../services/httpRequest";
import { useToast } from "@shadcn/ui/use-toast";
import { useEffect, useState } from "react";
import Form, { ItemList } from "@shadcn/simplify/form";
import { Label } from "@shadcn/ui";
import HealthImage from "./../assets/employee.jpg";

const EmployeePage = () => {
  const { toast } = useToast();
  const formEmployee = z.object({
    FirstName: z.string().min(3, "FirstName must be at least 3 characters"),
    LastName: z.string().min(3, "Tooth must be at least 3 characters"),
    Email: z.string().email("Please enter a valid email"),
    Phone: z.string().max(10, "Phone must be at least 10 characters"),
    Password: z
      .string()
      .min(2, "Password must be at least 8 characters long")
      .max(20, "Password must be at most 20 characters long"),
    DayOfBirth: z.date().min(new Date(), "Date must be in the future"),
    PositionID: z.number(),
    PrecedeID: z.number(),
    GenderID: z.number(),
  });

  const [position, setPosition] = useState<Position[] | undefined>(undefined);
  const [precede, setPrecede] = useState<Precede[] | undefined>(undefined);
  const [gender, setGender] = useState<Gender[] | undefined>(undefined);

  useEffect(() => {
    async function fetchPosition() {
      const res = await http.Get<Position[]>("/positions");
      if (res.ok) {
        setPosition(res.data);
      }
    }

    async function fetchPrecede() {
      const res = await http.Get<Precede[]>("/precedes");
      if (res.ok) {
        setPrecede(res.data);
      }
    }

    async function fetchGender() {
      const res = await http.Get<Gender[]>("/gender");
      if (res.ok) {
        setGender(res.data);
      }
    }
    fetchGender();
    fetchPrecede();
    fetchPosition();
  }, []);

  function PrecedeToSelectItems(
    Precede: { ID: number; Name: string }[]
  ): ItemList[] {
    return Precede.map((Precede) => ({
      value: Precede.ID,
      label: Precede.Name,
    }));
  }

  function GenderToSelectItems(
    Gender: { ID: number; Name: string }[]
  ): ItemList[] {
    return Gender.map((Gender) => ({
      value: Gender.ID,
      label: Gender.Name,
    }));
  }

  function PositionToSelectItems(
    Position: { ID: number; Name: string }[]
  ): ItemList[] {
    return Position.map((Position) => ({
      value: Position.ID,
      label: Position.Name,
    }));
  }

  async function onValid(formData: z.infer<typeof formEmployee>) {
    const employeeData: Employee = {
      ...formData,
    };

    const res = await http.Post<Employee, Employee>("/employee", employeeData);
    if (res.ok) {
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(employeeData, null, 2)}
            </code>
          </pre>
        ),
        duration: 1500,
      });
    }
  }
  return (
    <div className="relative ">
      <section className="w-2/5 h-full  bg-cover bg-center absolute   	">
        <img
          src={HealthImage}
          className="w-full h-full object-cover rounded "
          alt="Health"
        />
      </section>

      <div className="flex justify-end mt-8">
        <Form
          className="flex justify-items-center gap-4 "
          validator={formEmployee}
          onValid={onValid}
          onInvalid={console.log}
          fields={({ form }) => (
            <div className="flex flex-col ">
              <h1 className="text-3xl font-black text-primary  mt-9 mx-32 text-center">
                เพิ่มข้อมูลพนักงาน
              </h1>
              {precede && (
                <>
                  <div className="flex gap-14 mx-64 mt-6">
                    <Label className="text-2xl text-primary ">
                      คำนำหน้า:<span className="text-red-500">*</span>
                    </Label>
                    <Form.Select
                      valueAsNumber
                      className="h-14 px-16 text-xl text-primary"
                      useForm={form}
                      items={PrecedeToSelectItems(precede)}
                      name="PrecedeID"
                      placeholder="Choose your preceed"
                    />
                  </div>
                </>
              )}

              <Label className="flex text-primary text-2xl mx-64 mt-8 ">
                ชื่อ:<span className="text-red-500">*</span>
                <Form.Input
                  className="w-3/4 h-14 px-4 ml-12 border rounded-md text-1xl focus:outline-none bg-white focus:border-black"
                  useForm={form}
                  name="FirstName"
                  type="text"
                ></Form.Input>
              </Label>
              <Label className="flex text-2xl mt-6 text-primary mx-64 ">
                นามสกุล:<span className="text-red-500">*</span>
                <Form.Input
                  className="w-3/4 h-14 px-4 ml-12 border rounded-md text-1xl focus:outline-none bg-white focus:border-black"
                  useForm={form}
                  name="LastName"
                  type="text"
                ></Form.Input>
              </Label>

              {gender && (
                <>
                  <div className="flex gap-16 mx-64 mt-6">
                    <Label className="text-2xl text-primary flex">
                      เพศ: <span className="text-red-500">*</span>
                    </Label>
                    <Form.Select
                      valueAsNumber
                      className="h-14 px-16 text-xl text-primary"
                      useForm={form}
                      items={GenderToSelectItems(gender)}
                      name="GenderID"
                      placeholder="Choose your gender"
                    />
                  </div>
                </>
              )}

              <div className="flex">
                <Label className=" text-2xl text-primary mx-64 flex mt-6">
                  วันเกิด:<span className="text-red-500 ">*</span>
                  <div className=" px-16 ">
                    <Form.DatePicker
                      className="w-96 h-14 text-xl text-primary"
                      useForm={form}
                      name="DayOfBirth"
                    />
                  </div>
                </Label>
              </div>

              {position && (
                <>
                  <div className="flex gap-16 mx-64 mt-6">
                    <Label className="text-2xl text-primary flex">
                      ตำแหน่ง: <span className="text-red-500">*</span>
                    </Label>
                    <Form.Select
                      valueAsNumber
                      className="h-14 px-16 text-xl text-primary"
                      useForm={form}
                      items={PositionToSelectItems(position)}
                      name="PositionID"
                      placeholder="Choose your position"
                    />
                  </div>
                </>
              )}

              <Label className="flex text-primary text-2xl mx-64 mt-8">
                เบอร์โทร:<span className="text-red-500">*</span>
                <Form.Input
                  className="w-3/4 h-14 px-4 ml-12 border rounded-md text-1xl focus:outline-none bg-white focus:border-black"
                  useForm={form}
                  name="Phone"
                  type="text"
                ></Form.Input>
              </Label>
              <Label className="flex text-2xl mt-6 text-primary mx-64 ">
                อีเมล:<span className="text-red-500">*</span>
                <Form.Input
                  className="w-3/4 h-14 px-4 ml-12 border rounded-md text-1xl focus:outline-none bg-white focus:border-black"
                  useForm={form}
                  name="Email"
                  type="text"
                ></Form.Input>
              </Label>
              <div className="mx-64 mt-6">
                <Button
                  type="submit"
                  className="w-48 h-12 text-2xl  text-center bg-green-600 rounded-md	mt-5 mx-16	text-primary text-white	 	"
                >
                  บันทึกข้อมูล
                </Button>

                <Button
                  type="submit"
                  className="w-48 h-12 text-2xl  text-center bg-red-600 rounded-md	mt-5 mx-16	text-primary text-white	 	"
                >
                  ยกเลิก
                </Button>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default EmployeePage;
