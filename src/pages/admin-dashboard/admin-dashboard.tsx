import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getBanAppeals, getUserReports } from '@/services/admin-api';
import { useQuery } from 'react-query';
import { DataTable } from './components/data-table';
import { userColumns } from './users-report/user-columns';
import { productColumns } from './products-report/product-columns';
import { collectionColumns } from './collections-report/collection-columns';
import { appealColumns } from './ban-appeal/appeal-columns';

export default function AdminDashboard() {
  const { data: userData, isLoading: loadingUser } = useQuery(
    ['user_reports'],
    () => getUserReports({}),
    {}
  );

  const { data: productData, isLoading: loadingProduct } = useQuery(
    ['product_reports'],
    () => getUserReports({ products: 'true' }),
    {}
  );

  const { data: collectionData, isLoading: loadingCollection } = useQuery(
    ['collection_reports'],
    () => getUserReports({ collections: 'true' }),
    {}
  );

  const { data: appealData, isLoading: loadingAppeal } = useQuery(
    ['ban_appeals'],
    () => getBanAppeals(),
    {}
  );

  return (
    <Tabs
      defaultValue="usersreport"
      className="h-full space-y-6 pt-8 container"
    >
      <div className="flex flex-col items-center justify-center">
        <TabsList className="py-5">
          <TabsTrigger value="usersreport" className="relative text-md">
            Users
          </TabsTrigger>
          <TabsTrigger value="productsreport" className="relative text-md">
            Products
          </TabsTrigger>
          <TabsTrigger value="collectionsreport" className="relative text-md">
            Collections
          </TabsTrigger>
          <TabsTrigger value="banappeals" className="relative text-md">
            Ban Appeals
          </TabsTrigger>
        </TabsList>
        <TabsContent value="usersreport" className="w-full">
          <DataTable
            data={userData?.data}
            columns={userColumns}
            loading={loadingUser}
          />
        </TabsContent>
        <TabsContent value="productsreport" className="w-full">
          <DataTable
            data={productData?.data}
            columns={productColumns}
            loading={loadingProduct}
          />
        </TabsContent>
        <TabsContent value="collectionsreport" className="w-full">
          <DataTable
            data={collectionData?.data}
            columns={collectionColumns}
            loading={loadingCollection}
          />
        </TabsContent>
        <TabsContent value="banappeals" className="w-full">
          <DataTable
            data={appealData?.data}
            columns={appealColumns}
            loading={loadingAppeal}
          />
        </TabsContent>
      </div>
    </Tabs>
    // <div className="md:hidden"></div>
    // <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
    //   <div className="flex items-center justify-between space-y-2">
    //     <div>
    //       <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
    //       <p className="text-muted-foreground">
    //         Here&apos;s a list of your tasks for this moasdasdsadasd!
    //       </p>
    //     </div>
    //   </div>
    // </div>
  );
}
