import { ProductPreviewCard } from '@/components/product-preview-card';
import { Loading } from '@/components/ui/loading';
import { TabsContent } from '@/components/ui/tabs';
import { productsAPI } from '@/services/products-api';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

export default function Products() {
  let { username } = useParams<string>();

  const { data, isLoading, isError } = useQuery(
    ['product_data', username],
    () => productsAPI(username!)
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <TabsContent value="products" className="border-none p-0 outline-none">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-center items-center">
        {data.data.map(
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
        )}
      </div>
    </TabsContent>
  );
}
