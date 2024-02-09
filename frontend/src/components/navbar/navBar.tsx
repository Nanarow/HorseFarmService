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
import { LogInIcon, LogOutIcon, MenuIcon, User } from "lucide-react";
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
            {/* <HomeIcon /> */}
            <svg width={24} height={24}>
              <path
                className=" scale-[0.2] dark:fill-primary"
                xmlns="http://www.w3.org/2000/svg"
                d="M21.2,72.04c4.63,1.68,11.49-2.09,22-14.74c3.98,1.47,7.1,4.73,8.46,11.72c2.58,13.31-1.52,21.83-7.22,33.54 c-1.06,2.17-2.12,4.32-3.15,6.48h81.29l-0.25-0.2c5.55-39.24-31.98-58.51-4.56-46.4c-11.78-28.52-48.09-37.8-22.47-34.84 C82.12,15.55,65.5,8.89,41.87,13.1C36.85,5.77,24.84-9.86,28.52,8.86L22.5,3.49l-0.33,18.89C15.01,27.84,11.1,46.03,5.56,57.86 c-4.74,4.7-6.56,10.32-5.05,19.06C7.89,86.43,19.54,84.07,21.2,72.04L21.2,72.04z"
              />
            </svg>
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
