import { ArrowLeftSquareIcon, TrashIcon, XSquare } from "lucide-react";
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
import { format } from "date-fns";
import TourAlert from "./TourAlert";
import { Tooltip } from "@shadcn/simplify/tooltip";
import { Badge } from "@shadcn/ui/badge";
import { Dialog, DialogTrigger } from "@shadcn/ui/dialog";
import { useTours } from "@src/hooks";

const TourList = ({ onClick }: { onClick: () => void }) => {
  const { tours, fetchTours } = useTours();
  return (
    <div className="w-full h-full relative px-4 py-6 ">
      <Tooltip content={"Back to registration"} side="right">
        <ArrowLeftSquareIcon
          onClick={onClick}
          className="absolute top-2  left-4  text-blue-500"
        />
      </Tooltip>

      <Table className="border mt-4">
        <TableCaption>A list of your recent registration.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[10%] text-center border">Name</TableHead>
            <TableHead className="w-[28%] text-center border">Date</TableHead>
            <TableHead className="w-[18%] text-center border hidden md:table-cell">
              Email
            </TableHead>
            <TableHead className="w-[12%] text-center border">Type</TableHead>
            <TableHead className="w-[12%] text-center border">Plan</TableHead>
            <TableHead className="w-[12%] text-center border hidden md:table-cell">
              Participants
            </TableHead>
            <TableHead className="w-[4%] text-center border">Edit</TableHead>
            <TableHead className="w-[4%] text-center border">Cancel</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tours.map((tour) => (
            <TableRow key={tour.ID}>
              <TableCell className="font-medium text-center">
                {tour.Name ? tour.Name : "tour " + tour.ID}
              </TableCell>
              <TableCell className=" text-center">
                {format(new Date(tour.Date), "PPP")}
              </TableCell>
              <TableCell className=" text-center hidden md:table-cell">
                {tour.Email}
              </TableCell>
              <TableCell className=" text-center">
                {tour.TourType?.Name}
              </TableCell>
              <TableCell className=" text-center">{tour.Plan?.Name}</TableCell>
              <TableCell className=" text-center hidden md:table-cell">
                {tour.Participants}
              </TableCell>
              <TableCell className=" relative">
                {new Date(tour.Date).getTime() > new Date().getTime() ? (
                  <TourEdit tour={tour} onSave={fetchTours}></TourEdit>
                ) : (
                  <Badge className=" rounded-full bg-green-500 hover:bg-green-500/80">
                    complete
                  </Badge>
                )}
              </TableCell>
              <TableCell className=" relative">
                <Dialog>
                  <DialogTrigger asChild>
                    {new Date(tour.Date).getTime() > new Date().getTime() ? (
                      <XSquare className="text-red-500 abs-center hover:scale-110 cursor-pointer" />
                    ) : (
                      <TrashIcon className="text-red-500 abs-center hover:scale-110 cursor-pointer" />
                    )}
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
