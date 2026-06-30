export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function parseCityState(input: string): { city: string; state: string } {
  const parts = input.split(',').map((p) => p.trim()).filter(Boolean);
  if (parts.length >= 2) {
    return { city: parts[0], state: parts[parts.length - 1] };
  }
  const city = parts[0] ?? input.trim();
  return { city, state: city };
}

/** Display label for browse city + state (e.g. "Bengaluru, Karnataka"). */
export function formatCityState(city: string, state: string): string {
  const c = city.trim();
  const s = state.trim();
  if (!c) return '';
  if (!s || c.toLowerCase() === s.toLowerCase()) return c;
  return `${c}, ${s}`;
}
