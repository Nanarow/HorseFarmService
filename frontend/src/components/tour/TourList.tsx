import { ArrowLeftSquareIcon, Edit, XSquare } from "lucide-react";
import { TourRegistration } from "../../interfaces";
import { http } from "../../services/httpRequest";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@shadcn/ui/table";
import TourEdit from "./TourEdit";
import { Dialog, DialogTrigger } from "@shadcn/ui/dialog";
import { format } from "date-fns";
import TourAlert from "./TourAlert";

interface Props {
  setTabs: React.Dispatch<React.SetStateAction<string>>;
}

const TourList = ({ setTabs }: Props) => {
  const [tours, setTours] = useState<TourRegistration[] | undefined>(undefined);
  async function fetchTours() {
    const res = await http.Get<TourRegistration[]>("/tours");
    if (res.ok) {
      setTours(res.data);
    }
  }
  useEffect(() => {
    return () => {
      fetchTours();
    };
  }, []);
  // async function handleChange(open: boolean) {
  //   if (open) {
  //     await fetchTours();
  //   }
  // }
  // function onEdit() {}

  return (
    <div className="w-full h-full relative p-8">
      <ArrowLeftSquareIcon
        onClick={() => setTabs("register")}
        className="absolute top-4 left-8 text-blue-500"
      />
      <Table className="border mt-6">
        <TableCaption>A list of your recent registration.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[10%] text-center">Name</TableHead>
            <TableHead className="w-[20%] text-center">Date</TableHead>
            <TableHead className="w-[20%] text-center">Email</TableHead>
            <TableHead className="w-[15%] text-center">Type</TableHead>
            <TableHead className="w-[15%] text-center">Plan</TableHead>
            <TableHead className="w-[10%] text-center">Participants</TableHead>
            <TableHead className="w-[5%] text-center">Edit</TableHead>
            <TableHead className="w-[5%] text-center">Cancel</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tours &&
            tours.map((tour) => (
              <TableRow key={tour.ID}>
                <TableCell className="font-medium text-center">
                  {tour.Name}
                </TableCell>
                <TableCell className=" text-center">
                  {format(new Date(tour.Date), "PPP")}
                </TableCell>
                <TableCell className=" text-center">{tour.Email}</TableCell>
                <TableCell className=" text-center">
                  {tour.TourType?.Name}
                </TableCell>
                <TableCell className=" text-center">
                  {tour.Plan?.Name}
                </TableCell>
                <TableCell className=" text-center">
                  {tour.Participants}
                </TableCell>
                <TableCell className=" relative">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Edit className="text-yellow-500 absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 hover:scale-110 cursor-pointer" />
                    </DialogTrigger>
                    <TourEdit tour={tour} onSave={fetchTours}></TourEdit>
                  </Dialog>
                </TableCell>
                <TableCell className=" relative">
                  <Dialog>
                    <DialogTrigger asChild>
                      <XSquare className="text-red-500 absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 hover:scale-110 cursor-pointer" />
                    </DialogTrigger>
                    <TourAlert
                      tourID={tour.ID!}
                      onCancel={fetchTours}
                    ></TourAlert>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TourList;
