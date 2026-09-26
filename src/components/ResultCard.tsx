import React from 'react';
import { CalculationResult, SpecificationInputs, SymbolData } from '../types';
import { TrendingUp, TrendingDown, DollarSign, ArrowUpRight, ArrowDownRight, Layers, Sparkles } from 'lucide-react';

interface ResultCardProps {
  result: CalculationResult;
  inputs: SpecificationInputs;
  symbolData: SymbolData;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  result,
  inputs,
  symbolData,
}) => {
  const isLongProfit = result.totalSwapLongUsd > 0;
  const isShortProfit = result.totalSwapShortUsd > 0;

  return (
    <div className="space-y-5">
      
      {/* Top Main Result: Long & Short Swap USD */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* BUY / LONG SWAP */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#2D0C3C]/80 to-[#120518] border border-[#55197C]/80 p-6 shadow-xl group hover:border-[#31B07A]/50 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-[#31B07A] flex items-center justify-center font-bold">
                <ArrowUpRight className="w-5 h-5" />
              </span>
              <div>
                <span className="text-xs font-semibold text-[#B3A0BB] uppercase tracking-wider block">
                  موقعیت خرید
                </span>
                <h3 className="text-lg font-bold text-white">SWAP LONG</h3>
              </div>
            </div>

            <div className={`px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 ${
              isLongProfit 
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
            }`}>
              {isLongProfit ? (
                <>
                  <TrendingUp className="w-3 h-3 text-[#31B07A]" />
                  <span>دریافت سود شبانه</span>
                </>
              ) : (
                <>
                  <TrendingDown className="w-3 h-3 text-[#D6494A]" />
                  <span>کسر هزینه شبانه</span>
                </>
              )}
            </div>
          </div>

          {/* Dollar Amount Display */}
          <div className="my-5 p-4 rounded-xl bg-[#120518]/80 border border-[#55197C]/40 text-center">
            <span className="text-xs text-[#B3A0BB] block mb-1">
              مجموع سواپ خرید برای {inputs.lots} لات ({inputs.holdingDays} شب {inputs.isTripleSwap ? '+ سه‌برابر' : ''})
            </span>
            <div dir="ltr" className="flex items-center justify-center gap-1.5">
              <span className={`font-mono text-3xl sm:text-4xl font-extrabold tracking-tight ${
                isLongProfit ? 'text-[#31B07A]' : 'text-rose-400'
              }`}>
                {result.totalSwapLongUsd >= 0 ? '+' : ''}
                {result.totalSwapLongUsd.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              <span className="text-base font-bold text-[#B3A0BB]">USD</span>
            </div>
          </div>

          {/* Details breakdown */}
          <div className="grid grid-cols-2 gap-2 text-xs border-t border-[#55197C]/30 pt-3">
            <div>
              <span className="text-[#B3A0BB] block text-[11px]">سواپ هر شب:</span>
              <span className="font-mono font-bold text-white text-sm">
                ${result.swapLongUsd.toFixed(2)} USD
              </span>
            </div>
            <div className="text-left">
              <span className="text-[#B3A0BB] block text-[11px]">سواپ پوینت بروکر:</span>
              <span className="font-mono font-medium text-emerald-400">
                {inputs.swapLongPoints} pts
              </span>
            </div>
          </div>
        </div>

        {/* SELL / SHORT SWAP */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#2D0C3C]/80 to-[#120518] border border-[#55197C]/80 p-6 shadow-xl group hover:border-[#D6494A]/50 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-rose-500/20 text-[#D6494A] flex items-center justify-center font-bold">
                <ArrowDownRight className="w-5 h-5" />
              </span>
              <div>
                <span className="text-xs font-semibold text-[#B3A0BB] uppercase tracking-wider block">
                  موقعیت فروش
                </span>
                <h3 className="text-lg font-bold text-white">SWAP SHORT</h3>
              </div>
            </div>

            <div className={`px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 ${
              isShortProfit 
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
            }`}>
              {isShortProfit ? (
                <>
                  <TrendingUp className="w-3 h-3 text-[#31B07A]" />
                  <span>دریافت سود شبانه</span>
                </>
              ) : (
                <>
                  <TrendingDown className="w-3 h-3 text-[#D6494A]" />
                  <span>کسر هزینه شبانه</span>
                </>
              )}
            </div>
          </div>

          {/* Dollar Amount Display */}
          <div className="my-5 p-4 rounded-xl bg-[#120518]/80 border border-[#55197C]/40 text-center">
            <span className="text-xs text-[#B3A0BB] block mb-1">
              مجموع سواپ فروش برای {inputs.lots} لات ({inputs.holdingDays} شب {inputs.isTripleSwap ? '+ سه‌برابر' : ''})
            </span>
            <div dir="ltr" className="flex items-center justify-center gap-1.5">
              <span className={`font-mono text-3xl sm:text-4xl font-extrabold tracking-tight ${
                isShortProfit ? 'text-[#31B07A]' : 'text-rose-400'
              }`}>
                {result.totalSwapShortUsd >= 0 ? '+' : ''}
                {result.totalSwapShortUsd.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              <span className="text-base font-bold text-[#B3A0BB]">USD</span>
            </div>
          </div>

          {/* Details breakdown */}
          <div className="grid grid-cols-2 gap-2 text-xs border-t border-[#55197C]/30 pt-3">
            <div>
              <span className="text-[#B3A0BB] block text-[11px]">سواپ هر شب:</span>
              <span className="font-mono font-bold text-white text-sm">
                ${result.swapShortUsd.toFixed(2)} USD
              </span>
            </div>
            <div className="text-left">
              <span className="text-[#B3A0BB] block text-[11px]">سواپ پوینت بروکر:</span>
              <span className="font-mono font-medium text-rose-400">
                {inputs.swapShortPoints} pts
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Secondary Metrics Bar: Point Value & Pip Value */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        
        {/* Point Value */}
        <div className="p-3.5 rounded-xl bg-[#2D0C3C]/30 border border-[#55197C]/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#55197C]/50 flex items-center justify-center text-[#B3A0BB]">
              <DollarSign className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-[10px] text-[#B3A0BB] block">ارزش هر پوینت ({inputs.lots} لات)</span>
              <span className="font-mono font-bold text-sm text-[#E6E2E8]">
                ${result.pointValueUsd.toFixed(4)} USD
              </span>
            </div>
          </div>
        </div>

        {/* Pip Value */}
        <div className="p-3.5 rounded-xl bg-[#2D0C3C]/30 border border-[#55197C]/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#55197C]/50 flex items-center justify-center text-[#F1CB5B]">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-[10px] text-[#B3A0BB] block">ارزش هر پیپ (۱۰ پوینت)</span>
              <span className="font-mono font-bold text-sm text-[#F1CB5B]">
                ${result.pipValueUsd.toFixed(3)} USD
              </span>
            </div>
          </div>
        </div>

        {/* 1 Lot Point Value */}
        <div className="p-3.5 rounded-xl bg-[#2D0C3C]/30 border border-[#55197C]/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#55197C]/50 flex items-center justify-center text-[#B3A0BB]">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-[10px] text-[#B3A0BB] block">ارزش پوینت برای ۱ لات</span>
              <span className="font-mono font-bold text-sm text-[#E6E2E8]">
                ${(result.pointValueUsd / (inputs.lots || 1)).toFixed(4)} USD
              </span>
            </div>
          </div>
        </div>

        {/* Formula Mode */}
        <div className="p-3.5 rounded-xl bg-[#2D0C3C]/30 border border-[#55197C]/40 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#B3A0BB] block">نحوه محاسبه متاتریدر</span>
            <span className="font-medium text-xs text-[#31B07A]">
              Swap in Points (بروکر متاتریدر)
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
