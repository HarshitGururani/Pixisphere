# 📸 Pixisphere - Find Top Photographers in India

A modern, responsive web application for discovering and booking professional photographers across India. Built with Next.js 15, TypeScript, and Tailwind CSS.

![Pixisphere](https://img.shields.io/badge/Next.js-15.3.5-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.8.2-764ABC?style=for-the-badge&logo=redux)

## ✨ Features

- **Advanced Filtering System** - Filter by location, price range, rating, photography styles, and categories
- **Real-time Search** - Debounced search with instant results
- **Responsive Design** - Mobile-first approach with beautiful UI
- **State Management** - Redux Toolkit for efficient state handling
- **Data Fetching** - React Query for optimized API calls with caching
- **Modern UI Components** - Radix UI components with custom styling
- **SEO Optimized** - Meta tags, structured data, and performance optimized

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pixisphere.git
   cd pixisphere
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🏗️ Project Structure

```
pixisphere/
├── src/
│   ├── app/                 # Next.js 15 app directory
│   │   ├── layout.tsx      # Root layout with metadata
│   │   ├── page.tsx        # Homepage with filtering
│   │   └── photographer/   # Photographer detail pages
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # Radix UI components
│   │   ├── FilterSidebar.tsx
│   │   ├── PhotographersList.tsx
│   │   └── Navbar.tsx
│   ├── hooks/             # Custom React hooks
│   │   └── usePhotographers.ts
│   ├── redux/             # State management
│   │   ├── store.ts
│   │   └── slices/
│   └── lib/               # Utility functions
└── public/                # Static assets
```

## 🔧 Technical Implementation

### Filtering System

The application implements a sophisticated filtering system with the following features:

#### **Dual State Management**
- **Applied Filters**: Immediately trigger API calls
- **Pending Filters**: Local state in sidebar for batch application

```typescript
// Applied filters (used for API calls)
search: string;
city: string;
priceRange: [number, number];
rating: number;
styles: string[];

// Pending filters (local state in sidebar)
pendingCity: string;
pendingPriceRange: [number, number];
pendingRating: number;
pendingStyles: string[];
```

#### **Debounced Search**
Search input uses debouncing to prevent excessive API calls:


### Data Fetching Logic

#### **React Query Integration**
- **Caching**: 5-minute stale time for optimal performance
- **Retry Logic**: Exponential backoff with 2 retries
- **Error Handling**: Comprehensive error states and timeouts
- **Query Keys**: Dynamic keys based on all filter parameters

```typescript
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
    // API call logic with timeout and error handling
  },
  retry: 2,
  retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  staleTime: 5 * 60 * 1000,
});
```

#### **API Endpoint**
- **Base URL**: `https://json-server-hpku.onrender.com/photographers`
- **Query Parameters**: Dynamic based on active filters
- **Timeout**: 10-second request timeout with AbortController

### State Management

#### **Redux Toolkit Slice**
```typescript
const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    // Applied filter actions (immediate)
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    
    // Pending filter actions (local state)
    setPendingCity: (state, action: PayloadAction<string>) => {
      state.pendingCity = action.payload;
    },
    
    // Apply pending filters
    applyFilters: (state) => {
      state.city = state.pendingCity;
      state.priceRange = state.pendingPriceRange;
      // ... apply all pending filters
    },
  },
});
```

## 🎨 UI/UX Features

### **Responsive Filter Sidebar**
- Slide-in animation with overlay
- Batch filter application
- Real-time preview of selected filters
- Reset functionality

### **Dynamic Headings**
Content adapts based on selected filters:


### **Loading States**
- Skeleton components for better UX
- Optimistic updates
- Error boundaries

## 📱 Responsive Design

- **Mobile-first** approach
- **Tailwind CSS** for utility-first styling
- **Custom breakpoints** for optimal viewing
- **Touch-friendly** interactions


### **Performance**
- **Next.js 15** with App Router
- **Image optimization** with Next.js Image component
- **Code splitting** and lazy loading
- **Caching strategies** with React Query

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.5
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS 4.0
- **State Management**: Redux Toolkit 2.8.2
- **Data Fetching**: TanStack React Query 5.81.5
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Forms**: React Hook Form 7.60.0
- **Carousel**: Swiper 11.2.10

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Next.js
3. Deploy with zero configuration

### Other Platforms
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) for accessible UI components
- [TanStack Query](https://tanstack.com/query) for data fetching

---

**Made with ❤️ for photographers and clients across India**

