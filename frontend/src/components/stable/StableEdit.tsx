import { z } from "zod";
import { Button } from "@shadcn/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@shadcn/ui/dialog";
import { Label } from "@shadcn/ui/label";
import Form from "@shadcn/simplify/form";
import { useState } from "react";
import { http } from "../../services/httpRequest";
import { useToast } from "@shadcn/ui/use-toast";
import { Stable } from "@src/interfaces";
import { stableFormSchema } from "@src/validator";
import { Card } from "@shadcn/ui/card";

interface Props {
  stable: Stable;
  onSave(): void;
}

const StableEdit = ({ stable, onSave }: Props) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  async function onEditValid(
    formData: z.infer<typeof stableFormSchema>,
    ID: number
  ) {
    const newStable = {
      ...formData,
    };
    const res = await http.Put<string>("/stables", ID, newStable);
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
      <DialogTrigger
        className="place-self-auto object-center rounded-none p-14 mt-14"
      >
        <Card className="text-center">stable{stable.ID}</Card>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Edit Stable Information</DialogTitle>
          <DialogDescription>
            Make changes to your stable here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form
          className="grid gap-5 mt-2"
          validator={stableFormSchema}
          onValid={(data) => onEditValid(data, stable.ID)}
          onInvalid={(data) => console.log(data)}
          fields={({ form, errors }) => (
            <>
              <div className="grid grid-cols-5 gap-3">
                <Label>
                  Maintenance<span className="text-red-500">*</span>
                </Label>
                <Form.DatePicker
                  className="col-span-3 font-extralight"
                  defaultValue={new Date(stable.Maintenance)}
                  useForm={form}
                  name="Maintenance"
                ></Form.DatePicker>
              </div>
              <div className="grid grid-cols-5 gap-3">
                <Label>
                  Cleaning<span className="text-red-500">*</span>
                </Label>
                <Form.DatePicker
                  className="col-span-3 font-extralight"
                  defaultValue={new Date(stable.Cleaning)}
                  useForm={form}
                  name="Cleaning"
                ></Form.DatePicker>
              </div>
              <div className="grid grid-cols-5 gap-3">
                <Label>
                  Temperature<span className="text-red-500">*</span>
                </Label>
                <Form.Input
                  className="col-span-3 font-extralight"
                  defaultValue={stable.Temperature}
                  useForm={form}
                  name="Temperature"
                  type="number"
                  step="0.01"
                ></Form.Input>
                <Form.Error
                  field={errors.Temperature}
                  className="col-span-3 col-start-2 mt-2"
                />
              </div>
              <div className="grid grid-cols-5 gap-3">
                <Label>
                  Humidity<span className="text-red-500">*</span>
                </Label>
                <Form.Input
                  className="col-span-3 font-extralight"
                  defaultValue={stable.Humidity}
                  useForm={form}
                  name="Humidity"
                  type="number"
                  step="0.01"
                ></Form.Input>
                <Form.Error
                  field={errors.Humidity}
                  className="col-span-3 col-start-2 mt-2"
                />
              </div>
              <div className="grid grid-cols-5 gap-3">
                <Label>
                  Description<span className="text-red-500">*</span>
                </Label>
                <Form.Input
                  className="col-span-3 font-extralight"
                  defaultValue={stable.Description}
                  useForm={form}
                  name="Description"
                  type="text"
                />
              </div>
              <Button
                variant="success"
                type="submit"
                
              >
                Save
              </Button>
            </>
          )}
        ></Form>
      </DialogContent>
    </Dialog>
  );
};

export default StableEdit;
