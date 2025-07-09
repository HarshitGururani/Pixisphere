export function PhotographersListSkeleton() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Photographers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-[12px] flex flex-col relative p-[10px] pb-4 h-auto animate-pulse" style={{boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.12)'}}>
            {/* Image Section Skeleton */}
            <div className="relative">
              <div className="w-full h-[210px] bg-gray-200 rounded-[12px]"></div>
              
              {/* Overlay badges skeleton */}
              <div className="absolute bottom-4 left-4">
                <div className="bg-gray-300 w-12 h-6 rounded"></div>
              </div>
              
              <div className="absolute bottom-4 right-4">
                <div className="bg-gray-300 w-9 h-9 rounded-full"></div>
              </div>
            </div>
            
            {/* Content Section Skeleton */}
            <div className="p-0 mt-2">
              {/* Header skeleton */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="text-right">
                  <div className="h-5 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
              
              {/* Rating skeleton */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-gray-200 rounded"></div>
                  <div className="w-8 h-4 bg-gray-200 rounded"></div>
                </div>
                <div className="w-16 h-3 bg-gray-200 rounded"></div>
              </div>
              
              {/* Tags skeleton */}
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
                <div className="w-20 h-6 bg-gray-200 rounded-full"></div>
                <div className="w-14 h-6 bg-gray-200 rounded-full"></div>
              </div>
              
              {/* Action Buttons skeleton */}
              <div className="flex gap-2 text-[14px]">
                <div className="w-24 h-10 bg-gray-200 rounded-lg"></div>
                <div className="flex-1 h-10 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 