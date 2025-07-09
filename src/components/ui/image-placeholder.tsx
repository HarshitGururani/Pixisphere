import React from 'react';

interface ImagePlaceholderProps {
  index?: number;
  title?: string;
  subtitle?: string;
  className?: string;
  icon?: React.ReactNode;
}

export function ImagePlaceholder({ 
  index, 
  title, 
  subtitle = "Failed to load", 
  className = "",
  icon 
}: ImagePlaceholderProps) {
  const defaultIcon = (
    <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );

  return (
    <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 ${className}`}>
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center mx-auto mb-3">
          {icon || defaultIcon}
        </div>
        <p className="text-gray-600 text-sm font-medium">
          {title || (index !== undefined ? `Image ${index + 1}` : "Image")}
        </p>
        <p className="text-gray-400 text-xs">{subtitle}</p>
      </div>
    </div>
  );
} 