import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchNewsById, NewsItem } from "../services/api";
import NavigationMenu from "../components/NavigationMenu";
import FinancialTicker from "../components/FinancialTicker";
import { useAppDispatch } from "../hooks/redux";
import { addToHistory } from "../store/historySlice";

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchNewsItem = async () => {
      try {
        const foundItem = await fetchNewsById(Number(id));
        if (foundItem) {
          setNewsItem(foundItem);
          
          // Add to history when the news page is loaded
          dispatch(addToHistory({
            id: foundItem.id,
            title: foundItem.title,
            date: foundItem.date
          }));
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news data:", error);
        setLoading(false);
      }
    };

    fetchNewsItem();
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavigationMenu />
        <FinancialTicker />
        <div className="container mx-auto mt-6 p-4">
          <div className="h-80 bg-gray-200 animate-pulse rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (!newsItem) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavigationMenu />
        <FinancialTicker />
        <div className="container mx-auto mt-6 p-4 text-center">
          <h1 className="text-2xl font-bold text-gray-800">News not found</h1>
          <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
            Return to homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationMenu />
      <FinancialTicker />
      
      <div className="container mx-auto mt-6 px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img 
            src={newsItem.imageUrl} 
            alt={newsItem.title} 
            className="w-full h-[500px] object-cover"
          />
          
          <div className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {newsItem.category}
              </span>
              <span className="text-gray-500 text-sm">{newsItem.date}</span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{newsItem.title}</h1>
            <p className="text-gray-700 text-lg mb-6">{newsItem.summary}</p>
            
          </div>
        </div>
        
        <div className="mt-6 mb-6 text-center">
          <Link to="/" className="text-blue-600 hover:underline">
            ← Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail; 