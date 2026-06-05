const baseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';

export async function apiFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${path}`);
  }
  return response.json() as Promise<T>;
}
