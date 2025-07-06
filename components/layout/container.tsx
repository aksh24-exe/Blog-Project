import { cn } from "@/lib/utils";

interface ConatinerProps {
  children: React.ReactNode;
  className?: String;
}

export default function Conatiner({ children, className }: ConatinerProps) {
  return (
    <div className={cn("conatiner mx-auto px-4", className)}>{children}</div>
  );
}
