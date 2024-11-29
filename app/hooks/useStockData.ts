import { useState, useEffect } from "react";

export type StockData = {
  stock: string;
  price: number;
};

const useStockData = (url: string) => {
  const [data, setData] = useState<StockData[]>([]);
  const [updatedKeys, setUpdatedKeys] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    ws.onmessage = (event) => {
      try {
        const newData = JSON.parse(event.data) as StockData[];
        const updatedStocks = compareData(data, newData);

        setData(newData);
        setUpdatedKeys(updatedStocks);

        // Reset the blinking effect after 1 second
        setTimeout(() => setUpdatedKeys([]), 1000);
      } catch (err) {
        console.error("Error parsing WebSocket data:", err);
        setError("Failed to parse data");
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setError("WebSocket error occurred");
    };

    return () => ws.close(); // Cleanup WebSocket connection on unmount
  }, [data, url]);

  const compareData = (oldData: StockData[], newData: StockData[]) => {
    const updated: string[] = [];
    newData.forEach((item, index) => {
      if (JSON.stringify(oldData[index]) !== JSON.stringify(item)) {
        updated.push(item.stock);
      }
    });
    return updated;
  };

  return { data, updatedKeys, error };
};

export default useStockData;
