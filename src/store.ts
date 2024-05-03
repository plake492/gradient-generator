import create from "zustand"
import { persist } from "zustand/middleware"

interface GradientStore {
  startColor: number
  saturation: number
  lightness: number
  position: number
  startColor2: number
  saturation2: number
  lightness2: number
  position2: number
  rotate: number
  bgWidth: number
}

type GradientStoreSetters = {
  setStartColor: (color: number) => void
  setSaturation: (saturation: number) => void
  setLightness: (lightness: number) => void
  setPosition: (position: number) => void
  setStartColor2: (color: number) => void
  setSaturation2: (saturation: number) => void
  setLightness2: (lightness: number) => void
  setPosition2: (position: number) => void
  setRotate: (rotate: number) => void
  setBgWidth: (width: number) => void
}

export const useGradientStore = create<GradientStore & GradientStoreSetters>(
  persist(
    (set: any) => ({
      startColor: 0,
      saturation: 100,
      lightness: 50,
      position: 0,
      startColor2: 0,
      saturation2: 100,
      lightness2: 50,
      position2: 100,
      rotate: 0,
      bgWidth: 100,
      setStartColor: (color: number) => set({ startColor: color }),
      setSaturation: (saturation: number) => set({ saturation }),
      setLightness: (lightness: number) => set({ lightness }),
      setPosition: (position: number) => set({ position }),
      setStartColor2: (color: number) => set({ startColor2: color }),
      setSaturation2: (saturation: number) => set({ saturation2: saturation }),
      setLightness2: (lightness: number) => set({ lightness2: lightness }),
      setPosition2: (position: number) => set({ position2: position }),
      setRotate: (rotate: number) => set({ rotate }),
      setBgWidth: (width: number) => set({ bgWidth: width }),
    }),
    {
      name: "gradient", // unique name
    },
  ),
)
