/**
 * Converts a hex color to HSL format.
 *
 * @param {string} hex - The hex color to convert. This should start with a '#' and be followed by 6 or 8 hex digits.
 *
 * @returns {string} The color in HSL or HSLA format.
 */
export const convertHexToHsl = (hex: string): string => {
  let r: number = 0,
    g: number = 0,
    b: number = 0,
    a: number = 1

  // 3 digits
  if (hex.length == 4) {
    r = parseInt("0x" + hex[1] + hex[1])
    g = parseInt("0x" + hex[2] + hex[2])
    b = parseInt("0x" + hex[3] + hex[3])
  }
  // 6 digits
  else if (hex.length == 7) {
    r = parseInt("0x" + hex[1] + hex[2])
    g = parseInt("0x" + hex[3] + hex[4])
    b = parseInt("0x" + hex[5] + hex[6])
  }
  // 4 digits
  else if (hex.length == 5) {
    r = parseInt("0x" + hex[1] + hex[1])
    g = parseInt("0x" + hex[2] + hex[2])
    b = parseInt("0x" + hex[3] + hex[3])

    a = parseInt("0x" + hex[4] + hex[4]) / 255
  }
  // 8 digits
  else if (hex.length == 9) {
    r = parseInt("0x" + hex[1] + hex[2])
    g = parseInt("0x" + hex[3] + hex[4])
    b = parseInt("0x" + hex[5] + hex[6])
    a = parseInt("0x" + hex[7] + hex[8]) / 255
  }
  // Make r, g, and b fractions of 1
  r /= 255
  g /= 255
  b /= 255

  // Find greatest and smallest channel values
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b)
  let h = 0,
    s = 0
  const l = (max + min) / 2

  if (max != min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }

    h /= 6
  }

  return `hsla(${(h * 360).toFixed(0)}, ${(s * 100).toFixed(0)}%, ${(
    l * 100
  ).toFixed(0)}%, ${a})`
}

/**
 * Converts an HSLA color to a hex color.
 *
 * @param {string} hsla - The HSLA color to convert. This should be in the format 'hsla(h, s%, l%, a)'.
 *
 * @returns {string} The color in hex format.
 */
export const convertHslToHex = (hsla: string): string => {
  // Extract the HSLA values from the input string
  const [h, s, l, a = 1] = hsla
    .match(/\d+(\.\d+)?/g)!
    .map((v, i) => (i < 3 ? parseInt(v, 10) : parseFloat(v)))

  const lightness = l / 100
  const saturation = (s * Math.min(lightness, 1 - lightness)) / 100
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color =
      lightness - saturation * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0") // Convert to Hex and ensure 2 digits
  }
  return `#${f(0)}${f(8)}${f(4)}${Math.round(255 * a)
    .toString(16)
    .padStart(2, "0")}`
}
