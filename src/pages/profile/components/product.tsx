import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link } from 'react-router-dom';

export function Product() {
  return (
    <Link to="/product">
      <Card className="w-full hover:cursor-pointer">
        <img src="./placeholder-images-image_large.webp" className="p-6" />
        <CardHeader>
          <CardTitle>ProductName</CardTitle>
          <CardDescription className="line-clamp-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
            sollicitudin odio ex, non lobortis nisl volutpat hendrerit. Quisque
            iaculis turpis tempus pretium ultrices. Quisque turpis quam, commodo
            sed laoreet in, mollis eu diam. Vivamus non sapien at mi convallis
            ultricies. Nunc ac quam non lorem ultricies accumsan ac aliquam
            eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque aliquam vestibulum ex, in dignissim erat aliquet eu.
            Fusce ullamcorper lorem odio, ut lacinia massa convallis a. Duis
            lacinia ante a laoreet ullamcorper. Fusce mattis sem in facilisis
            molestie. Phasellus vehicula felis sit amet arcu sollicitudin, quis
            sodales diam ultricies. In in risus non mi sagittis aliquet.
            Praesent iaculis tempor laoreet. Proin sit amet rhoncus nisi. Sed ac
            augue eget ligula mattis lacinia eu eget nisl.{' '}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
