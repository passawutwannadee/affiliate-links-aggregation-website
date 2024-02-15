import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UsersReport } from './users-report/users-report';
import { ProductsReport } from './products-report/products-report';
import { CollectionsReport } from './collections-report/collections-report';
import { BanAppeals } from './ban-appeal/ban-appeals';

export function AdminDashboard() {
  return (
    <Tabs defaultValue="usersreport" className="h-full space-y-6 pt-8">
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
          <UsersReport />
        </TabsContent>
        <TabsContent value="productsreport" className="w-full">
          <ProductsReport />
        </TabsContent>
        <TabsContent value="collectionsreport" className="w-full">
          <CollectionsReport />
        </TabsContent>
        <TabsContent value="banappeals" className="w-full">
          <BanAppeals />
        </TabsContent>
      </div>
    </Tabs>
  );
}
