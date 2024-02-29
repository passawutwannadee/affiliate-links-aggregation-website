import { Link, useNavigate } from 'react-router-dom';
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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { reset } from '@/redux/features/userSlice';
import globalRouter from '@/lib/global-navigate';

export function MainNav() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const currentUserPFP = useSelector(
    (state: RootState) => state.user.currentUserPFP
  );
  const currentRole = useSelector((state: RootState) => state.user.currentRole);

  const navigate = useNavigate();
  globalRouter.navigate = navigate;
  const { mutate } = useMutation(logoutAPI, {
    onSuccess: (response) => {
      // login is successful
      if (response.status === 200) {
        window.location.reload();
      }
    },
  });

  const handleLogout = () => {
    navigate('/login');
    dispatch(reset());
  };

  const deleteCookie = () => {
    document.cookie = `session=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;

    mutate();
  };

  return (
    <div className="shadow-sm sticky top-0 z-50 bg-background">
      <div className="container mx-auto">
        <nav className="flex items-center py-2 justify-between">
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
                  <DropdownMenuLabel>@{currentUser}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {currentRole === 2 ? (
                    <DropdownMenuItem>
                      <Link to={`/admin`}>Dashboard</Link>
                    </DropdownMenuItem>
                  ) : null}
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
              <Button onClick={handleLogout}>Login</Button>
            )}

            <ModeToggle />
          </div>
        </nav>
      </div>
    </div>
  );
}
