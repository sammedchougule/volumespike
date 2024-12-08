export interface Stock {
    symbol: string
    price: number
    change: number
    indices: string
    changepct: number
    marketCap: number
    sector: string
    logo?: string
    currency: string
    view_chart: string;
    companyname: string;
    industry: string;
    exchange: string;
    closeyest: number;
    priceopen: number;
    tradetime: Text;
    low: number;
    high: number;
    volume: number;
    volumeavg: number;
    volumespike: number;
    month_high: number;
    month_low: number;
    high52: number;
    low52: number;
    marketcap: number; 
    eps: number;
    pe: number;
    shares: number;
    chart: string;
  }
  
  export interface SectorGroup {
    name: string
    stocks: Stock[]
  }
  
  