import { create } from "zustand"
import { persist, PersistConfig } from "zustand/middleware"
import { ColorGroup } from "./types"

interface GradientStore {
  gradient: ColorGroup[]
  rotate: number
  bgWidth: number
  backgroundGradient: string
  noiseOn: boolean
  isWindowHeight?: boolean
}

type GradientStoreSetters = {
  setBackgroundGradient: (gradient: string) => void
  setRotate: (rotate: number) => void
  setBgWidth: (width: number) => void
  setGradient: (
    id: number,
    { key, value }: { key: keyof ColorGroup; value: number },
  ) => void
  addColor: () => void
  removeColor: (id: number) => void
  random: () => void
  setGradientHsl: (id: number, hsl: string) => void
  setGradientDisabled: (id: number, disabled: boolean) => void
  setNoise: (noise: boolean) => void
  setIsWindowHeight: (isWindowHeight: boolean) => void
}

type GradientStoreState = GradientStore &
  GradientStoreSetters &
  PersistConfig<unknown>

/**
 * This is a helper function that generates a CSS linear-gradient string from an array of color groups and a rotation angle.
 *
 * @param {ColorGroup[]} gradient - An array of color groups. Each color group should have a `hsl` property (the color in HSL format) and a `position` property (the position of the color in the gradient).
 * @param {number} rotate - The rotation angle for the linear gradient, in degrees.
 *
 * @returns {string} A CSS linear-gradient string that can be used as a value for the `background-image` property.
 */
const setBackgroundGradient = (gradient: ColorGroup[], rotate: number) => {
  const hslColors = gradient
    .filter((color) => !color.disabled)
    .map((color: ColorGroup) => `${color.hsl} ${color.position.toFixed(2)}%`)
    .join(", ")

  return `linear-gradient( ${rotate}deg, ${hslColors})`
}

export const useGradientStore = create<GradientStoreState>(
  persist(
    (set: any) => ({
      noiseOn: true,
      isWindowHeight: true,
      backgroundGradient:
        "linear-gradient(0deg, hsl(0, 100%, 50%), hsl(180, 100%, 50%))",
      rotate: 0,
      bgWidth: 100,
      gradient: [
        {
          id: 0,
          hue: 0,
          saturation: 100,
          lightness: 50,
          position: 0,
          opacity: 1,
          hsl: "hsl(0, 100%, 50%)",
          disabled: false,
        },
        {
          id: 1,
          hue: 180,
          saturation: 100,
          lightness: 50,
          position: 100,
          opacity: 1,
          hsl: "hsl(180, 100%, 50%)",
          disabled: false,
        },
      ],

      setNoise: (noiseOn: boolean) => set({ noiseOn }),

      setIsWindowHeight: (isWindowHeight: boolean) => set({ isWindowHeight }),

      setBackgroundGradient: (gradient: string) =>
        set({ backgroundGradient: gradient }),

      setGradientDisabled: (id: number, disabled: boolean) => {
        set((state: GradientStore) => {
          const updatedGradient = state.gradient.map((colorGroup) => {
            if (colorGroup.id === id) {
              return {
                ...colorGroup,
                disabled,
              }
            }

            return colorGroup
          })

          // Update the background gradient
          const newBackgroundGradient = setBackgroundGradient(
            updatedGradient,
            state.rotate,
          )

          return {
            gradient: updatedGradient,
            backgroundGradient: newBackgroundGradient,
          }
        })
      },

      setGradient: (
        id: number,
        { key, value }: { key: keyof ColorGroup; value: number },
      ) => {
        set((state: GradientStore) => {
          const group = state.gradient.find((group) => group.id === id)
          if (group && !group.disabled) {
            group[key] = value
            group.hsl = `hsl(${group.hue}, ${group.saturation}%, ${group.lightness}%, ${group.opacity})`
          }

          // Update the background gradient
          const newBackgroundGradient = setBackgroundGradient(
            state.gradient,
            state.rotate,
          )

          return {
            gradient: state.gradient,
            backgroundGradient: newBackgroundGradient,
          }
        })
      },

      addColor: () => {
        set((state: GradientStore) => {
          const id = state.gradient[state.gradient.length - 1].id + 1
          const newPosition = 100

          // Update positions of existing colors
          const updatedGroup = state.gradient.map((color, index) => ({
            ...color,
            position: (100 * index) / state.gradient.length,
          }))

          const randomColor = Math.floor(Math.random() * 360)

          const updatedGradient = [
            ...updatedGroup,
            {
              id,
              hue: randomColor,
              saturation: 100,
              lightness: 50,
              opacity: 1,
              hsl: `hsl(${randomColor}, 100%, 50%, 1)`,
              position: newPosition,
              disabled: false,
            },
          ]

          // Update the background gradient
          const newBackgroundGradient = setBackgroundGradient(
            updatedGradient,
            state.rotate,
          )

          return {
            gradient: updatedGradient,
            backgroundGradient: newBackgroundGradient,
          }
        })
      },

      removeColor: (id: number) => {
        set((state: GradientStore) => {
          const updatedGradient = state.gradient
            .filter((colorGroup) => colorGroup.id !== id)
            .map((colorGroup, index, arr) => ({
              ...colorGroup,
              position: (100 * index) / (arr.length - 1),
            }))

          // Update the background gradient
          const newBackgroundGradient = setBackgroundGradient(
            updatedGradient,
            state.rotate,
          )

          return {
            gradient: updatedGradient,
            backgroundGradient: newBackgroundGradient,
          }
        })
      },

      setGradientHsl: (id: number, hsl: string) => {
        set((state: GradientStore) => {
          const updatedGradient = state.gradient.map((colorGroup) => {
            if (colorGroup.id === id) {
              const [hue, saturation, lightness, opacity] = hsl
                .replace(/hsla\(|hsl\(|\)|%/g, "")
                .split(",")
                .map((value) => Number(value))

              return {
                ...colorGroup,
                hue,
                saturation,
                lightness,
                opacity,
                hsl,
              }
            }

            return colorGroup
          })

          // Update the background gradient
          const newBackgroundGradient = setBackgroundGradient(
            updatedGradient,
            state.rotate,
          )

          return {
            gradient: updatedGradient,
            backgroundGradient: newBackgroundGradient,
          }
        })
      },

      random: () => {
        set((state: GradientStore) => {
          const updatedGradient = state.gradient.map((colorGroup) => {
            const randomColor = Number(
              Math.floor(Math.random() * 360).toFixed(0),
            )
            return {
              ...colorGroup,
              hue: randomColor,
              saturation: colorGroup.saturation,
              lightness: colorGroup.lightness,
              opacity: colorGroup.opacity,
              hsl: `hsl(${randomColor}, ${colorGroup.saturation}%, ${colorGroup.lightness}%, ${colorGroup.opacity})`,
            }
          })

          // Update the background gradient
          const newBackgroundGradient = setBackgroundGradient(
            updatedGradient,
            state.rotate,
          )

          return {
            gradient: updatedGradient,
            backgroundGradient: newBackgroundGradient,
          }
        })
      },

      setRotate: (rotate: number) => {
        set((state: GradientStore) => {
          const newBackgroundGradient = setBackgroundGradient(
            state.gradient,
            rotate,
          )

          return {
            rotate,
            backgroundGradient: newBackgroundGradient,
          }
        })
      },

      setBgWidth: (width: number) => set({ bgWidth: width }),
    }),
    {
      name: "gradient",
    },
  ),
)
