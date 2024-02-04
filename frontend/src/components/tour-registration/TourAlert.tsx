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
import { useToast } from "@shadcn/ui/use-toast";
import { http } from "@src/services/httpRequest";
import { AlertTriangleIcon, TrashIcon, XSquare } from "lucide-react";
interface Props {
  tourID: number;
  onCancel(): void;
  variant?: "Cancel" | "Delete";
}
const TourAlert = ({ tourID, onCancel, variant = "Cancel" }: Props) => {
  const { toast } = useToast();
  async function handleCancel() {
    const res = await http.Delete("/tours", tourID);
    if (res.ok) {
      toast({
        title: variant === "Cancel" ? "Cancelled" : "Deleted",
        description:
          "Your registration has been " + variant === "cancel"
            ? "cancelled"
            : "deleted",
        variant: "success",
      });
      onCancel();
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        {variant === "Cancel" ? (
          <XSquare className="text-red-500 abs-center hover:scale-110 cursor-pointer" />
        ) : (
          <TrashIcon className="text-red-500 abs-center hover:scale-110 cursor-pointer" />
        )}
      </DialogTrigger>
      <DialogContent className=" sm:max-w-[320px]">
        <DialogHeader className=" items-center sm:text-center">
          <AlertTriangleIcon className="text-red-500 h-16 w-16" />
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will {variant.toLowerCase()} your
            registration
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
              Yes, {variant}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TourAlert;
