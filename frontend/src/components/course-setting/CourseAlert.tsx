import { Button } from "@shadcn/ui";
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
import { http } from "@src/services/httpRequest";
import { AlertTriangleIcon, TrashIcon } from "lucide-react";
interface Props {
  courseID: number;
  onCancel(): void;
}

const CourseAlert = ({ courseID, onCancel }: Props) => {
  async function handleCancel() {
    const res = await http.Delete("/courses", courseID);
    if (res.ok) {
      onCancel();
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <TrashIcon className="text-red-500 hover:scale-110 cursor-pointer" />
      </DialogTrigger>

      <DialogContent className=" sm:max-w-[320px]">
        <DialogHeader className=" items-center sm:text-center">
          <AlertTriangleIcon className="text-red-500 h-16 w-16" />
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will delete this course
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button variant="secondary">No, Keep it</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="submit"
              variant={"destructive"}
              onClick={handleCancel}
            >
              Yes, Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CourseAlert;
