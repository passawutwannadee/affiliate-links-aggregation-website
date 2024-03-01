import { ProductPreviewCard } from '@/components/product-preview-card';
import { Button } from '@/components/ui/button';
import { TabsContent } from '@/components/ui/tabs';
import { queryClient } from '@/configs/query-client';
import { productsAPI } from '@/services/products-api';
import { Loader2 } from 'lucide-react';
import { Fragment, useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useParams } from 'react-router-dom';

export default function Products({
  category,
  productName,
}: {
  category: string;
  productName: string;
}) {
  const { username } = useParams<string>();

  // const { data, isLoading } = useQuery(['product_data', username], () =>
  //   productsAPI(username!)
  // );

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(
    ['product_data', username],
    ({ pageParam = 1 }) =>
      productsAPI(username!, category, productName, 12, pageParam),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.data.next_page; // Assuming nextPage property is present in your API response
      },
    }
  );

  useEffect(() => {
    refetch();
    queryClient.resetQueries({
      queryKey: ['product_data', username],
      exact: true,
    });
  }, [category, productName]);

  return (
    <TabsContent value="products" className="border-none p-0 outline-none">
      <div className="grid grid-cols-1 sm:grid-cols-2 min-[996px]:grid-cols-3 min-[1252px]:grid-cols-4 gap-4 justify-center items-center place-items-center my-4">
        {isLoading ? (
          <div className="flex items-center w-full">
            <Loader2 className="animate-spin stroke-primary h-8 w-8" />
          </div>
        ) : (
          data?.pages.map((page, pageIndex) => (
            <Fragment key={pageIndex}>
              {page.data.data.map(
                (
                  item: {
                    product_id: string;
                    product_image: string;
                    product_name: string;
                    product_description: string;
                    username: string;
                  },
                  index: number
                ) => (
                  <ProductPreviewCard
                    key={index}
                    productId={parseInt(item.product_id)}
                    image={item.product_image}
                    title={item.product_name}
                    description={item.product_description}
                    username={username!}
                    meatballsMenu={true}
                  />
                )
              )}
            </Fragment>
          ))
        )}
      </div>
      {hasNextPage && (
        <Button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="w-full my-4"
        >
          {isFetchingNextPage ? 'Loading more...' : 'Load More'}
        </Button>
      )}
    </TabsContent>
  );
}
