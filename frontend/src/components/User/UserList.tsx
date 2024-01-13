import { ChevronLeftSquare, XSquare } from "lucide-react";
import { User } from "../../interfaces";
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
import { Dialog, DialogTrigger } from "@shadcn/ui/dialog";
import { format } from "date-fns";
import UserAlert from "./UserAlert";
import { useAuth } from "@src/providers/authProvider";
import { Tooltip } from "@shadcn/simplify/tooltip";
import UserEdit from "./UserEdit";
import { Link } from "react-router-dom";

// { setTabs }: Props
const UserList = () => {
  const [users, setUser] = useState<User[]>([]);
  async function fetchUsers() {
    const res = await http.Get<User[]>("/users");
    if (res.ok) {
      console.log(res.data);
      setUser(res.data);
    }
  }
  useEffect(() => {
    return () => {
      fetchUsers();
    };
  }, []);

  return (
    <div className="w-full h-full relative p-8">
      {/* <Tooltip content={() => <span>Back to User Create</span>} side="right">
        <ArrowLeftSquareIcon
          onClick={() => setTabs("register")}
          className="absolute top-4 left-8 text-blue-500"
        />
      </Tooltip> */}

      <Table className="border mt-6">
        <TableCaption>A list of user account.</TableCaption>
        <TableHeader>
          <TableRow>
            {/* <TableHead className="w-[10%] text-center">CreateDate</TableHead> */}
            <TableHead className="w-[12%] text-center">FirstName</TableHead>
            <TableHead className="w-[12%] text-center">LastName</TableHead>
            <TableHead className="w-[8%] text-center">Date of Birth</TableHead>
            <TableHead className="w-[5%] text-center">Gender</TableHead>
            <TableHead className="w-[18%] text-center hidden md:table-cell">
              Email
            </TableHead>
            <TableHead className="w-[10%] text-center">Phone</TableHead>
            {/* <TableHead className="w-[5%] text-center">Profile</TableHead> */}
            <TableHead className="w-[10%] text-center">Experience Point</TableHead>
            <TableHead className="w-[10%] text-center">Riding Level</TableHead>
            {/* <TableHead className="w-[12%] text-center">Type</TableHead>
            <TableHead className="w-[12%] text-center">Plan</TableHead>
            <TableHead className="w-[12%] text-center hidden md:table-cell">
              Participants
            </TableHead> */}
            <TableHead className="w-[4%] text-center">Edit</TableHead>
            <TableHead className="w-[4%] text-center">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.ID}>
              {/* <TableCell className="font-medium text-center">
                {user.CreatedAt ? user.FirstName : "user " + user.ID}
              </TableCell> */}
              <TableCell className=" w-[12%] font-medium text-center">
                {user.FirstName ? user.FirstName : "user " + user.ID}
              </TableCell>
              <TableCell className=" w-[12%] font-medium text-center">
                {user.LastName ? user.LastName : "user " + user.ID}
              </TableCell>
              <TableCell className=" w-[8%] text-center">
                {format(new Date(user.DateOfBirth), "PPP")}
              </TableCell>
              <TableCell className=" w-[5%] text-center">
                {user.Gender?.Name}
              </TableCell>
              <TableCell className=" w-[18%] text-center hidden md:table-cell">
                {user.Email}
              </TableCell>
              <TableCell className=" w-[10%] text-center">
                {user.Phone}
              </TableCell>
              <TableCell className=" w-[10%] text-center">
                {user.ExperiencePoint}
              </TableCell>
              <TableCell className=" w-[10%] text-center">
                {user.RidingLevel?.Name}
              </TableCell>
              <TableCell className=" relative">
                <UserEdit user={user} onSave={fetchUsers}></UserEdit>
              </TableCell>
              <TableCell className=" relative">
                <Dialog>
                  <DialogTrigger asChild>
                    <XSquare className=" text-red-500 abs-center hover:scale-110 cursor-pointer" />
                  </DialogTrigger>
                  <UserAlert
                    userID={user.ID!}
                    onCancel={fetchUsers}
                  ></UserAlert>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Link to="/user">
        <Tooltip content={"User List"}>
          <ChevronLeftSquare className="fixed bottom-4 right-16 w-10 h-10 text-black-500 cursor-pointer" />
        </Tooltip>
      </Link>
    </div>
  );
};

export default UserList;
