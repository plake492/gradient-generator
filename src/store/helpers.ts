import { v4 as uuid } from "uuid"
import { GradientList, GradientObj, HslaObj, HSLA, CssProps } from "../types"
import { Identifiable, GradientStore } from "../types/store"

const startingColor1 = "hsla(0, 100%, 50%, 0.5)"
const startingColor2 = "hsla(180, 100%, 50%, 0.5)"
const startingColor3 = "hsla(45, 100%, 50%, 1)"
const startingColor4 = "hsla(225, 100%, 50%, 0.1)"

export const defaultGradientList: GradientList = [
  {
    id: uuid(),
    rotate: 0,
    disabled: false,
    locked: false,
    gradient: `linear-gradient(0deg, ${startingColor1}, ${startingColor2})`,
    type: "linear",
    at: "50% 50%",
    radialType: "ellipse",
    radialSize: "farthest-corner",
    radialHue: null,
    colors: [
      {
        id: uuid(),
        hue: 0,
        saturation: 100,
        lightness: 50,
        alpha: 0.5,
        hsla: startingColor1,
        position: 0,
        disabled: false,
        locked: false,
      },
      {
        id: uuid(),
        hue: 180,
        saturation: 100,
        lightness: 50,
        position: 100,
        alpha: 0.5,
        hsla: startingColor2,
        disabled: false,
        locked: false,
      },
    ],
  },
  {
    id: uuid(),
    rotate: 90,
    disabled: false,
    locked: false,
    at: "50% 50%",
    radialType: "ellipse",
    radialSize: "farthest-corner",
    radialHue: null,
    gradient: `linear-gradient(90deg, ${startingColor3}, ${startingColor4})`,
    type: "linear",
    colors: [
      {
        id: uuid(),
        hue: 45,
        saturation: 100,
        lightness: 50,
        position: 0,
        alpha: 1,
        hsla: startingColor3,
        disabled: false,
        locked: false,
      },
      {
        id: uuid(),
        hue: 225,
        saturation: 100,
        lightness: 50,
        position: 100,
        alpha: 0,
        hsla: startingColor4,
        disabled: false,
        locked: false,
      },
    ],
  },
]

export const startingLinearBackground = `
  linear-gradient(0deg, ${startingColor1} 0%, ${startingColor2} 100%), 
  linear-gradient(90deg, ${startingColor3} 0%, ${startingColor4} 100%)
`

export const defualtCss: CssProps = {
  position: "fixed",
  left: "0px",
  top: "0px",
  width: "100vw",
  height: "100dvh",
  "z-index": "-1",
  "background-size": "100% 100%",
  "background-image": startingLinearBackground,

  css: `
      position: fixed;
      left: 0px;
      top: 0px;
      width: 100vw;
      height: 100dvh;
      z-index: -1;
      background-size: 100% 100%;
      background-image: ${startingLinearBackground}
    `,
}

/**
 * Constructs a CSS string from the provided CSS properties and style properties.
 *
 * @param cssProps - An object containing CSS properties. The `css` property of this object is ignored.
 * @param styleProps - An array of tuples, where each tuple contains a key of `cssProps` and a string.
 *                     If a key from `styleProps` matches a key in `cssProps`, the value from `styleProps`
 *                     is used in the resulting CSS string.
 *
 * @returns A string representing the CSS styles. Each property is followed by a colon, a space,
 *          the property value, and a semicolon. For example, "color: red; width: 100px;".
 *
 * @example
 * const cssProps = { css: "", color: "blue", width: "200px" };
 * const styleProps = [["color", "red"]];
 * cssStringConstructor(cssProps, ...styleProps); // Returns "color: red; width: 200px;"
 */
export const cssStringCunstructor = (
  cssProps: CssProps,
  ...styleProps: [keyof CssProps, string][]
): string => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { css: _, ...rest } = cssProps

  const cssString = Object.entries(rest).reduce((acc, cur) => {
    let styleValue = cur[1]
    styleProps.forEach((prop) => {
      if (prop[0] === cur[0]) {
        styleValue = prop[1]

        // @ts-expect-error the follwing gives the error - Type 'string' is not assignable to type 'never'
        // But this works as expected because props[0] is constrained to be a key of CssProps
        cssProps[prop[0]] = prop[1]
      }
    })
    return (acc += `${cur[0]}: ${styleValue};`)
  }, "")

  return cssString
}

export const linearGradient = (rotate: number, colors: string[]) =>
  `linear-gradient(${rotate}deg, ${colors})`

export const radialGradient = (
  radialType: "ellipse" | "circle",
  radialSize:
    | "closest-side"
    | "closest-corner"
    | "farthest-side"
    | "farthest-corner",
  radialHue: "in hsl shorter hue" | "in hsl longer hue" | undefined | null,
  at: string,
  colors: string[],
) =>
  `radial-gradient(${radialType} ${radialSize} at ${at}${
    radialHue ? " " + radialHue : ""
  }, ${colors})`

const conicGradient = (rotate: number, at: string, colors: string[]) =>
  `conic-gradient(from ${rotate}deg at ${at}, ${colors})`

/**
 * Formats a CSS gradient string based on the provided type, rotation angle, and colors.
 *
 * @param type - The type of gradient. Can be "linear", "radial", or "conic". If an unrecognized type is provided, defaults to "linear".
 * @param rotate - The rotation angle for the gradient, in degrees. Only applicable for linear gradients.
 * @param colors - An array of CSS color values to be used in the gradient.
 *
 * @returns A string representing the CSS gradient. For example, "linear-gradient(45deg, red, blue)".
 *
 * @example
 * formatGradientString("linear", 45, ["red", "blue"]); // Returns "linear-gradient(45deg, red, blue)"
 * formatGradientString("radial", 0, ["red", "blue"]); // Returns "radial-gradient(red, blue)"
 * formatGradientString("conic", 0, ["red", "blue"]); // Returns "conic-gradient(red, blue)"
 */
export const formatGradientString = (
  type: string,
  rotate: number,
  at: string,
  radialType: "ellipse" | "circle",
  radialSize:
    | "closest-side"
    | "closest-corner"
    | "farthest-side"
    | "farthest-corner",
  radialHue: "in hsl shorter hue" | "in hsl longer hue" | undefined | null,
  colors: string[],
) => {
  switch (type) {
    case "linear":
      return linearGradient(rotate, colors)
    case "radial":
      return radialGradient(radialType, radialSize, radialHue, at, colors)
    case "conic":
      return conicGradient(rotate, at, colors)
    default:
      return linearGradient(rotate, colors)
  }
}

/**
 * This function takes an array of gradient objects and returns a string representation of linear gradients.
 *
 * @param {GradientList} gradientList - An array of gradient objects. Each object represents a gradient and contains a rotation value, a disabled flag, and an array of color objects. Each color object contains an HSL color string, a position value, and a disabled flag.
 *
 * @returns {string} A string representation of the gradients. Each gradient is represented as 'linear-gradient(rotateValue deg, color1 position1%, color2 position2%, ...)', and the gradients are separated by commas. Only gradients and colors that are not disabled are included in the output. The position values are formatted to two decimal places.
 */
export const formatGradientsFromObject = (gradientList: GradientList): string =>
  gradientList
    .reduce((acc: string[], group: GradientObj) => {
      if (!group.disabled) {
        const hslColors = group.colors.reduce(
          (acc: string[], color: HslaObj) => {
            if (!color.disabled) {
              acc.push(`${color.hsla} ${color.position.toFixed(2)}%`)
            }
            return acc
          },
          [],
        )

        const gradient = formatGradientString(
          group.type,
          group.rotate,
          group.at,
          group.radialType,
          group.radialSize,
          group.radialHue,
          hslColors,
        )

        acc.push(gradient)
      }
      return acc
    }, [])
    .join(", ")

/**
 * This function is used to find and return the parent gradient object of a given id.
 *
 * @param {number} id - The id of the child gradient object.
 * @param {GradientList} gradientList - The list of gradient objects to search in.
 *
 * @returns {GradientObj | undefined} The parent gradient object if found, otherwise undefined.
 */
export const findObj = <T extends Identifiable>(
  id: string,
  gradientList: T[],
): T => {
  const item = gradientList.find((group: T) => group.id === id)

  if (!item) {
    throw new Error(`No item with id ${id} found`)
  }

  return item
}

/**
 * Updates the gradient property of a parent object in the gradient list.
 *
 * This function finds the parent object in the gradient list using its ID,
 * then updates its gradient property based on its child colors. The gradient
 * is a linear gradient CSS string that includes the rotation and the HSLA
 * color values and positions of the child colors.
 *
 * This function should be called whenever a child color is updated to ensure
 * that the parent's gradient is kept in sync.
 *
 * @param gradientList - The list of gradient objects.
 * @param parentId - The ID of the parent object to update.
 */
export const updateParentGradient = (
  gradientList: GradientList,
  parentId?: string,
) => {
  if (!parentId) {
    gradientList.forEach((group: GradientObj) => {
      const hslColors = group.colors
        .filter((color) => !color.disabled)
        .map((color: HslaObj) => `${color.hsla} ${color.position}%`)

      group.gradient = formatGradientString(
        group.type,
        group.rotate,
        group.at,
        group.radialType,
        group.radialSize,
        group.radialHue,
        hslColors,
      )
    })
  } else {
    const parentArray = findObj(parentId, gradientList)
    const hslColors = parentArray.colors
      .filter((color) => !color.disabled)
      .map((color: HslaObj) => `${color.hsla} ${color.position}%`)

    parentArray.gradient = formatGradientString(
      parentArray.type,
      parentArray.rotate,
      parentArray.at,
      parentArray.radialType,
      parentArray.radialSize,
      parentArray.radialHue,
      hslColors,
    )
  }
}

export function parseHSLA(hsla: string): HSLA | null {
  const hslaRegex =
    /^hsla?\(\s*([0-9]+)\s*,\s*([0-9]+)%\s*,\s*([0-9]+)%\s*(?:,\s*([0-9.]+)\s*)?\)$/i
  const match = hsla.match(hslaRegex)

  if (!match) {
    return null // Invalid HSLA string
  }

  const [, h, s, l, a = "1"] = match // Default alpha to 1 if not provided

  return {
    hue: parseInt(h, 10),
    saturation: parseInt(s, 10),
    lightness: parseInt(l, 10),
    alpha: parseFloat(a),
    hsla: hsla,
  }
}

// *******************************************************
// **************** SET STATE FUNCTIONS ******************

/**
 * This function is used to update the gradient list and the background gradient.
 *
 * @param state
 * @param updatedGradient
 * @returns
 */
export function setGradeintAndBackgroundGradient(
  state: GradientStore,
  updatedGradient: GradientList,
) {
  // Update the background gradient
  const newBackgroundGradient = formatGradientsFromObject(updatedGradient)
  // Update the css prop obj
  state.cssProps.css = cssStringCunstructor(state.cssProps, [
    "background-image",
    newBackgroundGradient,
  ])

  return {
    gradientList: updatedGradient,
    backgroundGradient: newBackgroundGradient,
  }
}

/**
 * This function is used to update the gradient list and the background gradient.
 *
 * @param state
 * @param updatedGradient
 * @param id
 *
 * @returns
 */
export function setGradeintAndUpdateParent(
  state: GradientStore,
  updatedGradient: GradientList,
  id?: string,
) {
  // Update the background gradient
  const newBackgroundGradient = formatGradientsFromObject(updatedGradient)
  // Update the css prop obj
  state.cssProps.css = cssStringCunstructor(state.cssProps, [
    "background-image",
    newBackgroundGradient,
  ])

  updateParentGradient(updatedGradient, id)

  return {
    gradientList: updatedGradient,
    backgroundGradient: newBackgroundGradient,
  }
}
