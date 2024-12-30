import React, { ReactNode, useState } from 'react';
import { usePDF } from 'react-to-pdf';
import { Button } from '@/components/ui/button';
import { FiDownload } from 'react-icons/fi';

interface PDFWrapperProps {
  children: ReactNode;
  filename?: string;
  buttonPosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  buttonText?: string;
  customButton?: ReactNode;
  hidden?: boolean;
}

export const PDFWrapper: React.FC<PDFWrapperProps> = ({ 
  children, 
  filename = 'download.pdf',
  buttonPosition = 'top-right',
  buttonText,
  customButton,
  hidden = false
}) => {
  const [isVisible, setIsVisible] = useState(!hidden);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const { toPDF, targetRef } = usePDF({
    filename,
    page: { margin: 20 }
  });

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4'
  };

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    // Temporarily show the content
    setIsVisible(true);
    
    // Small delay to ensure content is rendered
    await new Promise(resolve => setTimeout(resolve, 100));
    
    try {
      await toPDF();
    } finally {
      // Hide the content again if it should be hidden
      if (hidden) {
        setIsVisible(false);
      }
      setIsGenerating(false);
    }
  };

  return (
    <div className="relative">
      {/* PDF Download Button */}
      {customButton ? (
        <div 
          className={`absolute ${positionClasses[buttonPosition]} z-10`}
          onClick={handleGeneratePDF}
        >
          {customButton}
        </div>
      ) : (
        <Button 
          onClick={handleGeneratePDF} 
          className={`absolute ${positionClasses[buttonPosition]} z-10 bg-white/80 hover:bg-white rounded-full`}
          disabled={isGenerating}
        >
          {isGenerating ? "Generating..." : (buttonText || <FiDownload className="w-4 h-4" />)}
        </Button>
      )}

      {/* Content to be generated as PDF */}
      <div 
        ref={targetRef}
        style={{ 
          display: isVisible ? 'block' : 'none',
          visibility: isVisible ? 'visible' : 'hidden'
        }}
      >
        {children}
      </div>
    </div>
  );
};