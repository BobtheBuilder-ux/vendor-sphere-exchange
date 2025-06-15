
import { ReactNode } from "react";

interface TouchOptimizedProps {
  children: ReactNode;
  onTap?: () => void;
  onLongPress?: () => void;
  className?: string;
  disabled?: boolean;
}

const TouchOptimized = ({ 
  children, 
  onTap, 
  onLongPress, 
  className = "", 
  disabled = false 
}: TouchOptimizedProps) => {
  let touchTimeout: NodeJS.Timeout;
  let touchStartTime: number;

  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled) return;
    
    touchStartTime = Date.now();
    
    if (onLongPress) {
      touchTimeout = setTimeout(() => {
        onLongPress();
      }, 500); // 500ms for long press
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (disabled) return;
    
    clearTimeout(touchTimeout);
    
    const touchDuration = Date.now() - touchStartTime;
    
    // Only trigger tap if it was a quick touch (not a long press)
    if (touchDuration < 500 && onTap) {
      onTap();
    }
  };

  const handleTouchCancel = () => {
    clearTimeout(touchTimeout);
  };

  return (
    <div
      className={`touch-manipulation select-none ${
        disabled ? 'opacity-50 pointer-events-none' : 'active:scale-95'
      } transition-transform duration-100 ${className}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      style={{
        WebkitTapHighlightColor: 'transparent',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
    >
      {children}
    </div>
  );
};

export default TouchOptimized;
