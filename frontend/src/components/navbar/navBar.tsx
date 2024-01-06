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

const NavBar = () => {
  const { logout, getRole, isLoggedIn, getEmployee, getUser } = useAuth();
  const location = useLocation();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center w-full px-4">
        <div className="flex w-full">
          <Link className="mr-6  items-center space-x-2 flex" to="/">
            <HomeIcon />
            <span className="font-bold ">Horse Farm</span>
          </Link>
          {
            <nav className="hidden sm:flex items-center space-x-6">
              {Menus[getRole()].map((menu, index) => (
                <Link
                  key={index}
                  to={menu.to}
                  className={` transition-colors hover:text-foreground/80 ${
                    location.pathname === menu.to ? "" : "text-foreground/60"
                  }`}
                >
                  {menu.label}
                </Link>
              ))}
            </nav>
          }
        </div>
        <div className="flex justify-end w-[10%] items-center">
          {isLoggedIn() ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size={"icon"}
                  variant={"ghost"}
                  className="hidden sm:flex"
                >
                  <User />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mt-4 mr-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <DropdownMenuLabel>
                  {(getRole() === "employee"
                    ? getEmployee().FirstName
                    : getUser().FirstName) || "Name"}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator /> */}
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
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              to={"/login"}
              state={{ from: "/" }}
              className="hidden sm:flex"
            >
              <Button size={"icon"} variant={"ghost"}>
                <LogInIcon />
              </Button>
            </Link>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size={"icon"} variant={"ghost"} className="sm:hidden">
                <MenuIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mt-4 mr-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {Menus[getRole()].map((menu, index) => (
                <DropdownMenuItem key={index}>
                  <Link
                    to={menu.to}
                    className={cn(
                      "transition-colors hover:text-foreground/80",
                      location.pathname === menu.to ? "" : "text-foreground/60"
                    )}
                  >
                    {menu.label}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              {isLoggedIn() ? (
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
        </div>
      </div>
    </header>
  );
};

export default NavBar;
