import { cn } from "@/lib/utils"
import { KeyRound } from "lucide-react"

export default function AppLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-2 font-headline", className)}>
      <KeyRound className="h-7 w-7 text-primary" />
      <span className="text-2xl font-bold tracking-tight text-foreground">
        LOCALKEY
      </span>
    </div>
  )
}
