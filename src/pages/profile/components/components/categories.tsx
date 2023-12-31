import { Loading } from '@/components/ui/loading';
import { SelectContent, SelectItem } from '@/components/ui/select';
import { productCategoriesAPI } from '@/services/products-api';
import { useQuery } from 'react-query';

export default function Categories() {
  // get categories
  const { data, isLoading, isError } = useQuery(['product_categories'], () =>
    productCategoriesAPI()
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SelectContent>
      {data.data.map(
        (value: { category_name: string; category_id: string }) => {
          return (
            <SelectItem
              value={value.category_id.toString()}
              className="hover:bg-primary/10"
            >
              {value.category_name}
            </SelectItem>
          );
        }
      )}
    </SelectContent>
  );
}
