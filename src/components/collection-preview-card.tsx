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
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import DeleteCollection from '@/pages/profile/collections/components/delete-collection';

interface Collection {
  collectionId: string;
  title: string;
  description: string;
}

export function CollectionPreviewCard({
  collectionId,
  title,
  description,
}: Collection) {
  return (
    <Card className="w-full hover:cursor-pointer">
      <Link to={`/collection/${collectionId}`}>
        <div className="grid grid-cols-2">
          <img src="./placeholder-images-image_large.webp" className="p-1" />
          <img src="./placeholder-images-image_large.webp" className="p-1" />
          <img src="./placeholder-images-image_large.webp" className="p-1" />
          <img src="./placeholder-images-image_large.webp" className="p-1" />
        </div>
      </Link>
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row justify-between items-center">
            <Link to={`/collection/${collectionId}`}>
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
                  <DeleteCollection collectionId={collectionId} />
                  {/* <EditProduct productId={productId} />
                    <<DeleteProduct productId={productId} />>
                    <ReportProduct /> */}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardTitle>
        <Link to={`/collection/${collectionId}`}>
          <CardDescription className="line-clamp-5">
            {description}
          </CardDescription>
        </Link>
      </CardHeader>
    </Card>
  );
}
