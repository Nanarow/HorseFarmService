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
  async function handleClick() {
    const data = description
      ? {
          ScheduleID,
          UserID: getUser().ID,
          Description: description,
        }
      : {
          ScheduleID,
          UserID: getUser().ID,
        };
    console.log(data);
    const res = await http.Post("/enrollments", data);
    if (res.ok) {
      // TODO: show success message
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
          <Textarea value={description} onChange={(e) => handle(e)}></Textarea>
          {/* <DialogDescription>
            This action cannot be undone. This will cancel your registration
          </DialogDescription> */}
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
