import React from "react";
import { useEffect, useState } from "react";
import { Edit } from "lucide-react";
import { User, Gender, RidingLevel } from "../../interfaces";
import { http } from "../../services/httpRequest";
import Form from "@shadcn/simplify/form";
import { Button } from "@shadcn/ui";
import { useToast } from "@shadcn/ui/use-toast";
import { ToItemList } from "@src/utils";
import { UserUpdateFormData, userUpdateFormSchema } from "@src/validator";
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

interface Props {
  user: User
  onSave(): void;
}
const UserEdit = ({ user, onSave }: Props) => {
  // const [users, setUser] = useState<User[] | undefined>(undefined);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [genders, setGender] = useState<Gender[]>([]);
  const [ridingLevels, setRidingLevel] = useState<RidingLevel[]>([]);

  async function fetchGender() {
    const res = await http.Get<Gender[]>("/users/genders")
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

  async function onValid(formData: UserUpdateFormData) {
    const newUser = {
      ...formData,
    };
    
    const res = await http.Put<string>("/users", user.ID!, newUser);
    if (res.ok) {
      onSave();
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
              fail to update user
            </div>
          </pre>
        ),
        duration: 1500,
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Edit className="text-yellow-500 abs-center hover:scale-110 cursor-pointer" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Edit User Data</DialogTitle>
          <DialogDescription>
            Make changes to your User here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form
          className="flex flex-col gap-4"
          validator={userUpdateFormSchema}
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
              {/* <Form.SubmitButton useForm={form}>Create</Form.SubmitButton> */}
            </>
          )}
        >
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Close</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default UserEdit;
