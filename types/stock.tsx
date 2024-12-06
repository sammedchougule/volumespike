export interface Stock {
    symbol: string
    price: number
    chg_rs: number
    chg_percentage: number
    marketCap: number
    sector: string
    subsector?: string
    logo?: string
    view_chart: string;
    website_link: string;
    stock_name: string;
    industry: string;
    exchange: string;
    close_yest: number;
    price_open: number;
    low: number;
    high: number;
    volume: number;
    avg_volume: number;
    volume_spike: number;
    month_high: number;
    month_low: number;
    month_hl_cross: string;
    year_high: number;
    year_low: number;
    year_hl_cross: string;
    marketcap: number; // Market cap might need formatting (e.g., with "B" or "M")
    eps: number; // Earnings per share
  }
  
  export interface SectorGroup {
    name: string
    stocks: Stock[]
  }
  
  