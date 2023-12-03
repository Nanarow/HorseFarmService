import Form from "@shadcn/simplify/form";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Plan, TourRegistration, TourType } from "../../interfaces";
import { http } from "../../services/httpRequest";
import { useToast } from "@shadcn/ui/use-toast";

import { Button, Label } from "@shadcn/ui";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@shadcn/ui/dialog";
import { ToItemList } from "@src/utils";
interface Props {
  tour: TourRegistration;
}
const TourEdit = ({ tour }: Props) => {
  const { toast } = useToast();
  const formSchema = z.object({
    Name: z.string(),
    Date: z.date(),
    Participants: z.number(),
    TourTypeID: z.number(),
    PlanID: z.number(),
    Email: z.string().email(),
  });
  const [tourType, setTourType] = useState<TourType[] | undefined>(undefined);
  const [plans, setPlans] = useState<Plan[] | undefined>(undefined);
  async function fetchTour() {
    const res = await http.Get<TourType[]>("/tour/types");
    if (res.ok) {
      setTourType(res.data);
    }
  }
  async function fetchPlan() {
    const res = await http.Get<Plan[]>("/plans");
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
    const newTour: TourRegistration = {
      ...formData,
      UserID: 0,
    };
    const res = await http.Put<TourRegistration, TourRegistration>(
      "/tours",
      tour.ID!,
      newTour
    );
    if (res.ok) {
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(tour, null, 2)}</code>
          </pre>
        ),
        duration: 1500,
      });
    }
  }
  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Edit Tour Registration</DialogTitle>
        <DialogDescription>
          Make changes to your Registration here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <Form
        className="flex flex-col gap-2 mt-4"
        validator={formSchema}
        onValid={onValid}
        onInvalid={(data) => console.log(data)}
        fields={({ form }) => (
          <>
            <div className="flex">
              <Label>
                Tour Date<span className="text-red-500">*</span>
              </Label>
              <Form.DatePicker
                useForm={form}
                name="Date"
                // defaultValue={tour.Date}
              ></Form.DatePicker>
            </div>
            <div className="flex">
              {tourType && (
                <>
                  <Label>
                    Type of tour<span className="text-red-500">*</span>
                  </Label>
                  <Form.Select
                    defaultValue={String(tour.TourTypeID)}
                    valueAsNumber
                    useForm={form}
                    items={ToItemList(tourType)}
                    name="TourTypeID"
                    placeholder="Pick type of tour"
                  ></Form.Select>
                </>
              )}
            </div>
            <div className="flex">
              {plans && (
                <>
                  <Label>
                    Plan<span className="text-red-500">*</span>
                  </Label>
                  <Form.Select
                    defaultValue={String(tour.PlanID)}
                    valueAsNumber
                    useForm={form}
                    items={ToItemList(plans)}
                    name="PlanID"
                    placeholder="Pick your plan"
                  ></Form.Select>
                </>
              )}
            </div>

            <div className="flex">
              <Label>
                Email<span className="text-red-500">*</span>
              </Label>
              <Form.Input
                useForm={form}
                name="Email"
                type="email"
                defaultValue={tour.Email}
              ></Form.Input>
            </div>
            <div className=" flex items-center">
              <Label>
                Participants<span className="text-red-500">*</span>
              </Label>
              <Form.Input
                useForm={form}
                name="Participants"
                type="number"
                defaultValue={tour.Participants}
              ></Form.Input>
            </div>
            <div className=" flex">
              <Label>Tour Name</Label>
              <Form.Input
                useForm={form}
                name="Name"
                type="text"
                defaultValue={tour.Name}
              ></Form.Input>
            </div>

            {/* <Form.SubmitButton useForm={form}>Registration</Form.SubmitButton> */}
          </>
        )}
      >
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </Form>
      <DialogClose asChild>
        <Button type="submit" variant="secondary">
          Close
        </Button>
      </DialogClose>
    </DialogContent>
  );
};

export default TourEdit;
