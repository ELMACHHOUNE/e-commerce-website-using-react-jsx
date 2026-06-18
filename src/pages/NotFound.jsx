import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="grid w-full max-w-5xl grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-20">
        <div className="flex justify-center">
          <img
            src="/images/404.svg"
            alt="404 illustration"
            className="h-64 w-auto md:h-80 lg:h-96"
          />
        </div>

        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <h1 className="mt-8 bg-gradient-to-r from-slate-800 to-slate-500 bg-clip-text text-4xl font-bold text-transparent md:text-5xl dark:from-gray-100 dark:to-gray-400">
            404 Not Found
          </h1>

          <div className="my-5 h-px w-48 rounded bg-gradient-to-r from-slate-300 to-slate-200 dark:from-gray-600 dark:to-gray-700 md:my-6 md:w-64" />

          <p className="max-w-md text-slate-500 dark:text-gray-400 md:text-lg">
            The page you are looking for does not exist or has been moved.
          </p>

          <Button onClick={() => navigate("/")} className="mt-8 md:mt-10">
            Back to Home
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
