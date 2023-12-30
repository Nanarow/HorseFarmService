import { Button }from "@shadcn/ui/button"
import { DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogDescription} from "@shadcn/ui/dialog"
import { http } from "@src/services/httpRequest";

interface Props {
    horseID: number;
    onDelete(): void;
}

const HorseAlert = ({ horseID, onDelete }: Props) => {
    async function handleDelete(id:number) {
        console.log(id)
        const res = await http.Delete("/horses", horseID);
        if (res.ok) {
          onDelete();
        }
      }

    return(
        <DialogContent className="sm:max-w-[425px] ">
            <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>Are you sure you want to delete the data?</DialogDescription>
            </DialogHeader>
                <DialogFooter className="items-center grid-row-reverse justify-between flex">
                    <DialogClose asChild>
                        <Button variant="secondary">No, Keep it</Button>
                    </DialogClose>
                <DialogClose asChild>
                    <Button type="submit" variant={"destructive"} onClick={()=>handleDelete(horseID)} >Yes, Delete</Button>
                </DialogClose>        
            </DialogFooter>
        </DialogContent>   
        
    );
};
export default HorseAlert;
