import { create } from "zustand"
import { persist } from "zustand/middleware"
import {
  GradientList,
  GradientObj,
  HslaObj,
  HslaColorOptions,
  CssProps,
} from "./types"
import { v4 as uuid } from "uuid"

interface GradientStore {
  cssProps: CssProps
  gradientList: GradientList
  backgroundGradient: string
  bgWidth: number
  noiseOn: boolean
  gridOn: boolean
  particlesOn: boolean
  isWindowHeight?: boolean
  widthSmall: boolean
}

type GradientStoreSetters = {
  setNoise: (noiseOn: boolean) => void
  setParticlesOn: (particlesOn: boolean) => void
  setIsWindowHeight: (isWindowHeight: boolean) => void
  setBgWidth: (width: number) => void
  setGridOn: (gridOn: boolean) => void
  setWidthSmall: (widthSmall: boolean) => void

  addGradient: () => void
  removeGradient: (id: string) => void
  setGradientDisabled: (id: string) => void
  setGradeintLock: (id: string) => void
  setGradientRotate: (rotate: number, parentId: string) => void

  setColorValue: (
    id: string,
    parentId: string,
    { key, value }: { key: HslaColorOptions; value: number },
  ) => void
  addColor: (parentId: string) => void
  removeColor: (id: string, parentId: string) => void
  setColorDisabled: (id: string, parentId: string) => void
  setColorLock: (id: string, parentId: string) => void
  setGradientHsl: (id: string, hsla: string) => void

  randomAll: () => void
  randomGradient: (id: string) => void
}

type GradientStoreState = GradientStore & GradientStoreSetters

interface Identifiable {
  id: string
}

const defaultGradientList: GradientList = [
  {
    id: uuid(),
    rotate: 0,
    disabled: false,
    locked: false,
    gradient:
      "linear-gradient(0deg, hsla(0, 100%, 50%), hsla(180, 100%, 50%, 0.5))",
    colors: [
      {
        id: uuid(),
        hue: 0,
        saturation: 100,
        lightness: 50,
        alpha: 0.5,
        position: 0,
        hsla: "hsla(0, 100%, 50%, 0.5)",
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
        hsla: "hsla(180, 100%, 50%, 0.5)",
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
    gradient:
      "linear-gradient(90deg, hsla(45, 100%, 50%), hsla(225, 100%, 50%, 0))",
    colors: [
      {
        id: uuid(),
        hue: 45,
        saturation: 100,
        lightness: 50,
        position: 0,
        alpha: 1,
        hsla: "hsla(45, 100%, 50%)",
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
        hsla: "hsla(225, 100%, 50%, 0)",
        disabled: false,
        locked: false,
      },
    ],
  },
]

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
      }
    })
    return (acc += `${cur[0]}: ${styleValue};`)
  }, "")

  console.log(cssString)

  return cssString
}

const defualtCss: CssProps = {
  position: "fixed",
  left: "0px",
  top: "0px",
  width: "100vw",
  height: "100vh",
  "z-index": "-1",
  "background-size": "100% 100%",
  "background-position": "50% 50%",
  "background-image": `
    linear-gradient(0deg, hsla(0, 100%, 50%, 0.5) 0%, hsla(180, 100%, 50%, 0.5)) 100%),
    linear-gradient(90deg, hsla(45, 100%, 50%) 0%, hsla(225, 100%, 50%, 0)) 100%)
  `,

  css: `
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    background-size: 100% 100%;
    background-position: 50% 50%;
    background-image: linear-gradient(0deg, hsla(0, 100%, 50%, 0.5) 0%, hsla(180, 100%, 50%, 0.5)) 100%), linear-gradient(90deg, hsla(45, 100%, 50%) 0%, hsla(225, 100%, 50%, 0)) 100%)
  `,
}

/**
 * This function takes an array of gradient objects and returns a string representation of linear gradients.
 *
 * @param {GradientList} gradientList - An array of gradient objects. Each object represents a gradient and contains a rotation value, a disabled flag, and an array of color objects. Each color object contains an HSL color string, a position value, and a disabled flag.
 *
 * @returns {string} A string representation of the gradients. Each gradient is represented as 'linear-gradient(rotateValue deg, color1 position1%, color2 position2%, ...)', and the gradients are separated by commas. Only gradients and colors that are not disabled are included in the output. The position values are formatted to two decimal places.
 */
const formatGradientsFromObject = (gradientList: GradientList): string => {
  const newGradient = gradientList
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
        acc.push(`linear-gradient( ${group.rotate}deg, ${hslColors})`)
      }
      return acc
    }, [])
    .join(", ")

  return newGradient
}

/**
 * This function is used to find and return the parent gradient object of a given id.
 *
 * @param {number} id - The id of the child gradient object.
 * @param {GradientList} gradientList - The list of gradient objects to search in.
 *
 * @returns {GradientObj | undefined} The parent gradient object if found, otherwise undefined.
 */
const findObj = <T extends Identifiable>(id: string, array: T[]): T => {
  const item = array.find((group: T) => group.id === id)

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
        .join(", ")

      group.gradient = `linear-gradient( ${group.rotate}deg, ${hslColors})`
    })
  } else {
    const parentArray = findObj(parentId, gradientList)
    const hslColors = parentArray.colors
      .filter((color) => !color.disabled)
      .map((color: HslaObj) => `${color.hsla} ${color.position}%`)
      .join(", ")

    parentArray.gradient = `linear-gradient( ${parentArray.rotate}deg, ${hslColors})`
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

      setIsWindowHeight: (isWindowHeight: boolean) =>
        set((state: GradientStore) => {
          const height = isWindowHeight ? "100vh" : "100%"
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

      setWidthSmall: (widthSmall: boolean) => set({ widthSmall }),
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

      setGradientRotate: (rotate: number, parentId: string) => {
        set((state: GradientStore) => {
          const parentArray = findObj(parentId, state.gradientList)
          parentArray.rotate = rotate

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
      setGradientHsl: () => {
        // set((state: GradientStore) => {
        //   const updatedGradient = state.gradient.map((colorGroup) => {
        //     if (colorGroup.id === id) {
        //       const [hue, saturation, lightness, alpha] = hsla
        //         .replace(/hsla\(|hsla\(|\)|%/g, "")
        //         .split(",")
        //         .map((value) => Number(value))
        //       return {
        //         ...colorGroup,
        //         hue,
        //         saturation,
        //         lightness,
        //         alpha,
        //         hsla,
        //       }
        //     }
        //     return colorGroup
        //   })
        //   // Update the background gradient
        //   const newBackgroundGradient = setBackgroundGradient(
        //     updatedGradient,
        //     state.rotate,
        //   )
        //   return {
        //     gradient: updatedGradient,
        //     backgroundGradient: newBackgroundGradient,
        //   }
        // })
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
