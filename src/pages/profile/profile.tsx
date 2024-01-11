import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AddProduct from './add-product/add-product';
import AddCollection from './add-collection/add-collection';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useQuery } from 'react-query';
import { usersAPI } from '@/services/users-api';
import { useParams } from 'react-router-dom';
import { Loading } from '@/components/ui/loading';
import Products from './products/products';
import Collections from './collections/collections';
import Report from '@/components/report';
import { User } from 'lucide-react';
import { RootState } from '@/redux/store/store';
import { useSelector } from 'react-redux';

export default function Profile() {
  const { username } = useParams<string>();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const emailVerified = useSelector(
    (state: RootState) => state.user.emailVerified
  );

  const { data, isLoading } = useQuery(['profile_data', username], () =>
    usersAPI(username!)
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="container mx-auto py-8">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <Avatar className="h-36 w-36">
            <AvatarImage src={data!.data.profile_picture} />
            <AvatarFallback>
              <User className="w-2/4 h-2/4" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center lg:items-start gap-2">
            <p className="text-2xl lg:text-3xl font-bold">
              {data!.data.display_name}
            </p>
            <p className="textsm lg:text-sm font-bold text- text-primary/80">
              @{data!.data.username}
            </p>
          </div>
          {currentUser !==
          data!.data.username.toString().toLocaleLowerCase() ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-xl">
                  ⋯
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  <Report
                    link={window.location.href}
                    username={data!.data.username}
                  />
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </div>
        <Tabs defaultValue="products" className="h-full space-y-6 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
            <TabsList className="py-5">
              <TabsTrigger value="products" className="relative text-md">
                Products
              </TabsTrigger>
              <TabsTrigger value="collections" className="relative text-md">
                Collections
              </TabsTrigger>
            </TabsList>
            <div className="">
              {currentUser ===
                data!.data.username.toString().toLocaleLowerCase() &&
              emailVerified === 1 ? (
                <>
                  <TabsContent value="products">
                    <AddProduct />
                  </TabsContent>
                  <TabsContent value="collections">
                    <AddCollection />
                  </TabsContent>
                </>
              ) : null}
            </div>
          </div>
          <Products />
          <Collections />
        </Tabs>
      </div>
    </>
  );
}
