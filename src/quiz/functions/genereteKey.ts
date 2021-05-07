export function generateKey() {
  const firstRandomNumbers = (Math.random() * 46656) | 0
  const secondRandomNumbers = (Math.random() * 46656) | 0
  const firstPart = ('000' + firstRandomNumbers.toString(36)).slice(-3)
  const secondPart = ('000' + secondRandomNumbers.toString(36)).slice(-3)

  return firstPart + secondPart
}
