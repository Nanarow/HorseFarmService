import { z } from "zod";
import { Button } from "@shadcn/ui/button";
import { Position, Precede, Gender, Employee } from "../interfaces";
import { http } from "../services/httpRequest";
import { useToast } from "@shadcn/ui/use-toast";
import { useEffect, useState } from "react";
import Form, { ItemList } from "@shadcn/simplify/form";
import { Label } from "@shadcn/ui";
import EmployeeImage from "./../assets/healthbg.jpg";
import { ChevronLeftCircle} from 'lucide-react';
import { Link } from "react-router-dom";
import { Tooltip } from "@shadcn/simplify/tooltip";


const EmployeePage = () => {
  const { toast } = useToast();
  const formEmployee = z.object({
    FirstName: z.string().min(2, "FirstName must be at least 2 characters"),
    LastName: z.string().min(2, "Tooth must be at least 2 characters"),
    Email: z.string().email("Please enter a valid email"),
    Phone: z.string().max(10, "Phone must be at least 10 characters"),
    Password: z
      .string()
      .min(2, "Password must be at least 8 characters long")
      .max(20, "Password must be at most 20 characters long"),
    DayOfBirth: z.date().max(new Date(), "Date must be in the past"),
    PositionID: z.number(),
    PrecedeID: z.number(),
    GenderID: z.number(),
  });

  const [position, setPosition] = useState<Position[] | undefined>(undefined);
  const [precede, setPrecede] = useState<Precede[] | undefined>(undefined);
  const [gender, setGender] = useState<Gender[] | undefined>(undefined);
  // const [formData, setFormData] = useState<Employee>
  useEffect(() => {
    async function fetchPosition() {
      const res = await http.Get<Position[]>("/employees/positions");
      if (res.ok) {
        setPosition(res.data);
      }
    }

    async function fetchPrecede() {
      const res = await http.Get<Precede[]>("/employees/precedes");
      if (res.ok) {
        setPrecede(res.data);
      }
    }

    async function fetchGender() {
      const res = await http.Get<Gender[]>("/employees/genders");
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

    const res = await http.Post<Employee, Employee>("/employees", employeeData);
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

    // const resetForm = () => {
    //   formData({
    //     FirstName: '',
    //     LastName: '',
    //     Email: '',
    //     Phone: '',
    //     Password: '',
    //     DayOfBirth: '',
    //     PositionID:  '',
    //     PrecedeID:  '',
    //     GenderID: '',
    //     // Reset other fields as needed
    //   });
    // };
    
  }
  return (
    <div className="relative ">
      <section className="w-2/5 h-full  bg-cover bg-center absolute  	">
        <img
          src={EmployeeImage}
          className="w-full h-full object-cover rounded "
          alt="Health"
        />
      </section>
      
    <div className="flex justify-end mt-8">
      

   
      <Form
        className="flex justify-items-center gap-2 "
        validator={formEmployee}
        onValid={onValid}
        onInvalid={console.log}
        fields={({ form }) => (

          <div className="flex flex-col ">

            <h1 className="text-4xl font-black text-primary  mt-2 mx-32 text-center">
            เพิ่มข้อมูลพนักงาน
            </h1>
            {precede && (
              <>
                <div className="flex gap-10 mx-64 mt-6"> 
                  <Label className="text-xl text-primary w-48 ">
                    คำนำหน้า:<span className="text-red-500">*</span>
                  </Label>
                  <Form.Select
                    valueAsNumber
                    className="h-14 px-10 ml-12 text-xl text-primary border rounded-md text-1xl focus:outline-none bg-white focus:border-black"
                    useForm={form}
                    items={PrecedeToSelectItems(precede)}
                    name="PrecedeID"
                    placeholder="Choose your precede"
                    />
                  </div>
                </>
              )}

              <Label className="flex text-primary text-xl mx-64 mt-8 ">
                ชื่อ:<span className="text-red-500">*</span>
                <Form.Input
                  className="w-3/4 h-14  ml-24 border rounded-md text-1xl focus:outline-none bg-white focus:border-black"
                  useForm={form}
                  name="FirstName"
                  type="text"
                ></Form.Input>
              </Label>
              <Label className="flex text-xl mt-6 text-primary mx-64 ">
                นามสกุล:<span className="text-red-500">*</span>
                <Form.Input
                  className="w-3/4 h-14 ml-14 border rounded-md text-1xl focus:outline-none bg-white focus:border-black"
                  useForm={form}
                  name="LastName"
                  type="text"
                ></Form.Input>
              </Label>

              {gender && (
                <>
                  <div className="flex gap-24 mx-64 mt-6">
                    <Label className="text-xl text-primary flex">
                      เพศ: <span className="text-red-500">*</span>
                    </Label>
                    <Form.Select
                      valueAsNumber
                      className="h-14 px-10 text-xl text-primary border rounded-md focus:outline-none bg-white focus:border-black"
                      useForm={form}
                      items={GenderToSelectItems(gender)}
                      name="GenderID"
                      placeholder="Choose your gender"
                    />
                  </div>
                </>
              )}

              <div className="flex">
                <Label className=" text-xl text-primary mx-64 flex mt-6">
                  วันเกิด:<span className="text-red-500 ">*</span>
                  <div className=" px-16 ml-4">
                    <Form.DatePicker
                      className="w-96 h-14  text-xl "
                      useForm={form}
                      name="DayOfBirth"
                    />
                  </div>
                </Label>
              </div>

              {position && (
                <>
                  <div className="flex gap-16 mx-64 mt-6">
                    <Label className="text-xl text-primary flex">
                      ตำแหน่ง: <span className="text-red-500">*</span>
                    </Label>
                    <Form.Select
                      valueAsNumber
                      className="h-14 px-14 text-xl text-primary border rounded-md  focus:outline-none bg-white focus:border-black"
                      useForm={form}
                      items={PositionToSelectItems(position)}
                      name="PositionID"
                      placeholder="Choose your position"
                    />
                  </div>
                </>
              )}

              <Label className="flex text-primary text-xl mx-64 mt-6 ">
                เบอร์โทร:<span className="text-red-500">*</span>
                <Form.Input
                  className="w-3/4 h-14 px-4 ml-16 border rounded-md text-1xl focus:outline-none bg-white focus:border-black"
                  useForm={form}
                  name="Phone"
                  type="text"
                ></Form.Input>
              </Label>
              <Label className="flex text-xl mt-6 text-primary mx-64  ">
                อีเมล:<span className="text-red-500">*</span>
                <Form.Input
                  className="w-3/4 h-14 ml-24 border rounded-md text-1xl focus:outline-none bg-white focus:border-black"
                  useForm={form}
                  name="Email"
                  type="text"
                ></Form.Input>
              </Label>
              <Label className="flex text-xl mt-6 text-primary mx-64 ">
                Password:<span className="text-red-500">*</span>
                <Form.Input
                  className="w-3/4 h-14 ml-14 border rounded-md text-1xl focus:outline-none bg-white focus:border-black"
                  useForm={form}
                  name="Password"
                  type="text"
                ></Form.Input>
              </Label>
              <div className="mx-64 mt-2">
                <Button
                  type="submit"
                  className="w-48 h-12 text-xl  text-center bg-green-600 rounded-md	mt-5 mx-16	text-primary text-white	 	"
                >
                  บันทึกข้อมูล
                </Button>

                <Button
                  type="reset"
                  className="w-48 h-12 text-xl  text-center bg-red-600 rounded-md	mt-5 mx-16	text-primary text-white	 	"
                >
                  ยกเลิก
                </Button>

                <Link to="/employee/list">
                  <Tooltip content={() => <span>Back to Employee List</span>}>
                  <ChevronLeftCircle  className="fixed bottom-4 right-16 w-10 h-10 text-red-500 cursor-pointer"/>
                  </Tooltip>
                </Link>

              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default EmployeePage;
