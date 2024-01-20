import { Button } from "@shadcn/ui";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@shadcn/ui/dialog";
import { useToast } from "@shadcn/ui/use-toast";
import { http } from "@src/services/httpRequest";
import { AlertTriangleIcon } from "lucide-react";
interface Props {
  tourID: number;
  onCancel(): void;
}
const TourAlert = ({ tourID, onCancel }: Props) => {
  const { toast } = useToast();
  async function handleCancel() {
    const res = await http.Delete("/tours", tourID);
    if (res.ok) {
      toast({
        title: "Cancelled",
        description: "Your registration has been cancelled",
        variant: "success",
      });
      onCancel();
    }
  }

  return (
    <DialogContent className=" sm:max-w-[320px]">
      <DialogHeader className=" items-center sm:text-center">
        <AlertTriangleIcon className="text-red-500 h-16 w-16" />
        <DialogTitle>Are you sure absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will cancel your registration
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="sm:justify-between">
        <DialogClose asChild>
          <Button variant="secondary">No, Keep it</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button type="submit" variant={"destructive"} onClick={handleCancel}>
            Yes, Cancel
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default TourAlert;
