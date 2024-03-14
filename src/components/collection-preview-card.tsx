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
import DeleteCollection from '@/pages/profile/collections/components/delete-collection';
import { AlertDialog } from './ui/alert-dialog';
import { useState } from 'react';
import { ImageOff } from 'lucide-react';
import { session } from '@/lib/session';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { toast } from 'sonner';
import Report from './report';
import { Sheet } from './ui/sheet';

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
  const [reportOpen, setReportOpen] = useState<boolean>(false);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const emailVerified = useSelector(
    (state: RootState) => state.user.emailVerified
  );

  const navigate = useNavigate();

  const handleReportClose = () => {
    setReportOpen(false);
  };

  return (
    <>
      <Card className="w-96 md:w-full h-full">
        <div className="relative">
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
          ) : productImages.length > 0 ? (
            <Link to={`/collection/${collectionId}`}>
              <div className="flex flex-row border rounded-t-lg w-full">
                <div className="flex w-full">
                  <img
                    src={productImages[0]}
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="absolute bottom-0 right-0">
              <Button
                variant="ghost"
                className="text-xl rounded-b-none rounded-r-none"
              >
                ⋯
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* <DropdownMenuItem onSelect={() => setEditOpen(true)}>
                    Edit
                  </DropdownMenuItem> */}
              {username === currentUser ? (
                <>
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
                            toast('Do you want to report this collection?', {
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
        </div>
        <CardHeader>
          <CardTitle>
            <div className="flex flex-row justify-between items-center">
              <Link
                to={`/collection/${collectionId}`}
                className=" text-ellipsis overflow-hidden ..."
              >
                <CardTitle className="break-word line-clamp-2 text-ellipsis text-sm overflow-hidden ...">
                  {title}
                </CardTitle>
              </Link>
            </div>
          </CardTitle>
          <Link to={`/collection/${collectionId}`}>
            <CardDescription className="line-clamp-5">
              {description}
            </CardDescription>
          </Link>
        </CardHeader>
      </Card>
      <Sheet open={reportOpen} onOpenChange={setReportOpen}>
        <Report
          closeSheet={handleReportClose}
          username={username}
          parentId={3}
          collectionId={parseInt(collectionId)}
        />
      </Sheet>
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DeleteCollection collectionId={collectionId} username={username} />
      </AlertDialog>
    </>
  );
}
