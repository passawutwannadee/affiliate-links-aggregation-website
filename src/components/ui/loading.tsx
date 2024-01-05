import { hatch } from 'ldrs';
import { Loader2 } from 'lucide-react';

hatch.register();

// Default values shown
export function Loading() {
  return (
    <>
      <div className="flex justify-center items-center h-screen fixed center top-0 left-0 right-0 bg-muted opacity-50" />
      <div className="flex justify-center items-center h-screen fixed center top-0 left-0 right-0">
        <Loader2 className="animate-spin stroke-primary h-16 w-16" />
      </div>
    </>
  );
}
