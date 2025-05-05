export function mergeSearchParams(params: Record<string, string | number>) {
  const newSearchParams = new URLSearchParams(window.location.search)
  Object.entries(params).forEach(([key, value]) => newSearchParams.set(key, String(value)))
  return `${window.location.pathname}?${newSearchParams.toString()}`
}
