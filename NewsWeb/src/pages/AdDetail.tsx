import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchAdById, Ad } from "../services/api";
import NavigationMenu from "../components/NavigationMenu";
import FinancialTicker from "../components/FinancialTicker";

const AdDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [ad, setAd] = useState<Ad | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const foundAd = await fetchAdById(Number(id));
        if (foundAd) {
          setAd(foundAd);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ad data:", error);
        setLoading(false);
      }
    };

    fetchAd();
  }, [id]);

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

  if (!ad) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavigationMenu />
        <FinancialTicker />
        <div className="container mx-auto mt-6 p-4 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Reklam bulunamadı</h1>
          <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
            Ana Sayfaya Dön
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
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">{ad.title} </h1>
            
            <div className="flex justify-center my-6">
              <img 
                src={ad.imageUrl} 
                alt={ad.title} 
                className="w-auto max-h-[600px] object-contain"
              />
            </div>
            
            {/* Additional ad information */}
            <div className="text-gray-700 mt-6">
              <h2 className="text-xl font-semibold mb-2">Reklam</h2>
              <p>
                Bu reklam, sponsorlarımızdan birinin reklamıdır. Daha fazla bilgi için, sponsorun web sitesini ziyaret edin veya onlara doğrudan iletişime geçin.
              </p>
              
              <div className="mt-6">
                <a 
                  href={ad.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                >
                  Sponsorumuzun web sitesini ziyaret edin!
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 mb-6 text-center">
          <Link to="/" className="text-blue-600 hover:underline">
            ← Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdDetail; 