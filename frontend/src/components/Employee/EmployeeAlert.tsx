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
        <DialogTitle>คุณแน่ใจใช่ไหม?</DialogTitle>
        <DialogDescription>
          การดำเนินการนี้ จะเป็นการลบข้อมูลทั้งหมดของพนักงาน
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="sm:justify-between">
        <DialogClose asChild>
          <Button variant="secondary">ไม่ ฉันไม่ต้องการลบ</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button type="submit" variant={"destructive"} onClick={handleCancel}>
            ใช่ ฉันต้องการลบ
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default EmployeeAlert;
