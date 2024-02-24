import { ProductPreviewCard } from '@/components/product-preview-card';
import { Button } from '@/components/ui/button';
import { Loading } from '@/components/ui/loading';
import { TabsContent } from '@/components/ui/tabs';
import { productsAPI } from '@/services/products-api';
import { Fragment, useEffect } from 'react';
import { useInfiniteQuery, useQuery } from 'react-query';
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
    isFetching,
    isFetchingNextPage,
    refetch,
    isError,
    error,
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
  }, [category, productName]);

  if (isFetching && !isFetchingNextPage) {
    return <Loading />;
  }

  return (
    <TabsContent value="products" className="border-none p-0 outline-none">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-center place-items-center">
        {/* {data?.data.map(
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
        )} */}

        {data?.pages.map((page, pageIndex) => (
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
        ))}
        {hasNextPage && (
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="w-full col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4"
          >
            {isFetchingNextPage ? 'Loading more...' : 'Load More'}
          </Button>
        )}
      </div>
    </TabsContent>
  );
}
