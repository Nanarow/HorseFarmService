import { http } from "../services/httpRequest";
import { useAuth } from "@src/providers/authProvider";
import { useToast } from "@shadcn/ui/use-toast";
import Form from "@shadcn/simplify/form";
import { LogOut } from "lucide-react";
import { Label } from "@shadcn/ui";
import { Button } from "@shadcn/ui/button";
import { Tooltip } from "@shadcn/simplify/tooltip";
import { FoodFormData, foodFormSchema } from "@src/validator";
import { useRefresh } from "@src/hooks";
import FoodImage from "../assets/food1.jpg";

const Food = () => {
  const { refresh } = useRefresh();
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
    <div className="grid lg:grid-cols-2 w-full h-screen">
      <section className="w-full h-full p-2 relative">
      <img
          src={FoodImage}
          className="w-full h-full object-cover rounded "
          alt="Food"
        />
      </section>
      <div className="w-auto justify-center items-center py-2 px-2 relative flex flex-col">
        <Label className="text-3xl font-bold text-center">
          Food
        </Label>
        <Form
          className="flex flex-col w-full px-36 justify-center gap-2 mt-4"
          validator={foodFormSchema}
          onValid={onValid}
          onInvalid={(data) => console.log(data)}
          fields={({ form, errors }) => (
            <>
            <Form.Label>Date</Form.Label>
            <Form.DatePicker useForm={form} name="Date"></Form.DatePicker>
            <Form.Error field={errors.Date}/>
            <Form.Label>Fat</Form.Label>
            <Form.Input useForm={form} name="Fat" type="text"/>
            <Form.Error field={errors.Fat}/>
            <Form.Label>Carbohydrate</Form.Label>
            <Form.Input useForm={form} name="Carbohydrate" type="text"/>
            <Form.Error field={errors.Carbohydrate}/>
            <Form.Label>Protein</Form.Label>
            <Form.Input useForm={form} name="Protein" type="text"/>
            <Form.Error field={errors.Protein}/>
            <Form.Label>Vitamin</Form.Label>
            <Form.Input useForm={form} name="Vitamin" type="text"/>
            <Form.Error field={errors.Vitamin}/>
            <Form.Label>Mineral</Form.Label>
            <Form.Input useForm={form} name="Mineral" type="text"/>
            <Form.Error field={errors.Mineral}/>
            <Form.Label>Forage</Form.Label>
            <Form.Input useForm={form} name="Forage" type="text"/>
            <Form.Error field={errors.Forage}/>
            <Form.SubmitButton useForm={form}>Save</Form.SubmitButton>
            <Button variant={"outline"} onClick={refresh}>Cancle</Button>
            <div className="fixed bottom-9 right-16 w-8 h-8  cursor-pointer">
              <Tooltip content={"Log Out"}>
                <LogOut
                  onClick={() => {
                    console.log("logout");
                    logout();
                  }}
                  />
              </Tooltip>
            </div>
            </>
          )}
        ></Form>
      </div>
    </div>
  );
};

export default Food;
