import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Upload, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface UploadSectionProps {
  onFileSelect?: (file: File) => void;
  isProcessing?: boolean;
  error?: string;
}

const UploadSection = ({
  onFileSelect = () => {},
  isProcessing = false,
  error = "",
}: UploadSectionProps) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith("image/")) {
      onFileSelect(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  return (
    <Card
      className={`w-full h-[400px] bg-background p-8 flex flex-col items-center justify-center relative ${
        isDragging ? "border-primary" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileInput}
      />

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-center"
        >
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
              <ImageIcon className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Drag and drop your image here
            </h3>
            <p className="text-muted-foreground mb-4">
              or click the button below to browse
            </p>
          </div>

          <Button
            onClick={handleButtonClick}
            disabled={isProcessing}
            className="min-w-[200px]"
          >
            <Upload className="w-4 h-4 mr-2" />
            {isProcessing ? "Processing..." : "Upload Image"}
          </Button>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-destructive mt-4"
            >
              {error}
            </motion.p>
          )}

          <p className="text-sm text-muted-foreground mt-4">
            Supported formats: PNG, JPG, JPEG
          </p>
        </motion.div>
      </AnimatePresence>
    </Card>
  );
};

export default UploadSection;
