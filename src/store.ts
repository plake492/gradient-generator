import { create } from "zustand"
import { persist } from "zustand/middleware"
import { GradientList, GradientObj, HslaObj, HslaColorOptions } from "./types"
import { v4 as uuid } from "uuid"

interface GradientStore {
  gradientList: GradientList
  backgroundGradient: string
  bgWidth: number
  noiseOn: boolean
  isWindowHeight?: boolean
}

type GradientStoreSetters = {
  setNoise: (noiseOn: boolean) => void
  setIsWindowHeight: (isWindowHeight: boolean) => void
  setBgWidth: (width: number) => void

  addGradient: () => void
  removeGradient: (id: string) => void
  setGradientDisabled: (id: string) => void
  setGradientRotate: (rotate: number, parentId: string) => void

  setColorValue: (
    id: string,
    parentId: string,
    { key, value }: { key: HslaColorOptions; value: number },
  ) => void
  addColor: (parentId: string) => void
  removeColor: (id: string, parentId: string) => void
  setColorDisabled: (id: string, parentId: string) => void
  setGradientHsl: (id: string, hsl: string) => void

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
    colors: [
      {
        id: uuid(),
        hue: 0,
        saturation: 100,
        lightness: 50,
        opacity: 0.5,
        position: 0,
        hsl: "hsl(0, 100%, 50%, 0.5)",
        disabled: false,
      },
      {
        id: uuid(),
        hue: 180,
        saturation: 100,
        lightness: 50,
        position: 100,
        opacity: 0.5,
        hsl: "hsl(180, 100%, 50%, 0.5)",
        disabled: false,
      },
    ],
  },
  {
    id: uuid(),
    rotate: 90,
    disabled: false,
    colors: [
      {
        id: uuid(),
        hue: 45,
        saturation: 100,
        lightness: 50,
        position: 0,
        opacity: 1,
        hsl: "hsl(45, 100%, 50%)",
        disabled: false,
      },
      {
        id: uuid(),
        hue: 225,
        saturation: 100,
        lightness: 50,
        position: 100,
        opacity: 0,
        hsl: "hsl(225, 100%, 50%, 0)",
        disabled: false,
      },
    ],
  },
]

/**
 * This function takes an array of gradient objects and returns a string representation of linear gradients.
 *
 * @param {GradientList} gradientList - An array of gradient objects. Each object represents a gradient and contains a rotation value, a disabled flag, and an array of color objects. Each color object contains an HSL color string, a position value, and a disabled flag.
 *
 * @returns {string} A string representation of the gradients. Each gradient is represented as 'linear-gradient(rotateValue deg, color1 position1%, color2 position2%, ...)', and the gradients are separated by commas. Only gradients and colors that are not disabled are included in the output. The position values are formatted to two decimal places.
 */
const formatGradientsFromObject = (gradientList: GradientList) =>
  gradientList
    .reduce((acc: string[], group: GradientObj) => {
      if (!group.disabled) {
        const hslColors = group.colors.reduce(
          (acc: string[], color: HslaObj) => {
            if (!color.disabled) {
              acc.push(`${color.hsl} ${color.position.toFixed(2)}%`)
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

export const useGradientStore = create<GradientStoreState>()(
  persist(
    (set) => ({
      noiseOn: true,
      isWindowHeight: true,
      bgWidth: 100,
      gradientList: defaultGradientList,
      backgroundGradient: formatGradientsFromObject(defaultGradientList),

      // ******************* Global setters ******************* //
      setNoise: (noiseOn: boolean) => set({ noiseOn }),

      setIsWindowHeight: (isWindowHeight: boolean) => set({ isWindowHeight }),

      setBgWidth: (width: number) => set({ bgWidth: width }),
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
            colors: [
              {
                id: uuid(),
                hue: randomColor1,
                saturation: 100,
                lightness: 50,
                position: 0,
                opacity: 0.5,
                hsl: `hsl(${randomColor1}, 100%, 50%, 0.5)`,
              },
              {
                id: uuid(),
                hue: randomColor2,
                saturation: 100,
                lightness: 50,
                position: 100,
                opacity: 0.5,
                hsl: `hsl(${randomColor2}, 100%, 50%, 0.5)`,
              },
            ],
          }

          const updatedGradient = [...state.gradientList, newGradient]

          // Update the background gradient
          const newBackgroundGradient =
            formatGradientsFromObject(updatedGradient)

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

          return {
            gradientList: updatedGradient,
            backgroundGradient: newBackgroundGradient,
          }
        })
      },

      setGradientRotate: (rotate: number, parentId: string) => {
        set((state: GradientStore) => {
          const parentArray = findObj(parentId, state.gradientList)
          parentArray

          parentArray!.rotate = rotate

          // Update the background gradient
          const newBackgroundGradient = formatGradientsFromObject(
            state.gradientList,
          )

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
          color.hsl = `hsl(${color.hue}, ${color.saturation}%, ${color.lightness}%, ${color.opacity})`

          // Update the background gradient
          const newBackgroundGradient = formatGradientsFromObject(
            state.gradientList,
          )

          return {
            gradientList: state.gradientList,
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
              opacity: 1,
              hsl: `hsl(${randomColor}, 100%, 50%, 1)`,
              position: newPosition,
              disabled: false,
            },
          ]

          // replace the array group with the new one
          parentArray.colors = updatedGradient

          // Update the background gradient
          const newBackgroundGradient = formatGradientsFromObject(
            state.gradientList,
          )

          return {
            gradientList: state.gradientList,
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

          return {
            gradientList: state.gradientList,
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

          return {
            gradientList: state.gradientList,
            backgroundGradient: newBackgroundGradient,
          }
        })
      },

      // TODO Complete this
      setGradientHsl: () => {
        // set((state: GradientStore) => {
        //   const updatedGradient = state.gradient.map((colorGroup) => {
        //     if (colorGroup.id === id) {
        //       const [hue, saturation, lightness, opacity] = hsl
        //         .replace(/hsla\(|hsl\(|\)|%/g, "")
        //         .split(",")
        //         .map((value) => Number(value))
        //       return {
        //         ...colorGroup,
        //         hue,
        //         saturation,
        //         lightness,
        //         opacity,
        //         hsl,
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

      randomAll: () => {
        set((state: GradientStore) => {
          const updatedGradientList = state.gradientList.map(
            (group: GradientObj) => {
              const updatedColors = group.colors.map((color: HslaObj) => {
                const randomColor = Math.floor(Math.random() * 360)
                return {
                  ...color,
                  hue: randomColor,
                  hsl: `hsl(${randomColor}, 100%, 50%, 0.5)`,
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

          return {
            gradientList: updatedGradientList,
            backgroundGradient: newBackgroundGradient,
          }
        })
      },

      randomGradient: (id: string) => {
        set((state: GradientStore) => {
          const parentArray = findObj(id, state.gradientList)

          const updatedColors = parentArray.colors.map((color: HslaObj) => {
            const randomColor = Math.floor(Math.random() * 360)
            return {
              ...color,
              hue: randomColor,
              hsl: `hsl(${randomColor}, 100%, 50%, 0.5)`,
            }
          })

          parentArray.colors = updatedColors

          // Update the background gradient
          const newBackgroundGradient = formatGradientsFromObject(
            state.gradientList,
          )

          return {
            gradientList: state.gradientList,
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
