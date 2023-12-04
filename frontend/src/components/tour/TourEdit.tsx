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
  onSave(): void;
}
const TourEdit = ({ tour, onSave }: Props) => {
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
  async function fetchTourType() {
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
      fetchTourType();
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
      onSave();
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
    <DialogContent className="sm:max-w-[480px]">
      <DialogHeader>
        <DialogTitle>Edit Tour Registration</DialogTitle>
        <DialogDescription>
          Make changes to your Registration here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <Form
        className="grid gap-2 mt-4"
        validator={formSchema}
        onValid={onValid}
        onInvalid={(data) => console.log(data)}
        fields={({ form }) => (
          <>
            <div className="grid grid-cols-4 items-center">
              <Label>
                Tour Date<span className="text-red-500">*</span>
              </Label>
              <Form.DatePicker
                useForm={form}
                name="Date"
                defaultValue={new Date(tour.Date)}
                className="col-span-3"
              ></Form.DatePicker>
            </div>
            <div className="grid grid-cols-4 items-center">
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
                    className="col-span-3"
                  ></Form.Select>
                </>
              )}
            </div>
            <div className="grid grid-cols-4 items-center">
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
                    className="col-span-3"
                  ></Form.Select>
                </>
              )}
            </div>

            <div className="grid grid-cols-4 items-center">
              <Label>
                Email<span className="text-red-500">*</span>
              </Label>
              <Form.Input
                useForm={form}
                name="Email"
                type="email"
                defaultValue={tour.Email}
                className="col-span-3"
              ></Form.Input>
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label>
                Participants<span className="text-red-500">*</span>
              </Label>
              <Form.Input
                useForm={form}
                name="Participants"
                type="number"
                defaultValue={tour.Participants}
                className="col-span-3"
              ></Form.Input>
            </div>
            <div className=" grid grid-cols-4 items-center">
              <Label>Tour Name</Label>
              <Form.Input
                useForm={form}
                name="Name"
                type="text"
                defaultValue={tour.Name}
                className="col-span-3"
              ></Form.Input>
            </div>

            {/* <Form.SubmitButton useForm={form}>Registration</Form.SubmitButton> */}
          </>
        )}
      >
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit">Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </Form>
    </DialogContent>
  );
};

export default TourEdit;
