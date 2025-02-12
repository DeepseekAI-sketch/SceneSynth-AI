import React from "react";
import { Card } from "./ui/card";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Share2, Sun, Cloud, Compass, Eye } from "lucide-react";

interface ViewerControlsProps {
  onLightingChange?: (value: number) => void;
  onTimeOfDayChange?: (value: number) => void;
  onAtmosphereChange?: (value: number) => void;
  onFirstPersonToggle?: (enabled: boolean) => void;
  onShare?: () => void;
}

const ViewerControls = ({
  onLightingChange = () => {},
  onTimeOfDayChange = () => {},
  onAtmosphereChange = () => {},
  onFirstPersonToggle = () => {},
  onShare = () => {},
}: ViewerControlsProps) => {
  return (
    <Card className="w-[300px] h-full bg-background p-6 space-y-6">
      <div className="space-y-4">
        <TooltipProvider>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Lighting Intensity</Label>
              <Tooltip>
                <TooltipTrigger>
                  <Sun className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Adjust scene lighting brightness</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Slider
              defaultValue={[50]}
              max={100}
              step={1}
              onValueChange={(value) => onLightingChange(value[0])}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Time of Day</Label>
              <Tooltip>
                <TooltipTrigger>
                  <Cloud className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Adjust time of day in the scene</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Slider
              defaultValue={[12]}
              max={24}
              step={1}
              onValueChange={(value) => onTimeOfDayChange(value[0])}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Atmosphere</Label>
              <Tooltip>
                <TooltipTrigger>
                  <Compass className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Adjust atmospheric effects</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Slider
              defaultValue={[50]}
              max={100}
              step={1}
              onValueChange={(value) => onAtmosphereChange(value[0])}
            />
          </div>
        </TooltipProvider>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-sm font-medium">First Person Mode</Label>
            <div className="text-[0.8rem] text-muted-foreground">
              Enable first-person navigation
            </div>
          </div>
          <Switch
            defaultChecked={false}
            onCheckedChange={onFirstPersonToggle}
          />
        </div>

        <Button variant="outline" className="w-full" onClick={onShare}>
          <Share2 className="mr-2 h-4 w-4" />
          Share Scene
        </Button>
      </div>
    </Card>
  );
};

export default ViewerControls;
