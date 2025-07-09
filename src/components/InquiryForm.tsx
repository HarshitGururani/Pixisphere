'use client'
import { useState, useCallback, memo } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface InquiryFormProps {
  photographerName: string;
  className?: string;
  heading?: string;
  subheading?: string;
}

export const InquiryForm = memo(({ photographerName, className, heading, subheading }: InquiryFormProps) => {
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFormChange = useCallback((field: string, value: string) => {
    setInquiryForm(prev => ({
      ...prev,
      [field]: value
    }))
  }, [])

  const handleSubmitInquiry = async () => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Inquiry submitted:', inquiryForm)
      // Reset form
      setInquiryForm({ name: '', email: '', phone: '' })
      alert('Inquiry sent successfully!')
    } catch (error) {
      console.error('Error submitting inquiry:', error)
      alert('Failed to send inquiry. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={className || "bg-primary text-white py-3 px-6 cursor-pointer rounded-xl text-sm font-medium w-full shadow-md hover:shadow-lg transition-shadow"}>
          Send Inquiry
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            {heading || `Send Inquiry to ${photographerName}`}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {subheading || `Fill out the form below and we'll connect you with ${photographerName} for your photography needs.`}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Full Name *
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={inquiryForm.name}
              onChange={(e) => handleFormChange('name', e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address *
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={inquiryForm.email}
              onChange={(e) => handleFormChange('email', e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number (optional)"
              value={inquiryForm.phone}
              onChange={(e) => handleFormChange('phone', e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button
            onClick={handleSubmitInquiry}
            disabled={isSubmitting || !inquiryForm.name || !inquiryForm.email}
            className="w-full"
          >
            {isSubmitting ? 'Sending...' : 'Send Inquiry'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
})

InquiryForm.displayName = 'InquiryForm' 