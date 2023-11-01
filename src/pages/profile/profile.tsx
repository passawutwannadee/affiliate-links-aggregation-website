import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AddProduct from './add-product/add-product';
import AddCollection from './add-collection/add-collection';
import { ProductPreviewCard } from '@/components/product-preview-card';
import { CollectionPreviewCard } from '../../components/collection-preview-card';

export default function Profile() {
  const productExample = [
    {
      image: 'https://example.com/product1.jpg',
      title: 'Product 1',
      description: 'This is the description for Product 1.',
    },
    {
      image: 'https://example.com/product2.jpg',
      title: 'Product 2',
      description: 'This is the description for Product 2.',
    },
    {
      image: 'https://example.com/product3.jpg',
      title: 'Product 3',
      description: 'This is the description for Product 3.',
    },
    {
      image: 'https://example.com/product4.jpg',
      title: 'Product 4',
      description: 'This is the description for Product 4.',
    },
    {
      image: 'https://example.com/product5.jpg',
      title: 'Product 5',
      description: 'This is the description for Product 5.',
    },
    {
      image: 'https://example.com/product6.jpg',
      title: 'Product 6',
      description: 'This is the description for Product 6.',
    },
    {
      image: 'https://example.com/product7.jpg',
      title: 'Product 7',
      description: 'This is the description for Product 7.',
    },
    {
      image: 'https://example.com/product8.jpg',
      title: 'Product 8',
      description: 'This is the description for Product 8.',
    },
    {
      image: 'https://example.com/product9.jpg',
      title: 'Product 9',
      description: 'This is the description for Product 9.',
    },
    {
      image: 'https://example.com/product10.jpg',
      title: 'Product 10',
      description: 'This is the description for Product 10.',
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col lg:flex-row items-center gap-6">
        <Avatar className="h-36 w-36">
          <AvatarImage src="https://avatars.githubusercontent.com/u/73711390?v=4" />
          <AvatarFallback />
        </Avatar>
        <p className="text-2xl lg:text-3xl font-bold">@USERNAME</p>
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
