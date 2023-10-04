import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ProductPreviewCard } from '@/components/product-preview-card';

export default function Collection() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col self-center gap-4">
          <p className="text-4xl font-bold">Collection Name</p>
          <div className="flex self-center items-center gap-2">
            <Avatar className="h-12 w-12">
              <AvatarImage src="https://avatars.githubusercontent.com/u/73711390?v=4" />
              <AvatarFallback />
            </Avatar>
            <p className="text-1xl font-semibold text-primary/80">@USERNAME</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between"></div>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-10 justify-center items-center">
          <ProductPreviewCard />
          <ProductPreviewCard />
          <ProductPreviewCard />
          <ProductPreviewCard />
          <ProductPreviewCard />
          <ProductPreviewCard />
        </div>
      </div>
    </div>
  );
}
