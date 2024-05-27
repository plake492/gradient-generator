import { create } from "zustand"
import { persist } from "zustand/middleware"
import {
  GradientList,
  GradientObj,
  HslaObj,
  HslaColorOptions,
  CssProps,
} from "./types"
import { Identifiable, GradientStore, GradientStoreState } from "./types/store"
import { v4 as uuid } from "uuid"

type HSLA = {
  hue: number
  saturation: number
  lightness: number
  alpha: number
  hsla: string
}

const startingColor1 = "hsla(0, 100%, 50%, 0.5)"
const startingColor2 = "hsla(180, 100%, 50%, 0.5)"
const startingColor3 = "hsla(45, 100%, 50%, 1)"
const startingColor4 = "hsla(225, 100%, 50%, 0.1)"

const defaultGradientList: GradientList = [
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

const startingLinearBackground = `
  linear-gradient(0deg, ${startingColor1} 0%, ${startingColor2} 100%), 
  linear-gradient(90deg, ${startingColor3} 0%, ${startingColor4} 100%)
`

const defualtCss: CssProps = {
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
const cssStringCunstructor = (
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

const linearGradient = (rotate: number, colors: string[]) =>
  `linear-gradient(${rotate}deg, ${colors})`

const radialGradient = (
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
const formatGradientString = (
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
const formatGradientsFromObject = (gradientList: GradientList): string =>
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
const findObj = <T extends Identifiable>(id: string, gradientList: T[]): T => {
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
const updateParentGradient = (
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

function parseHSLA(hsla: string): HSLA | null {
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

export const useGradientStore = create<GradientStoreState>()(
  persist(
    (set) => ({
      noiseOn: true,
      particlesOn: true,
      gridOn: false,
      isWindowHeight: true,
      bgWidth: 100,
      widthSmall: false,
      gradientList: defaultGradientList,
      backgroundGradient: formatGradientsFromObject(defaultGradientList),
      cssProps: defualtCss,

      // ******************* Global setters ******************* //
      setNoise: (noiseOn: boolean) => set({ noiseOn }),

      setParticlesOn: (particlesOn: boolean) => set({ particlesOn }),

      setGridOn: (gridOn: boolean) => set({ gridOn }),

      setWidthSmall: (widthSmall: boolean) => set({ widthSmall }),

      setIsWindowHeight: (isWindowHeight: boolean) =>
        set((state: GradientStore) => {
          const height = isWindowHeight ? "100dvh" : "100%"
          const position = isWindowHeight ? "fixed" : "absolute"
          // Update the css prop objstate.cssProps.height = height
          state.cssProps.position = position
          state.cssProps.css = cssStringCunstructor(
            state.cssProps,
            ["height", height],
            ["position", position],
          )

          return { isWindowHeight }
        }),

      setBgWidth: (width: number) =>
        set((state: GradientStore) => {
          const bgSize = `${width}% 100%`
          state.cssProps["background-size"] = bgSize
          // Update the css prop obj
          state.cssProps.css = cssStringCunstructor(state.cssProps, [
            "background-size",
            bgSize,
          ])
          return { bgWidth: width }
        }),
      // ******************************************************** //

      // ******************* Garient setters ******************* //
      addGradient: () => {
        set((state: GradientStore) => {
          const randomColor1 = Math.floor(Math.random() * 360)
          const randomColor2 = Math.floor(Math.random() * 360)

          const newGradient: GradientObj = {
            id: uuid(),
            rotate: 0,
            disabled: false,
            locked: false,
            gradient: `linear-gradient(0deg, hsla(${randomColor1}, 100%, 50%, 0.5), hsla(${randomColor2}, 100%, 50%, 0.5))`,
            type: "linear",
            at: "50% 50%",
            radialType: "ellipse",
            radialSize: "farthest-corner",
            radialHue: null,

            colors: [
              {
                id: uuid(),
                hue: randomColor1,
                saturation: 100,
                lightness: 50,
                alpha: 0.5,
                hsla: `hsla(${randomColor1}, 100%, 50%, 0.5)`,
                position: 0,
                locked: false,
              },
              {
                id: uuid(),
                hue: randomColor2,
                saturation: 100,
                lightness: 50,
                alpha: 0.5,
                hsla: `hsla(${randomColor2}, 100%, 50%, 0.5)`,
                position: 100,
                locked: false,
              },
            ],
          }

          const updatedGradient = [...state.gradientList, newGradient]

          // Update the background gradient
          const newBackgroundGradient =
            formatGradientsFromObject(updatedGradient)
          // Update the css prop obj
          state.cssProps.css = cssStringCunstructor(state.cssProps, [
            "background-image",
            newBackgroundGradient,
          ])

          return {
            gradientList: updatedGradient,
            backgroundGradient: newBackgroundGradient,
          }
        })
      },

      removeGradient: (id: string) => {
        set((state: GradientStore) => {
          const updatedGradient = state.gradientList.filter(
            (group: GradientObj) => group.id !== id,
          )

          // Update the background gradient
          const newBackgroundGradient =
            formatGradientsFromObject(updatedGradient)
          // Update the css prop obj
          state.cssProps.css = cssStringCunstructor(state.cssProps, [
            "background-image",
            newBackgroundGradient,
          ])

          return {
            gradientList: updatedGradient,
            backgroundGradient: newBackgroundGradient,
          }
        })
      },

      setGradientDisabled: (id: string) => {
        set((state: GradientStore) => {
          const updatedGradient = state.gradientList.map(
            (group: GradientObj) => {
              if (group.id === id) {
                return {
                  ...group,
                  disabled: !group.disabled,
                }
              }

              return group
            },
          )

          // Update the background gradient
          const newBackgroundGradient =
            formatGradientsFromObject(updatedGradient)
          // Update the css prop obj
          state.cssProps.css = cssStringCunstructor(state.cssProps, [
            "background-image",
            newBackgroundGradient,
          ])

          return {
            gradientList: updatedGradient,
            backgroundGradient: newBackgroundGradient,
          }
        })
      },

      setGradeintLock: (id: string) => {
        set((state: GradientStore) => {
          const updatedGradient = state.gradientList.map(
            (group: GradientObj) => {
              if (group.id === id) {
                return {
                  ...group,
                  locked: !group.locked,
                }
              }

              return group
            },
          )

          return {
            gradientList: updatedGradient,
          }
        })
      },

      setGradientValue: (
        id: string,
        {
          key,
          value,
        }: { key: keyof GradientObj; value: number | string | null },
      ) => {
        set((state: GradientStore) => {
          state.gradientList = state.gradientList.map((group: GradientObj) => {
            if (group.id === id) {
              return {
                ...group,
                [key]: value,
              }
            }
            return group
          })

          // Update the background gradient
          const newBackgroundGradient = formatGradientsFromObject(
            state.gradientList,
          )

          // Update the css prop obj
          state.cssProps.css = cssStringCunstructor(state.cssProps, [
            "background-image",
            newBackgroundGradient,
          ])

          updateParentGradient(state.gradientList, id)

          return {
            gradientList: state.gradientList,
            backgroundGradient: newBackgroundGradient,
          }
        })
      },
      // ******************************************************** //

      // ********************* Color setters ******************** //
      setColorValue: (
        id: string,
        parentId: string,
        { key, value }: { key: HslaColorOptions; value: number },
      ) =>
        set((state: GradientStore) => {
          const parentArray = findObj(parentId, state.gradientList)
          const color = findObj(id, parentArray.colors)

          color[key] = value
          color.hsla = `hsla(${color.hue}, ${color.saturation}%, ${color.lightness}%, ${color.alpha})`

          // Update the background gradient
          const newBackgroundGradient = formatGradientsFromObject(
            state.gradientList,
          )
          // Update the css prop obj
          state.cssProps.css = cssStringCunstructor(state.cssProps, [
            "background-image",
            newBackgroundGradient,
          ])

          updateParentGradient(state.gradientList, parentId)

          return {
            backgroundGradient: newBackgroundGradient,
          }
        }),

      addColor: (parentId: string) => {
        set((state: GradientStore) => {
          const parentArray = findObj(parentId, state.gradientList)

          const newPosition = 100

          // Update positions of existing colors
          const updatedGroup = parentArray.colors.map((color, index) => ({
            ...color,
            position: (100 * index) / parentArray.colors.length,
          }))

          const randomColor = Math.floor(Math.random() * 360)

          const updatedGradient = [
            ...updatedGroup,
            {
              id: uuid(),
              hue: randomColor,
              saturation: 100,
              lightness: 50,
              alpha: 1,
              hsla: `hsla(${randomColor}, 100%, 50%, 1)`,
              position: newPosition,
              disabled: false,
              locked: false,
            },
          ]

          // replace the array group with the new one
          parentArray.colors = updatedGradient

          // Update the background gradient
          const newBackgroundGradient = formatGradientsFromObject(
            state.gradientList,
          )
          // Update the css prop obj
          state.cssProps.css = cssStringCunstructor(state.cssProps, [
            "background-image",
            newBackgroundGradient,
          ])

          updateParentGradient(state.gradientList, parentId)

          return {
            backgroundGradient: newBackgroundGradient,
          }
        })
      },

      removeColor: (id: string, parentId: string) => {
        set((state: GradientStore) => {
          const parentArray = findObj(parentId, state.gradientList)

          const updatedGradient = parentArray.colors
            .filter((colorGroup) => colorGroup.id !== id)
            .map((color, index) => ({
              ...color,
              position: (100 * index) / (parentArray.colors.length - 1),
            }))

          parentArray.colors = updatedGradient

          // Update the background gradient
          const newBackgroundGradient = formatGradientsFromObject(
            state.gradientList,
          )
          // Update the css prop obj
          state.cssProps.css = cssStringCunstructor(state.cssProps, [
            "background-image",
            newBackgroundGradient,
          ])

          updateParentGradient(state.gradientList, parentId)

          return {
            backgroundGradient: newBackgroundGradient,
          }
        })
      },

      setColorDisabled: (id: string, parentId: string) => {
        set((state: GradientStore) => {
          const parentArray = findObj(parentId, state.gradientList)

          const updatedGradient = parentArray.colors.map((colorGroup) => {
            if (colorGroup.id === id) {
              return {
                ...colorGroup,
                disabled: !colorGroup.disabled,
              }
            }

            return colorGroup
          })

          parentArray.colors = updatedGradient

          // Update the background gradient
          const newBackgroundGradient = formatGradientsFromObject(
            state.gradientList,
          )
          // Update the css prop obj
          state.cssProps.css = cssStringCunstructor(state.cssProps, [
            "background-image",
            newBackgroundGradient,
          ])

          updateParentGradient(state.gradientList, parentId)

          return {
            backgroundGradient: newBackgroundGradient,
          }
        })
      },

      setColorLock: (id: string, parentId: string) => {
        set((state: GradientStore) => {
          const parentArray = findObj(parentId, state.gradientList)

          const updatedGradient = parentArray.colors.map((colorGroup) => {
            if (colorGroup.id === id) {
              return {
                ...colorGroup,
                locked: !colorGroup.locked,
              }
            }

            return colorGroup
          })

          parentArray.colors = updatedGradient

          return {
            gradientList: state.gradientList,
          }
        })
      },

      // TODO Complete this
      setGradientHsl: (id: string, parentId: string, value: string) => {
        set((state: GradientStore) => {
          const parentArray = findObj(parentId, state.gradientList)
          console.log("value ==>", value)

          const color = findObj(id, parentArray.colors)

          const hslaValues = parseHSLA(value)!

          Object.entries(hslaValues).forEach(([key, value]) => {
            if (key in color) {
              // @ts-expect-error this will be fixed later!!!!
              color[key] = value
            }
          })
          console.log("hslaValues ==>", hslaValues)
          // console.log("value ==>", value)

          // Update the background gradient
          const newBackgroundGradient = formatGradientsFromObject(
            state.gradientList,
          )
          // Update the css prop obj
          state.cssProps.css = cssStringCunstructor(state.cssProps, [
            "background-image",
            newBackgroundGradient,
          ])

          updateParentGradient(state.gradientList, parentId)

          return {
            backgroundGradient: newBackgroundGradient,
          }
        })
      },
      // ******************************************************** //

      // ********************* Randomize setters ******************** //
      randomAll: () => {
        set((state: GradientStore) => {
          const updatedGradientList = state.gradientList.map(
            (group: GradientObj) => {
              if (group.locked) {
                return group
              }
              const updatedColors = group.colors.map((color: HslaObj) => {
                if (color.locked) {
                  return color
                }
                const randomColor = Math.floor(Math.random() * 360)
                return {
                  ...color,
                  hue: randomColor,
                  hsla: `hsla(${randomColor}, 100%, 50%, 0.5)`,
                }
              })

              group.gradient = formatGradientString(
                group.type,
                group.rotate,
                group.at,
                group.radialType,
                group.radialSize,
                group.radialHue,
                updatedColors.map((color) => color.hsla),
              )

              return {
                ...group,
                colors: updatedColors,
              }
            },
          )

          // Update the background gradient
          const newBackgroundGradient =
            formatGradientsFromObject(updatedGradientList)
          // Update the css prop obj
          state.cssProps.css = cssStringCunstructor(state.cssProps, [
            "background-image",
            newBackgroundGradient,
          ])

          updateParentGradient(updatedGradientList)

          return {
            backgroundGradient: newBackgroundGradient,
          }
        })
      },

      randomGradient: (parentId: string) => {
        set((state: GradientStore) => {
          const parentArray = findObj(parentId, state.gradientList)

          const updatedColors = parentArray.colors.map((color: HslaObj) => {
            if (color.locked) {
              return color
            }
            const randomColor = Math.floor(Math.random() * 360)
            return {
              ...color,
              hue: randomColor,
              hsla: `hsla(${randomColor}, 100%, 50%, 0.5)`,
            }
          })

          parentArray.colors = updatedColors

          // Update the background gradient
          const newBackgroundGradient = formatGradientsFromObject(
            state.gradientList,
          )
          // Update the css prop obj
          state.cssProps.css = cssStringCunstructor(state.cssProps, [
            "background-image",
            newBackgroundGradient,
          ])

          updateParentGradient(state.gradientList, parentId)

          return {
            backgroundGradient: newBackgroundGradient,
          }
        })
      },
    }),
    {
      name: "gradient",
    },
  ),
)
