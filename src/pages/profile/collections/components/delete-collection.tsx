import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useMutation } from 'react-query';
import { toast } from 'sonner';
import { removeCollectionsAPI } from '@/services/collections-api';

export default function DeleteCollection({
  collectionId,
}: {
  collectionId: string;
}) {
  const { mutate } = useMutation(removeCollectionsAPI, {
    onSuccess: (response) => {
      // login is successful
      if (response.status === 200) {
        toast(
          <>
            {' '}
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
            <p>Successfully deleted product.</p>
          </>
        );
      }
    },
  });

  // 2. Define a submit handler.
  function onSubmit() {
    mutate(collectionId);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="w-full">
        <Button variant="ghost" className="w-full justify-start">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this collection?
          </AlertDialogTitle>
          {/* <AlertDialogDescription>dasfdfdsfdsfdsf</AlertDialogDescription> */}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
