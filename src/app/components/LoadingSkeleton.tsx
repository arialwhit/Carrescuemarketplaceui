import { Skeleton } from './ui/skeleton';
import { GlassCard } from './GlassCard';

export function ProductCardSkeleton() {
  return (
    <GlassCard className="overflow-hidden">
      <Skeleton className="h-40 w-full rounded-none" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-2/3" />
        <Skeleton className="h-5 w-1/2" />
      </div>
    </GlassCard>
  );
}

export function ProductListSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 pb-4">
      {[...Array(6)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function VendorCardSkeleton() {
  return (
    <GlassCard className="p-4 flex items-center gap-4">
      <Skeleton className="w-16 h-16 rounded-xl" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </GlassCard>
  );
}
