import UserCreate from "../components/user/UserCreate";
import { Link } from "react-router-dom";
import { Tooltip } from "@shadcn/simplify/tooltip";
import { ChevronRightCircle } from "lucide-react";
import NavBar from "@src/components/navbar/navBar";

const User = () => {
  return (
    <main className="w-full h-screen">
      <NavBar />
      <UserCreate />
      <Link to="/user/list">
        <Tooltip content={"User List"}>
          <ChevronRightCircle className="fixed bottom-4 right-4 w-8 h-8  cursor-pointer" />
        </Tooltip>
      </Link>
    </main>
  );
};

export default User;
