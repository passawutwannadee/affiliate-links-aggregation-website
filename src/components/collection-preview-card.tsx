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
import { ImageOff } from 'lucide-react';

interface Collection {
  collectionId: string;
  title: string;
  description: string;
  username: string;
  productImages: string[];
}

export function CollectionPreviewCard({
  collectionId,
  title,
  description,
  username,
  productImages,
}: Collection) {
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

  return (
    <>
      <Card className="w-96 md:w-full h-full">
        {productImages.length > 3 ? (
          <Link to={`/collection/${collectionId}`}>
            <div className="flex flex-row border rounded-t-lg">
              <div className="grid grid-cols-2 w-full">
                <img
                  src={productImages[0]}
                  className="w-full aspect-[1/1] object-cover hover:cursor-pointer"
                />
                <img
                  src={productImages[1]}
                  className="w-full aspect-[1/1] object-cover hover:cursor-pointer"
                />
                <img
                  src={productImages[2]}
                  className="w-full aspect-[1/1] object-cover hover:cursor-pointer"
                />
                <img
                  src={productImages[3]}
                  className="w-full aspect-[1/1] object-cover hover:cursor-pointer"
                />
              </div>
              <div className="w-36 flex justify-center items-center">
                <p className="text-5xl text-primary/50">
                  +{productImages.length - 1}
                </p>
              </div>
            </div>
          </Link>
        ) : productImages.length > 1 ? (
          <Link to={`/collection/${collectionId}`}>
            <div className="flex flex-row border rounded-t-lg">
              <img
                src={productImages[0]}
                className="w-full aspect-[1/1] object-cover hover:cursor-pointer"
              />
              <div className="w-36 flex justify-center items-center">
                <p className="text-5xl text-primary/50">
                  +{productImages.length - 1}
                </p>
              </div>
            </div>
          </Link>
        ) : (
          <Link to={`/collection/${collectionId}`}>
            <div className="flex flex-row border rounded-t-lg">
              <ImageOff className="h-full w-full aspect-[1/1] object-cover hover:cursor-pointer" />
              <div className="w-36 flex justify-center items-center">
                <p className="text-5xl text-primary/50">{0}</p>
              </div>
            </div>
          </Link>
        )}
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
