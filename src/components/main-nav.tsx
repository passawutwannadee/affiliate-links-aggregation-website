import { Link } from 'react-router-dom';
import { ModeToggle } from './mode-toggle';

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
          <ModeToggle />
        </nav>
      </div>
    </div>
  );
}
