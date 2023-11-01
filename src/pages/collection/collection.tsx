import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ProductPreviewCard } from '@/components/product-preview-card';

export default function Collection() {
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
      <div className="flex flex-col gap-6">
        <div className="flex flex-col self-center gap-4">
          <p className="text-4xl font-bold">Collection Name</p>
          <div className="flex self-center items-center gap-2">
            <Avatar className="h-12 w-12">
              <AvatarImage src="https://avatars.githubusercontent.com/u/73711390?v=4" />
              <AvatarFallback />
            </Avatar>
            <p className="text-1xl font-semibold text-primary/80">@USERNAME</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between"></div>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-10 justify-center items-center">
          {productExample.map((item, index) => (
            <ProductPreviewCard
              image={item.image}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
