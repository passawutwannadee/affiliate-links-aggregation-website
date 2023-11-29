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
    <Card className="hover:cursor-pointer w-full">
      <Link to="/product">
        <img src={image} className="p-6 w-full" />
      </Link>
      <CardHeader>
        <div className="flex flex-row justify-between items-center">
          <Link to="/product">
            <CardTitle>{title}</CardTitle>
          </Link>
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
        <Link to="/product">
          <CardDescription className="line-clamp-3">
            {description}
          </CardDescription>
        </Link>
      </CardHeader>
    </Card>
  );
}
