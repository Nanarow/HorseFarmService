import React from "react";
import Form, { ItemList } from "@shadcn/simplify/form"
import { Card, CardContent, CardHeader, CardTitle } from "@shadcn/ui/card";
import { z } from "zod";

const ValidUser = z.object({
  firstname: z.string().min(1, "FirstName is required").default(""),
  lastname: z.string().min(1, "LastName is required").default(""),
  age: z.number({ required_error: "Age is required" }),
  gender: z.enum(["male", "female"]),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, "Password must be at least 8 characters"),
  image: z.string(),
  ridinglevel: z.string(),
});

const User = () => {
  const Items = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  const RidingLevelItems = [
    { label: "Newbie", value: "newbie" },
    { label: "Moderate", value: "Moderate" },
    { label: "Expert", value: "Expert" },
  ]

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Card className=" w-[350px]">
        <CardHeader>
          <CardTitle>User Account management</CardTitle>
        </CardHeader>
        <CardContent>
          <Form
            className="flex flex-col gap-4"
            validator={ValidUser}
            onValid={(data) => console.log(data)}
            onInvalid={(errorFields) => console.log(errorFields)}
            fields={({ form }) => (
              <>
                <Form.Input
                  useForm={form}
                  name="firstname"
                  type="text"
                  placeholder="FirstName"
                />
                <Form.Input
                  useForm={form}
                  name="lastname"
                  type="text"
                  placeholder="LastName"
                />
                <Form.Input
                  useForm={form}
                  name="age"
                  type="number"
                  placeholder="age"
                />
                <Form.Input
                  useForm={form}
                  name="email"
                  type="text"
                  placeholder="Email"
                />
                <Form.Input
                  useForm={form}
                  name="password"
                  type="password"
                  placeholder="password"
                />
                <Form.Select
                  className="w-[90px]"
                  useForm={form}
                  name="gender"
                  placeholder="Gender"
                  items={Items}
                />

                <Form.Select
                  className="w-[130px]"
                  useForm={form}
                  name="ridinglevel"
                  placeholder="Riding Level"
                  items={RidingLevelItems}
                />
                <Form.Input
                  useForm={form}
                  name="image"
                  type="file"
                  accept="image/*"
                  placeholder="Name"
                />
                <Form.SubmitButton useForm={form}>Submit</Form.SubmitButton>
              </>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
};
1
export default User;
