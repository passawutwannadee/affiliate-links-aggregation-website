import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AddProduct from './add-product/add-product';
import AddCollection from './add-collection/add-collection';
import { ProductPreviewCard } from '@/components/product-preview-card';
import { CollectionPreviewCard } from '../../components/collection-preview-card';

export default function Profile() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col lg:flex-row items-center gap-6">
        <Avatar className="h-36 w-36">
          <AvatarImage src="https://avatars.githubusercontent.com/u/73711390?v=4" />
          <AvatarFallback />
        </Avatar>
        <p className="text-4xl font-bold">@USERNAME</p>
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
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-center items-center">
            <ProductPreviewCard />
            <ProductPreviewCard />
            <ProductPreviewCard />
            <ProductPreviewCard />
            <ProductPreviewCard />
            <ProductPreviewCard />
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
