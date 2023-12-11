import { Button, Label } from "@shadcn/ui";
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
import { Course, Employee } from "@src/interfaces";
import { http } from "@src/services/httpRequest";
import { toast } from "@shadcn/ui/use-toast";
import { z } from "zod";

const AddCourse = () => {
  const [employee, setEmployees] = useState<Employee[] | undefined>(undefined);

  useEffect(() => {
    async function fetchEmployees() {
      const res = await http.Get<Employee[]>("/employees");
      if (res.ok) {
        setEmployees(res.data);
      }
    }

    fetchEmployees();
  }, []);


  function EmployeeToSelectItems(
    Employee: { ID?: number; FirstName: string }[]
  ): ItemList[] {
    return Employee.map((Employee) => ({
      value: Employee.ID!,
      label: Employee.FirstName,
    }));
  }

  const ValidCourseSetting = z.object({
    Name: z.string().min(1, "Name is required"),
    Duration: z.number({ required_error: "Duration is required" }),
    Participants: z.number({ required_error: "Participants is required" }),
    Description: z.string().min(1, "Description is required"),
    Experience: z.number({ required_error: "Participants is required" }),
    EmployeeID: z.number(),
  });

  async function onValid(formData: z.infer<typeof ValidCourseSetting>) {
    console.log(formData)

    const res = await http.Post<Course>("/courses", formData);
    if (res.ok) {
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(res.data, null, 2)}</code>
          </pre>
        ),
        duration: 1500,
      });
    }
  }
  return (
    <DialogContent className="sm:max-w-[480px]">
      <DialogHeader>
        <DialogTitle>+ Course</DialogTitle>
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
            {employee && (
              <>
                {/* <div className=" flex gap-14 mx-64 mt-6"> */}
                <Label className="text-2xl text-primary w-64">
                  ผู้สร้างคอร์ส:<span className="text-red-500">*</span>
                </Label>
                <Form.Select
                  valueAsNumber
                  className="h-14 px-24 text-xl text-primary"
                  useForm={form}
                  items={EmployeeToSelectItems(employee)}
                  name="EmployeeID"
                  placeholder="Select your name"
                />
                {/* </div> */}
              </>
            )}

            <Form.Input
              useForm={form}
              name="Name"
              type="text"
              placeholder="Course Name"
              className="w-full"
            />
            <Form.Input
              useForm={form}
              name="Duration"
              type="number"
              placeholder="Duration"
              className="w-full"
            />
            <Form.Input
              useForm={form}
              name="Participants"
              type="number"
              placeholder="Participants"
              className="w-full"
            />
            <Form.Input
              useForm={form}
              name="Description"
              type="text"
              placeholder="Description"
              className="w-full"
            />
            <Form.Input
              useForm={form}
              name="Experience"
              type="number"
              placeholder="Experience"
              className="w-full"
            />
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