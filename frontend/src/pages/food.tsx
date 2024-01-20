import { http } from "../services/httpRequest";
import { useAuth } from "@src/providers/authProvider";
import { useToast } from "@shadcn/ui/use-toast";
import Form from "@shadcn/simplify/form";
import { LogOut } from "lucide-react";
import { Button, Label } from "@shadcn/ui";
import { Tooltip } from "@shadcn/simplify/tooltip";
import { FoodFormData, foodFormSchema } from "@src/validator";
import { useRefresh } from "@src/hooks";
import FoodImage from "../assets/foodbg2.jpg";
import { Card } from "@shadcn/ui/card";

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
    <div className="w-full h-screen relative">
      <section className="w-full h-full absolute z-[-1]">
        <img
          src={FoodImage}
          className="w-full h-full abs-center object-cover rounded "
          alt="Food"
        />
      </section>
      <Card className=" backdrop-blur-sm bg-white supports-[backdrop-filter]:bg-background/60 max-w-lg abs-center w-full border-0">
        <div className="w-full justify-center items-center flex flex-col">
          <Label className="text-3xl font-bold text-center mt-4">
            Food Quality
          </Label>
          <Form
            className="flex flex-col w-full px-8 justify-center gap-2 mt-2 mb-4 pb-2"
            validator={foodFormSchema}
            onValid={onValid}
            onInvalid={(data) => console.log(data)}
            fields={({ form, errors }) => (
              <>
                <Form.Label>Date</Form.Label>
                <Form.DatePicker
                  useForm={form}
                  name="Date"
                  className="border-gray-600"
                ></Form.DatePicker>
                <Form.Error field={errors.Date} />
                <Form.Label>Fat</Form.Label>
                <Form.Input
                  useForm={form}
                  name="Fat"
                  type="text"
                  className="border-gray-600"
                />
                <Form.Error field={errors.Fat} />
                <Form.Label>Carbohydrate</Form.Label>
                <Form.Input
                  useForm={form}
                  name="Carbohydrate"
                  type="text"
                  className="border-gray-600"
                />
                <Form.Error field={errors.Carbohydrate} />
                <Form.Label>Protein</Form.Label>
                <Form.Input
                  useForm={form}
                  name="Protein"
                  type="text"
                  className="border-gray-600"
                />
                <Form.Error field={errors.Protein} />
                <Form.Label>Vitamin</Form.Label>
                <Form.Input
                  useForm={form}
                  name="Vitamin"
                  type="text"
                  className="border-gray-600"
                />
                <Form.Error field={errors.Vitamin} />
                <Form.Label>Mineral</Form.Label>
                <Form.Input
                  useForm={form}
                  name="Mineral"
                  type="text"
                  className="border-gray-600"
                />
                <Form.Error field={errors.Mineral} />
                <Form.Label>Forage</Form.Label>
                <Form.Input
                  useForm={form}
                  name="Forage"
                  type="text"
                  className="border-gray-600"
                />
                <Form.Error field={errors.Forage} />
                <p
                  onClick={refresh}
                  className="cursor-pointer underline text-sm text-primary ml-2"
                >
                  reset
                </p>
                <Form.SubmitButton useForm={form} className="text-white bg-black hover:text-black hover:bg-secondary">
                  Save
                </Form.SubmitButton>
              </>
            )}
          ></Form>
        </div>
      </Card>
      <div className="absolute right-4 bottom-4 w-8 h-8  cursor-pointer">
        <Tooltip content={"Log Out"} className="bg-white text-primary">
          <Button
            variant={"secondary"}
            onClick={logout}
            size={"icon"}
            className=" bg-white/50"
          >
            <LogOut />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default Food;
