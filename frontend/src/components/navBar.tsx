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
import { HomeIcon, LogInIcon, LogOutIcon, User } from "lucide-react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { LogOut, user } = useAuth();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center w-full px-4">
        <div className="flex w-full">
          <Link className="mr-6 flex items-center space-x-2" to="/">
            <HomeIcon />
            <span className="hidden font-bold sm:inline-block">Horse Farm</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {/* <Link
                to="/example/form"
                className="hidden text-foreground/60 transition-colors hover:text-foreground/80 md:block"
              >
                Examples
              </Link> */}
            <Link
              to="/course"
              className="text-foreground/60 transition-colors hover:text-foreground/80 "
            >
              Course
            </Link>
            <Link
              to="/tour"
              className="text-foreground/60 transition-colors hover:text-foreground/80 flex"
            >
              Tour{" "}
              <span className=" hidden md:block">
                {" "}
                &nbsp;&nbsp;Registration
              </span>
            </Link>
          </nav>
        </div>
        {/* <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 py-2 mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            type="button"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="radix-:R15hja:"
            data-state="closed"
          >
            <MenuIcon></MenuIcon>
            <span className="sr-only">Toggle Menu</span>
          </button> */}
        <div className="flex justify-end w-full items-center">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <User />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    console.log("logout");
                    LogOut();
                  }}
                  className="text-red-500 cursor-pointer"
                >
                  <LogOutIcon className="mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <LogInIcon />
          )}
          {/* <div className="w-full flex-1 md:w-auto md:flex-none">
              <button className="inline-flex items-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64">
                <span className="hidden lg:inline-flex">
                  Search documentation...
                </span>
                <span className="inline-flex lg:hidden">Search...</span>
                <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </button>
            </div> */}
          {/* <nav className="flex items-center">
            <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/shadcn-ui/ui"
              >
                <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9 px-0">
                  {/* <IconBrandGithub /> 
                  <span className="sr-only">GitHub</span>
                </div>
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://twitter.com/shadcn"
              >
                <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9 px-0">
                  {/* <IconBrandTwitter /> 
                  <span className="sr-only">Twitter</span>
                </div>
              </a>
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9 px-0"
                type="button"
                id="radix-:Rtlhja:"
                aria-haspopup="menu"
                aria-expanded="false"
                data-state="closed"
              >
                {/* <IconLanguage /> 
                {/* Icon 
                <span className="sr-only">Toggle theme</span>
              </button> 
          </nav> */}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
