import React from "react";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Image } from "lucide-react";

interface ProcessingStatusProps {
  progress?: number;
  status?: string;
  previewUrl?: string;
  isComplete?: boolean;
}

const ProcessingStatus = ({
  progress = 0,
  status = "Processing image...",
  previewUrl = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=300&h=200&auto=format&fit=crop",
  isComplete = false,
}: ProcessingStatusProps) => {
  return (
    <Card className="w-[300px] p-4 bg-background space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Processing Status</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Image className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Current processing status</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">{status}</p>
        {previewUrl && (
          <div className="relative aspect-video rounded-md overflow-hidden">
            <img
              src={previewUrl}
              alt="Preview"
              className="object-cover w-full h-full"
            />
            {!isComplete && (
              <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center">
                <p className="text-sm font-medium">Generating preview...</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProcessingStatus;
