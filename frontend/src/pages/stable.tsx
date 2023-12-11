import React, { useEffect, useState } from "react";
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

  async function onValid(formData: z.infer<typeof formStable>) {    
    const stableData: Stable = {
      ...formData,
      ID: 1,
      Maintenance: new Date(),
      Cleaning: new Date(),
      Temperature: 10,
      Humidity: 10,
      Description: "",
    };

    const res = await http.Post<Stable, Stable>("/stables", stableData);
    if (res.ok) {
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(stableData, null, 2)}
            </code>
          </pre>
        ),
        duration: 1500,
      });
    }
  }
  return (
    <div className="relative">
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
     
  );
};

export default StablePage;
