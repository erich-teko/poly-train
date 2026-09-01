import { ButtonGroup } from "@/components/ui/button-group"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

function SkeletonCard() {
  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <Skeleton className="h-5 w-2/3" />
          </div>
          <Skeleton className="size-6 flex-shrink-0 rounded-full" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="mt-2 h-4 w-1/3" />
      </CardContent>
      <CardFooter>
        <ButtonGroup className="w-full justify-end">
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-9" />
        </ButtonGroup>
      </CardFooter>
    </Card>
  )
}

export default SkeletonCard
