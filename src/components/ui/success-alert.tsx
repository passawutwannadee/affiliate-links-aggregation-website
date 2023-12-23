import { Alert, AlertDescription } from './alert';

export function SuccessAlert({ children }: any) {
  return (
    <Alert variant="default">
      {/* <ExclamationTriangleIcon className="h-4 w-4" /> */}
      <AlertDescription className="flex flex-row items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          data-slot="icon"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>

        {children}
      </AlertDescription>
    </Alert>
  );
}
