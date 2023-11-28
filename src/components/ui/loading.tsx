import { hatch } from 'ldrs';

hatch.register();

// Default values shown
export function Loading() {
  return (
    <>
      <div className="flex justify-center items-center h-screen fixed center top-0 left-0 right-0 bg-muted opacity-50" />
      <div className="flex justify-center items-center h-screen fixed center top-0 left-0 right-0">
        <l-hatch size="30" stroke="4" speed="3.5" color="black"></l-hatch>
      </div>
    </>
  );
}
