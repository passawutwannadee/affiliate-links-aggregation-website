import { Link } from 'react-router-dom';
import { ModeToggle } from './mode-toggle';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function MainNav() {
  return (
    <div className="shadow-sm sticky top-0 z-50 bg-background">
      <div className="container mx-auto">
        <nav className="flex items-center py-4 justify-between">
          <Link
            to="/"
            className="text-2xl font-medium transition-colors hover:text-primary"
          >
            LOGO
          </Link>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="h-12 w-12">
                  <AvatarImage src="https://avatars.githubusercontent.com/u/73711390?v=4" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/settings/account">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ModeToggle />
          </div>
        </nav>
      </div>
    </div>
  );
}
