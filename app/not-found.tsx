import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md space-y-6">
        <h1 className="text-9xl font-bold">404</h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <Link href="/">
          <Button variant="default" size="lg" className="gap-2 mt-4">
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
