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

export interface CssProps {
  position: "fixed" | "absolute"
  left: string
  top: string
  width: string
  height: "100vh" | "100%"
  "z-index": string
  "background-size": string
  "background-position": string
  "background-image": string
  css: string
}

export type ClassValue =
  | string
  | true
  | [boolean, string, string | null]
  | [boolean, string]
  | [string, string, string | null]
  | [string, string]
