import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AddProduct from './add-product/add-product';
import AddCollection from './add-collection/add-collection';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useQuery } from 'react-query';
import { usersAPI } from '@/services/users-api';
import { useNavigate, useParams } from 'react-router-dom';
import { Loading } from '@/components/ui/loading';
import Products from './products/products';
import Collections from './collections/collections';
import Report from '@/components/report';
import { Search, User } from 'lucide-react';
import { RootState } from '@/redux/store/store';
import { useSelector } from 'react-redux';
import { Sheet } from '@/components/ui/sheet';
import { session } from '@/lib/session';
import { toast } from 'sonner';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { productCategoriesAPI } from '@/services/products-api';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  product_name: z.string(),
  category: z.string(),
  collection_name: z.string(),
});

export default function Profile() {
  const { username } = useParams<string>();
  const [reportOpen, setReportOpen] = useState<boolean>(false);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const currentRole = useSelector((state: RootState) => state.user.currentRole);
  const emailVerified = useSelector(
    (state: RootState) => state.user.emailVerified
  );

  const navigate = useNavigate();

  const handleReportClose = () => {
    setReportOpen(false);
  };

  const { data, isLoading } = useQuery(
    ['profile_data', username],
    () => usersAPI(username!),
    {
      retry: 0,
      onError: (response: AxiosError) => {
        if (response.status === 404) {
          navigate('/404');
        }
      },
    }
  );

  // get categories
  const { data: categoriesData, isLoading: categoriesIsLoading } = useQuery(
    ['product_categories'],
    () => productCategoriesAPI()
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_name: '',
      category: '0',
    },
    mode: 'onChange',
  });

  if (isLoading && categoriesIsLoading) {
    return <Loading />;
  }

  const watchCategory = form.watch('category');
  const watchProductName = form.watch('product_name');
  const watchCollectionName = form.watch('collection_name');

  return (
    <>
      <Tabs
        defaultValue="products"
        className="container flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-2 lg:grid-cols-[22  8px_minmax(0,1fr)] lg:gap-10 mt-6"
      >
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-7.5rem)] w-full shrink-0 md:sticky md:flex">
          <TabsContent value="products">
            <Form {...form}>
              <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                  <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                    Categories
                  </h2>
                  <div className="space-y-1">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue="0"
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="View All" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem key={0} value={'0'} defaultChecked>
                                View All
                              </SelectItem>
                              {categoriesData?.data.map(
                                (value: {
                                  category_name: string;
                                  category_id: string;
                                }) => {
                                  return (
                                    <SelectItem
                                      key={value.category_id}
                                      value={value.category_id.toString()}
                                      className="hover:bg-primary/10"
                                    >
                                      {value.category_name}
                                    </SelectItem>
                                  );
                                }
                              )}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="px-3 py-2">
                  <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                    Product Name
                  </h2>
                  <div className="space-y-1">
                    <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                      <div className="relative w-full">
                        <FormField
                          control={form.control}
                          name="product_name"
                          render={({ field }) => (
                            <FormItem>
                              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="Search"
                                className="pl-8"
                                onChange={field.onChange}
                              />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </TabsContent>
          <TabsContent value="collections">
            <Form {...form}>
              <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                  <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                    Collection Name
                  </h2>
                  <div className="space-y-1">
                    <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                      <div className="relative w-full">
                        <FormField
                          control={form.control}
                          name="collection_name"
                          render={({ field }) => (
                            <FormItem>
                              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="Search"
                                className="pl-8"
                                onChange={field.onChange}
                              />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </TabsContent>
        </aside>
        <div>
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
              <p className="text-md lg:text-lg font-bold text-primary/80">
                @{data!.data.username}
              </p>
            </div>
            {currentUser !== data!.data.username ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-xl">
                    ⋯
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuGroup>
                    {currentRole === '2' ? (
                      <DropdownMenuItem
                        className="font text-destructive"
                        onSelect={
                          session() && emailVerified === 1
                            ? () => setReportOpen(true)
                            : session() && emailVerified === 0
                            ? () => navigate('/verify-email')
                            : () =>
                                toast('Do you want to report this user?', {
                                  action: {
                                    label: 'Sign in',
                                    onClick: () => navigate('/login'),
                                  },
                                })
                        }
                      >
                        Ban
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem
                        onSelect={
                          session() && emailVerified === 1
                            ? () => setReportOpen(true)
                            : session() && emailVerified === 0
                            ? () => navigate('/verify-email')
                            : () =>
                                toast('Do you want to report this user?', {
                                  action: {
                                    label: 'Sign in',
                                    onClick: () => navigate('/login'),
                                  },
                                })
                        }
                      >
                        Report
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}
          </div>
          <div className="h-full space-y-6 pt-8">
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
                {currentUser === data!.data.username && emailVerified === 1 ? (
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
            <Products category={watchCategory} productName={watchProductName} />
            <Collections collectionName={watchCollectionName} />
          </div>
        </div>
      </Tabs>

      <Sheet open={reportOpen} onOpenChange={setReportOpen}>
        <Report
          closeSheet={handleReportClose}
          username={username!}
          parentId={1}
        ></Report>
      </Sheet>
    </>
  );
}
