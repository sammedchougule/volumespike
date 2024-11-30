export async function fetchStockData() {
    try {
      const response = await fetch('/data/data.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched stock data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching stock data:', error);
      throw error;
    }
  }
  
  