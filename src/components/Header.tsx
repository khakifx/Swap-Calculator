import React from 'react';
import { RefreshCw, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onReset }) => {
  return (
    <header className="relative w-full border-b border-[#55197C]/40 bg-[#120518]/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Atropi Brandmark Logo (Geometric Triangle Monogram + Classical Serif Title) */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#55197C] to-[#2D0C3C] p-2 border border-[#B3A0BB]/30 shadow-lg shadow-[#55197C]/30">
            {/* SVG of Atropi triangle monogram based on brandbook */}
            <svg viewBox="0 0 100 100" className="w-8 h-8 fill-current text-[#E6E2E8]">
              {/* Left triangle pillar of "A" */}
              <polygon points="12,86 42,86 28,52" />
              {/* Right angled pillar of "A" */}
              <polygon points="88,86 64,86 36,20 58,20" />
            </svg>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-serif tracking-widest text-2xl font-bold text-[#E6E2E8] uppercase drop-shadow-sm">
                ATROPI
              </span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#55197C]/50 border border-[#B3A0BB]/30 text-[#B3A0BB] tracking-wider">
                FX & CFD
              </span>
            </div>
            <p className="text-xs text-[#B3A0BB] font-medium hidden sm:block">
              ماشین حساب تخصصی محاسبه سواپ معاملاتی (پوینت به دلار)
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5 text-xs text-[#B3A0BB]/80 bg-[#2D0C3C]/40 px-3 py-1.5 rounded-lg border border-[#55197C]/30">
            <ShieldCheck className="w-3.5 h-3.5 text-[#31B07A]" />
            <span>متاتریدر فرمول سازمانی</span>
          </div>

          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-lg bg-[#2D0C3C] hover:bg-[#55197C] text-[#E6E2E8] border border-[#55197C]/60 transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
            title="بازنشانی به مقادیر پیش‌فرض"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#B3A0BB]" />
            <span className="hidden sm:inline">بازنشانی مقادیر</span>
          </button>
        </div>

      </div>
    </header>
  );
};
