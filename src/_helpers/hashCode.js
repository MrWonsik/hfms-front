export const hashCode = (string) => {
  let h = 0
  for (let i = 0; i < string.length; i++) { h = Math.imul(31, h) + string.charCodeAt(i) | 0 }

  return h
}
