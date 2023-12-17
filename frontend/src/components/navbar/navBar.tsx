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

const NavBar = () => {
  const { logout, user, employee } = useAuth();
  const location = useLocation();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center w-full px-4">
        <div className="flex w-full">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size={"icon"} variant={"ghost"} className="sm:hidden">
                <MenuIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mt-2 ml-1 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {Menus[
                employee
                  ? "emp"
                  : !user || (user && user.RoleID === 101)
                  ? "user"
                  : "admin"
              ].map((menu, index) => (
                <DropdownMenuItem key={index}>
                  <Link
                    to={menu.to}
                    className={` transition-colors hover:text-foreground/80 ${
                      location.pathname === menu.to ? "" : "text-foreground/60"
                    }`}
                  >
                    {menu.label}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              {user || employee ? (
                <DropdownMenuItem
                  onClick={logout}
                  className="text-red-500 cursor-pointer"
                >
                  <LogOutIcon className="mr-2" />
                  Log out
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem className="cursor-pointer">
                  <LogInIcon className="mr-2" />
                  Log In
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link className="mr-6  items-center space-x-2 hidden sm:flex" to="/">
            <HomeIcon />
            <span className="hidden font-bold sm:inline-block">Horse Farm</span>
          </Link>
          {
            <nav className="hidden sm:flex items-center space-x-6">
              {Menus[
                employee
                  ? "emp"
                  : !user || (user && user.RoleID === 101)
                  ? "user"
                  : "admin"
              ].map((menu, index) => (
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
          {user || employee ? (
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
              <DropdownMenuContent className="w-56 mt-2 mr-1 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <DropdownMenuLabel>
                  {user?.FirstName || employee?.FirstName || "Name"}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator /> */}
                <DropdownMenuItem
                  onClick={logout}
                  className="text-red-500 cursor-pointer"
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
        </div>
      </div>
    </header>
  );
};

export default NavBar;
