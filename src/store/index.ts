import { create } from "zustand"
import { persist } from "zustand/middleware"
import {
  defaultGradientList,
  defualtCss,
  cssStringCunstructor,
  formatGradientString,
  formatGradientsFromObject,
  findObj,
  updateParentGradient,
  parseHSLA,
  setGradeintAndBackgroundGradient,
  setGradeintAndUpdateParent,
} from "./helpers"
import { GradientObj, HslaObj, HslaColorOptions } from "../types"
import { GradientStore, GradientStoreState } from "../types/store"
import { v4 as uuid } from "uuid"

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

          return setGradeintAndBackgroundGradient(state, updatedGradient)
        })
      },

      removeGradient: (id: string) => {
        set((state: GradientStore) => {
          const updatedGradient = state.gradientList.filter(
            (group: GradientObj) => group.id !== id,
          )
          return setGradeintAndBackgroundGradient(state, updatedGradient)
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

          return setGradeintAndBackgroundGradient(state, updatedGradient)
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

          // ? CONSOLIDATE THIS INTO A FUNCTION
          // ? Mod version
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

      reorderGradient: (startingIndex: number, destinationIndex: number) => {
        set((state: GradientStore) => {
          const updatedGradientList = [...state.gradientList]

          const [movedItem] = updatedGradientList.splice(startingIndex, 1)
          updatedGradientList.splice(destinationIndex, 0, movedItem)

          // ? CONSOLIDATE THIS INTO A FUNCTION
          // Update the background gradient
          const newBackgroundGradient =
            formatGradientsFromObject(updatedGradientList)

          // Update the css prop obj
          state.cssProps.css = cssStringCunstructor(state.cssProps, [
            "background-image",
            newBackgroundGradient,
          ])

          return {
            gradientList: updatedGradientList,
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

          return setGradeintAndUpdateParent(state, state.gradientList, parentId)
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

          return setGradeintAndUpdateParent(state, state.gradientList, parentId)
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

          return setGradeintAndUpdateParent(state, state.gradientList, parentId)
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

          return setGradeintAndUpdateParent(state, state.gradientList, parentId)
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

      setGradientHsl: (id: string, parentId: string, value: string) => {
        set((state: GradientStore) => {
          const parentArray = findObj(parentId, state.gradientList)
          const color = findObj(id, parentArray.colors)

          const hslaValues = parseHSLA(value)!

          Object.entries(hslaValues).forEach(([key, value]) => {
            if (key in color) {
              // TODO
              // @ts-expect-error this will be fixed later!!!!
              color[key] = value
            }
          })

          return setGradeintAndUpdateParent(state, state.gradientList, parentId)
        })
      },

      reorderColors: (
        parentId: string,
        startingIndex: number,
        destinationIndex: number,
      ) => {
        set((state: GradientStore) => {
          const parentArray = findObj(parentId, state.gradientList)

          const updatedColors = [...parentArray.colors]
          const [movedItem] = updatedColors.splice(startingIndex, 1)
          updatedColors.splice(destinationIndex, 0, movedItem)

          // Update positions of existing colors
          const updatedGroup = updatedColors.map((color, index) => ({
            ...color,
            position: (100 * index) / updatedColors.length,
          }))

          parentArray.colors = updatedGroup

          return setGradeintAndUpdateParent(state, state.gradientList, parentId)
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

          return setGradeintAndUpdateParent(state, updatedGradientList)
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

          return setGradeintAndUpdateParent(state, state.gradientList, parentId)
        })
      },
    }),
    {
      name: "gradient",
    },
  ),
)
