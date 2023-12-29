import Form from "@shadcn/simplify/form";
import { useState } from "react";
import { TourRegistration } from "../../interfaces";
import { http } from "../../services/httpRequest";
import { useToast } from "@shadcn/ui/use-toast";

import { Button, Label } from "@shadcn/ui";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shadcn/ui/dialog";
import { ToItemList } from "@src/utils";
import { useAuth } from "@src/providers/authProvider";
import { Edit } from "lucide-react";
import { TourFormData, tourFormSchema } from "@src/validator";
import { useTourPlan, useTourType } from "@src/hooks";
import { Skeleton } from "@shadcn/ui/skeleton";
interface Props {
  tour: TourRegistration;
  onSave(): void;
}
const TourEdit = ({ tour, onSave }: Props) => {
  const { getUser } = useAuth();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const { tourTypes } = useTourType();
  const { plans } = useTourPlan();

  async function onValid(formData: TourFormData) {
    const newTour = {
      ...formData,
      UserID: getUser().ID,
    };
    const res = await http.Put<string>("/tours", tour.ID!, newTour);
    if (res.ok) {
      onSave();
      setOpen(false);
      toast({
        title: res.data,
        duration: 1500,
      });
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Edit className="text-yellow-500 abs-center hover:scale-110 cursor-pointer" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Edit Tour Registration</DialogTitle>
          <DialogDescription>
            Make changes to your Registration here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form
          className="grid gap-2 mt-4"
          validator={tourFormSchema}
          onValid={onValid}
          onInvalid={(data) => console.log(data)}
          fields={({ form, errors }) => (
            <>
              <div className="grid grid-cols-4 items-center">
                <Form.Label>Tour Date</Form.Label>
                <Form.DatePicker
                  useForm={form}
                  name="Date"
                  defaultValue={new Date(tour.Date)}
                  className="col-span-3"
                />
                <Form.Error
                  field={errors.Date}
                  className="col-span-3 col-start-2 mt-2"
                />
              </div>

              <div className="grid grid-cols-4 items-center">
                <Form.Label>Type of tour</Form.Label>
                {tourTypes.length > 0 ? (
                  <Form.Select
                    defaultValue={String(tour.TourType.ID)}
                    valueAsNumber
                    useForm={form}
                    items={ToItemList(tourTypes)}
                    name="TourTypeID"
                    placeholder="Pick type of tour"
                    className="col-span-3"
                  />
                ) : (
                  <Skeleton className=" h-9 w-full" />
                )}
                <Form.Error
                  field={errors.TourTypeID}
                  className="col-span-3 col-start-2 mt-2"
                />
              </div>
              <div className="grid grid-cols-4 items-center">
                <Form.Label>Plan</Form.Label>
                {plans.length > 0 ? (
                  <Form.Select
                    defaultValue={String(tour.Plan.ID)}
                    valueAsNumber
                    useForm={form}
                    items={ToItemList(plans)}
                    name="PlanID"
                    placeholder="Pick your plan"
                    className="col-span-3"
                  />
                ) : (
                  <Skeleton className=" h-9 w-full" />
                )}
                <Form.Error
                  field={errors.PlanID}
                  className="col-span-3 col-start-2 mt-2"
                />
              </div>

              <div className="grid grid-cols-4 items-center">
                <Form.Label>Email</Form.Label>
                <Form.Input
                  useForm={form}
                  name="Email"
                  type="email"
                  defaultValue={tour.Email}
                  className="col-span-3"
                />
                <Form.Error
                  field={errors.Email}
                  className="col-span-3 col-start-2 mt-2"
                />
              </div>
              <div className="grid grid-cols-4 items-center">
                <Form.Label>Participants</Form.Label>
                <Form.Input
                  useForm={form}
                  name="Participants"
                  type="number"
                  defaultValue={tour.Participants}
                  className="col-span-3"
                />
                <Form.Error
                  field={errors.Participants}
                  className="col-span-3 col-start-2 mt-2"
                />
              </div>
              <div className=" grid grid-cols-4 items-center">
                <Label>Tour Name</Label>
                <Form.Input
                  useForm={form}
                  name="Name"
                  type="text"
                  defaultValue={tour.Name}
                  className="col-span-3"
                />
              </div>
            </>
          )}
        >
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Close</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TourEdit;
