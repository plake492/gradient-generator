/**
 * Converts a hex color to HSL format.
 *
 * @param {string} hex - The hex color to convert. This should start with a '#' and be followed by 6 or 8 hex digits.
 *
 * @returns {string} The color in HSL or HSLA format.
 */
export const convertHexToHsl = (hex: string): string => {
  let r = 0,
    g = 0,
    b = 0,
    a = 1

  // 3 digits
  if (hex.length == 4) {
    r = "0x" + hex[1] + hex[1]
    g = "0x" + hex[2] + hex[2]
    b = "0x" + hex[3] + hex[3]
  }
  // 6 digits
  else if (hex.length == 7) {
    r = "0x" + hex[1] + hex[2]
    g = "0x" + hex[3] + hex[4]
    b = "0x" + hex[5] + hex[6]
  }
  // 4 digits
  else if (hex.length == 5) {
    r = "0x" + hex[1] + hex[1]
    g = "0x" + hex[2] + hex[2]
    b = "0x" + hex[3] + hex[3]
    console.log(
      'parseInt("0x" + hex[4] + hex[4], 16) ==>',
      parseInt("0x" + hex[4] + hex[4], 16),
    )

    a = (parseInt("0x" + hex[4] + hex[4], 16) / 255).toFixed(2)
  }
  // 8 digits
  else if (hex.length == 9) {
    r = "0x" + hex[1] + hex[2]
    g = "0x" + hex[3] + hex[4]
    b = "0x" + hex[5] + hex[6]
    a = (parseInt("0x" + hex[7] + hex[8], 16) / 255).toFixed(2)
  }
  // Make r, g, and b fractions of 1
  r /= 255
  g /= 255
  b /= 255

  // Find greatest and smallest channel values
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b)
  let h = 0,
    s = 0,
    l = (max + min) / 2

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

  console.log("a ==>", a)

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
  let [h, s, l, a = 1] = hsla
    .match(/\d+(\.\d+)?/g)
    .map((v, i) => (i < 3 ? parseInt(v) : parseFloat(v)))

  l /= 100
  const a_s = (s * Math.min(l, 1 - l)) / 100
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l - a_s * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0") // Convert to Hex and ensure 2 digits
  }
  return `#${f(0)}${f(8)}${f(4)}${Math.round(255 * a)
    .toString(16)
    .padStart(2, "0")}`
}
