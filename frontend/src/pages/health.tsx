import { Button } from "@shadcn/ui/button";
import { Horse, Employee } from "../interfaces";
import { http } from "../services/httpRequest";
import { useEffect, useState } from "react";
import { useToast } from "@shadcn/ui/use-toast";
import Form from "@shadcn/simplify/form";
import HealthImage from "./../assets/health3.jpg";
import { LogOut } from "lucide-react";
import { Tooltip } from "@shadcn/simplify/tooltip";
import { useAuth } from "@src/providers/authProvider";
import { HealthFormData, healthFormSchema } from "@src/validator";
import { ToItemList } from "@src/utils";
import { Card } from "@shadcn/ui/card";

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

  async function onValid(formData: HealthFormData) {
    const res = await http.Post<string>("/healths", formData);
    if (res.ok) {
      toast({
        title: res.data,
        duration: 1500,
        variant: "success",
      });
    }
  }

  return (
    <div className="relative w-full h-screen px-8">
      <section className="w-full h-screen absolute abs-center object-contain">
        <img
          src={HealthImage}
          className="w-full h-screen object-cover rounded mx-auto shadow-sm blur-sm"
          alt="Health"
        />
      </section>

      <div className=" abs-center flex flex-col w-full h-full items-center justify-center px-4">
        <Card className=" bg-zinc-800/50 px-16 py-8 border-none shadow-xl">
          <p className="text-3xl font-bold  bg-white/50 rounded px-4 py-2 text-center">
            บันทึกการตรวจสุขภาพม้า
          </p>
          <Form
            className="grid gap-2 mt-4 "
            validator={healthFormSchema}
            onValid={onValid}
            onInvalid={console.log}
            fields={({ form, errors }) => (
              <>
                <div className="grid grid-cols-4 items-center">
                  <Form.Label className="pr-2">
                    วันที่ทำการตรวจสุขภาพ
                  </Form.Label>
                  <Form.DatePicker
                    className="col-span-3  bg-white focus:border-black"
                    useForm={form}
                    name="Date"
                  />
                  <Form.Error
                    field={errors.Date}
                    className="col-span-3 col-start-2 mt-2"
                  />
                </div>

                {horses && (
                  <div className="grid grid-cols-4 items-center">
                    <Form.Label>ชื่อม้า</Form.Label>
                    <Form.Select
                      valueAsNumber
                      className="col-span-3 focus:outline-none bg-white focus:border-black"
                      useForm={form}
                      items={ToItemList(horses)}
                      name="HorseID"
                      placeholder="Choose horse name"
                    />
                    <Form.Error
                      field={errors.HorseID}
                      className="col-span-3 col-start-2 mt-2"
                    />
                  </div>
                )}
                {employee && (
                  <div className="grid grid-cols-4 items-center">
                    <Form.Label>ผู้ตรวจ</Form.Label>
                    <Form.Select
                      valueAsNumber
                      className="col-span-3 focus:outline-none bg-white focus:border-black"
                      useForm={form}
                      items={ToItemList(
                        employee,
                        (emp) => emp.FirstName + " " + emp.LastName
                      )}
                      name="EmployeeID"
                      placeholder="Choose employee name"
                    />
                    <Form.Error
                      field={errors.EmployeeID}
                      className="col-span-3 col-start-2 mt-2"
                    />
                  </div>
                )}
                <div className="grid grid-cols-4 items-center">
                  <Form.Label>สัญญาณชีพ</Form.Label>
                  <Form.Input
                    className="col-span-3 focus:outline-none bg-white focus:border-black"
                    useForm={form}
                    name="Vital"
                    type="text"
                  />
                  <Form.Error
                    field={errors.Vital}
                    className="col-span-3 col-start-2 mt-2"
                  />
                </div>
                <div className="grid grid-cols-4 items-center">
                  <Form.Label>สุขภาพฟัน</Form.Label>
                  <Form.Input
                    className="col-span-3 focus:outline-none bg-white focus:border-black"
                    useForm={form}
                    name="Tooth"
                    type="text"
                  />
                  <Form.Error
                    field={errors.Tooth}
                    className="col-span-3 col-start-2 mt-2"
                  />
                </div>
                <div className="grid grid-cols-4 items-center">
                  <Form.Label>วัคซีนป้องกัน</Form.Label>
                  <Form.Input
                    className="col-span-3 focus:outline-none bg-white focus:border-black"
                    useForm={form}
                    name="Vaccine"
                    type="text"
                  />
                  <Form.Error
                    field={errors.Vaccine}
                    className="col-span-3 col-start-2 mt-2"
                  />
                </div>
                <div className="grid grid-cols-4 items-center">
                  <Form.Label>ถ่ายพยาธิ</Form.Label>
                  <Form.Input
                    className="col-span-3 focus:outline-none bg-white focus:border-black"
                    useForm={form}
                    name="Parasite"
                    type="text"
                  />
                  <Form.Error
                    field={errors.Parasite}
                    className="col-span-3 col-start-2 mt-2"
                  />
                </div>
                <div className="grid grid-cols-4 items-center">
                  <Form.Label>ตรวจเลือด</Form.Label>
                  <Form.Input
                    className="col-span-3 focus:outline-none bg-white focus:border-black"
                    useForm={form}
                    name="Blood"
                    type="text"
                  />
                  <Form.Error
                    field={errors.Blood}
                    className="col-span-3 col-start-2 mt-2"
                  />
                </div>
                <div className="grid grid-cols-4 items-center">
                  <Form.SubmitButton
                    useForm={form}
                    variant={"success"}
                    className="col-start-2 col-span-3"
                  >
                    บันทึกข้อมูล
                  </Form.SubmitButton>
                </div>
              </>
            )}
          />
        </Card>
      </div>
      <Tooltip content={"Log out"}>
        <Button
          size={"icon"}
          variant={"danger"}
          className="absolute bottom-12 right-16"
          onClick={logout}
        >
          <LogOut />
        </Button>
      </Tooltip>
    </div>
  );
};
export default HealthPage;
