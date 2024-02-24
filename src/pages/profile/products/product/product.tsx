import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { productAPI } from '@/services/products-api';
import { useQuery } from 'react-query';
import { Loading } from '@/components/ui/loading';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Report from '@/components/report';
import { useState } from 'react';
import { Sheet } from '@/components/ui/sheet';
import { session } from '@/lib/session';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { User } from 'lucide-react';

export default function Product() {
  const { id } = useParams<string>();
  const [reportOpen, setReportOpen] = useState<boolean>(false);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const emailVerified = useSelector(
    (state: RootState) => state.user.emailVerified
  );

  const productId = parseInt(id!);

  const navigate = useNavigate();

  const { data, isLoading } = useQuery(
    ['product_data', id],
    () => productAPI(productId!),
    {
      retry: 0,
      // onError: (response: AxiosError) => {
      //   if (response.status === 404) {
      //     navigate('/404');
      //   }
      // },
    }
  );

  const handleReportClose = () => {
    setReportOpen(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  // const anchor1 = document.createElement('a');
  // const anchor2 = document.createElement('a');
  // const anchor3 = document.createElement('a');
  // const anchor4 = document.createElement('a');

  // useEffect(() => {
  //   for (let i = 0; i < data.data[0].links.length; i++) {}
  //   anchor.href =
  //     'https://www.lazada.co.th/products/sealect-165-i2622271972-s9403695117.html?c=&channelLpJumpArgs=&clickTrackInfo=query%253A%2525E0%2525B8%25258B%2525E0%2525B8%2525B5%2525E0%2525B9%252580%2525E0%2525B8%2525A5%2525E0%2525B9%252587%2525E0%2525B8%252584%253Bni';
  //   console.log(anchor.hostname.replace(/^www\./, ''));
  // }, [data]);

  return (
    <>
      <div className="container mx-auto py-8">
        <div className="flex flex-col lg:flex-row lg:pl-20 lg:pr-20 gap-12">
          <img
            src={data!.data[0].product_image}
            className="flex self-center w-96 aspect-square rounded-lg object-cover border"
          />
          <div className="flex flex-col self-center gap-16 items w-full">
            <div className="flex flex-col gap-2 items-center lg:items-start">
              <p className="text-4xl font-bold text-center lg:text-left">
                {data!.data[0].product_name}
              </p>
              <div className="flex items-center gap-2 pt-2">
                <Link
                  to={`/profile/${data!.data[0].display_name}`}
                  className="flex gap-2"
                >
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={data!.data[0].profile_picture} />
                    <AvatarFallback>
                      <User className="w-2/4 h-2/4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <p className="text-xl font-bold">
                      {data!.data[0].display_name}
                    </p>
                    <p className="text-sm font-bold text- text-primary/80">
                      @{data!.data[0].username}
                    </p>
                  </div>
                </Link>
                {currentUser !== data!.data[0].username ? (
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
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : null}
              </div>
            </div>
            <div>
              {data!.data[0].product_description
                .split('\n')
                .map((line: string, index: number) => (
                  <p className="m-0" key={index}>
                    {line}
                  </p>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-6 w-full">
              {data!.data[0].links.map((_items: null, index: number) => (
                <a
                  key={index}
                  className="border rounded-3xl bg-primary w-full hover:bg-primary/90 hover:cursor-pointer"
                  href={data!.data[0].links[index]}
                  target="_blank"
                >
                  <p className="px-6 text-2xl font-semibold text-center text-secondary truncate ...">
                    {new URL(data!.data[0].links[index]).hostname.replace(
                      /^www\./,
                      ''
                    )}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Sheet open={reportOpen} onOpenChange={setReportOpen}>
        <Report
          username={data!.data[0].username}
          productId={data!.data[0].product_id}
          closeSheet={handleReportClose}
          parentId={2}
        />
      </Sheet>
    </>
  );
}
