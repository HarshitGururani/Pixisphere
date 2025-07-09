'use client';
import { useState } from 'react';
import { PhotographersList } from '@/components/PhotographersList';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { setPendingTag, applyFilters } from '@/redux/slices/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Button } from '@/components/ui/button';
import FilterSidebar from '@/components/FilterSidebar';
import { Filter } from 'lucide-react';

const Page = () => {
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const selectedTag = useSelector((state: RootState) => state.filter.tag);
  const selectedCity = useSelector((state: RootState) => state.filter.city);

  function getHeading(type: string, city: string) {
    const hasValidType = type && type.toLowerCase() !== "all";
  
    if (hasValidType && city) {
      return `${type} Photographers in ${city}`;
    } else if (hasValidType) {
      return `Best ${type} Photographers Near You`;
    } else if (city) {
      return `Top Photographers in ${city}`;
    } else {
      return `Find the Best Photographers for Every Occasion`;
    }
  }
  
  function getSubheading(type: string, city: string) {
    const hasValidType = type && type.toLowerCase() !== "all";
  
    if (hasValidType && city) {
      return `Browse ${city}'s best ${type.toLowerCase()} photographers — view portfolios, pricing, and reviews.`;
    } else if (hasValidType) {
      return `Explore top-rated ${type.toLowerCase()} photographers with trusted reviews and creative portfolios.`;
    } else if (city) {
      return `Discover professional photographers in ${city} for weddings, maternity, birthdays, and more — all reviewed and rated.`;
    } else {
      return `Explore verified professionals for weddings, maternity, birthdays, and more — all in one place.`;
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="flex">
        {/* Main Content */}
        <div className="flex-1 transition-all duration-300">
          <div className='mb-4 p-7 shadow-xl'>
            <h1 className="text-2xl font-bold mb-2">{getHeading(selectedTag, selectedCity)}</h1>
            <p className="text-gray-600 text-[16px] mb-5">{getSubheading(selectedTag, selectedCity)}</p>
            
            <div className="flex items-center justify-between">
              <Select onValueChange={(value) => {
                dispatch(setPendingTag(value as "all" | "Candid" | "Maternity" | "Newborn" | "Birthday" | "Wedding" | "Pre-wedding" | "Couple" | "Family" | "Engagement" | "Fashion" | "Portfolio"));
                dispatch(applyFilters());
              }}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Candid">Candid</SelectItem>
                  <SelectItem value="Maternity">Maternity</SelectItem>
                  <SelectItem value="Newborn">Newborn</SelectItem>
                  <SelectItem value="Birthday">Birthday</SelectItem>
                  <SelectItem value="Wedding">Wedding</SelectItem>
                  <SelectItem value="Pre-wedding">Pre-wedding</SelectItem>
                  <SelectItem value="Couple">Couple</SelectItem>
                  <SelectItem value="Family">Family</SelectItem>
                  <SelectItem value="Engagement">Engagement</SelectItem>
                  <SelectItem value="Fashion">Fashion</SelectItem>
                  <SelectItem value="Portfolio">Portfolio</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                variant="outline" 
                className='bg-white text-gray-700 py-3 px-4 rounded-lg font-medium hover:border-gray-400 transition-colors border border-gray-300 flex items-center gap-2'
                onClick={() => setIsFilterSidebarOpen(true)}
              >
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>
          </div>

          <div className='p-6'>
            <PhotographersList />
          </div>
        </div>

        {/* Filter Sidebar */}
        <FilterSidebar 
          isOpen={isFilterSidebarOpen} 
          onClose={() => setIsFilterSidebarOpen(false)} 
        />
      </main>
    </div>
  )
}
export default Page;