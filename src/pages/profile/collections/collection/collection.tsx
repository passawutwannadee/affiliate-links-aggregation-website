import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ProductPreviewCard } from '@/components/product-preview-card';
import { collectionAPI } from '@/services/collections-api';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Loading } from '@/components/ui/loading';
import { Card, CardDescription } from '@/components/ui/card';

export default function Collection() {
  const { id } = useParams<string>();
  const { data, isLoading } = useQuery(['collection_data', id], () =>
    collectionAPI(id!)
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-20">
            <div className="flex flex-col gap-3">
              <p className="text-4xl font-bold">{data!.data.collection_name}</p>
              <div className="flex gap-2">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="https://avatars.githubusercontent.com/u/73711390?v=4" />
                  <AvatarFallback />
                </Avatar>
                <div className="flex flex-col items-center lg:items-start">
                  <p className="text-2xl lg:text-xl font-bold">
                    {data!.data.display_name}
                  </p>
                  <p className="textsm lg:text-sm font-bold text- text-primary/80">
                    @USERNAME
                  </p>
                </div>
              </div>
            </div>
            <Card className="w-full">
              <CardDescription className="p-4">
                {data!.data.collection_description}
              </CardDescription>
            </Card>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between"></div>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-10 justify-center items-center">
          {data!.data.products.map(
            (
              item: {
                product_id: string;
                product_image: string;
                product_name: string;
                product_description: string;
              },
              index: number
            ) => (
              <ProductPreviewCard
                key={index}
                productId={item.product_id}
                image={item.product_image}
                title={item.product_name}
                description={item.product_description}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
