import { z } from "zod";
import { http } from "@src/services/httpRequest";
import Form from "@shadcn/simplify/form";
import { Employee } from "../interfaces";
import { useToast } from "@shadcn/ui/use-toast";
import { useEffect, useState} from "react";
import StableImage from "./../assets/stable4.jpg"
import { Label } from "@shadcn/ui/label";
import { Button } from "@shadcn/ui/button";
import { useAuth } from "@src/providers/authProvider";
import { Tooltip } from "@shadcn/simplify/tooltip";
import { LogOutIcon} from 'lucide-react';
import { stableFormSchema } from "@src/validator";
import { ChevronRightCircle } from 'lucide-react';
import { Link } from "react-router-dom";
import { ToItemList } from "@src/utils";

const StablePage = () => {
  const { toast } = useToast();
  const { logout } = useAuth();
  const [ employees, setEmployees] = useState<Employee[]>([]);

  async function fetchEmployees() {
    const res = await http.Get<Employee[]>("/employees");
    if (res.ok) {
      setEmployees(res.data);
    }
  }

  useEffect(() => {
    return () => {
      fetchEmployees();
    }
  },[])

  async function onValid(formData: z.infer<typeof stableFormSchema>) {    
    console.log(formData)

    const res = await http.Post<string>("/stables", formData);
    if (res.ok) {
      //setOpen(false);
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
    fetchEmployees()
  }

  function empTolist() {
    const res = employees.map((emp) => {
      return {ID:emp.ID!,Name:emp.FirstName + " " + emp.LastName}
    })
    return res
  }

  return (
    <div className="w-full h-screen flex flex-col">
      <section className="w-2/5 h-screen  bg-cover bg-center absolute">
        <img 
          className="w-full h-full object-cover rounded" 
          src={StableImage}
          alt="Stable"
        /> 
      </section>
      <div className="flex flex-row-reverse mt-4 mr-4 text-red-500">
        <Tooltip content={("Logout")}>
          <LogOutIcon onClick={logout}/>
        </Tooltip>
      </div>
      <h1 className="flex flex-row-reverse text-2xl font-black text-center mr-72">Stable Inspection Record</h1>
      <h3 className="flex flex-row-reverse text-lg font-black text-center mr-80">บันทึกการตรวจสอบคอกม้า</h3>
      <div className="flex flex-row-reverse mr-48">
        <Form
          className="flex flex-col justify-center mt-7 gap-4"
          validator={stableFormSchema}
          onValid={onValid}
          onInvalid={(data) => console.log(data)}
          fields={({ form }) => ( 
            <>
              <div className="grid grid-cols-3 gap-2">
                {employees.length > 0 && (
                  <>
                    <Label className="text-xl text-primary">Employee<span className="text-red-500">*</span></Label>
                    <Form.Select
                      valueAsNumber
                      useForm={form}
                      items={ToItemList(empTolist())}
                      name="EmployeeID"
                      className="col-span-3 font-extralight"  
                      placeholder="Select your Employee"
                    ></Form.Select> 
                  </>
                )}
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Label className="text-xl text-primary">Date of Maintenance<span className="text-red-500">*</span></Label> 
                  <Form.DatePicker
                    className="col-span-3 font-extralight"
                    useForm={form}
                    name="Maintenance"
                  />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Label className="text-xl text-primary">Date of Cleaning<span className="text-red-500">*</span></Label>
                  <Form.DatePicker
                    className="col-span-3 font-extralight"
                    useForm={form}
                    name="Cleaning"
                  />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Label className="text-xl text-primary">Temperature<span className="text-red-500">*</span></Label>
                  <Form.Input
                    className="col-span-3 font-extralight"
                    useForm={form}
                    name="Temperature"
                    type="number"
                    placeholder="Input your Temperature"
                  ></Form.Input>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Label className="text-xl text-primary">Humidity<span className="text-red-500">*</span></Label>
                  <Form.Input
                    className="col-span-3 font-extralight"
                    useForm={form}
                    name="Humidity"
                    type="number"
                    placeholder="Input your Huminity"
                  ></Form.Input>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Label className="text-xl text-primary">Description<span className="text-red-500">*</span></Label>
                  <Form.Input
                    className="col-span-3 font-extralight"
                    useForm={form}
                    name="Description"
                    type="text"
                    placeholder="Input your Description"
                  ></Form.Input>
              </div>
              <Button 
                variant="outline" 
                type="submit" 
                className=" bg-green-500 text-center text-primary text-white ml-auto mt-5 w-24"
                >Save
              </Button>   
              <Link to="/stable/list">
                <Tooltip content={"Stable List"}>
                  <ChevronRightCircle className=" text-red-500 fixed bottom-4 right-10 w-7 h-7"></ChevronRightCircle>
                </Tooltip>
              </Link>           
            </>
          )}>
        </Form>
      </div>
    </div>
  );
};

export default StablePage;
