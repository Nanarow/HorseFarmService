import { Button } from "@shadcn/ui";
import Form from "@shadcn/simplify/form";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@shadcn/ui/dialog";
import { useEffect, useState } from "react";
import { Location } from "@src/interfaces";
import { http } from "@src/services/httpRequest";
import { toast } from "@shadcn/ui/use-toast";
import { Label } from "@shadcn/ui";
import { useAuth } from "@src/providers/authProvider";
import { CourseFormData, courseFormSchema } from "@src/validator";
import { ToItemList } from "@src/utils";

const AddCourse = () => {
  const { getEmployee } = useAuth();
  const [locations, setLocations] = useState<Location[]>([]);
  async function fetchLocation() {
    const res = await http.Get<Location[]>("/courses/locations");
    console.log(res);
    if (res.ok) {
      setLocations(res.data);
    }
  }
  useEffect(() => {
    return () => {
      fetchLocation();
    };
  }, []);

  // function LocationToSelectItems(
  //   Location: { ID: number; Name: string }[]
  // ): ItemList[] {
  //   return Location.map((Location) => ({
  //     value: Location.ID,
  //     label: Location.Name,
  //   }));
  // }

  async function onValid(formData: CourseFormData) {
    const data = {
      ...formData,
      EmployeeID: getEmployee().ID,
    };

    const res = await http.Post<string>("/courses", data);
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
    <DialogContent className="sm:max-w-[480px]">
      <DialogHeader>
        <DialogTitle>Add Course</DialogTitle>
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
              useForm={form}
              name="Participants"
              type="number"
              placeholder="Type Participants"
              className="w-full"
            />
            <Label>Description</Label>
            <Form.Input
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
              useForm={form}
              name="Experience"
              type="number"
              placeholder="Type Experience"
              className="w-full"
            />
            {locations.length > 0 && (
              <>
                <Label>
                  Location<span className="text-red-500">*</span>
                </Label>
                <Form.Select
                  valueAsNumber
                  useForm={form}
                  items={ToItemList(locations)}
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
  );
};

export default AddCourse;
