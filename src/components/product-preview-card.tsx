import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface Item {
  image: string;
  title: string;
  description: string;
}

export function ProductPreviewCard({ image, title, description }: Item) {
  return (
    <Link to="/product">
      <Card className="hover:cursor-pointer w-full">
        <img src={image} className="p-6 w-full" />
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription className="line-clamp-3">
            {description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
