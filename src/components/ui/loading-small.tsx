import { Loader2 } from 'lucide-react';

// Default values shown
export function LoadingSmall() {
  return (
    <>
      <div className="flex items-center w-full">
        <Loader2 className="animate-spin stroke-primary h-8 w-8" />
      </div>
    </>
  );
}
