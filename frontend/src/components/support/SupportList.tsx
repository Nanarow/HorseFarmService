import { ChevronLeftSquare } from "lucide-react";
import { Support } from "../../interfaces";
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
import { format } from "date-fns";
import { Tooltip } from "@shadcn/simplify/tooltip";
import { Link } from "react-router-dom";
import Each from "../each";
import NavBar from "../navbar/navBar";

const SupportList = () => {
  const [supports, setSupport] = useState<Support[]>([]);

  async function fetchSupports() {
    const res = await http.Get<Support[]>("/supports");
    if (res.ok) {
      console.log(res.data);
      setSupport(res.data);
    }
  }
  useEffect(() => {
    fetchSupports();
  }, []);

  return (
    <div className="w-full h-screen relative">
      <NavBar />
      <section className="w-full h-with-nav px-4">
        <Table className="border mt-6">
          <TableCaption>A list of support you give.</TableCaption>
          <TableHeader>
            <TableRow>
              {/* <TableHead className="w-[10%] text-center">CreateDate</TableHead> */}
              <TableHead className="w-[12%] text-center">Corporate</TableHead>
              <TableHead className="w-[12%] text-center">Description</TableHead>
              <TableHead className="w-[8%] text-center">Date</TableHead>
              <TableHead className="w-[8%] text-center hidden md:table-cell">
                Bill
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <Each
              of={supports}
              render={(support) => (
                <TableRow>
                  <TableCell className=" w-[6%] text-center">
                    {support.Corporate}
                  </TableCell>
                  <TableCell className=" w-[10%] text-center">
                    {support.Description}
                  </TableCell>
                  <TableCell className=" w-[8%] text-center">
                    {format(new Date(support.Date), "PPP")}
                  </TableCell>
                  <TableCell className=" w-[8%] text-center">
                    <img src={support.Bill} className="  w-29 m-5 rounded-lg" />
                  </TableCell>
                </TableRow>
              )}
            />
          </TableBody>
        </Table>
      </section>

      <Link to="/support">
        <Tooltip content={"Back to give support"}>
          <ChevronLeftSquare className="fixed bottom-4 right-4 w-8 h-8 cursor-pointer" />
        </Tooltip>
      </Link>
    </div>
  );
};

export default SupportList;
