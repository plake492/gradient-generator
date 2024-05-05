export interface GradientObj {
  id: string
  rotate: number
  disabled: boolean
  gradient: string
  colors: HslaObj[]
}

export interface HslaObj {
  id: string
  hue: number
  saturation: number
  lightness: number
  alpha: number
  position: number
  hsla: string
  disabled?: boolean
}

export type HslaColorOptions =
  | "hue"
  | "saturation"
  | "lightness"
  | "alpha"
  | "position"

export type GradientList = GradientObj[]
