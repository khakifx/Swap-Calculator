import React, { useState, useRef, useEffect } from 'react';
import { SymbolData } from '../types';
import { Search, ChevronDown, Check, Coins, TrendingUp, DollarSign, Gem } from 'lucide-react';

interface SymbolSelectorProps {
  symbols: SymbolData[];
  selectedSymbol: string;
  onSelectSymbol: (symbol: string) => void;
}

export const SymbolSelector: React.FC<SymbolSelectorProps> = ({
  symbols,
  selectedSymbol,
  onSelectSymbol,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'crypto' | 'indices' | 'forex' | 'metals'>('all');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentSymbol = symbols.find((s) => s.symbol === selectedSymbol) || symbols[0];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredSymbols = symbols.filter((s) => {
    const matchesSearch =
      s.symbol.toLowerCase().includes(search.toLowerCase()) ||
      s.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCategory === 'all' || s.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'crypto':
        return <Coins className="w-3.5 h-3.5 text-[#F1CB5B]" />;
      case 'indices':
        return <TrendingUp className="w-3.5 h-3.5 text-[#31B07A]" />;
      case 'forex':
        return <DollarSign className="w-3.5 h-3.5 text-[#B3A0BB]" />;
      case 'metals':
        return <Gem className="w-3.5 h-3.5 text-[#F1CB5B]" />;
      default:
        return null;
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'crypto':
        return { label: 'کریپتو', color: 'bg-amber-500/15 text-amber-300 border-amber-500/30' };
      case 'indices':
        return { label: 'شاخص و انرژی', color: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' };
      case 'forex':
        return { label: 'فارکس', color: 'bg-purple-500/15 text-purple-300 border-purple-500/30' };
      case 'metals':
        return { label: 'فلزات', color: 'bg-yellow-500/15 text-yellow-300 border-yellow-500/30' };
      default:
        return { label: category, color: 'bg-[#55197C]/30 text-[#E6E2E8] border-[#B3A0BB]/20' };
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label className="block text-xs font-semibold text-[#B3A0BB] mb-2 tracking-wide flex items-center justify-between">
        <span>انتخاب نماد معاملاتی (Symbol)</span>
        <span className="text-[11px] font-mono text-[#B3A0BB]/70">تعداد کل: {symbols.length} نماد</span>
      </label>

      {/* Main Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-14 px-4 bg-gradient-to-r from-[#2D0C3C] to-[#1B0724] border border-[#55197C] hover:border-[#B3A0BB]/60 rounded-xl flex items-center justify-between transition-all duration-200 shadow-md group focus:outline-none focus:ring-2 focus:ring-[#55197C]"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#55197C]/50 flex items-center justify-center border border-[#B3A0BB]/20 group-hover:scale-105 transition-transform">
            {getCategoryIcon(currentSymbol.category)}
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-base text-[#E6E2E8] tracking-wider">
                {currentSymbol.symbol}
              </span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${
                  getCategoryBadge(currentSymbol.category).color
                }`}
              >
                {getCategoryBadge(currentSymbol.category).label}
              </span>
            </div>
            <p className="text-xs text-[#B3A0BB]/80 truncate max-w-[200px] sm:max-w-[320px]">
              {currentSymbol.name}
            </p>
          </div>
        </div>

        <ChevronDown
          className={`w-5 h-5 text-[#B3A0BB] transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#E6E2E8]' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-[#1B0724] border border-[#55197C] rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-xl animate-in fade-in-50 zoom-in-95 duration-150">
          
          {/* Search Box */}
          <div className="p-3 border-b border-[#55197C]/40 bg-[#2D0C3C]/60">
            <div className="relative">
              <Search className="w-4 h-4 text-[#B3A0BB] absolute right-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="جستجوی نام یا نماد معاملاتی (مثلاً XAUUSD, BTC, US30, EURUSD)..."
                autoFocus
                className="w-full h-10 pr-9 pl-4 bg-[#120518] text-[#E6E2E8] placeholder-[#B3A0BB]/50 text-xs rounded-lg border border-[#55197C]/70 focus:outline-none focus:border-[#B3A0BB]"
              />
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 mt-2.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
              {[
                { id: 'all', label: 'همه' },
                { id: 'crypto', label: 'کریپتو (۳۱)' },
                { id: 'indices', label: 'شاخص و نفت (۱۶)' },
                { id: 'forex', label: 'فارکس (۲۹)' },
                { id: 'metals', label: 'فلزات (۴)' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as any)}
                  className={`px-3 py-1 rounded-md transition-all whitespace-nowrap font-medium ${
                    activeCategory === tab.id
                      ? 'bg-[#55197C] text-white shadow-sm font-semibold'
                      : 'bg-[#120518]/60 text-[#B3A0BB] hover:text-[#E6E2E8] hover:bg-[#2D0C3C]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Symbol Items List */}
          <div className="max-h-80 overflow-y-auto p-1.5 divide-y divide-[#55197C]/15">
            {filteredSymbols.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#B3A0BB]">
                نمادی با این عنوان یافت نشد.
              </div>
            ) : (
              filteredSymbols.map((item) => {
                const isSelected = item.symbol === selectedSymbol;
                const badge = getCategoryBadge(item.category);
                return (
                  <button
                    key={item.symbol}
                    type="button"
                    onClick={() => {
                      onSelectSymbol(item.symbol);
                      setIsOpen(false);
                      setSearch('');
                    }}
                    className={`w-full px-3 py-2.5 rounded-xl flex items-center justify-between text-right transition-colors ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#55197C]/80 to-[#2D0C3C] text-white border border-[#B3A0BB]/40'
                        : 'hover:bg-[#2D0C3C]/80 text-[#E6E2E8]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#120518] flex items-center justify-center border border-[#55197C]/50">
                        {getCategoryIcon(item.category)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm tracking-wide">
                            {item.symbol}
                          </span>
                          <span
                            className={`text-[9px] px-1.5 py-0.2 rounded border font-medium ${badge.color}`}
                          >
                            {badge.label}
                          </span>
                        </div>
                        <span className="text-[11px] text-[#B3A0BB] block mt-0.5">
                          {item.name}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-left font-mono text-[11px] text-[#B3A0BB] hidden sm:block">
                        <div>Point: {item.point}</div>
                        <div className="text-[10px] text-[#B3A0BB]/60">Lot: {item.contractSize.toLocaleString()}</div>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-[#31B07A] flex items-center justify-center text-white">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
