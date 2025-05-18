import { useState, useEffect } from "react";
import { fetchNewsData, NewsItem } from "../services/api";
import { useAppDispatch } from "../hooks/redux";
import { addToHistory } from "../store/historySlice";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function NewsSlider() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getNewsData = async () => {
      try {
        const data = await fetchNewsData();
        setNews(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news data:", error);
        setLoading(false);
      }
    };

    getNewsData();
  }, []);

  const handlePrevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? news.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setActiveIndex((prev) => (prev === news.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  const handleNewsClick = (newsItem: NewsItem) => {
    // Add to history when news is clicked
    dispatch(addToHistory({
      id: newsItem.id,
      title: newsItem.title,
      date: newsItem.date
    }));
  };

  if (loading) {
    return (
      <div className="container mx-auto mt-6 p-4">
        <div className="h-80 bg-gray-200 animate-pulse rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="relative container mx-auto mt-6 px-4">
      <div className="relative h-[635px] overflow-hidden rounded-lg border border-gray-300">
        {news.map((item, index) => (
          <div
            key={item.id}
            className={`absolute w-full h-full transition-opacity duration-500 ${
              index === activeIndex ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <Link 
              to={`/news/${item.id}`}
              onClick={() => handleNewsClick(item)}
              className="block w-full h-full"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                <div className="flex flex-col text-white">
                  <span className="text-sm mb-1">{item.category}</span>
                  <h2 className="text-2xl md:text-4xl font-bold mb-2">{item.title}</h2>
                  <p className="text-sm md:text-base">{item.summary}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        className="absolute left-8 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors z-10"
        onClick={handlePrevSlide}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="absolute right-8 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors z-10"
        onClick={handleNextSlide}
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {news.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === activeIndex ? "bg-white" : "bg-white bg-opacity-50"
            }`}
            onClick={() => handleDotClick(index)}
          ></button>
        ))}
      </div>
    </div>
  );
}
