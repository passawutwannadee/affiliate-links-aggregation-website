import { CollectionPreviewCard } from '@/components/collection-preview-card';
import { Button } from '@/components/ui/button';
import { TabsContent } from '@/components/ui/tabs';
import { queryClient } from '@/configs/query-client';
import { collectionsAPI } from '@/services/collections-api';
import { Loader2 } from 'lucide-react';
import { Fragment, useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useParams } from 'react-router-dom';

export default function Collections({
  collectionName,
}: {
  collectionName: string;
}) {
  const { username } = useParams<string>();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(
    ['collection_data', username],
    ({ pageParam = 1 }) =>
      collectionsAPI(username!, collectionName, 12, pageParam),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.data.next_page; // Assuming nextPage property is present in your API response
      },
    }
  );

  useEffect(() => {
    refetch();
    queryClient.resetQueries({
      queryKey: ['collection_data', username],
      exact: true,
    });
  }, [collectionName]);

  return (
    <TabsContent
      value="collections"
      className="h-full flex-col border-none p-0 data-[state=active]:flex"
    >
      <div className="grid grid-cols-1 min-[996px]:grid-cols-2 min-[1252px]:grid-cols-3 gap-10 justify-center items-center place-items-center">
        {isFetching ? (
          <div className="flex items-center w-full">
            <Loader2 className="animate-spin stroke-primary h-8 w-8" />
          </div>
        ) : (
          data?.pages.map((page, pageIndex) => (
            <Fragment key={pageIndex}>
              {page.data.data.map(
                (
                  item: {
                    collection_id: string;
                    collection_name: string;
                    collection_description: string;
                    product_images: string[];
                  },
                  index: number
                ) => (
                  <CollectionPreviewCard
                    key={index}
                    collectionId={item.collection_id}
                    title={item.collection_name}
                    description={item.collection_description}
                    productImages={item.product_images}
                    username={username!}
                  />
                )
              )}
            </Fragment>
          ))
        )}

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
