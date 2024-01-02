import { http } from "../services/httpRequest";
import { useAuth } from "@src/providers/authProvider";
import { useToast } from "@shadcn/ui/use-toast";
import Form from "@shadcn/simplify/form";
import { LogOut } from "lucide-react";
import { Label } from "@shadcn/ui";
import { Button } from "@shadcn/ui/button";
import { Tooltip } from "@shadcn/simplify/tooltip";
import { FoodFormData, foodFormSchema } from "@src/validator";

const Food = () => {
  const { logout } = useAuth();
  const { toast } = useToast();
  const { getEmployee } = useAuth();
  async function onValid(formData: FoodFormData) {
    const data = {
      ...formData,
      EmployeeID: getEmployee().ID,
    };

    const res = await http.Post<string>("/foods", data);
    if (res.ok) {
      toast({
        title: res.data,
        duration: 1500,
      });
    } else {
      toast({
        title: res.error,
        duration: 1500,
      });
    }
  }
  return (
    <div className="relative">
      <section className="w-2/5 h-full bg-center absolute">
        <img>
        </img>
      </section>
      <Form
        className="flex justify-end mt-7"
        validator={foodFormSchema}
        onValid={onValid}
        onInvalid={console.log}
        fields={({ form }) => (
          <div className="flex flex-col relative">
            <h1 className="text-4xl font-black text-primary mb-2 mt-8 text-center">
              Food
            </h1>
            <div className="flex">
              <Label className="text-2xl text-primary mx-64 flex mt-16">
                Date
                <span className="text-red-500">*</span>
                <div className="px-14">
                  <Form.DatePicker
                    className="w-96 h-14"
                    useForm={form}
                    name="Date"
                  />
                </div>
              </Label>
            </div>
            <div className="flex flex-col relative">
              <Label className="flex text-primary text-2xl mx-64 mt-6">
                Fat:<span className="text-red-500">*</span>
                <Form.Input className="w-3/4 h-14 px-2 ml-12 border rounded-md text-1xl focus:outline-none bg-white focus:border-black" useForm={form} name="Fat" type="text"></Form.Input>
              </Label>
              <Label className="flex text-primary text-2xl mx-64 mt-6">
                Carbohydrate:<span className="text-red-500">*</span>
                <Form.Input className="w-3/4 h-14 px-2 ml-12 border rounded-md text-1xl focus:outline-none bg-white focus:border-black" useForm={form} name="Carbohydrate" type="text"></Form.Input>
              </Label>
              <Label className="flex text-primary text-2xl mx-64 mt-6">
                Protein:<span className="text-red-500">*</span>
                <Form.Input className="w-3/4 h-14 px-2 ml-12 border rounded-md text-1xl focus:outline-none bg-white focus:border-black" useForm={form} name="Protein" type="text"></Form.Input>
              </Label>
              <Label className="flex text-primary text-2xl mx-64 mt-6">
                Vitamin:<span className="text-red-500">*</span>
                <Form.Input className="w-3/4 h-14 px-2 ml-12 border rounded-md text-1xl focus:outline-none bg-white focus:border-black" useForm={form} name="Vitamin" type="text"></Form.Input>
              </Label>
              <Label className="flex text-primary text-2xl mx-64 mt-6">
                Mineral:<span className="text-red-500">*</span>
                <Form.Input className="w-3/4 h-14 px-2 ml-12 border rounded-md text-1xl focus:outline-none bg-white focus:border-black" useForm={form} name="Mineral" type="text"></Form.Input>
              </Label>
              <Label className="flex text-primary text-2xl mx-64 mt-6">
                Forage:<span className="text-red-500">*</span>
                <Form.Input className="w-3/4 h-14 px-2 ml-12 border rounded-md text-1xl focus:outline-none bg-white focus:border-black" useForm={form} name="Forage" type="text"></Form.Input>
              </Label>
              <Button
                type="submit"
                className="w-48 h-12 text-2xl text-center rounded-md mt-7 mx-auto text-primary"
              >Save
              </Button>
            </div>
              <Tooltip content={"Log Out"}>
              <LogOut
                onClick={() => {
                  console.log("logout");
                  logout();
                }}
                className="fixed bottom-9 right-16 w-10 h-10 cursor-pointer text-red-500"
              />
              </Tooltip>
          </div>
        )}
      >
      </Form>
    </div>
  );
};

export default Food;
