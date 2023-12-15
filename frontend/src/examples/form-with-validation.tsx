import Form from "@shadcn/simplify/form";
import { Card, CardContent, CardHeader, CardTitle } from "@shadcn/ui/card";
import { z } from "zod";

const ValidUser = z.object({
  name: z.string().min(1, "Name is required").default(""),
  password: z.string().min(8, "Password must be at least 8 characters"),
  age: z.number({ required_error: "Age is required" }),
  gender: z.enum(["male", "female"]),
  date: z.date().min(new Date(), "Date must be in the future"),
  agree: z.boolean(),
  image: z.string(),
  address: z.string().optional(),
});
const ValidateForm = () => {
  const Items = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Card className=" w-[380px]">
        <CardHeader>
          <CardTitle>Example Form</CardTitle>
        </CardHeader>
        <CardContent>
          <Form
            className="flex flex-col gap-4"
            validator={ValidUser}
            onValid={(data) => console.log(data)}
            onInvalid={(errorFields) => console.log(errorFields)}
            fields={({ form, errors }) => (
              <>
                <Form.Input
                  useForm={form}
                  name="name"
                  type="text"
                  placeholder="enter your name"
                />
                {errors.name ? (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                ) : null}
                <Form.Input
                  useForm={form}
                  name="age"
                  type="number"
                  placeholder="age"
                />
                <Form.Input
                  useForm={form}
                  name="password"
                  type="password"
                  placeholder="password"
                />
                <Form.TextArea
                  useForm={form}
                  name="address"
                  placeholder="addr ..."
                />
                <Form.Select
                  useForm={form}
                  name="gender"
                  placeholder="Gender"
                  items={Items}
                />

                <Form.DatePicker useForm={form} name="date" />

                <Form.Checkbox
                  useForm={form}
                  name="agree"
                  label="I agree to conditions"
                />

                <Form.Switch
                  useForm={form}
                  name="agree"
                  label="I agree to conditions"
                />

                <Form.RadioGroup
                  useForm={form}
                  name="gender"
                  items={Items}
                  className="flex"
                />
                <Form.Input
                  useForm={form}
                  name="image"
                  type="file"
                  accept="image/*"
                  placeholder="Name"
                />
                <Form.SubmitButton useForm={form}>Submit</Form.SubmitButton>
                <button onClick={() => form.reset()}>Reset</button>
              </>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ValidateForm;
