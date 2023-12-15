import React from "react";
import { useEffect, useState } from "react";
import { User, Gender, RidingLevel } from "../interfaces";
import { http } from "../services/httpRequest";
import Form, { ItemList } from "@shadcn/simplify/form";
import { Card, CardContent, CardHeader, CardTitle } from "@shadcn/ui/card";
import { useToast } from "@shadcn/ui/use-toast";
import { string, z } from "zod";
import { ToItemList } from "@src/utils";

// interface Props {
//   setTabs: React.Dispatch<React.SetStateAction<string>>;
// }
const UserPage = () => {
  // const [users, setUser] = useState<User[] | undefined>(undefined);
  const { toast } = useToast();
  const [genders, setGender] = useState<Gender[]>([]);
  const [ridingLevels, setRidingLevel] = useState<RidingLevel[]>([]);

  const formUser = z.object({
    FirstName: z.string().min(1, "FirstName is required"),
    LastName: z.string().min(1, "LastName is required"),
    Age: z.number({ required_error: "Age is required" }),
    ExperiencePoint: z.number().nonnegative(),
    // Gender: z.enum(["male", "female"]),
    Email: z.string().email({ message: "Invalid email address" }),
    Password: z.string().min(8, "Password must be at least 8 characters"),
    Phone: z.string().length(10, "Phone number must be 10 characters"),
    Profile: z.string(),
    GenderID: z.number(),
    RidingLevelID: z.number(),
  });

  async function fetchGender() {
    const res = await http.Get<Gender[]>("/genders")
    if (res.ok) {
      setGender(res.data);
    }
  }
  async function fetchRidingLevel() {
    const res = await http.Get<RidingLevel[]>("/riding/levels")
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
    else {
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <div className="text-white">
              fail to create user
            </div>
          </pre>
        ),
        duration: 1500,
      });
    }
  }

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
                  placeholder="Age"
                />
                <Form.Input
                  useForm={form}
                  name="Phone"
                  type="text"
                  placeholder="Phone"
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
                {genders.length > 0 ? (
                  <Form.Select
                    valueAsNumber
                    className="w-[90px]"
                    useForm={form}
                    name="GenderID"
                    placeholder="Gender"
                    items={ToItemList(genders)}
                  />) : null}

                <Form.Input
                  useForm={form}
                  name="ExperiencePoint"
                  type="number"
                  placeholder="Experience Point"
                />
                {ridingLevels.length > 0 ? (
                  <Form.Select
                    valueAsNumber
                    className="w-[130px]"
                    useForm={form}
                    name="RidingLevelID"
                    placeholder="Riding Level"
                    items={ToItemList(ridingLevels)}
                  />) : null}

                <Form.Input
                  useForm={form}
                  name="Profile"
                  type="file"
                  accept="image/*"
                  placeholder="Name"
                />
                <Form.SubmitButton useForm={form}>Create</Form.SubmitButton>
              </>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
};
export default UserPage;
