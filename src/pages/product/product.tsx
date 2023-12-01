import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ReportUser from '../profile/components/report-user';

export default function Product() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col lg:flex-row lg:pl-20 lg:pr-20 gap-12">
        <img
          src="./placeholder-images-image_large.webp"
          className="flex self-center p-6 w-96"
        />
        <div className="flex flex-col self-center gap-16 items">
          <div className="flex flex-col gap-2 items-center lg:items-start">
            <p className="text-4xl font-bold text-center lg:text-left">
              Product Name
            </p>
            <div className="flex items-center gap-2">
              <Avatar className="h-12 w-12">
                <AvatarImage src="https://avatars.githubusercontent.com/u/73711390?v=4" />
                <AvatarFallback />
              </Avatar>
              <p className="text-1xl font-semibold text-primary/80">
                @USERNAME
              </p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-xl">
                    ⋯
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuGroup>
                    <ReportUser />
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <p className="text-1xl font-medium">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            eleifend ante eget enim rhoncus, in suscipit odio auctor. Vestibulum
            tellus quam, tempor et hendrerit ut, commodo vel lacus. In venenatis
            interdum arcu, eget viverra justo accumsan eu molestie.
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div className="border rounded-3xl bg-primary w-full hover:bg-primary/90 hover:cursor-pointer">
              <p className="text-2xl font-semibold text-center text-secondary">
                Lazada
              </p>
            </div>
            <div className="border rounded-3xl bg-primary w-full hover:bg-primary/90 hover:cursor-pointer">
              <p className="text-2xl font-semibold text-center text-secondary">
                Shopee
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
