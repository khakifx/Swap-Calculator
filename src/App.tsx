import { useState, useMemo, useEffect } from 'react';
import { SYMBOLS_DATABASE, getSymbolByCode } from './data/symbolsData';
import { SpecificationInputs } from './types';
import { calculateSwap } from './utils/swapCalculator';
import { Header } from './components/Header';
import { SymbolSelector } from './components/SymbolSelector';
import { SpecificationForm } from './components/SpecificationForm';
import { ResultCard } from './components/ResultCard';
import { FormulaBreakdown } from './components/FormulaBreakdown';
import { Calculator, CheckCircle2 } from 'lucide-react';

export default function App() {
  // Default symbol: XAUUSD.ecnpro (Gold) or BTCUSD
  const [selectedSymbolCode, setSelectedSymbolCode] = useState<string>('XAUUSD.ecnpro');

  const selectedSymbolData = useMemo(() => {
    return getSymbolByCode(selectedSymbolCode) || SYMBOLS_DATABASE[0];
  }, [selectedSymbolCode]);

  // Operator Inputs State
  const [inputs, setInputs] = useState<SpecificationInputs>({
    symbol: selectedSymbolData.symbol,
    contractSize: selectedSymbolData.contractSize,
    digits: selectedSymbolData.digits,
    point: selectedSymbolData.point,
    swapLongPoints: selectedSymbolData.defaultSwapLongPoints,
    swapShortPoints: selectedSymbolData.defaultSwapShortPoints,
    quoteToUsdRate: selectedSymbolData.defaultQuoteToUsd,
    lots: 1.0,
    holdingDays: 1,
    isTripleSwap: false,
  });

  // When symbol selection changes, update inputs with the new symbol's broker specifications
  const handleSelectSymbol = (newSymbolCode: string) => {
    setSelectedSymbolCode(newSymbolCode);
    const sym = getSymbolByCode(newSymbolCode);
    if (sym) {
      setInputs((prev) => ({
        ...prev,
        symbol: sym.symbol,
        contractSize: sym.contractSize,
        digits: sym.digits,
        point: sym.point,
        swapLongPoints: sym.defaultSwapLongPoints,
        swapShortPoints: sym.defaultSwapShortPoints,
        quoteToUsdRate: sym.defaultQuoteToUsd,
      }));
    }
  };

  // Reset current symbol to its standard defaults
  const handleResetSymbolDefaults = () => {
    setInputs((prev) => ({
      ...prev,
      contractSize: selectedSymbolData.contractSize,
      digits: selectedSymbolData.digits,
      point: selectedSymbolData.point,
      swapLongPoints: selectedSymbolData.defaultSwapLongPoints,
      swapShortPoints: selectedSymbolData.defaultSwapShortPoints,
      quoteToUsdRate: selectedSymbolData.defaultQuoteToUsd,
    }));
  };

  // Reset entire app to initial state
  const handleFullReset = () => {
    setSelectedSymbolCode('XAUUSD.ecnpro');
    const gold = getSymbolByCode('XAUUSD.ecnpro') || SYMBOLS_DATABASE[0];
    setInputs({
      symbol: gold.symbol,
      contractSize: gold.contractSize,
      digits: gold.digits,
      point: gold.point,
      swapLongPoints: gold.defaultSwapLongPoints,
      swapShortPoints: gold.defaultSwapShortPoints,
      quoteToUsdRate: gold.defaultQuoteToUsd,
      lots: 1.0,
      holdingDays: 1,
      isTripleSwap: false,
    });
  };

  // Real-time calculation based on operator inputs
  const calculationResult = useMemo(() => {
    return calculateSwap(inputs);
  }, [inputs]);

  return (
    <div dir="rtl" className="min-h-screen bg-[#120518] text-[#E6E2E8] flex flex-col selection:bg-[#55197C] selection:text-white relative">
      
      {/* Background Atropi Luxury Gradients and Grid Pattern */}
      <div className="fixed inset-0 pointer-events-none atropi-grid-pattern opacity-60 z-0"></div>
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-[#55197C]/15 rounded-full blur-3xl pointer-events-none z-0"></div>
      <div className="fixed bottom-10 right-1/4 w-[30rem] h-[30rem] bg-[#2D0C3C]/30 rounded-full blur-3xl pointer-events-none z-0"></div>

      {/* Main Header */}
      <Header onReset={handleFullReset} />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Intro Banner: Pure Operator Calculator */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#2D0C3C]/80 via-[#1B0724]/90 to-[#120518] border border-[#55197C]/50 p-6 sm:p-7 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono tracking-wider px-2.5 py-0.5 rounded-full bg-[#55197C]/70 text-[#E6E2E8] border border-[#B3A0BB]/30">
                  ATROPI PRO CALCULATOR
                </span>
                <span className="text-xs text-[#31B07A] flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  محاسبه آنی به دلار آمریکا (USD)
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                ماشین حساب تبدیل سواپ از پوینت به دلار
              </h1>
              <p className="text-xs sm:text-sm text-[#B3A0BB] leading-relaxed">
                نماد معاملاتی مدنظر را از منوی کشویی انتخاب کنید؛ مقادیر پنجره Specification نماد بازخوانی شده و آماده محاسبه دقیق سواپ پوزیشن خرید و فروش به دلار است.
              </p>
            </div>

            {/* Quick Summary Pill */}
            <div className="flex items-center gap-4 bg-[#120518]/80 border border-[#55197C]/60 px-5 py-3.5 rounded-xl self-start md:self-auto">
              <div>
                <span className="text-[10px] text-[#B3A0BB] block">نماد انتخابی:</span>
                <span className="font-mono font-bold text-base text-white">{inputs.symbol}</span>
              </div>
              <div className="w-px h-8 bg-[#55197C]/50"></div>
              <div>
                <span className="text-[10px] text-[#B3A0BB] block">حجم:</span>
                <span className="font-mono font-bold text-base text-[#F1CB5B]">{inputs.lots} Lot</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: Dropdown Symbol Selector */}
        <div className="w-full">
          <SymbolSelector
            symbols={SYMBOLS_DATABASE}
            selectedSymbol={selectedSymbolCode}
            onSelectSymbol={handleSelectSymbol}
          />
        </div>

        {/* Section 2: Operator Specification Inputs Form */}
        <div className="w-full">
          <SpecificationForm
            inputs={inputs}
            symbolData={selectedSymbolData}
            onChange={setInputs}
            onResetSymbolDefaults={handleResetSymbolDefaults}
          />
        </div>

        {/* Section 3: Result Cards (Swap Long & Swap Short in USD) */}
        <div className="w-full space-y-4">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-[#55197C]" />
            <h3 className="text-sm font-bold text-[#E6E2E8]">
              نتیجه محاسبه سواپ به دلار آمریکا (USD)
            </h3>
          </div>

          <ResultCard
            result={calculationResult}
            inputs={inputs}
            symbolData={selectedSymbolData}
          />
        </div>

        {/* Section 4: Formula Breakdown & Mathematical Inspection */}
        <div className="w-full">
          <FormulaBreakdown
            inputs={inputs}
            symbolData={selectedSymbolData}
            result={calculationResult}
          />
        </div>

      </main>

      {/* Luxury Atropi Footer */}
      <footer className="relative z-10 border-t border-[#55197C]/30 bg-[#09020C] py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#B3A0BB]">
          <div className="flex items-center gap-3">
            <span className="font-serif tracking-widest text-sm font-bold text-[#E6E2E8]">ATROPI</span>
            <span className="text-[#55197C]">|</span>
            <span>طراحی شده بر اساس استانداردهای برندبوک آتروپی ۲۰۲۶</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>Metatrader 4 / 5 Point Specification</span>
            <span className="text-[#55197C]">|</span>
            <span className="text-[#31B07A]">Atropi.com</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
