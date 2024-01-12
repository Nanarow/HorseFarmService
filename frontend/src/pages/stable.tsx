import { z } from "zod";
import { http } from "@src/services/httpRequest";
import Form from "@shadcn/simplify/form";
//import { Stable } from "../interfaces";
import { useToast } from "@shadcn/ui/use-toast";
//import { useEffect, useState} from "react";
import StableImage from "./../assets/stable4.jpg"
import { Label } from "@shadcn/ui/label";
import { Button } from "@shadcn/ui/button";
import { useAuth } from "@src/providers/authProvider";
import { Tooltip } from "@shadcn/simplify/tooltip";
import { LogOutIcon} from 'lucide-react';
import { stableFormSchema } from "@src/validator";
import { ChevronRightCircle } from 'lucide-react';
import { Link } from "react-router-dom";
//import { Dialog } from "@radix-ui/react-dialog";
//import StableList from "@src/components/Stable/StableList";

const StablePage = () => {
  const { toast } = useToast();
  const { logout } = useAuth();
  // const [ stables, setStables] = useState<Stable[]>([]);

  // async function fetchStables() {
  //   const res = await http.Get<Stable[]>("/stables");
  //   if (res.ok) {
  //     setStables(res.data);
  //   }
  // }

  // useEffect(() => {
  //   return () => {
  //     fetchStables();
  //   }
  // },[])

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
    //fetchStables()
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
              <div className="grid grid-cols-3 gap-4 mt-5">
                <Label className="text-xl text-primary">Date of Maintenance<span className="text-red-500">*</span></Label> 
                  <Form.DatePicker
                    className="col-span-3 font-extralight"
                    useForm={form}
                    name="Maintenance"
                  />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Label className="text-xl text-primary">Date of Cleaning<span className="text-red-500">*</span></Label>
                  <Form.DatePicker
                    className="col-span-3 font-extralight"
                    useForm={form}
                    name="Cleaning"
                  />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Label className="text-xl text-primary">Temperature<span className="text-red-500">*</span></Label>
                  <Form.Input
                    className="col-span-3 font-extralight"
                    useForm={form}
                    name="Temperature"
                    type="number"
                  ></Form.Input>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Label className="text-xl text-primary">Humidity<span className="text-red-500">*</span></Label>
                  <Form.Input
                    className="col-span-3 font-extralight"
                    useForm={form}
                    name="Humidity"
                    type="number"
                  ></Form.Input>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Label className="text-xl text-primary">Description<span className="text-red-500">*</span></Label>
                  <Form.Input
                    className="col-span-3 font-extralight"
                    useForm={form}
                    name="Description"
                    type="text"
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
