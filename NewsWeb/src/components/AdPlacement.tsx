import { useState, useEffect } from "react";
import { fetchAdData, Ad } from "../services/api";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

interface AdPlacementProps {
  position: "left" | "right";
}

export default function AdPlacement({ position }: AdPlacementProps) {
  const [ad, setAd] = useState<Ad | null>(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const getAdData = async () => {
      try {
        const data = await fetchAdData();
        const matchingAd = data.find(item => item.position === position);
        if (matchingAd) {
          setAd(matchingAd);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ad data:", error);
        setLoading(false);
      }
    };

    getAdData();
  }, [position]);

  const handleCloseAd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible(false);
  };

  if (loading) {
    return (
      <div className="hidden md:block xl:block fixed top-1/2 transform -translate-y-1/2 w-[120px] md:w-[160px] h-[300px] md:h-[600px] bg-gray-200 animate-pulse">
        <div className="h-full w-full"></div>
      </div>
    );
  }

  if (!ad || !isVisible) return null;

  // Mobile view: Show as horizontal banner at the top for small screens
  const isMobileView = 
    <div className="block md:hidden w-full py-1">
      <div className="relative">
        <div className="bg-black text-white text-center py-1 text-xs font-medium rounded-t-md flex justify-between items-center px-2">
          <span>{ad.title}</span>
          <button 
            onClick={handleCloseAd}
            className="text-white hover:text-gray-300 focus:outline-none"
            aria-label="Close advertisement"
          >
            <X size={14} />
          </button>
        </div>
        
        <Link 
          to={`/ad/${ad.id}`}
          className="block"
        >
          <img 
            src={ad.imageUrl} 
            alt={ad.title}
            className="w-full h-[100px] object-cover border-x border-b border-gray-200 rounded-b-md shadow-sm"
          />
        </Link>
        <div className="absolute top-8 right-0 bg-black bg-opacity-50 text-white text-xs px-1">
          Reklam
        </div>
      </div>
    </div>;

  // Desktop/Tablet view: Show as sidebar
  const isDesktopView = 
    <div className={`hidden md:block fixed top-1/2 transform -translate-y-1/2 ${position === "left" ? "left-1 md:left-4" : "right-1 md:right-4"} z-30`}>
      <div className="relative w-[120px] md:w-[160px]">
        <div className="bg-black text-white text-center py-1 text-xs font-medium rounded-t-md flex justify-between items-center px-2">
          <span>{ad.title}</span>
          <button 
            onClick={handleCloseAd}
            className="text-white hover:text-gray-300 focus:outline-none"
            aria-label="Reklamı Kapat"
          >
            <X size={14} />
          </button>
        </div>
        
        <Link 
          to={`/ad/${ad.id}`}
          className="block"
        >
          <img 
            src={ad.imageUrl} 
            alt={ad.title}
            className="w-full h-[300px] md:h-[600px] object-cover border-x border-b border-gray-200 rounded-b-md shadow-sm"
          />
        </Link>
      </div>
    </div>;

  // Return different views based on position
  if (position === "left") {
    return (
      <>
        {isDesktopView}
      </>
    );
  }
  
  return (
    <>
      {isMobileView}
      {isDesktopView}
    </>
  );
} 