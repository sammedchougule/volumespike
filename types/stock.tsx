export interface Stock {
    symbol: string
    name: string
    price: number
    chg_rs: number
    chg_percentage: number
    marketCap: number
    sector: string
    subsector?: string
    logo?: string
  }
  
  export interface SectorGroup {
    name: string
    stocks: Stock[]
  }
  
  