import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { RootState } from '@/redux/store';

export function usePhotographers() {
  const filters = useSelector((state: RootState) => state.filter);

  return useQuery({
    queryKey: ['photographers', {
      search: filters.search,
      city: filters.city,
      priceRange: filters.priceRange,
      rating: filters.rating,
      styles: filters.styles,
      sortBy: filters.sortBy,
      tag: filters.tag,
      name: filters.name
    }],
    queryFn: async () => {
      const params = new URLSearchParams();
      
      // Only add search parameter if it's not empty
      if (filters.search && filters.search.trim() !== '') {
        const searchTerm = filters.search.trim();
        // Use q parameter for general search - this should be case-insensitive
        params.append('q', searchTerm);
      }
      
      // Only add city parameter if it's not empty
      if (filters.city && filters.city.trim() !== '') {
        params.append('location_like', filters.city.trim());
      }
      
      // Only add rating parameter if it's greater than 0
      if (filters.rating > 0) {
        params.append('rating_gte', filters.rating.toString());
      }
      
      // Only add styles parameter if there are styles selected
      if (filters.styles && filters.styles.length > 0) {
        filters.styles.forEach(style => params.append('styles_like', style));
      }
      
      // Only add price range parameters if they're different from default
      // Assuming default is [0, 20000] based on the slice
      if (filters.priceRange[0] > 0) {
        params.append('price_gte', filters.priceRange[0].toString());
      }
      if (filters.priceRange[1] < 20000) {
        params.append('price_lte', filters.priceRange[1].toString());
      }
      
      // Only add tag parameter if it's set and not "all"
      if (filters.tag && filters.tag !== "all") {
        params.append('tags_like', filters.tag);
        console.log('Adding tag filter:', filters.tag);
      }

      if(filters.name && filters.name.trim() !== ''){
        params.append('name_like', filters.name.trim());
      }

      // Add timeout and better error handling
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const url = params.toString() === '' 
        ? 'https://json-server-hpku.onrender.com/photographers'
        : `https://json-server-hpku.onrender.com/photographers?${params.toString()}`;

      console.log('Fetching from URL:', url);
      console.log('All params:', params.toString());

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        credentials: 'omit',
        signal: controller.signal,
      }); 

      clearTimeout(timeoutId);

      console.log('Response status:', res.status);
      console.log('Response headers:', Object.fromEntries(res.headers.entries()));

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log('Data received:', data.length, 'photographers');
      return data;
    },
    retry: 2, 
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), 
    staleTime: 5 * 60 * 1000, 
  });
} 