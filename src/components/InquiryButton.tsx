'use client'
import { memo } from "react"
import { InquiryForm } from "./InquiryForm"

interface InquiryButtonProps {
  photographerName: string;
  className?: string;
  heading?: string;
  subheading?: string;
}

export const InquiryButton = memo(({ photographerName, className, heading, subheading }: InquiryButtonProps) => {
  return (
    <InquiryForm 
      photographerName={photographerName}
      className={className}
      heading={heading}
      subheading={subheading}
    />
  )
})

InquiryButton.displayName = 'InquiryButton' 