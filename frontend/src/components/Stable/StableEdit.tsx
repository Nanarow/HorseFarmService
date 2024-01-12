import { z } from "zod";
import { Button }from "@shadcn/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@shadcn/ui/dialog"
import { Label } from "@shadcn/ui/label"
import Form from "@shadcn/simplify/form";
import { useState} from "react";
import { http } from "../../services/httpRequest";
import { useToast } from "@shadcn/ui/use-toast";
import { Edit } from "lucide-react";
import { Stable } from "@src/interfaces";
import { stableFormSchema } from "@src/validator";

interface Props {
    stable: Stable;
    onSave(): void;
}

const StableEdit = ({ stable, onSave }: Props) => {
    const { toast } = useToast();
    const [open, setOpen] = useState(false);

    async function onEditValid(formData: z.infer<typeof stableFormSchema>, ID: number) {
        const newStable ={
          ...formData,
    
        }
        const res = await http.Put<string>("/stables", ID, newStable);
        if (res.ok) {
          onSave();
          setOpen(false);
          toast({
            title: "You submitted the following values:",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">{JSON.stringify(res.data, null, 2)}</code>
              </pre>
            ),
            duration: 1500,
          });
        }
    }
    
    return (
        <div className="ml-12">
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Edit className="text-yellow-500 cursor-pointer " />
            </DialogTrigger>
            <DialogContent className="w-full">
                <DialogHeader>
                    <DialogTitle>Edit Stable Information</DialogTitle>              
                </DialogHeader> 
                <Form
                    className="grid gap-5"
                    validator={stableFormSchema}
                    onValid={(data)=>onEditValid(data,stable.ID)}
                    onInvalid={(data) => console.log(data)}
                    fields={({ form }) => (
                        <>
                            <div className="grid grid-cols-5 items-center gap-4">
                                <Label className="text-right">Maintenance:</Label> 
                                    <Form.DatePicker
                                        className="col-span-3 font-extralight"
                                        defaultValue={new Date(stable.Maintenance)}
                                        useForm={form}
                                        name="Maintenance"
                                    ></Form.DatePicker>
                            </div>
                            <div className="grid grid-cols-5 items-center gap-4">
                                <Label className="text-right">Cleaning: </Label>
                                    <Form.DatePicker
                                        className="col-span-3 font-extralight"
                                        defaultValue={new Date(stable.Cleaning)}
                                        useForm={form}
                                        name="Cleaning"
                                    ></Form.DatePicker>
                            </div>
                            <div className="grid grid-cols-5 items-center gap-4">
                                <Label className="text-right">Temperature: </Label>
                                    <Form.Input
                                        className="col-span-3 font-extralight"
                                        defaultValue={stable.Temperature}
                                        useForm={form}
                                        name="Temperature"
                                        type="number"
                                        placeholder="enter your Temperature"
                                    ></Form.Input>
                            </div>
                            <div className="grid grid-cols-5 items-center gap-4">
                                <Label className="text-right">Humidity: </Label>
                                    <Form.Input
                                        className="col-span-3 font-extralight"
                                        defaultValue={stable.Humidity}
                                        useForm={form}
                                        name="Humidity"
                                        type="number"
                                        placeholder="enter your Humidity"
                                    ></Form.Input>
                            </div>
                            <div className="grid grid-cols-5 items-center gap-4">
                                <Label className="text-right">Description: </Label>
                                    <Form.Input
                                        className="col-span-3 font-extralight"
                                        defaultValue={stable.Description}
                                        useForm={form}
                                        name="Description"
                                        type="text"
                                        placeholder="enter your Description"
                                    />
                            </div>
                            <Button 
                                variant="outline" 
                                type="submit" 
                                className=" bg-green-500 text-center text-primary text-white ml-auto mt-5 w-24"
                                >Save
                            </Button>
                        </>
                    )}>
                </Form>          
            </DialogContent>
        </Dialog>
        </div>
    );
};
    
export default StableEdit;
