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
import EditProduct from '@/pages/profile/products/components/edit-product';
import DeleteProduct from '@/pages/profile/products/components/delete-product';
import { useState } from 'react';
import { Sheet } from './ui/sheet';
import { AlertDialog } from './ui/alert-dialog';
// import Report from './report';

interface Item {
  productId: string;
  image: string;
  title: string;
  description: string;
  username: string;
  meatballsMenu: boolean;
}

export function ProductPreviewCard({
  productId,
  image,
  title,
  description,
  username,
  meatballsMenu,
}: Item) {
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

  return (
    <>
      <Card className="w-96 sm:w-full">
        <Link to={`/product/${productId}`}>
          <img
            src={image}
            className="w-full aspect-square object-cover hover:cursor-pointer border rounded-t-lg"
          />
        </Link>
        <CardHeader>
          <div className="flex flex-row justify-between items-center">
            <Link to={`/product/${productId}`}>
              <CardTitle>{title}</CardTitle>
            </Link>
            {meatballsMenu ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-xl">
                    ⋯
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onSelect={() => setEditOpen(true)}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => setDeleteOpen(true)}
                    className="text-red-600"
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}
          </div>
          <Link to={`/product/${productId}`}>
            <CardDescription className="line-clamp-3">
              {description}
            </CardDescription>
          </Link>
        </CardHeader>
      </Card>
      <Sheet open={editOpen} onOpenChange={setEditOpen}>
        <EditProduct productId={productId} />
      </Sheet>
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DeleteProduct productId={productId} username={username} />
      </AlertDialog>
    </>
  );
}
