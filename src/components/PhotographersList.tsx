'use client';
import { usePhotographers } from '@/hooks/usePhotographers';
import { Camera, Heart } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { useRouter } from 'next/navigation';
import { PhotographersListSkeleton } from './PhotographersListSkeleton';
import { InquiryButton } from './InquiryButton';

interface Photographer {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  styles: string[];
  tags: string[];
  bio: string;
  profilePic: string;
  portfolio: string[];
  reviews: {
    name: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

// Memoized individual photographer card component
const PhotographerCard = memo(({ 
  photographer, 
  isFavorite, 
  onToggleFavorite, 
  onViewProfile 
}: {
  photographer: Photographer;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onViewProfile: (id: number) => void;
}) => {
  const handleFavoriteClick = useCallback(() => {
    onToggleFavorite(photographer.id);
  }, [photographer.id, onToggleFavorite]);

  const handleViewProfile = useCallback(() => {
    onViewProfile(photographer.id);
  }, [photographer.id, onViewProfile]);

  return (
    <div className="bg-white rounded-[12px] flex flex-col relative p-[10px] pb-4 h-auto" style={{boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.12)'}}>
      {/* Image Section */}
      <div className="relative">
        <Image 
          src={photographer.profilePic || "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=300&fit=crop&crop=face"}
          alt={`${photographer.name} portfolio`}
          className="w-full h-[210px] object-cover rounded-[12px]"
          width={210} 
          height={210}
          priority={false}
          loading="lazy"
        />
        
        {/* Overlay badges */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
            <Camera size={14} />
            {photographer.portfolio?.length || 0}+
          </div>
        </div>
        
        <div className="absolute bottom-4 right-4">
          <button 
            onClick={handleFavoriteClick}
            className="bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition-all"
          >
            <Heart 
              className={`w-5 h-5 transition-colors ${
                isFavorite 
                  ? 'text-red-500 fill-red-500' 
                  : 'text-gray-600 hover:text-red-500'
              }`} 
            />
          </button>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-0 mt-2">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-[18px] font-semibold text-gray-900">{photographer.name}</h3>
            <p className="text-gray-600 text-[13px]">{photographer.location}</p>
          </div>
          <div className="text-right">
            <div className="text-[16px] font-bold text-gray-900">₹{photographer.price?.toLocaleString()}</div>
          </div>
        </div>
        
        {/* Rating */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex items-center gap-1">
            <span className="text-yellow-600">★</span>
            <span className="font-semibold text-yellow-600">{photographer.rating?.toFixed(1) || 'N/A'}</span>
          </div>
          <span className="text-gray-500 text-[12px]">{photographer.reviews?.length || 0} Reviews</span>
        </div>
        
        {/* Tags */}
        {photographer.tags && photographer.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {photographer.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex gap-2 text-[14px]">
          <button 
            className="bg-white text-gray-700 px-4 rounded-lg font-medium hover:border-gray-400 transition-colors border border-gray-300" 
            onClick={handleViewProfile}
          >
            View Profile
          </button>
          <div className="flex-1">
            <InquiryButton 
              photographerName={photographer.name}
              className="w-full bg-white text-primary py-3 px-4 rounded-lg font-medium transition-colors border border-primary hover:bg-primary hover:text-white"
              heading="Get in Touch"
              subheading="Ready to start your photography journey? Send us your details and we'll connect you with this talented photographer."
            />
          </div>
        </div>
      </div>
    </div>
  );
});

PhotographerCard.displayName = 'PhotographerCard';

export function PhotographersList() {
  const { data: photographers, isLoading, error } = usePhotographers();
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [displayedCount, setDisplayedCount] = useState(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const router = useRouter();

  // Memoized displayed photographers
  const displayedPhotographers = useMemo(() => {
    return photographers?.slice(0, displayedCount) || [];
  }, [photographers, displayedCount]);

  const toggleFavorite = useCallback((photographerId: number) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(photographerId)) {
        newFavorites.delete(photographerId);
      } else {
        newFavorites.add(photographerId);
      }
      return newFavorites;
    });
  }, []);

  const handleViewProfile = useCallback((photographerId: number) => {
    router.push(`/photographer/${photographerId}`);
  }, [router]);

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    if (isLoadingMore || !photographers) return;

    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Load more when user is near bottom (within 200px)
    if (scrollTop + windowHeight >= documentHeight - 200) {
      if (displayedCount < photographers.length) {
        setIsLoadingMore(true);
        // Reduced loading delay
        setTimeout(() => {
          setDisplayedCount(prev => Math.min(prev + 6, photographers.length));
          setIsLoadingMore(false);
        }, 300);
      }
    }
  }, [displayedCount, photographers, isLoadingMore]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const throttledScrollHandler = () => {
      if (timeoutId) return;
      
      timeoutId = setTimeout(() => {
        handleScroll();
        timeoutId = null as unknown as NodeJS.Timeout;
      }, 100); // Throttle to 100ms
    };

    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    return () => {
      window.removeEventListener('scroll', throttledScrollHandler);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [handleScroll]);

  // Reset displayed count when photographers data changes
  useEffect(() => {
    setDisplayedCount(6);
  }, [photographers]);

  if (isLoading || error) {
    return <PhotographersListSkeleton />;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Photographers</h2>
      
      {!photographers || photographers.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No photographers found matching your criteria.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedPhotographers.map((photographer: Photographer) => (
              <PhotographerCard
                key={photographer.id}
                photographer={photographer}
                isFavorite={favorites.has(photographer.id)}
                onToggleFavorite={toggleFavorite}
                onViewProfile={handleViewProfile}
              />
            ))}
          </div>
          
          {/* Loading more indicator */}
          {isLoadingMore && (
            <div className="flex justify-center mt-8">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border-2 border-gray-300 border-t-primary rounded-full animate-spin"></div>
                <span className="text-gray-600">Loading more photographers...</span>
              </div>
            </div>
          )}
          
          {/* End of results indicator */}
          {displayedCount >= (photographers?.length || 0) && photographers && photographers.length > 0 && (
            <div className="text-center mt-8 py-4">
              <p className="text-gray-500">You&apos;ve reached the end of all photographers</p>
            </div>
          )}
        </>
      )}
    </div>
  );
} 




