import { Button } from "@shadcn/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@shadcn/ui/dropdown-menu";
import { useAuth } from "@src/providers/authProvider";
import { HomeIcon, LogInIcon, LogOutIcon, MenuIcon, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Menus } from "./menu";
import { cn } from "@cn/utils";
import Each from "../each";
import { ModeToggle } from "../modeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@shadcn/ui/avatar";

const NavBar = () => {
  const { getRole } = useAuth();
  const location = useLocation();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center w-full px-4">
        <div className="flex w-full">
          <Link
            className="mr-6  items-center space-x-2 flex"
            to="/loading"
            state={{ from: "/" }}
          >
            <HomeIcon />
            <span className="font-bold ">KhunMa Farm</span>
          </Link>

          {
            <nav className="hidden sm:flex items-center space-x-6">
              <Each
                of={Menus[getRole()]}
                render={(menu) => (
                  <Link
                    to={"/loading"}
                    className={` transition-colors hover:text-foreground/80 ${
                      location.pathname === menu.to ? "" : "text-foreground/60"
                    }`}
                    state={{ from: menu.to }}
                  >
                    {menu.label}
                  </Link>
                )}
              />
            </nav>
          }
        </div>

        <div className="flex justify-end w-max items-center gap-2">
          <ModeToggle />
          <AccountDropdownWithMenu />
        </div>
      </div>
    </header>
  );
};

export default NavBar;

const AccountDropdownWithMenu = () => {
  const { logout, getRole, isLoggedIn, getEmployee, getUser } = useAuth();
  const login = isLoggedIn();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={"icon"}
          variant={"ghost"}
          className={login ? " sm:rounded-full z-100" : ""}
        >
          <MenuIcon className="sm:hidden" />
          {!login && <User className="hidden sm:block" />}
          {login && (
            <Avatar className="hidden sm:flex border-2 border-primary">
              <AvatarImage
                src={getRole() === "employee" ? "" : getUser().Profile}
              />
              <AvatarFallback>
                {getRole() === "employee"
                  ? getEmployee().FirstName.charAt(0).toUpperCase() +
                    getEmployee().LastName.charAt(0).toUpperCase()
                  : getUser().FirstName.charAt(0).toUpperCase() +
                    getUser().LastName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 mt-[14px] mr-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
        <DropdownMenuLabel>
          {login
            ? (getRole() === "employee"
                ? getEmployee().FirstName
                : getUser().FirstName) || "Name"
            : "Menu"}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <Each
          of={Menus[getRole()]}
          render={(menu) => (
            <DropdownMenuItem className="sm:hidden">
              <Link
                to={"/loading"}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  location.pathname === menu.to ? "" : "text-foreground/60"
                )}
                state={{ from: menu.to }}
              >
                {menu.label}
              </Link>
            </DropdownMenuItem>
          )}
        />

        <DropdownMenuSeparator className="sm:hidden" />

        {login ? (
          <DropdownMenuItem
            onClick={logout}
            className={cn(
              "text-red-500 cursor-pointer ",
              "focus:bg-red-500 focus:text-white"
            )}
          >
            <LogOutIcon className="mr-2" />
            Log out
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem className="cursor-pointer">
            <Link
              to={"/login"}
              state={{ from: "/" }}
              className="flex items-center"
            >
              <LogInIcon className="mr-2" />
              Log In
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
