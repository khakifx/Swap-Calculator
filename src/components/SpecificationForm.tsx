import React from 'react';
import { SpecificationInputs, SymbolData } from '../types';
import { Sliders, DollarSign, Calendar, Layers, Hash, Info, Moon } from 'lucide-react';

interface SpecificationFormProps {
  inputs: SpecificationInputs;
  symbolData: SymbolData;
  onChange: (inputs: SpecificationInputs) => void;
  onResetSymbolDefaults: () => void;
}

export const SpecificationForm: React.FC<SpecificationFormProps> = ({
  inputs,
  symbolData,
  onChange,
  onResetSymbolDefaults,
}) => {
  const handleNumberChange = (field: keyof SpecificationInputs, value: string) => {
    const num = parseFloat(value);
    onChange({
      ...inputs,
      [field]: isNaN(num) ? 0 : num,
    });
  };

  const lotPresets = [0.01, 0.1, 0.5, 1, 2, 5, 10];
  const dayPresets = [1, 2, 3, 5, 7, 30];

  const isQuoteUsd = symbolData.quoteCurrency === 'USD';

  return (
    <div className="bg-[#2D0C3C]/40 backdrop-blur-xl border border-[#55197C]/60 rounded-2xl p-5 sm:p-7 shadow-xl space-y-6">
      
      {/* Title & Operator Info Header */}
      <div className="flex items-center justify-between border-b border-[#55197C]/40 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#55197C] flex items-center justify-center text-[#E6E2E8]">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#E6E2E8]">
              ورودی‌های مشخصات نماد (Specification)
            </h2>
            <p className="text-xs text-[#B3A0BB]">
              اطلاعات استاندارد بروکری بارگذاری شده؛ مقادیر توسط اپراتور قابل بازنویسی و تغییر است.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onResetSymbolDefaults}
          className="text-xs text-[#B3A0BB] hover:text-[#E6E2E8] bg-[#120518]/70 hover:bg-[#55197C]/50 px-3 py-1.5 rounded-lg border border-[#55197C]/40 transition-colors"
          title="بازنشانی فیلدهای این نماد به مقادیر پایه متاتریدر"
        >
          پیش‌فرض نماد
        </button>
      </div>

      {/* Grid of Specification Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {/* Contract Size */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-[#B3A0BB] flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#55197C]" />
              اندازه قرارداد (Contract Size)
            </span>
            <span className="text-[10px] text-[#B3A0BB]/60 font-mono">واحد در لات</span>
          </label>
          <div className="relative">
            <input
              type="number"
              step="any"
              value={inputs.contractSize || ''}
              onChange={(e) => handleNumberChange('contractSize', e.target.value)}
              className="w-full h-11 px-3.5 bg-[#120518]/90 text-[#E6E2E8] font-mono font-medium rounded-xl border border-[#55197C]/60 focus:border-[#B3A0BB] focus:ring-1 focus:ring-[#B3A0BB] focus:outline-none transition-colors"
              placeholder="مثلاً 100000 یا 100 یا 1"
            />
          </div>
          <span className="text-[10px] text-[#B3A0BB]/70 block">
            فارکس ۱۰۰,۰۰۰ | طلا ۱۰۰ | کریپتو/شاخص ۱
          </span>
        </div>

        {/* Digits & Point */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-[#B3A0BB] flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-[#55197C]" />
              ارقام اعشار (Digits) و پوینت
            </span>
            <span className="text-[10px] text-[#B3A0BB]/60 font-mono">Point: {inputs.point}</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              min="0"
              max="8"
              value={inputs.digits}
              onChange={(e) => {
                const digitsVal = parseInt(e.target.value, 10) || 0;
                onChange({
                  ...inputs,
                  digits: digitsVal,
                  point: parseFloat(Math.pow(10, -digitsVal).toFixed(digitsVal)),
                });
              }}
              className="h-11 px-3 bg-[#120518]/90 text-[#E6E2E8] font-mono text-center rounded-xl border border-[#55197C]/60 focus:border-[#B3A0BB] focus:outline-none"
              placeholder="Digits"
            />
            <input
              type="number"
              step="any"
              value={inputs.point || ''}
              onChange={(e) => handleNumberChange('point', e.target.value)}
              className="h-11 px-3 bg-[#120518]/90 text-[#E6E2E8] font-mono text-center rounded-xl border border-[#55197C]/60 focus:border-[#B3A0BB] focus:outline-none"
              placeholder="Point"
            />
          </div>
          <span className="text-[10px] text-[#B3A0BB]/70 block">
            مثال: اعشار ۵ = پوینت ۰.۰۰۰۰۱
          </span>
        </div>

        {/* Quote to USD Rate */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-[#B3A0BB] flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-[#55197C]" />
              نرخ ارز مظنه به دلار ({symbolData.quoteCurrency} → USD)
            </span>
            {isQuoteUsd && (
              <span className="text-[10px] text-[#31B07A] font-semibold">مظنه دلار (= ۱)</span>
            )}
          </label>
          <div className="relative">
            <input
              type="number"
              step="any"
              value={inputs.quoteToUsdRate || ''}
              onChange={(e) => handleNumberChange('quoteToUsdRate', e.target.value)}
              disabled={isQuoteUsd}
              className={`w-full h-11 px-3.5 bg-[#120518]/90 text-[#E6E2E8] font-mono font-medium rounded-xl border border-[#55197C]/60 focus:border-[#B3A0BB] focus:outline-none transition-colors ${
                isQuoteUsd ? 'opacity-60 cursor-not-allowed bg-[#120518]/40' : ''
              }`}
              placeholder="1.0000"
            />
          </div>
          <span className="text-[10px] text-[#B3A0BB]/70 block">
            {isQuoteUsd
              ? 'ارز مظنه این نماد خود دلار آمریکا است.'
              : `ارزش ۱ واحد ${symbolData.quoteCurrency} به دلار آمریکا`}
          </span>
        </div>

        {/* Swap Long (Points) */}
        <div className="space-y-1.5 p-3 rounded-xl bg-gradient-to-b from-[#120518]/80 to-[#2D0C3C]/30 border border-[#55197C]/40">
          <label className="text-xs font-semibold text-[#E6E2E8] flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-[#31B07A]"></span>
              سواپ خرید (Swap Long به پوینت)
            </span>
            <span className="text-[10px] text-[#B3A0BB]">بروکر / اسپک</span>
          </label>
          <input
            type="number"
            step="any"
            value={inputs.swapLongPoints === 0 ? '0' : inputs.swapLongPoints || ''}
            onChange={(e) => handleNumberChange('swapLongPoints', e.target.value)}
            className="w-full h-11 px-3.5 bg-[#120518] text-emerald-300 font-mono font-bold text-base rounded-xl border border-emerald-500/30 focus:border-emerald-400 focus:outline-none"
            placeholder="مثلاً -12.4 یا 5.2"
          />
          <span className="text-[10px] text-[#B3A0BB]/80 block">
            عدد منفی به معنای کسر هزینه و عدد مثبت به معنای دریافت سود است.
          </span>
        </div>

        {/* Swap Short (Points) */}
        <div className="space-y-1.5 p-3 rounded-xl bg-gradient-to-b from-[#120518]/80 to-[#2D0C3C]/30 border border-[#55197C]/40">
          <label className="text-xs font-semibold text-[#E6E2E8] flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-rose-400">
              <span className="w-2 h-2 rounded-full bg-[#D6494A]"></span>
              سواپ فروش (Swap Short به پوینت)
            </span>
            <span className="text-[10px] text-[#B3A0BB]">بروکر / اسپک</span>
          </label>
          <input
            type="number"
            step="any"
            value={inputs.swapShortPoints === 0 ? '0' : inputs.swapShortPoints || ''}
            onChange={(e) => handleNumberChange('swapShortPoints', e.target.value)}
            className="w-full h-11 px-3.5 bg-[#120518] text-rose-300 font-mono font-bold text-base rounded-xl border border-rose-500/30 focus:border-rose-400 focus:outline-none"
            placeholder="مثلاً -8.5 یا 3.1"
          />
          <span className="text-[10px] text-[#B3A0BB]/80 block">
            مقدار سواپ پوزشن فروش از پنجره Specification متاتریدر.
          </span>
        </div>

        {/* Lots Volume */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-[#B3A0BB] flex items-center justify-between">
            <span>حجم معامله (Lots)</span>
            <span className="text-[10px] font-mono text-[#E6E2E8] font-bold">{inputs.lots} لات</span>
          </label>
          <input
            type="number"
            step="0.01"
            min="0.01"
            value={inputs.lots || ''}
            onChange={(e) => handleNumberChange('lots', e.target.value)}
            className="w-full h-11 px-3.5 bg-[#120518]/90 text-[#E6E2E8] font-mono font-bold text-base rounded-xl border border-[#55197C]/60 focus:border-[#B3A0BB] focus:outline-none"
            placeholder="1.00"
          />
          {/* Lot Quick Select Presets */}
          <div className="flex items-center gap-1 pt-1 overflow-x-auto scrollbar-none">
            {lotPresets.map((lot) => (
              <button
                key={lot}
                type="button"
                onClick={() => onChange({ ...inputs, lots: lot })}
                className={`px-2 py-0.5 text-[10px] font-mono rounded-md border transition-all ${
                  inputs.lots === lot
                    ? 'bg-[#55197C] text-white border-[#B3A0BB]/40 font-bold'
                    : 'bg-[#120518]/60 text-[#B3A0BB] border-[#55197C]/30 hover:border-[#55197C]'
                }`}
              >
                {lot}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Nights / Holding Days & Triple Swap Settings */}
      <div className="pt-4 border-t border-[#55197C]/40 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        
        {/* Holding Days */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-[#B3A0BB] flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#55197C]" />
              مدت زمان نگهداری معامله (تعداد شب‌ها)
            </span>
            <span className="text-[10px] font-mono text-[#E6E2E8] font-bold">{inputs.holdingDays} شب</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              max="365"
              value={inputs.holdingDays || ''}
              onChange={(e) => handleNumberChange('holdingDays', e.target.value)}
              className="w-28 h-10 px-3 bg-[#120518]/90 text-[#E6E2E8] font-mono font-bold text-center rounded-xl border border-[#55197C]/60 focus:border-[#B3A0BB] focus:outline-none"
            />
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none flex-1">
              {dayPresets.map((days) => (
                <button
                  key={days}
                  type="button"
                  onClick={() => onChange({ ...inputs, holdingDays: days })}
                  className={`px-2.5 py-1.5 text-xs font-mono rounded-lg border transition-all ${
                    inputs.holdingDays === days
                      ? 'bg-[#55197C] text-white border-[#B3A0BB]/40 font-bold'
                      : 'bg-[#120518]/60 text-[#B3A0BB] border-[#55197C]/30 hover:border-[#55197C]'
                  }`}
                >
                  {days} {days === 1 ? 'شب' : 'روز'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Triple Swap Switch */}
        <div className="flex items-center justify-between p-3.5 bg-[#120518]/60 rounded-xl border border-[#55197C]/40">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
              inputs.isTripleSwap ? 'bg-[#55197C] text-[#F1CB5B]' : 'bg-[#2D0C3C]/60 text-[#B3A0BB]'
            }`}>
              <Moon className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#E6E2E8] block">
                محاسبه سواپ سه‌برابر (Triple Swap)
              </span>
              <span className="text-[10px] text-[#B3A0BB]">
                رول‌اور چهارشنبه/جمعه (معادل ۳ شب سواپ)
              </span>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={inputs.isTripleSwap}
              onChange={(e) => onChange({ ...inputs, isTripleSwap: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-[#2D0C3C] peer-focus:outline-none rounded-full peer peer-checked:bg-[#55197C] relative transition-colors">
              <span className={`absolute top-[2px] w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                inputs.isTripleSwap ? '-translate-x-5' : 'right-[2px]'
              }`}></span>
            </div>
          </label>
        </div>

      </div>

    </div>
  );
};
