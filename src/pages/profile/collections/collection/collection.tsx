import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ProductPreviewCard } from '@/components/product-preview-card';
import { collectionAPI } from '@/services/collections-api';
import { useQuery } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Loading } from '@/components/ui/loading';
import { Card, CardDescription } from '@/components/ui/card';
import ManageCollection from './manage-collection/manage-collection';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { session } from '@/lib/session';
import { toast } from 'sonner';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import Report from '@/components/report';
import { Sheet } from '@/components/ui/sheet';
import { User } from 'lucide-react';
import { AxiosError } from 'axios';

export default function Collection() {
  const { id } = useParams<string>();
  const [reportOpen, setReportOpen] = useState<boolean>(false);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const emailVerified = useSelector(
    (state: RootState) => state.user.emailVerified
  );

  const navigate = useNavigate();

  const { data, isLoading } = useQuery(
    ['collection_data', id],
    () => collectionAPI(id!),
    {
      retry: 0,
      onError: (response: AxiosError) => {
        if (response.status === 404) {
          navigate('/404');
        }
      },
    }
  );

  const handleReportClose = () => {
    setReportOpen(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="container mx-auto py-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-20">
              <div className="flex flex-col gap-3 items-center lg:items-start">
                <p className="text-4xl font-bold">
                  {data!.data.collection_name}
                </p>
                <div className="flex flex-row items-center gap-2">
                  <Link
                    to={`/profile/${data!.data.display_name}`}
                    className="flex gap-2"
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={data!.data.profile_picture} />
                      <AvatarFallback>
                        <User className="w-2/4 h-2/4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start">
                      <p className="text-xl font-bold">
                        {data!.data.display_name}
                      </p>
                      <p className="text-sm font-bold text- text-primary/80">
                        @{data!.data.username}
                      </p>
                    </div>
                  </Link>
                  {currentUser !== data!.data.username ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="text-xl">
                          ⋯
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            onSelect={
                              session() && emailVerified === 1
                                ? () => setReportOpen(true)
                                : session() && emailVerified === 0
                                ? () => navigate('/verify-email')
                                : () =>
                                    toast(
                                      'Do you want to report this product?',
                                      {
                                        action: {
                                          label: 'Sign in',
                                          onClick: () => navigate('/login'),
                                        },
                                      }
                                    )
                            }
                          >
                            Report
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : null}
                </div>
              </div>
              <Card className="w-full">
                <CardDescription className="p-4">
                  {data!.data.collection_description}
                </CardDescription>
              </Card>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-end">
            <ManageCollection
              collectionProducts={data!.data.products}
              collectionId={id!}
              collectionName={data!.data.collection_name}
              collectionDescription={data!.data.collection_description}
            />
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-10 justify-center items-center">
            {data!.data.products.map(
              (
                item: {
                  product_id: number;
                  product_image: string;
                  product_name: string;
                  product_description: string;
                  username: string;
                },
                index: number
              ) => (
                <ProductPreviewCard
                  key={index}
                  productId={item.product_id}
                  image={item.product_image}
                  title={item.product_name}
                  description={item.product_description}
                  username={item.username}
                  meatballsMenu={false}
                />
              )
            )}
          </div>
        </div>
      </div>
      <Sheet open={reportOpen} onOpenChange={setReportOpen}>
        <Report
          username={data!.data.username}
          collectionId={data!.data.collection_id}
          closeSheet={handleReportClose}
          parentId={3}
        />
      </Sheet>
    </>
  );
}
