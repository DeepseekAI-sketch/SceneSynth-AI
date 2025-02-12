import React, { useState } from "react";
import { Card } from "./ui/card";
import ViewerControls from "./ViewerControls";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface EnvironmentViewerProps {
  isLoading?: boolean;
  modelUrl?: string;
  onLightingChange?: (value: number) => void;
  onTimeOfDayChange?: (value: number) => void;
  onAtmosphereChange?: (value: number) => void;
  onFirstPersonToggle?: (enabled: boolean) => void;
  onShare?: () => void;
}

const EnvironmentViewer = ({
  isLoading = false,
  modelUrl = "",
  onLightingChange = () => {},
  onTimeOfDayChange = () => {},
  onAtmosphereChange = () => {},
  onFirstPersonToggle = () => {},
  onShare = () => {},
}: EnvironmentViewerProps) => {
  const [isFirstPerson, setIsFirstPerson] = useState(false);

  const handleFirstPersonToggle = (enabled: boolean) => {
    setIsFirstPerson(enabled);
    onFirstPersonToggle(enabled);
  };

  return (
    <div className="w-full h-[582px] bg-background flex">
      <Card className="flex-1 relative bg-muted overflow-hidden">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="h-8 w-8 text-primary" />
            </motion.div>
          </div>
        ) : !modelUrl ? (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            No 3D environment loaded
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-slate-800 to-slate-900">
            {/* 3D Viewer would be implemented here */}
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              3D Environment Viewer
              {isFirstPerson ? "(First Person Mode)" : "(Orbit Mode)"}
            </div>
          </div>
        )}
      </Card>

      <ViewerControls
        onLightingChange={onLightingChange}
        onTimeOfDayChange={onTimeOfDayChange}
        onAtmosphereChange={onAtmosphereChange}
        onFirstPersonToggle={handleFirstPersonToggle}
        onShare={onShare}
      />
    </div>
  );
};

export default EnvironmentViewer;
