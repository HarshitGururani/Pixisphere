// redux/slices/filterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  // Applied filters (used for API calls)
  search: string;
  city: string;
  priceRange: [number, number];
  rating: number;
  styles: string[];
  sortBy: 'price' | 'rating' | 'recent';
  tag: "all" | "Candid" | "Maternity" | "Newborn" | "Birthday" | "Wedding" | "Pre-wedding" | "Couple" | "Family" | "Engagement" | "Fashion" | "Portfolio";
  name: string;
  
  // Pending filters (local state in sidebar)
  pendingCity: string;
  pendingPriceRange: [number, number];
  pendingRating: number;
  pendingStyles: string[];
  pendingSortBy: 'price' | 'rating' | 'recent';
  pendingTag: "all" | "Candid" | "Maternity" | "Newborn" | "Birthday" | "Wedding" | "Pre-wedding" | "Couple" | "Family" | "Engagement" | "Fashion" | "Portfolio";
}

const initialState: FilterState = {
  // Applied filters
  search: '',
  city: '',
  priceRange: [0, 20000],
  rating: 0,
  styles: [], 
  sortBy: 'recent',
  tag: "all",
  name: "",
  
  // Pending filters
  pendingCity: '',
  pendingPriceRange: [0, 20000],
  pendingRating: 0,
  pendingStyles: [],
  pendingSortBy: 'recent',
  pendingTag: "all",
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    // Applied filter actions (immediate)
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload;
    },
    setRating: (state, action: PayloadAction<number>) => {
      state.rating = action.payload;
    },
    setStyles: (state, action: PayloadAction<string[]>) => {
      state.styles = action.payload;
    },
    setSortBy: (state, action: PayloadAction<FilterState['sortBy']>) => {
      state.sortBy = action.payload;
    },
    setTag: (state, action: PayloadAction<FilterState['tag']>) => {
      state.tag = action.payload;
    },
    setName:(state,action:PayloadAction<string>) => {
      state.name= action.payload
    },
    
    // Pending filter actions (local state)
    setPendingCity: (state, action: PayloadAction<string>) => {
      state.pendingCity = action.payload;
    },
    setPendingPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.pendingPriceRange = action.payload;
    },
    setPendingRating: (state, action: PayloadAction<number>) => {
      state.pendingRating = action.payload;
    },
    setPendingStyles: (state, action: PayloadAction<string[]>) => {
      state.pendingStyles = action.payload;
    },
    setPendingSortBy: (state, action: PayloadAction<FilterState['pendingSortBy']>) => {
      state.pendingSortBy = action.payload;
    },
    setPendingTag: (state, action: PayloadAction<FilterState['pendingTag']>) => {
      state.pendingTag = action.payload;
    },
    
    // Apply pending filters
    applyFilters: (state) => {
      state.city = state.pendingCity;
      state.priceRange = state.pendingPriceRange;
      state.rating = state.pendingRating;
      state.styles = state.pendingStyles;
      state.sortBy = state.pendingSortBy;
      state.tag = state.pendingTag;
    },
    
    resetFilters: () => initialState,
  },
});

export const {
  setSearch, setCity, setPriceRange, setRating, setStyles, setSortBy, setTag, setName,
  setPendingCity, setPendingPriceRange, setPendingRating, setPendingStyles, setPendingSortBy, setPendingTag,
  applyFilters, resetFilters
} = filterSlice.actions;

export default filterSlice.reducer;
