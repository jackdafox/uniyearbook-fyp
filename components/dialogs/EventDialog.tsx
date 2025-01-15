"use client"
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

type MediaType = 'image' | 'video' | 'unknown' | 'none';

interface FieldValue {
  value: File | string | null | undefined;
}

const EventDialog = ({
  field,
  state,
}: {
  field: FieldValue;
  state: boolean;
}) => {
  const [error, setError] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  useEffect(() => {
    let objectUrl = '';
    
    if (field.value) {
      if (field.value instanceof File) {
        objectUrl = URL.createObjectURL(field.value);
        setPreviewUrl(objectUrl);
      } else if (typeof field.value === 'string') {
        setPreviewUrl(field.value);
      }
    } else {
      setPreviewUrl('');
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [field.value]);

  const getMediaType = (url: string): MediaType => {
    if (!url) return 'none';
    
    if (field.value instanceof File) {
      const type = field.value.type;
      if (type.startsWith('image/')) return 'image';
      if (type.startsWith('video/')) return 'video';
      return 'unknown';
    }
    
    const extension = url.toLowerCase().split('.').pop();
    if (extension && ['jpg', 'jpeg', 'png', 'gif'].includes(extension)) return 'image';
    if (extension && ['mp4', 'webm', 'mov'].includes(extension)) return 'video';
    return 'unknown';
  };

  const handleError = (): void => {
    setError(true);
  };
  const mediaType = getMediaType(previewUrl);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={!state} className="w-full">
          Preview Image
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-hidden z-[100] p-0" closeIcon={false}>
      {error ? (
          <div className="w-full h-64 flex items-center justify-center text-gray-500">
            Failed to load media
          </div>
        ) : mediaType === 'image' ? (
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-full object-cover"
            onError={handleError}
          />
        ) : mediaType === 'video' ? (
          <video
            src={previewUrl}
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
            onError={handleError}
          />
        ) : (
          <div className="w-full h-64 flex items-center justify-center text-gray-500">
            No preview available
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EventDialog;
