import { CollectionPreviewCard } from '@/components/collection-preview-card';
import { Loading } from '@/components/ui/loading';
import { TabsContent } from '@/components/ui/tabs';
import { collectionsAPI } from '@/services/collections-api';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

export default function Collections() {
  const { username } = useParams<string>();

  const { data, isLoading } = useQuery(['collection_data', username], () =>
    collectionsAPI(username!)
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <TabsContent
      value="collections"
      className="h-full flex-col border-none p-0 data-[state=active]:flex"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center items-center place-items-center">
        {/* {console.log(data)} */}
        {data?.data.map(
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
      </div>
    </TabsContent>
  );
}
