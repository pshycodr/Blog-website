export const BlogsSkeletonLoader = () => {
    return (
        <div className="w-full max-w-xl m-3 p-6 bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col gap-5 sm:w-[600px]">
            {/* Author Info Skeleton */}
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-300 rounded-full animate-pulse"></div>
                <div className="flex flex-col gap-2">
                    <div className="h-4 w-32 bg-gray-300 rounded-sm animate-pulse"></div>
                    <div className="h-3 w-24 bg-gray-300 rounded-sm animate-pulse"></div>
                </div>
            </div>

            {/* Title Skeleton */}
            <div className="h-6 w-2/3 bg-gray-300 rounded-sm animate-pulse"></div>

            {/* Content Preview Skeleton */}
            <div className="h-4 w-full bg-gray-300 rounded-sm animate-pulse mt-3"></div>
            <div className="h-4 w-5/6 bg-gray-300 rounded-sm animate-pulse mt-2"></div>

            {/* Footer Skeleton */}
            <div className="flex justify-between items-center text-xs sm:text-sm text-gray-500 mt-4">
                <div className="h-3 w-16 bg-gray-300 rounded-sm animate-pulse"></div>
                <div className="h-3 w-24 bg-gray-300 rounded-sm animate-pulse"></div>
            </div>
        </div>
    );
};
