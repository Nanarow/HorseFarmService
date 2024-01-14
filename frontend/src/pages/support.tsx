import SupportCreate from "@src/components/Support/SupportCreate";
import { Link } from "react-router-dom";
import { Tooltip } from "@shadcn/simplify/tooltip";
import { ChevronRightCircle } from "lucide-react";
import NavBar from "@src/components/navbar/navBar";

const Support = () => {
  return (
  <main className="w-full h-screen">
    <NavBar />
    <SupportCreate />
    <Link to="/support/list">
        <Tooltip content={"Support History"}>
          <ChevronRightCircle className="fixed bottom-4 right-16 w-10 h-10 text-black-500 cursor-pointer" />
        </Tooltip>
      </Link>
  </main>
  );
};

export default Support;
