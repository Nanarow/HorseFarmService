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
  user: User;
  onSave(): void;
}
const UserEdit = ({ user, onSave }: Props) => {
  // const [users, setUser] = useState<User[] | undefined>(undefined);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [genders, setGender] = useState<Gender[]>([]);
  const [ridingLevels, setRidingLevel] = useState<RidingLevel[]>([]);

  async function fetchGender() {
    const res = await http.Get<Gender[]>("/users/genders");
    if (res.ok) {
      setGender(res.data);
    }
  }
  async function fetchRidingLevel() {
    const res = await http.Get<RidingLevel[]>("/riding/levels");
    if (res.ok) {
      setRidingLevel(res.data);
    }
  }
  useEffect(() => {
    fetchGender();
    fetchRidingLevel();
  }, []);

  async function onValid(formData: UserUpdateFormData) {
    const newUser = {
      ...formData,
    };

    const res = await http.Put<string>("/users", user.ID!, newUser);
    if (res.ok) {
      onSave();
      toast({
        title: res.data,
        duration: 1500,
      });
    } else {
      toast({
        title: res.error,
        duration: 1500,
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Edit className="text-yellow-500 abs-center hover:scale-110 cursor-pointer" />
      </DialogTrigger>

      <DialogContent className=" lg:max-w-6xl h-[80%] lg:h-auto overflow-auto">
        <DialogHeader>
          <DialogTitle>Edit User Data</DialogTitle>
          <DialogDescription>
            Make changes to your User here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form
          className="flex flex-col gap-4 overflow-auto"
          validator={userUpdateFormSchema}
          onValid={onValid}
          onInvalid={(errorFields) => console.log(errorFields)}
          fields={({ form, errors }) => (
            <>
              <div className="grid lg:grid-cols-2 gap-y-4  ">
                <div className="w-full h-full flex flex-col gap-3 max-w-lg justify-self-center">
                  <Form.Label>First Name</Form.Label>
                  <Form.Input
                    useForm={form}
                    name="FirstName"
                    type="text"
                    defaultValue={user.FirstName}
                  />
                  <Form.Error field={errors.FirstName}></Form.Error>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Input
                    useForm={form}
                    name="LastName"
                    type="text"
                    defaultValue={user.LastName}
                  />
                  <Form.Error field={errors.LastName}></Form.Error>
                  <Form.Label>Gender</Form.Label>
                  {genders.length > 0 ? (
                    <Form.Select
                      valueAsNumber
                      useForm={form}
                      name="GenderID"
                      placeholder="Gender"
                      items={ToItemList(genders)}
                      defaultValue={user.Gender.ID}
                    />
                  ) : null}
                  <Form.Error field={errors.GenderID}></Form.Error>
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.DatePicker
                    useForm={form}
                    name="DateOfBirth"
                    defaultValue={new Date(user.DateOfBirth)}
                  />
                  <Form.Error field={errors.DateOfBirth}></Form.Error>

                  <Form.Label>Profile Image</Form.Label>
                  <Form.Input
                    useForm={form}
                    name="Profile"
                    type="file"
                    accept="image/*"
                    defaultValue={user.Profile}
                  />
                  <Form.Error field={errors.Profile}></Form.Error>
                </div>
                <div className="w-full h-full flex flex-col gap-3 max-w-lg justify-self-center">
                  <Form.Label>Email</Form.Label>
                  <Form.Input
                    useForm={form}
                    name="Email"
                    type="text"
                    defaultValue={user.Email}
                  />
                  <Form.Error field={errors.Email}></Form.Error>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Input
                    useForm={form}
                    name="Phone"
                    type="text"
                    placeholder="0XXXXXXXXX"
                    defaultValue={user.Phone}
                  />
                  <Form.Error field={errors.Phone}></Form.Error>

                  <Form.Label>Experience Point</Form.Label>
                  <Form.Input
                    useForm={form}
                    name="ExperiencePoint"
                    type="number"
                    placeholder="Experience Point"
                    defaultValue={user.ExperiencePoint}
                  />
                  <Form.Error field={errors.ExperiencePoint}></Form.Error>
                  <Form.Label>Riding Level</Form.Label>
                  {ridingLevels.length > 0 ? (
                    <Form.Select
                      valueAsNumber
                      useForm={form}
                      name="RidingLevelID"
                      placeholder="Riding Level"
                      items={ToItemList(ridingLevels)}
                      defaultValue={user.RidingLevel.ID}
                    />
                  ) : null}
                  <Form.Error field={errors.RidingLevelID}></Form.Error>
                </div>
              </div>
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
