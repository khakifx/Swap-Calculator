import React from 'react';
import { CalculationResult, SpecificationInputs, SymbolData } from '../types';
import { BookOpen, HelpCircle } from 'lucide-react';

interface FormulaBreakdownProps {
  inputs: SpecificationInputs;
  symbolData: SymbolData;
  result: CalculationResult;
}

export const FormulaBreakdown: React.FC<FormulaBreakdownProps> = ({
  inputs,
  symbolData,
  result,
}) => {
  const isDirectQuote = symbolData.quoteCurrency === 'USD';

  return (
    <div className="bg-[#1B0724]/70 border border-[#55197C]/50 rounded-2xl p-5 shadow-lg space-y-4">
      <div className="flex items-center gap-2 border-b border-[#55197C]/40 pb-3">
        <BookOpen className="w-4 h-4 text-[#B3A0BB]" />
        <h4 className="text-xs font-bold text-[#E6E2E8]">
          فرمول رسمی محاسبه متاتریدر (MetaTrader Swap in Points Specification)
        </h4>
      </div>

      <div className="space-y-2 text-xs text-[#B3A0BB] leading-relaxed">
        <p>
          در پلتفرم‌های متاتریدر ۴ و متاتریدر ۵، هنگامی که نوع سواپ در بخش مشخصات نماد معادل{' '}
          <strong className="text-white">«in Points»</strong> باشد، فرمول دقیق تبدیل پوینت به دلار به شرح زیر است:
        </p>

        {/* Formula Box */}
        <div dir="ltr" className="p-3.5 rounded-xl bg-[#120518] border border-[#55197C]/60 font-mono text-[11px] sm:text-xs text-white space-y-1 text-center">
          <div className="text-[#31B07A]">
            Nightly Swap (USD) = Swap(Points) × PointSize × ContractSize × Lots × (Quote → USD)
          </div>
          <div className="text-[10px] text-[#B3A0BB]">
            Total Swap (USD) = Nightly Swap × (Nights + Triple Swap Days)
          </div>
        </div>

        {/* Numerical breakdown with current inputs */}
        <div className="pt-2">
          <div className="text-[11px] font-semibold text-[#E6E2E8] mb-1">
            جای‌گذاری اعداد نماد فعلی ({inputs.symbol}):
          </div>
          <div dir="ltr" className="font-mono text-[11px] p-3 rounded-lg bg-[#2D0C3C]/40 border border-[#55197C]/30 text-white space-y-1.5 text-left">
            <div>
              <span className="text-emerald-400 font-bold">LONG:</span>{' '}
              {inputs.swapLongPoints} × {inputs.point} × {inputs.contractSize.toLocaleString()} × {inputs.lots}
              {!isDirectQuote ? ` × ${inputs.quoteToUsdRate}` : ''} ={' '}
              <span className="font-bold text-emerald-300">${result.swapLongUsd.toFixed(2)} USD / night</span>
            </div>
            <div>
              <span className="text-rose-400 font-bold">SHORT:</span>{' '}
              {inputs.swapShortPoints} × {inputs.point} × {inputs.contractSize.toLocaleString()} × {inputs.lots}
              {!isDirectQuote ? ` × ${inputs.quoteToUsdRate}` : ''} ={' '}
              <span className="font-bold text-rose-300">${result.swapShortUsd.toFixed(2)} USD / night</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
