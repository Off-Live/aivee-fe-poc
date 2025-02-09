import React from "react";
import { Loader2 } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="min-h-screen bg-default flex flex-col items-center justify-center gap-4">
      <Loader2 className="h-8 w-8 text-primary animate-spin" />
      <p className="text-text-emphasis text-lg">
        Updating organizer&apos;s latest schedules. Please wait a moment...
      </p>
    </div>
  );
};

export default LoadingPage;
