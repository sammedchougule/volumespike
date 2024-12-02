export async function fetchStockData(symbol?: string) {
    try {
      const response = await fetch('/data/data.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched stock data:', data);
      if (symbol) {
        const stock = data.find((s: any) => s.symbol === symbol);
        if (!stock) {
          throw new Error(`Stock with symbol ${symbol} not found`);
        }
        return stock;
      }
      return data;
    } catch (error) {
      console.error('Error fetching stock data:', error);
      throw error;
    }
  }
  
  