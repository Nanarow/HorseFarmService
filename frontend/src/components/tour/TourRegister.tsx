import tourImage from "@src/assets/tourbg-2.jpg";
import Form from "@shadcn/simplify/form";
import { useEffect, useState } from "react";
import { Plan, TourType } from "@src/interfaces";
import { http } from "@src/services/httpRequest";
import { Checkbox, Label } from "@shadcn/ui";
import { useToast } from "@shadcn/ui/use-toast";

import { ArrowRightSquareIcon } from "lucide-react";
import { ToItemList } from "@src/utils";
import { useAuth } from "@src/providers/authProvider";
import { Tooltip } from "@shadcn/simplify/tooltip";
import { Skeleton } from "@shadcn/ui/skeleton";
import { TourFormData, tourFormSchema } from "@src/validator";

const TourRegister = ({ onClick }: { onClick: () => void }) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [tourType, setTourType] = useState<TourType[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [email, setEmail] = useState("");
  const [check, setCheck] = useState(false);

  async function fetchTour() {
    const res = await http.Get<TourType[]>("/tours/types");
    if (res.ok) {
      setTourType(res.data);
    }
  }
  async function fetchPlan() {
    const res = await http.Get<Plan[]>("/tours/plans");
    if (res.ok) {
      setPlans(res.data);
    }
  }
  useEffect(() => {
    return () => {
      fetchPlan();
      fetchTour();
    };
  }, []);

  async function onValid(formData: TourFormData) {
    const tour = {
      ...formData,
      UserID: user?.ID,
    };
    const res = await http.Post<string>("/tours", tour);
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
    <div className="grid md:grid-cols-2 w-full h-full">
      <section className="w-full h-full p-2 relative">
        <img
          src={tourImage}
          className="w-full h-full object-cover rounded "
          alt="Tour"
        />
      </section>
      <section className="h-full w-full flex justify-center items-center relative">
        <Tooltip content={"My tours registration"} side="left">
          <ArrowRightSquareIcon
            className="absolute top-4 right-8 text-green-500 hover:scale-105"
            onClick={onClick}
          />
        </Tooltip>

        <div className=" w-full h-full max-w-md flex justify-center flex-col py-12 md:px-0">
          <Label className=" text-3xl font-bold text-center">
            Tour Registration
          </Label>
          <Form
            className="flex flex-col gap-2 mt-4"
            validator={tourFormSchema}
            onValid={onValid}
            onInvalid={(data) => console.log(data)}
            fields={({ form, errors }) => (
              <>
                <Label>
                  Tour Date<span className="text-red-500">*</span>
                </Label>
                <Form.DatePicker useForm={form} name="Date"></Form.DatePicker>
                {errors.Date && (
                  <p className="text-sm text-red-500">{errors.Date.message}</p>
                )}
                <Label>
                  Type of tour<span className="text-red-500">*</span>
                </Label>
                {tourType.length > 0 ? (
                  <Form.Select
                    valueAsNumber
                    useForm={form}
                    items={ToItemList(tourType)}
                    name="TourTypeID"
                    placeholder="Pick type of tour"
                  />
                ) : (
                  <Skeleton className=" h-9 w-full" />
                )}
                <Label>
                  Plan<span className="text-red-500">*</span>
                </Label>
                {plans.length > 0 ? (
                  <Form.Select
                    valueAsNumber
                    useForm={form}
                    items={ToItemList(plans)}
                    name="PlanID"
                    placeholder="Pick your plan"
                  />
                ) : (
                  <Skeleton className=" h-9 w-full" />
                )}

                <Label>
                  Email<span className="text-red-500">*</span>
                </Label>
                <Form.Input
                  useForm={form}
                  name="Email"
                  type="email"
                  value={email}
                  disabled={check}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                ></Form.Input>
                <div className="flex gap-2 items-center">
                  <Checkbox
                    onCheckedChange={(s) => {
                      s && setEmail(user?.Email!);
                      setCheck(s ? true : false);
                    }}
                  ></Checkbox>
                  <p className="text-sm text-muted-foreground">
                    use account email
                  </p>
                </div>
                <Label>
                  Participants<span className="text-red-500">*</span>
                </Label>
                <Form.Input
                  useForm={form}
                  name="Participants"
                  type="number"
                ></Form.Input>
                <Label>Tour Name</Label>
                <Form.Input useForm={form} name="Name" type="text"></Form.Input>

                <Form.SubmitButton useForm={form}>
                  Registration
                </Form.SubmitButton>
              </>
            )}
          ></Form>
        </div>
      </section>
    </div>
  );
};

export default TourRegister;
