'use client';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { 
  setPendingCity, 
  setPendingPriceRange, 
  setPendingRating, 
  setPendingStyles, 
  setPendingSortBy, 
  setPendingTag, 
  applyFilters,
  resetFilters 
} from '@/redux/slices/filterSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { X, Filter, MapPin, Star, DollarSign, Palette, SortAsc } from 'lucide-react';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterSidebar = ({ isOpen, onClose }: FilterSidebarProps) => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filter);
  
  const [localCity, setLocalCity] = useState(filters.pendingCity);

  const photographyStyles = [
    'Portrait', 'Landscape', 'Street', 'Documentary', 'Fine Art', 
    'Commercial', 'Event', 'Sports', 'Architecture', 'Nature'
  ];

  const handleApplyFilters = () => {
    dispatch(setPendingCity(localCity));
    dispatch(applyFilters());
    onClose();
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
    setLocalCity('');
  };

  const handleStyleToggle = (style: string) => {
    const newStyles = filters.pendingStyles.includes(style)
      ? filters.pendingStyles.filter(s => s !== style)
      : [...filters.pendingStyles, style];
    dispatch(setPendingStyles(newStyles));
  };

  // Sync pending filters with applied filters when sidebar opens
  useEffect(() => {
    if (isOpen) {
      setLocalCity(filters.city);
      dispatch(setPendingCity(filters.city));
      dispatch(setPendingPriceRange(filters.priceRange));
      dispatch(setPendingRating(filters.rating));
      dispatch(setPendingStyles(filters.styles));
      dispatch(setPendingSortBy(filters.sortBy));
      dispatch(setPendingTag(filters.tag));
    }
  }, [isOpen, filters.city, filters.priceRange, filters.rating, filters.styles, filters.sortBy, filters.tag, dispatch]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/25 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Filter Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">


            {/* Location */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location
              </label>
              <Input
                placeholder="Enter city..."
                value={localCity}
                onChange={(e) => setLocalCity(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Category
              </label>
              <Select 
                value={filters.pendingTag} 
                onValueChange={(value) => dispatch(setPendingTag(value as "all" | "Candid" | "Maternity" | "Newborn" | "Birthday" | "Wedding" | "Pre-wedding" | "Couple" | "Family" | "Engagement" | "Fashion" | "Portfolio"))}
              >
                <SelectTrigger className="w-full">
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
            </div>

            {/* Price Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Price Range
              </label>
              <div className="px-2">
                <Slider
                  value={filters.pendingPriceRange}
                  onValueChange={(value) => dispatch(setPendingPriceRange(value as [number, number]))}
                  max={20000}
                  min={0}
                  step={100}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>₹{filters.pendingPriceRange[0].toLocaleString()}</span>
                  <span>₹{filters.pendingPriceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Star className="w-4 h-4" />
                Minimum Rating
              </label>
              <div className="px-2">
                <Slider
                  value={[filters.pendingRating]}
                  onValueChange={(value) => dispatch(setPendingRating(value[0]))}
                  max={5}
                  min={0}
                  step={0.5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Any</span>
                  <span>{filters.pendingRating}★ & above</span>
                </div>
              </div>
            </div>

            {/* Photography Styles */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Photography Styles
              </label>
              <div className="space-y-2">
                {photographyStyles.map((style) => (
                  <div key={style} className="flex items-center space-x-2">
                    <Checkbox
                      id={style}
                      checked={filters.styles.includes(style)}
                      onCheckedChange={() => handleStyleToggle(style)}
                    />
                    <label
                      htmlFor={style}
                      className="text-sm text-gray-700 cursor-pointer"
                    >
                      {style}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Sort By */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <SortAsc className="w-4 h-4" />
                Sort By
              </label>
              <Select 
                value={filters.pendingSortBy} 
                onValueChange={(value) => dispatch(setPendingSortBy(value as 'price' | 'rating' | 'recent'))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price">Price: Low to High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Active Filters */}
            {(filters.pendingStyles.length > 0 || filters.pendingRating > 0 || filters.pendingTag !== 'all') && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Active Filters
                </label>
                <div className="flex flex-wrap gap-2">
                  {filters.pendingTag !== 'all' && (
                    <Badge variant="secondary" className="text-xs">
                      {filters.pendingTag}
                      <button
                        onClick={() => dispatch(setPendingTag('all'))}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                  {filters.pendingRating > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {filters.pendingRating}★+
                      <button
                        onClick={() => dispatch(setPendingRating(0))}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                  {filters.pendingStyles.map((style) => (
                    <Badge key={style} variant="secondary" className="text-xs">
                      {style}
                      <button
                        onClick={() => handleStyleToggle(style)}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 space-y-3">
            <Button 
              onClick={handleApplyFilters}
              className="w-full"
            >
              Apply Filters
            </Button>
            <Button 
              variant="outline" 
              onClick={handleResetFilters}
              className="w-full"
            >
              Clear All
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar; 