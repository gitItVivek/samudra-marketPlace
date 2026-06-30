export function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function formatPriceOptional(amount: number, suffix?: string): string {
  const base = formatPrice(amount);
  return suffix ? `${base}${suffix}` : base;
}
