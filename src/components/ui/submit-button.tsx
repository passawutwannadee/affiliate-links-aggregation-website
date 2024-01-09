import { Loader2 } from 'lucide-react';
import { Button, buttonVariants } from './button';
import { VariantProps } from 'class-variance-authority';

export interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

export function SubmitButton({ isLoading, children }: SubmitButtonProps) {
  return (
    <Button className="w-full" type="submit" disabled={isLoading}>
      {isLoading && (
        <Loader2 className="animate-spin stroke-primary-foreground w-5 h-5 mr-1 stroke-[2.5px]" />
      )}
      {children}
    </Button>
  );
}
