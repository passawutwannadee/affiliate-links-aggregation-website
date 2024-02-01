import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
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
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { session } from '@/lib/session';
import { toast } from 'sonner';
import Report from './report';
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
  const [reportOpen, setReportOpen] = useState<boolean>(false);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const emailVerified = useSelector(
    (state: RootState) => state.user.emailVerified
  );

  const navigate = useNavigate();

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleReportClose = () => {
    setReportOpen(false);
  };

  return (
    <>
      <Card className="w-96 sm:w-full h-full">
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
                  {username === currentUser ? (
                    <>
                      <DropdownMenuItem onSelect={() => setEditOpen(true)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => setDeleteOpen(true)}
                        className="text-red-600"
                      >
                        Delete
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem
                        onSelect={
                          session() && emailVerified === 1
                            ? () => setReportOpen(true)
                            : session() && emailVerified === 0
                            ? () => navigate('/verify-email')
                            : () =>
                                toast('Do you want to report this product?', {
                                  action: {
                                    label: 'Sign in',
                                    onClick: () => navigate('/login'),
                                  },
                                })
                        }
                      >
                        Report
                      </DropdownMenuItem>
                    </>
                  )}
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
      <Sheet open={reportOpen} onOpenChange={setReportOpen}>
        <Report closeSheet={handleReportClose} username={username}></Report>
      </Sheet>
      <Sheet open={editOpen} onOpenChange={setEditOpen}>
        <EditProduct productId={productId} closeSheet={handleEditClose} />
      </Sheet>
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DeleteProduct productId={productId} username={username} />
      </AlertDialog>
    </>
  );
}
