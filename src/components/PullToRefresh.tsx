
import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
  threshold?: number;
}

const PullToRefresh = ({ onRefresh, children, threshold = 80 }: PullToRefreshProps) => {
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    let touchStartY = 0;
    let touchCurrentY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        touchStartY = e.touches[0].clientY;
        setStartY(touchStartY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (window.scrollY === 0 && touchStartY > 0) {
        touchCurrentY = e.touches[0].clientY;
        const pullDistance = touchCurrentY - touchStartY;

        if (pullDistance > 0) {
          setCurrentY(touchCurrentY);
          setIsPulling(true);
          
          // Prevent default scroll behavior when pulling down
          if (pullDistance > 10) {
            e.preventDefault();
          }
        }
      }
    };

    const handleTouchEnd = async () => {
      if (isPulling && (currentY - startY) > threshold) {
        setIsRefreshing(true);
        try {
          await onRefresh();
        } catch (error) {
          console.error("Refresh failed:", error);
        }
        setIsRefreshing(false);
      }
      
      setIsPulling(false);
      setStartY(0);
      setCurrentY(0);
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isPulling, currentY, startY, threshold, onRefresh]);

  const pullDistance = Math.max(0, currentY - startY);
  const shouldTrigger = pullDistance > threshold;

  return (
    <div className="relative">
      {(isPulling || isRefreshing) && (
        <div 
          className="fixed top-0 left-0 right-0 z-50 bg-white border-b flex items-center justify-center transition-transform duration-200"
          style={{
            transform: `translateY(${isRefreshing ? '0' : Math.min(pullDistance - 60, 0)}px)`,
            height: '60px'
          }}
        >
          <div className="flex items-center space-x-2 text-primary">
            <RefreshCw 
              className={`h-5 w-5 ${isRefreshing || shouldTrigger ? 'animate-spin' : ''}`} 
            />
            <span className="text-sm font-medium">
              {isRefreshing ? 'Refreshing...' : shouldTrigger ? 'Release to refresh' : 'Pull to refresh'}
            </span>
          </div>
        </div>
      )}
      
      <div 
        style={{
          transform: isPulling ? `translateY(${Math.min(pullDistance * 0.5, 30)}px)` : 'none',
          transition: isPulling ? 'none' : 'transform 0.2s ease-out'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PullToRefresh;
