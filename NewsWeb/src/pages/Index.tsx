import { useState, useEffect } from "react";
import NavigationMenu from "../components/NavigationMenu";
import FinancialTicker from "../components/FinancialTicker";
import NewsSlider from "../components/NewsSlider";
import WeatherWidget from "../components/WeatherWidget";
import HistoryWidget from "../components/HistoryWidget";
import AdPlacement from "../components/AdPlacement";
import { fetchSecondaryNewsData, NewsItem } from "../services/api";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux";
import { addToHistory } from "../store/historySlice";

const Index = () => {
  const [secondaryNews, setSecondaryNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getSecondaryNewsData = async () => {
      try {
        const data = await fetchSecondaryNewsData();
        setSecondaryNews(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching secondary news data:", error);
        setLoading(false);
      }
    };

    getSecondaryNewsData();
  }, []);

  const handleSecondaryNewsClick = () => {
    if (secondaryNews) {
      dispatch(addToHistory({
        id: secondaryNews.id,
        title: secondaryNews.title,
        date: secondaryNews.date
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationMenu />
      <FinancialTicker />
      
      {/* Mobile Ad placement - only shows in mobile view */}
      <div className="md:hidden mb-4 px-4">
        <AdPlacement position="right" />
      </div>
      
      <div className="flex justify-center w-full mx-auto px-2 md:px-4 lg:px-6">
        {/* Left ad placement */}
        <div className="hidden md:flex mt-3 mr-4">
          <AdPlacement position="left" />
        </div>
        
        {/* Main content */}
        <div className="container mx-auto px-4 py-6 flex-grow">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content - News slider takes 2 columns on desktop */}
            <div className="lg:col-span-2">
              <NewsSlider />
            </div>
            
            {/* Sidebar content */}
            <div className="space-y-6">
              {/* History widget */}
              <div className="flex justify-end">
                <HistoryWidget />
              </div>
            
              {/* Secondary news */}
              {loading ? (
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="h-6 bg-gray-200 animate-pulse rounded-md mb-2"></div>
                  <div className="h-40 bg-gray-200 animate-pulse rounded-md mb-2"></div>
                </div>
              ) : secondaryNews && (
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{secondaryNews.title}</h3>
                  <Link 
                    to={`/news/${secondaryNews.id}`} 
                    className="block"
                    onClick={handleSecondaryNewsClick}
                  >
                    <img 
                      src={secondaryNews.imageUrl} 
                      alt={secondaryNews.title} 
                      className="w-full h-50 object-cover rounded-md mb-2"
                    />
                  </Link>
                  <div className="flex justify-between items-center">
                    <Link 
                      to={`/news/${secondaryNews.id}`} 
                      className="text-news-blue hover:underline"
                      onClick={handleSecondaryNewsClick}
                    >
                      Devamını oku →
                    </Link>
                    <span className="text-sm text-gray-500">{secondaryNews.date}</span>
                  </div>
                </div>
              )}
              
              {/* Weather widget */}
              <WeatherWidget />
            </div>
          </div>
        </div>
        
        {/* Right ad placement */}
        <div className="hidden md:flex ml-4 mt-3">
          <AdPlacement position="right" />
        </div>
      </div>
    </div>
  );
};

export default Index;
