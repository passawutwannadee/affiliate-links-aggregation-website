import { LoadingSmall } from '@/components/ui/loading-small';
import { SelectContent, SelectItem } from '@/components/ui/select';
import { productCategoriesAPI } from '@/services/products-api';
import { useQuery } from 'react-query';

export default function Categories() {
  // get categories
  const { data, isLoading } = useQuery(['product_categories'], () =>
    productCategoriesAPI()
  );

  return (
    <>
      {isLoading ? (
        <LoadingSmall />
      ) : (
        <SelectContent>
          {data!.data.map(
            (value: { category_name: string; category_id: string }) => {
              return (
                <SelectItem
                  defaultChecked
                  value={value.category_id.toString()}
                  className="hover:bg-primary/10"
                >
                  {value.category_name}
                </SelectItem>
              );
            }
          )}
        </SelectContent>
      )}
    </>
  );
}
