import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <p className="text-2xl font-semibold text-gray-800 mb-2">Sayfa Bulunamadı</p>
        <p className="text-gray-600 mb-6">Aradığınız sayfa mevcut değil veya taşınmış olabilir.</p>
        <Button asChild className="w-full py-6 text-lg flex items-center justify-center gap-2">
          <a href="/">
            <Home className="mr-2 h-5 w-5" />
            Ana Sayfaya Dön
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
