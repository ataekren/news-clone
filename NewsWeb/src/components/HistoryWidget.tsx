import { useState } from "react";
import { useAppSelector } from "../hooks/redux";
import { History, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function HistoryWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const visitedNews = useAppSelector((state) => state.history.visitedNews);

  const toggleHistory = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleHistory}
        className="bg-black hover:bg-gray-700 text-white p-2 flex items-center rounded-md"
      >
        <History className="mr-1" size={18} />
        <span>Geçmiş</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-60 md:w-80 bg-white border border-gray-300 shadow-lg rounded-md z-50 animate-fade-in">
          <div className="p-3 border-b">
            <h3 className="font-bold text-news-dark">Geçmiş</h3>
            <p className="text-sm text-gray-500">Son gezilen haberler</p>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {visitedNews.length > 0 ? (
              <ul>
                {visitedNews.map((news) => (
                  <li key={news.id} className="border-b border-gray-100 last:border-0">
                    <Link
                      to={`/news/${news.id}`}
                      className="block p-3 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <p className="text-news-dark font-medium">{news.title}</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-gray-500">{news.date}</span>
                        <div className="flex items-center text-xs text-gray-400">
                          <Clock size={12} className="mr-1" />
                          <span>{news.lastVisited || "Az önce"}</span>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 text-center text-gray-500">
                <p>Henüz gezilen haber bulunmuyor</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
