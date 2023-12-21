import { useEffect, useState } from "react";
import { http } from "../../services/httpRequest";
import { z } from "zod";
import Form, { ItemList } from "@shadcn/simplify/form";
import { toast } from "@shadcn/ui/use-toast";
import { Course, Location } from "@src/interfaces";
import { Label } from "@shadcn/ui";
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
import { Button } from "@shadcn/ui";
import { Edit } from "lucide-react";
interface Props {
  course: Course;
  onSave(): void;
}

const CourseEdit = ({ course }: Props) => {
  const [location, setLocation] = useState<Location[] | undefined>(undefined);
  const [open, setOpen] = useState(false);
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
    Participants: z.number().min(10, "Participants must be at least 10"),
    Description: z.string().min(1, "Description is required"),
    Experience: z.number({ required_error: "Participants is required" }),
    LocationID: z.number(),
    EmployeeID: z.number(),
  });

  async function onValid(formData: z.infer<typeof ValidCourseSetting>) {
    console.log(formData);

    const res = await http.Post<Course>("/courses", formData);
    if (res.ok) {
      setOpen(false);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Edit className="text-yellow-500 hover:scale-110 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Edit Course</DialogTitle>
          <DialogDescription>Click save when you're done.</DialogDescription>
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
                defaultValue={course.Name}
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
                defaultValue={course.Duration}
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
                defaultValue={course.Participants}
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
                defaultValue={course.Description}
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
                defaultValue={course.Experience}
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
                    defaultValue={course.LocationID}
                    valueAsNumber
                    useForm={form}
                    items={LocationToSelectItems(location)}
                    name="LocationID"
                    placeholder="Location"
                  ></Form.Select>
                </>
              )}
            </>
          )}
        >
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Close</Button>
            </DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CourseEdit;
