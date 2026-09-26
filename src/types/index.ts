export interface SymbolData {
  symbol: string;
  name: string;
  category: 'crypto' | 'indices' | 'forex' | 'metals';
  contractSize: number;
  digits: number;
  point: number;
  defaultSwapLongPoints: number;
  defaultSwapShortPoints: number;
  quoteCurrency: string;
  baseCurrency: string;
  defaultQuoteToUsd: number;
  description?: string;
}

export interface SpecificationInputs {
  symbol: string;
  contractSize: number;
  digits: number;
  point: number;
  swapLongPoints: number;
  swapShortPoints: number;
  quoteToUsdRate: number;
  lots: number;
  holdingDays: number;
  isTripleSwap: boolean;
}

export interface CalculationResult {
  swapLongUsd: number;
  swapShortUsd: number;
  pointValueUsd: number;
  pipValueUsd: number;
  totalSwapLongUsd: number;
  totalSwapShortUsd: number;
  formulaDescriptionLong: string;
  formulaDescriptionShort: string;
}
