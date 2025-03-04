import { Skeleton } from "@/components/ui/skeleton"

const SkeletonLayout = () => {
  return (
    <div className="flex justify-center items-center w-screen h-svh">
    <div className="flex flex-col space-y-3 justify-center items-center w-full h-full">
      <Skeleton className="h-[75%] w-[75%] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  </div>
  )
}

export default SkeletonLayout
