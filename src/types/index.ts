export interface GradientObj {
  id: string
  rotate: number
  disabled: boolean
  gradient: string
  locked: boolean
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
  locked: boolean
}

export type HslaColorOptions =
  | "hue"
  | "saturation"
  | "lightness"
  | "alpha"
  | "position"

export type GradientList = GradientObj[]

export type ClassValue =
  | string
  | true
  | [boolean, string, string | null]
  | [boolean, string]
  | [string, string, string | null]
  | [string, string]
