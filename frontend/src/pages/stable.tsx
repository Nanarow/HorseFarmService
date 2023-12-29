//import React, { useEffect, useState } from "react";
import { z } from "zod";
import { http } from "@src/services/httpRequest";
import Form from "@shadcn/simplify/form";
import { Label } from "@radix-ui/react-select";
import { Stable,  } from "../interfaces";
import { useToast } from "@shadcn/ui/use-toast";


const StablePage = () => {
  const { toast } = useToast();

  const formStable = z.object({
    Maintenance: z.date().min(new Date()),
    Cleaning: z.date().min(new Date()),
    Temperature: z.number(),
    Humidity: z.number(),
    Description: z.string(),
  });

  /*const [stables, setStables] = useState<Stable[] | undefined>(undefined);

  async function fetchStables() {
    const res = await http.Get<Stable[]>("/stables");
    if(res.ok){
      setStables(res.data);
    }
  }

  useEffect(() => {
    return () => {
      fetchStables();
      
    }
  })*/

  async function onValid(formData: z.infer<typeof formStable>) {    
    console.log(formData)

    const res = await http.Post<Stable>("/stables", formData);
    if (res.ok) {
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(formData, null, 2)}
            </code>
          </pre>
        ),
        duration: 1500,
      });
    }
  }

  return (
    <div className="w-full h-screen flex flex-col item-center justify-item">
      <h1 className="text-center text-2xl font-sans mt-10 ml-20">ตรวจสอบข้อมูลม้า</h1>
      <div className="ml-10 mt-1 mr-10 flex flex-row-reverse">
        <Form
          className="flex justify-end mt-7"
          validator={formStable}
          onValid={onValid}
          onInvalid={(data) => console.log(data)}
          fields={({ form }) => ( 
            <>
              <div className="flex flex-col">
                <h1 className="text-2xl font-black text-primary mb-2 mt-8 text-center">บันทึกการตรวจสอบคอกม้า</h1>
                <div className="flex">
                  <Label className=" text-2xl text-primary mx-64 flex mt-16">วันที่ซ่อมบำรุง:</Label>
                  <div className=" px-14 ">
                    <Form.DatePicker
                      className="w-96 h-14"
                      useForm={form}
                      name="Maintenance"
                    ></Form.DatePicker>
                  </div>
                </div>
                <div className="flex">
                  <Label className=" text-2xl text-primary mx-64 flex mt-16">วันที่ทำความสะอาด:</Label>
                    <div className=" px-14 ">
                    <Form.DatePicker
                      className="w-96 h-14"
                      useForm={form}
                      name="Cleaning"
                    ></Form.DatePicker>
                  </div>
                </div>  
                <div className="flex">
                  <Label className=" text-2xl text-primary mx-64 flex mt-16">อุณหภูมิ:</Label>
                  <div className=" px-14 ">
                    <Form.Input
                      className="w-96 h-14"
                      useForm={form}
                      name="Temperature"
                      type="number"
                    ></Form.Input>
                  </div>
                </div>
                <div className="flex">
                  <Label className=" text-2xl text-primary mx-64 flex mt-16">ความชื้น:</Label>
                  <div>
                    <Form.Input
                      className="w-96 h-14"
                      useForm={form}
                      name="Humidity"
                      type="number"
                    ></Form.Input>
                  </div>
                </div>
                <div className="flex">
                  <Label className=" text-2xl text-primary mx-64 flex mt-16">หมายเหตุ:</Label>
                  <div>
                    <Form.Input
                      className="w-96 h-14"
                      useForm={form}
                      name="Description"
                      type="text"
                    ></Form.Input>
                  </div>  
                </div>
              </div>
            </>
          )}>
        </Form> 
      </div> 
    </div>
  );
};

export default StablePage;
