import { useEffect, useState } from "react";
import { http } from "../../services/httpRequest";
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
import { CourseFormData, courseFormSchema } from "@src/validator";
interface Props {
  course: Course;
  onSave(): void;
}

const CourseEdit = ({ course }: Props) => {
  const [locations, setLocation] = useState<Location[]>([]);
  const [open, setOpen] = useState(false);
  async function fetchLocation() {
    const res = await http.Get<Location[]>("/courses/locations");
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

  async function onValid(formData: CourseFormData) {
    console.log(formData);

    const res = await http.Post<string>("/courses", formData);
    if (res.ok) {
      setOpen(false);
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
          validator={courseFormSchema}
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
                placeholder="Type Course Name"
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
                placeholder="Type Duration"
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
                placeholder="Type Participants"
                className="w-full"
              />
              <Label>
                Description
              </Label>
              <Form.Input
                defaultValue={course.Description}
                useForm={form}
                name="Description"
                type="text"
                placeholder="Type Description"
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
                placeholder="Type Experience"
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
                    items={LocationToSelectItems(locations)}
                    name="LocationID"
                    placeholder="Select Location"
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
