import React from "react";
import { useEffect, useState } from "react";
import { User, Gender, RidingLevel } from "../interfaces";
import { http } from "../services/httpRequest";
import Form, { ItemList } from "@shadcn/simplify/form";
import { Card, CardContent, CardHeader, CardTitle } from "@shadcn/ui/card";
import { z } from "zod";
import { domainToUnicode } from "url";
import { useAuth } from "@src/providers/authProvider";

interface Props {
  setTabs: React.Dispatch<React.SetStateAction<string>>;
}
const UserPage = () => {

  const [Users, setUser] = useState<User[] | undefined>(undefined);
  const [Genders, setGender] = useState<Gender[] | undefined>(undefined);
  const [RidindLevels, setRidingLevel] = useState<RidingLevel[] | undefined>(undefined);

  const formUser = z.object({
    FirstName: z.string().min(1, "FirstName is required"),
    LastName: z.string().min(1, "LastName is required"),
    Age: z.number({ required_error: "Age is required" }),
    ExperiencePoint: z.number(),
    // Gender: z.enum(["male", "female"]),
    Email: z.string().email({ message: "Invalid email address" }),
    Password: z.string().min(8, "Password must be at least 8 characters"),
    Phone: z.string().length(10, "Phone number must be 10 characters"),
    Profile: z.string(),
    RoleID: z.number(),
    GenderID: z.number(),
    RidingLevelID: z.number(),
  });

  async function fetchGender() {
    const res = await http.Get<Gender[]>("/genders/:id")
    if (res.ok) {
      setGender(res.data);
    }
  }
  async function fetchRidingLevel() {
    const res = await http.Get<RidingLevel[]>("/ridingLevels/:id")
    if (res.ok) {
      setRidingLevel(res.data);
    }
  }
  useEffect(() => {
    return () => {
      fetchGender();
      fetchRidingLevel();
    };
  }, []);

  async function onValid(formData: z.infer<typeof formUser>) {
    const res = await http.Post<string>("/users", formData);
    if (res.ok) {

    }
  }

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
            validator={formUser}
            onValid={onValid}
            onInvalid={(errorFields) => console.log(errorFields)}
            fields={({ form }) => (
              <>
                <Form.Input
                  useForm={form}
                  name="FirstName"
                  type="text"
                  placeholder="FirstName"
                />
                <Form.Input
                  useForm={form}
                  name="LastName"
                  type="text"
                  placeholder="LastName"
                />
                <Form.Input
                  useForm={form}
                  name="Age"
                  type="number"
                  placeholder="age"
                />
                <Form.Input
                  useForm={form}
                  name="Email"
                  type="text"
                  placeholder="Email"
                />
                <Form.Input
                  useForm={form}
                  name="Password"
                  type="password"
                  placeholder="password"
                />
                <Form.Select
                  className="w-[90px]"
                  useForm={form}
                  name="GenderID"
                  placeholder="Gender"
                  items={Items}
                />
                <Form.Select
                  useForm={form}
                  name="ExperiencePoint"
                  placeholder="Experience Point"
                  items={Items}
                />
                <Form.Select
                  className="w-[130px]"
                  useForm={form}
                  name="RidingLevelID"
                  placeholder="Riding Level"
                  items={RidingLevelItems}
                />
                <Form.Input
                  useForm={form}
                  name="Profile"
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
export default UserPage;
