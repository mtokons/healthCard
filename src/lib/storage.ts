export function generateCardNumber(): string {
  const chars = '0123456789ABCDEF'
  const segment = () =>
    Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  return `CHC-${segment()}-${segment()}-${segment()}`
}
