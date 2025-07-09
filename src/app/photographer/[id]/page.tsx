'use client'
import { useQuery } from "@tanstack/react-query"
import { IndianRupee } from "lucide-react"
import Image from "next/image"  
import { useParams } from "next/navigation"
import { useState } from "react"
import { ImagePlaceholder } from "@/components/ui/image-placeholder"
import { InquiryForm } from "@/components/InquiryForm"


const Page = () => {
  const {id} = useParams<{id:string}>()
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set())
  
  const {data,isLoading,error} = useQuery({
    queryKey:['photographer',id],
    queryFn:()=>fetch(`https://json-server-hpku.onrender.com/photographers/${id}`).then(res=>res.json())
  })

  // Skeleton Loading Component
  const PhotographerSkeleton = () => (
    <div className="p-4 sm:p-6 lg:p-8 flex flex-col">
      {/* Mobile Card Skeleton */}
      <div className="sm:hidden">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-6">
          {/* Profile Image Skeleton */}
          <div className="flex justify-center">
            <div className="w-32 h-32 rounded-full bg-gray-200 animate-pulse"></div>
          </div>
          
          {/* Profile Info Skeleton */}
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <div className="h-8 w-48 mx-auto bg-gray-200 rounded-md animate-pulse"></div>
              <div className="h-1 w-16 mx-auto bg-gray-200 rounded-full animate-pulse"></div>
            </div>
            
            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-3/4 mx-auto bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-1/2 mx-auto bg-gray-200 rounded animate-pulse"></div>
              
              <div className="flex flex-col items-center gap-4 pt-2">
                <div className="h-10 w-32 rounded-full bg-gray-200 animate-pulse"></div>
                <div className="h-12 w-full rounded-xl bg-gray-200 animate-pulse"></div>
              </div>   
            </div>      
          </div>
        </div>
      </div>

      {/* Desktop Skeleton */}
      <div className="hidden sm:flex flex-row items-start gap-8 lg:gap-16">
        <div className="w-40 h-40 lg:w-48 lg:h-48 rounded-full bg-gray-200 animate-pulse"></div>
        
        <div className="flex flex-col space-y-4 flex-1">
          <div className="space-y-2">
            <div className="h-8 w-64 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="h-1 w-16 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
          
          <div className="space-y-2">
            <div className="h-5 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-5 w-1/2 bg-gray-200 rounded animate-pulse"></div>
            
            <div className="flex flex-row items-center gap-6">
              <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-32 bg-gray-200 rounded-md animate-pulse"></div>
            </div>   
          </div>      
        </div>
      </div>

      {/* Portfolio Section Skeleton */}
      <div className="mt-8 sm:mt-12 lg:mt-16">
        <div className="mb-6 sm:mb-8">
          <div className="h-8 w-32 mb-2 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="h-4 w-48 mb-2 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 auto-rows-[300px] sm:auto-rows-[160px] md:auto-rows-[180px] lg:auto-rows-[200px]">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="w-full h-full rounded-2xl bg-gray-200 animate-pulse"></div>
          ))}
        </div>
      </div>
    </div>
  )

  if(isLoading) return <PhotographerSkeleton />
  if(error) return <div>Error: {error.message}</div>

  console.log('Photographer data:', data)
  console.log('Portfolio images:', data?.portfolio)

  const handleImageError = (index: number) => {
    setImageErrors(prev => new Set(prev).add(index))
  }

  // Responsive bento grid layout patterns
  const getBentoLayout = (index: number) => {
    // Mobile-first patterns (1 column) - all square
    const mobilePatterns = [
      "col-span-1 row-span-1", // 0 - Square
      "col-span-1 row-span-1", // 1 - Square
      "col-span-1 row-span-1", // 2 - Square
      "col-span-1 row-span-1", // 3 - Square
      "col-span-1 row-span-1", // 4 - Square
      "col-span-1 row-span-1", // 5 - Square
    ]
    
    // Tablet patterns (2-3 columns)
    const tabletPatterns = [
      "col-span-1 md:col-span-2 row-span-1 md:row-span-2", // 0 - Large
      "col-span-1 row-span-1", // 1 - Small
      "col-span-1 md:col-span-2 row-span-1", // 2 - Wide
      "col-span-1 row-span-1", // 3 - Small
      "col-span-1 md:col-span-2 row-span-1 md:row-span-2", // 4 - Large
      "col-span-1 row-span-1", // 5 - Small
    ]
    
    // Desktop patterns (3-4 columns)
    const desktopPatterns = [
      "col-span-1 md:col-span-1 lg:col-span-2 row-span-1 md:row-span-1 lg:row-span-2", // 0 - Tall
      "col-span-1 row-span-1", // 1 - Small
      "col-span-1 md:col-span-2 lg:col-span-2 row-span-1", // 2 - Wide
      "col-span-1 row-span-1", // 3 - Small
      "col-span-1 md:col-span-2 lg:col-span-2 row-span-1 lg:row-span-2", // 4 - Large
      "col-span-1 row-span-1", // 5 - Small
    ]
    
    const patternIndex = index % 6
    
    // Use different patterns based on screen size
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return mobilePatterns[patternIndex] || "col-span-1 row-span-1"
    } else if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      return tabletPatterns[patternIndex] || "col-span-1 row-span-1"
    } else {
      return desktopPatterns[patternIndex] || "col-span-1 row-span-1"
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 flex flex-col">
      {/* Mobile Card Design */}
      <div className="sm:hidden">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-6">
          {/* Profile Image */}
          <div className="flex justify-center">
            <Image 
              src={data.profilePic} 
              alt={data.name} 
              width={200} 
              height={200} 
              className="rounded-full border-4 border-primary w-32 h-32" 
            />
          </div>
          
          {/* Profile Info */}
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                {data.name}
              </h1>
              <div className="w-16 h-1 bg-primary rounded-full mx-auto"></div>
            </div>
            
            <div className="space-y-3">
              <p className="text-gray-600 leading-relaxed text-base">
                {data.bio}
              </p>
              
              <div className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-gray-600 font-medium text-sm">
                  {data.location}
                </p>
              </div>
              
              <div className="flex flex-col items-center gap-4 pt-2">
                <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
                  <IndianRupee className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-bold text-gray-900">
                      {data.price}
                    </span>
                    <span className="text-gray-500 text-sm">
                      per session
                    </span>
                  </div>
                </div>

                <InquiryForm 
                  photographerName={data.name}
                  className="bg-primary text-white py-3 px-6 cursor-pointer rounded-xl text-sm font-medium w-full shadow-md hover:shadow-lg transition-shadow"
                />
              </div>   
            </div>      
          </div>
        </div>
      </div>

      {/* Desktop Design - Unchanged */}
      <div className="hidden sm:flex flex-row items-start gap-8 lg:gap-16">
        <Image 
          src={data.profilePic} 
          alt={data.name} 
          width={200} 
          height={200} 
          className="rounded-full border-2 border-primary w-40 h-40 lg:w-48 lg:h-48" 
        />
        
        {/* Enhanced right side */}
        <div className="flex flex-col space-y-4 flex-1 text-left">
          <div className="space-y-2">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
              {data.name}
            </h1>
            <div className="w-16 h-1 bg-primary rounded-full"></div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <p className="text-gray-600 leading-relaxed text-lg">
                {data.bio}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <p className="text-gray-600 font-medium">
                {data.location}
              </p>
            </div>
            
            <div className="flex flex-row items-center gap-6">
              <div className="flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <div className="flex items-center gap-1">
                  <span className="text-xl font-bold text-gray-900">
                    {data.price}
                  </span>
                  <span className="text-gray-500 text-sm">
                    per session
                  </span>
                </div>
              </div>

              <InquiryForm 
                photographerName={data.name}
                className="bg-primary text-white py-2 px-4 cursor-pointer rounded-md text-sm"
              />
            </div>   
          </div>      
        </div>
      </div>

      {/* Portfolio Section */}
      {data.portfolio && data.portfolio.length > 0 && (
        <div className="mt-8 sm:mt-12 lg:mt-16">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Portfolio</h2>
            <p className="text-gray-600">Explore {data.name}&apos;s creative work</p>
            <p className="text-sm text-gray-500 mt-2">Found {data.portfolio.length} images</p>
          </div>
          
          {/* Responsive Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 auto-rows-[300px] sm:auto-rows-[160px] md:auto-rows-[180px] lg:auto-rows-[200px]">
            {data.portfolio.map((image: string, index: number) => {
                const gridClass = getBentoLayout(index)
              
              return (
                <div 
                  key={index} 
                  className={`${gridClass} group relative overflow-hidden rounded-2xl bg-gray-100 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/10 cursor-pointer`}
                >
                  {imageErrors.has(index) ? (
                    <ImagePlaceholder index={index} />
                  ) : (
                    <Image
                      src={image}
                      alt={`${data.name} portfolio image ${index + 1}`}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      onError={() => handleImageError(index)}
                      unoptimized={image.includes('placehold.co')} // Skip optimization for placeholder images
                    />
                  )}
                
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Image number badge - more subtle */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-700 text-xs px-2.5 py-1 rounded-full font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {index + 1}
                  </div>
                  
                  {/* Optional: View indicator */}
                  <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default Page