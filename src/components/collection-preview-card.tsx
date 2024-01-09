import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import DeleteCollection from '@/pages/profile/collections/components/delete-collection';
import { AlertDialog } from './ui/alert-dialog';
import { useState } from 'react';

interface Collection {
  collectionId: string;
  title: string;
  description: string;
  username: string;
}

export function CollectionPreviewCard({
  collectionId,
  title,
  description,
  username,
}: Collection) {
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

  return (
    <>
      <Card className="w-96 md:w-full">
        <Link to={`/collection/${collectionId}`}>
          <div className="grid grid-cols-2">
            <img src="./placeholder-images-image_large.webp" className="p-1" />
            <img src="./placeholder-images-image_large.webp" className="p-1" />
            <img src="./placeholder-images-image_large.webp" className="p-1" />
            <img src="./placeholder-images-image_large.webp" className="p-1" />
          </div>
        </Link>
        <CardHeader>
          <CardTitle>
            <div className="flex flex-row justify-between items-center">
              <Link to={`/collection/${collectionId}`}>
                <CardTitle>{title}</CardTitle>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-xl">
                    ⋯
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {/* <DropdownMenuItem onSelect={() => setEditOpen(true)}>
                    Edit
                  </DropdownMenuItem> */}
                  <DropdownMenuItem
                    onSelect={() => setDeleteOpen(true)}
                    className="text-red-600"
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardTitle>
          <Link to={`/collection/${collectionId}`}>
            <CardDescription className="line-clamp-5">
              {description}
            </CardDescription>
          </Link>
        </CardHeader>
      </Card>
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DeleteCollection collectionId={collectionId} username={username} />
      </AlertDialog>
    </>
  );
}
