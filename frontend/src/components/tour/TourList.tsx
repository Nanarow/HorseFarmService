import { ChevronLeftIcon } from "lucide-react";
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

  return (
    <div className="w-full h-full relative">
      <ChevronLeftIcon
        onClick={() => setTabs("register")}
        className="absolute bottom-0 left-0"
      />
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Participants</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tours &&
            tours.map((tour) => (
              <TableRow key={tour.ID}>
                <TableCell className="font-medium">{tour.ID}</TableCell>
                <TableCell>{`${tour.Date}`}</TableCell>
                <TableCell>{tour.TourType?.Name}</TableCell>
                <TableCell className="text-right">
                  {tour.Participants}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TourList;
