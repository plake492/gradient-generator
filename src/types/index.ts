export interface GradientObj {
  id: string
  rotate: number
  disabled: boolean
  gradient: string
  locked: boolean
  type: "linear" | "radial" | "conic"
  at: string
  radialType: "ellipse" | "circle"
  radialSize:
    | "closest-side"
    | "closest-corner"
    | "farthest-side"
    | "farthest-corner"
  radialHue: "in hsl shorter hue" | "in hsl longer hue" | undefined | null
  colors: HslaObj[]
}

export type GradientValueOptions = "rotate" | "type" | "at" | "radialType"

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
  height: "100dvh" | "100%"
  "z-index": string
  "background-size": string
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

export type HSLA = {
  hue: number
  saturation: number
  lightness: number
  alpha: number
  hsla: string
}
