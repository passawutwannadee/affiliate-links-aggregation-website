import { ProductPreviewCard } from '@/components/product-preview-card';
import { Loading } from '@/components/ui/loading';
import { TabsContent } from '@/components/ui/tabs';
import { productsAPI } from '@/services/products-api';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

export default function Products() {
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

  let { username } = useParams<string>();

  const { data, isLoading, isError } = useQuery(
    ['product_data', username],
    () => productsAPI(username!)
  );

  return (
    <TabsContent value="products" className="border-none p-0 outline-none">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-center items-center">
        {isLoading ? (
          <Loading />
        ) : (
          data.data.map(
            (
              item: {
                product_image: string;
                product_name: string;
                product_description: string;
              },
              index: any
            ) => (
              <ProductPreviewCard
                image={item.product_image}
                title={item.product_name}
                description={item.product_description}
              />
            )
          )
        )}
      </div>
    </TabsContent>
  );
}
