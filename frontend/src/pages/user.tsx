import UserCreate from "../components/User/UserCreate";
import UserList from "@src/components/User/UserList";
import { Link } from "react-router-dom";
import { Tooltip } from "@shadcn/simplify/tooltip";
import { ChevronRightCircle } from "lucide-react";
const User = () => {
  return (
    <main className="w-full h-screen">
      <UserCreate />
      {/* <UserList /> */}
      <Link to="/user/list">
        <Tooltip content={"User List"}>
          <ChevronRightCircle className="fixed bottom-4 right-16 w-10 h-10 text-black-500 cursor-pointer" />
        </Tooltip>
      </Link>

    </main>
  );
};

export default User;
