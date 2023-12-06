import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AddProduct from './add-product/add-product';
import AddCollection from './add-collection/add-collection';
import { ProductPreviewCard } from '@/components/product-preview-card';
import { CollectionPreviewCard } from '../../components/collection-preview-card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import ReportUser from './components/report-user';

export default function Profile() {
  const productExample = [
    {
      image: 'https://i.imgur.com/QfIjbil.jpg',
      title: 'Product 1',
      description: 'This is the description for Product 1.',
    },
    {
      image: 'https://i.imgur.com/qH4N1jj.jpg',
      title: 'Product 2',
      description: 'This is the description for Product 2.',
    },
    {
      image: 'https://i.imgur.com/FHTqfDY.png',
      title: 'Product 3',
      description: 'This is the description for Product 3.',
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col lg:flex-row items-center gap-6">
        <Avatar className="h-36 w-36">
          <AvatarImage src="https://avatars.githubusercontent.com/u/73711390?v=4" />
          <AvatarFallback />
        </Avatar>
        <div className="flex flex-col items-center lg:items-start gap-2">
          <p className="text-2xl lg:text-3xl font-bold">DisplayName</p>
          <p className="textsm lg:text-sm font-bold text- text-primary/80">
            @USERNAME
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-xl">
              ⋯
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <ReportUser />
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
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
            <TabsContent value="products">
              <AddProduct />
            </TabsContent>

            <TabsContent value="collections">
              <AddCollection />
            </TabsContent>
          </div>
        </div>
        <TabsContent value="products" className="border-none p-0 outline-none">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-center items-center">
            {productExample.map((item, index) => (
              <ProductPreviewCard
                image={item.image}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent
          value="collections"
          className="h-full flex-col border-none p-0 data-[state=active]:flex"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center items-center">
            <CollectionPreviewCard />
            <CollectionPreviewCard />
            <CollectionPreviewCard />
            <CollectionPreviewCard />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
