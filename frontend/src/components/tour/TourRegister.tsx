import tourImage from "../../assets/tourbg-2.jpg";
import Form from "@shadcn/simplify/form";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Plan, TourType } from "../../interfaces";
import { http } from "../../services/httpRequest";
import { Checkbox, Label } from "@shadcn/ui";
import { useToast } from "@shadcn/ui/use-toast";

import { ArrowRightSquareIcon } from "lucide-react";
import { ToItemList } from "@src/utils";
import { useAuth } from "@src/providers/authProvider";
import { Tooltip } from "@shadcn/simplify/tooltip";
interface Props {
  setTabs: React.Dispatch<React.SetStateAction<string>>;
}
const TourRegister = ({ setTabs }: Props) => {
  const { toast } = useToast();
  const [tourType, setTourType] = useState<TourType[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const { user } = useAuth();
  const [email, setEmail] = useState<undefined | string>(undefined);

  const formSchema = z.object({
    Date: z.date().min(new Date(), "Date must be in the future"),
    Participants: z.number().min(8, "Participants must be at least 8"),
    Email: z.string().email("Invalid email"),
    Name: z.string().optional(),
    TourTypeID: z.number(),
    PlanID: z.number(),
  });

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

  async function onValid(formData: z.infer<typeof formSchema>) {
    const tour = {
      ...formData,
      UserID: user?.ID,
    };
    const res = await http.Post<string>("/tours", tour);
    if (res.ok) {
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(res.data, null, 2)}
            </code>
          </pre>
        ),
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
        <Tooltip content={() => <span>My tours registration</span>} side="left">
          <ArrowRightSquareIcon
            className="absolute top-4 right-8 text-green-500 hover:scale-105"
            onClick={() => setTabs("list")}
          />
        </Tooltip>

        <div className=" w-full h-full max-w-md flex justify-center flex-col py-12 md:px-0">
          <Label className=" text-3xl font-bold text-center">
            Tour Registration
          </Label>
          <Form
            className="flex flex-col gap-2 mt-4"
            validator={formSchema}
            onValid={onValid}
            onInvalid={(data) => console.log(data)}
            fields={({ form }) => (
              <>
                <Label>
                  Tour Date<span className="text-red-500">*</span>
                </Label>
                <Form.DatePicker useForm={form} name="Date"></Form.DatePicker>
                {tourType.length > 0 ? (
                  <>
                    <Label>
                      Type of tour<span className="text-red-500">*</span>
                    </Label>
                    <Form.Select
                      valueAsNumber
                      useForm={form}
                      items={ToItemList(tourType)}
                      name="TourTypeID"
                      placeholder="Pick type of tour"
                    ></Form.Select>
                  </>
                ) : null}
                {plans.length > 0 ? (
                  <>
                    <Label>
                      Plan<span className="text-red-500">*</span>
                    </Label>
                    <Form.Select
                      valueAsNumber
                      useForm={form}
                      items={ToItemList(plans)}
                      name="PlanID"
                      placeholder="Pick your plan"
                    ></Form.Select>
                  </>
                ) : null}

                <Label>
                  Email<span className="text-red-500">*</span>
                </Label>
                <Form.Input
                  useForm={form}
                  name="Email"
                  type="email"
                  value={email}
                  disabled={!!email}
                ></Form.Input>
                <div className="flex gap-2 items-center">
                  <Checkbox
                    onCheckedChange={(s) =>
                      s ? setEmail(user?.Email) : setEmail(undefined)
                    }
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
