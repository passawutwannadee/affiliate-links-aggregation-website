import { PlusCircledIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Product } from '@/components/product';
import { Collection } from '@/components/collection';

export default function Profile() {
  return (
    <div className="container mx-auto">
      <div className="flex items-center gap-6 py-16">
        <Avatar className="h-36 w-36">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="text-4xl font-bold">@USERNAME</p>
      </div>
      <div>
        <Tabs defaultValue="products" className="h-full space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-center lg:justify-between">
            <TabsList>
              <TabsTrigger value="products" className="relative">
                Products
              </TabsTrigger>
              <TabsTrigger value="collections">Collections</TabsTrigger>
            </TabsList>
            <div className="">
              <TabsContent value="products">
                <Button>
                  <PlusCircledIcon className="mr-2 h-4 w-4" />
                  Add Product
                </Button>
              </TabsContent>

              <TabsContent value="collections">
                <Button>
                  <PlusCircledIcon className="mr-2 h-4 w-4" />
                  Add Collection
                </Button>
              </TabsContent>
            </div>
          </div>
          <TabsContent
            value="products"
            className="border-none p-0 outline-none"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center items-center">
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
            </div>
          </TabsContent>

          <TabsContent
            value="collections"
            className="h-full flex-col border-none p-0 data-[state=active]:flex"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center items-center">
              <Collection />
              <Collection />
              <Collection />
              <Collection />
              <Collection />
              <Collection />
              <Collection />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
