import { useEffect, useState, useRef } from "react";
import { fetchFinancialData, FinancialItem } from "../services/api";

export default function FinancialTicker() {
  const [financialData, setFinancialData] = useState<FinancialItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Create an array with multiple copies of the financial data to ensure seamless sliding
  const getRepeatedData = (data: FinancialItem[]) => {
    // We repeat the data 4 times to ensure it's enough to fill the screen width
    return [...data, ...data, ...data, ...data];
  };

  useEffect(() => {
    const getFinancialData = async () => {
      try {
        const data = await fetchFinancialData();
        setFinancialData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching financial data:", error);
        setLoading(false);
      }
    };

    getFinancialData();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-100 py-2">
        <div className="container mx-auto">
          <p className="text-center">Finansal veriler yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Get repeated financial data
  const repeatedData = getRepeatedData(financialData);

  return (
    <div className="bg-gray-100 py-2 overflow-hidden">
      <div className="ticker-container">
        <div className="ticker-content">
          {repeatedData.map((item, index) => (
            <span key={`${item.id}-${index}`} className="financial-item">
              <strong className="mr-1">{item.name}</strong>
              <span>{item.value}</span>
              <span 
                className={item.trend === "up" ? "financial-positive ml-1" : "financial-negative ml-1"}
              >
                {item.change}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
