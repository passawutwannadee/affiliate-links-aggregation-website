import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui//button';
import { Link, useLocation } from 'react-router-dom';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    title: string;
    href: string;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  let location = useLocation();

  return (
    <nav
      className={cn(
        'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1',
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          to={item.href}
          key={item.href}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            location.pathname === item.href
              ? 'bg-muted hover:bg-muted'
              : 'hover:bg-transparent hover:underline',
            'justify-start'
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
