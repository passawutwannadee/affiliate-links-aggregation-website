import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import AddProduct from '@/pages/profile/add-product/add-product';
import EditProduct from '@/pages/profile/components/edit-product';
import DeleteProduct from '@/pages/profile/components/delete-product';
import ReportProduct from '@/pages/profile/components/report-product';

interface Item {
  image: string;
  title: string;
  description: string;
}

export function ProductPreviewCard({ image, title, description }: Item) {
  return (
    // <Link to="/product">
    <Card className="hover:cursor-pointer w-full">
      <img src={image} className="p-6 w-full" />
      <CardHeader>
        <div className="flex flex-row justify-between items-center">
          <CardTitle>{title}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-xl">
                ⋯
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuGroup>
                <EditProduct />
                <DeleteProduct />
                <ReportProduct />
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription className="line-clamp-3">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
    // </Link>
  );
}
