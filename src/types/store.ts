import { GradientList, HslaColorOptions, CssProps, GradientObj } from "./index"

export interface Identifiable {
  id: string
}

export interface GradientStore {
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

export type GradientStoreSetters = {
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
  setGradientValue: (
    id: string,
    { key, value }: { key: keyof GradientObj; value: number | string | null },
  ) => void

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

export type GradientStoreState = GradientStore & GradientStoreSetters
