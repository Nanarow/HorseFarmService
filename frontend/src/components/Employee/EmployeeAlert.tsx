import { Button } from "@shadcn/ui";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@shadcn/ui/dialog";
import { http } from "@src/services/httpRequest";
import { AlertTriangleIcon } from "lucide-react";
interface Props {
  employeeID: number;
  onCancel(): void;
}
const EmployeeAlert = ({ employeeID, onCancel }: Props) => {
  async function handleCancel() {
    const res = await http.Delete("/employees", employeeID);
    if (res.ok) {
      onCancel();
    }
  }

  return (
    <DialogContent className=" sm:max-w-[320px]">
      <DialogHeader className=" items-center sm:text-center">
        <AlertTriangleIcon className="text-red-500 h-16 w-16" />
        <DialogTitle>Are you sure absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will cancel your Employee
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

export default EmployeeAlert;
