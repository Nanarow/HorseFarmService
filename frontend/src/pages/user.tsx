import UserCreate from "../components/User/UserCreate";
import UserList from "@src/components/User/UserList";

const User = () => {
  return (
    <main className="w-full h-screen">
      <UserCreate />
      <UserList />
    </main>
  );
};

export default User;
