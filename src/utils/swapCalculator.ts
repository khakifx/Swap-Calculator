import { SpecificationInputs, CalculationResult } from '../types';

export function calculateSwap(inputs: SpecificationInputs): CalculationResult {
  const {
    contractSize,
    point,
    swapLongPoints,
    swapShortPoints,
    quoteToUsdRate,
    lots,
    holdingDays,
    isTripleSwap,
  } = inputs;

  const validLots = Math.max(0.001, Number(lots) || 0);
  const validDays = Math.max(1, Number(holdingDays) || 1);
  const validPoint = Math.max(0.00000001, Number(point) || 0.00001);
  const validContract = Math.max(0.0001, Number(contractSize) || 1);
  const validQuoteRate = Math.max(0.00000001, Number(quoteToUsdRate) || 1);

  // 1 Point Value in USD for given volume (lots):
  // Formula: Contract Size * Point Size * Lots * QuoteToUsdRate
  const pointValueUsd = validContract * validPoint * validLots * validQuoteRate;

  // 1 Pip is normally 10 points (for 3/5 digit symbols) or 1 point (for 2/4 digit symbols)
  const pipValueUsd = pointValueUsd * 10;

  // Swap per single night:
  const swapLongUsd = (Number(swapLongPoints) || 0) * pointValueUsd;
  const swapShortUsd = (Number(swapShortPoints) || 0) * pointValueUsd;

  // Effective nights (if triple swap applied, add +2 nights worth of swap)
  const effectiveNights = isTripleSwap ? validDays + 2 : validDays;

  // Total Swap over holding period:
  const totalSwapLongUsd = swapLongUsd * (effectiveNights / 1);
  const totalSwapShortUsd = swapShortUsd * (effectiveNights / 1);

  const formulaDescriptionLong = `${swapLongPoints} × ${validPoint} × ${validContract} × ${validLots} × ${validQuoteRate} = $${swapLongUsd.toFixed(2)}`;
  const formulaDescriptionShort = `${swapShortPoints} × ${validPoint} × ${validContract} × ${validLots} × ${validQuoteRate} = $${swapShortUsd.toFixed(2)}`;

  return {
    swapLongUsd,
    swapShortUsd,
    pointValueUsd,
    pipValueUsd,
    totalSwapLongUsd,
    totalSwapShortUsd,
    formulaDescriptionLong,
    formulaDescriptionShort,
  };
}
