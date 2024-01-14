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
import { Button } from './ui/button';
import { session } from '@/lib/session';
import { useMutation } from 'react-query';
import { logoutAPI } from '@/services/auth-api';
import { User } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';

export function MainNav() {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const currentUserPFP = useSelector(
    (state: RootState) => state.user.currentUserPFP
  );

  const { mutate } = useMutation(logoutAPI, {
    onSuccess: (response) => {
      // login is successful
      if (response.status === 200) {
        window.location.reload();
      }
    },
  });

  const deleteCookie = () => {
    document.cookie = `session=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;

    mutate();
  };

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
            {session() ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={currentUserPFP!} />
                    <AvatarFallback>
                      <User />
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to={`/profile/${currentUser}`}>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/settings/account">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => deleteCookie()}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button>Login</Button>
            )}

            <ModeToggle />
          </div>
        </nav>
      </div>
    </div>
  );
}
