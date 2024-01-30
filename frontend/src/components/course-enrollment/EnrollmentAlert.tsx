import { Button, Label, Textarea } from "@shadcn/ui";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shadcn/ui/dialog";
import { useToast } from "@shadcn/ui/use-toast";
import { useAuth } from "@src/providers/authProvider";
import { http } from "@src/services/httpRequest";
import { AlertCircleIcon } from "lucide-react";
import { useState } from "react";

const EnrollmentAlert = ({
  ScheduleID,
  onEnrolled,
}: {
  ScheduleID: number;
  onEnrolled: () => void;
}) => {
  const { getUser } = useAuth();
  const [description, setDescription] = useState<string>();
  const { toast } = useToast();
  async function handleClick() {
    const des = description
      ? {
          Description: description,
        }
      : {};
    const data = {
      ScheduleID,
      UserID: getUser().ID,
      ...des,
    };
    console.log(data);
    const res = await http.Post<string>("/enrollments", data);
    if (res.ok) {
      toast({
        title: res.data,
        duration: 1500,
        variant: "success",
      });
      onEnrolled();
    }
  }
  function handle(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    if (value.trim() != "") {
      setDescription(value);
    } else {
      setDescription(undefined);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Enroll</Button>
      </DialogTrigger>
      <DialogContent className=" sm:max-w-[320px]">
        <DialogHeader className=" items-center sm:text-center">
          <AlertCircleIcon className="text-green-500 h-16 w-16" />
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <Label className=" mt-4">Description</Label>
          <Textarea value={description} onChange={handle}></Textarea>
        </DialogHeader>
        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button variant="secondary">No, Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="submit"
              className=" bg-green-500 hover:bg-green-500/80"
              onClick={handleClick}
            >
              Yes, Enroll
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EnrollmentAlert;
