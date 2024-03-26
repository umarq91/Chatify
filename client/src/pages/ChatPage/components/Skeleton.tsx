import { Skeleton } from "@/components/ui/skeleton"
 
export function SkeletonDemo() {
  return (
    <div className="flex items-center w-full p-2 ml-1 space-y-1 gap-2 opacity-60">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}