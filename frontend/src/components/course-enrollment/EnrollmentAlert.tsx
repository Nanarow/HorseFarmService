import { Button } from "@shadcn/ui";
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

const EnrollmentAlert = ({ ScheduleID }: { ScheduleID: number }) => {
  const { getUser } = useAuth();
  async function handleClick() {
    const res = await http.Post("/enrollments", {
      ScheduleID,
      UserID: getUser().ID,
    });
    if (res.ok) {
      // TODO: show success message
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
