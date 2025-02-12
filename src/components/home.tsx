import React, { useState } from "react";
import UploadSection from "./UploadSection";
import ProcessingStatus from "./ProcessingStatus";
import EnvironmentViewer from "./EnvironmentViewer";

const Home = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [modelUrl, setModelUrl] = useState("");

  const handleFileSelect = (file: File) => {
    setError("");
    setIsProcessing(true);
    setProgress(0);

    // Create a preview URL for the uploaded image
    const imageUrl = URL.createObjectURL(file);
    setPreviewUrl(imageUrl);

    // Simulate processing with progress updates
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setModelUrl("dummy-model-url"); // In real app, this would be the actual 3D model URL
          return 100;
        }
        return prev + 10;
      });
    }, 1000);
  };

  const handleLightingChange = (value: number) => {
    console.log("Lighting changed:", value);
  };

  const handleTimeOfDayChange = (value: number) => {
    console.log("Time of day changed:", value);
  };

  const handleAtmosphereChange = (value: number) => {
    console.log("Atmosphere changed:", value);
  };

  const handleFirstPersonToggle = (enabled: boolean) => {
    console.log("First person mode:", enabled);
  };

  const handleShare = () => {
    console.log("Share clicked");
  };

  return (
    <div className="min-h-screen bg-background p-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            2D to 3D Environment Generator
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Transform your images into explorable 3D environments using AI
            technology. Upload an image to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <UploadSection
              onFileSelect={handleFileSelect}
              isProcessing={isProcessing}
              error={error}
            />
          </div>
          <div className="lg:col-span-1">
            {(isProcessing || previewUrl) && (
              <ProcessingStatus
                progress={progress}
                status={
                  isProcessing ? "Processing image..." : "Processing complete"
                }
                previewUrl={previewUrl}
                isComplete={!isProcessing && modelUrl !== ""}
              />
            )}
          </div>
        </div>

        {(modelUrl || isProcessing) && (
          <EnvironmentViewer
            isLoading={isProcessing}
            modelUrl={modelUrl}
            onLightingChange={handleLightingChange}
            onTimeOfDayChange={handleTimeOfDayChange}
            onAtmosphereChange={handleAtmosphereChange}
            onFirstPersonToggle={handleFirstPersonToggle}
            onShare={handleShare}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
