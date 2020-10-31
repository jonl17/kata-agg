const rdnNum = (limit: number) => {
  return Math.floor(Math.random() * limit)
}

export const generateRandomPixels = (
  limit: number,
  length: number,
  setFixed: boolean
) => {
  let pixels = []
  for (let i = 0; i < length; i++) {
    pixels.push(rdnNum(limit))
  }
  if (setFixed && length > 1) {
    pixels[pixels.length - 1] = -100
  }
  return pixels
}

export const getRandomCords = (
  limit: { x: number; y: number },
  fixed: boolean
) => {
  return { x: rdnNum(limit.x), y: rdnNum(fixed ? -100 : limit.y) }
}
