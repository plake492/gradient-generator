export interface GradientObj {
  id: string
  rotate: number
  disabled: boolean
  colors: HslaObj[]
}

export interface HslaObj {
  id: string
  hue: number
  saturation: number
  lightness: number
  opacity: number
  position: number
  hsl: string
  disabled?: boolean
}

export type HslaColorOptions =
  | "hue"
  | "saturation"
  | "lightness"
  | "opacity"
  | "position"

export type GradientList = GradientObj[]
