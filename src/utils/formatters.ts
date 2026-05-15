export function formatPromille(value: number): string {
  return value.toFixed(2)
}

export function formatPrice(rsd: number): string {
  return rsd.toLocaleString('sr-RS') + ' RSD'
}

export function generateOrderId(): string {
  const ts = Date.now().toString(36).toUpperCase()
  const rand = Math.random().toString(36).substring(2, 5).toUpperCase()
  return `SR-${ts}-${rand}`
}
