import { Button } from "@shadcn/ui";
import Form, { ItemList } from "@shadcn/simplify/form";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@shadcn/ui/dialog";
import { useEffect, useState } from "react";
import { Course, Location } from "@src/interfaces";
import { http } from "@src/services/httpRequest";
import { toast } from "@shadcn/ui/use-toast";
import { z } from "zod";
import { Label } from "@shadcn/ui";
import { useAuth } from "@src/providers/authProvider";

const AddCourse = () => {
  const {employee} = useAuth()
  const [location, setLocation] = useState<Location[] | undefined>(undefined);
  async function fetchLocation() {
    const res = await http.Get<Location[]>("/schedules/locations");
    if (res.ok) {
      setLocation(res.data);
    }
  }
  useEffect(() => {
    return () => {
      fetchLocation();
    };
  }, []);

  function LocationToSelectItems(
    Location: { ID: number; Name: string }[]
  ): ItemList[] {
    return Location.map((Location) => ({
      value: Location.ID,
      label: Location.Name,
    }));
  }


  const ValidCourseSetting = z.object({
    Name: z.string(),
    Duration: z.number({ required_error: "Duration is required" }),
    Participants: z.number().min(10, "Participants must be at least 15"),
    Description: z.string().min(1, "Description is required"),
    Experience: z.number({ required_error: "Experience is required" }),
    LocationID: z.number(),
    EmployeeID: z.number(),
  });

  async function onValid(formData: z.infer<typeof ValidCourseSetting>) {
    const data = {
      ...formData,
      EmployeeID: employee?.ID!
    }

    const res = await http.Post<string>("/courses", data);
    if (res.ok) {
      toast({
        title: res.data,
        duration: 1500,
      });
    }
  }
  return (
    <DialogContent className="sm:max-w-[480px]">
      <DialogHeader>
        <DialogTitle>Add Course</DialogTitle>
        <DialogDescription>
          Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <Form
        className="flex flex-col gap-4"
        validator={ValidCourseSetting}
        onValid={onValid}
        onInvalid={(errorFields) => console.log(errorFields)}
        fields={({ form }) => (
          <>
            <Label>
              Course Name<span className="text-red-500">*</span>
            </Label>
            <Form.Input
              useForm={form}
              name="Name"
              type="text"
              placeholder="Course Name"
              className="w-full"
            />
            <Label>
              Duration<span className="text-red-500">*</span>
            </Label>
            <Form.Input
              useForm={form}
              name="Duration"
              type="number"
              placeholder="Duration"
              className="w-full"
            />
            <Label>
              Participants<span className="text-red-500">*</span>
            </Label>
            <Form.Input
              useForm={form}
              name="Participants"
              type="number"
              placeholder="Participants"
              className="w-full"
            />
            <Label>
              Description<span className="text-red-500">*</span>
            </Label>
            <Form.Input
              useForm={form}
              name="Description"
              type="text"
              placeholder="Description"
              className="w-full"
            />
            <Label>
              Experience<span className="text-red-500">*</span>
            </Label>
            <Form.Input
              useForm={form}
              name="Experience"
              type="number"
              placeholder="Experience"
              className="w-full"
            />
            {location && (
              <>
                <Label>
                  Location<span className="text-red-500">*</span>
                </Label>
                <Form.Select
                  valueAsNumber
                  useForm={form}
                  items={LocationToSelectItems(location)}
                  name="LocationID"
                  placeholder="Location"
                >
                </Form.Select>
              </>
            )}
          </>
        )}
      ><DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </Form>
    </DialogContent>
  );
};

export default AddCourse;  