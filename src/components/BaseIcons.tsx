/* https://reactsvgicons.com/ */

import * as React from "react"
import useBemify from "../hooks/useBemify"

interface IconProps {
  variant?: "light" | "dark"
  width?: number
  height?: number
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  tooltip?: string
  appendText?: string
  border?: boolean
  small?: boolean
  type?: "submit" | "button" | "reset"
  disabled?: boolean
}

function IconWrapper({
  children,
  width = 24,
  height = 24,
  onClick,
  variant,
  appendText,
  border,
  small,
  disabled,
  type = "button",
}: IconProps & { children: React.ReactNode }) {
  const bem = useBemify("icon-btn")

  return (
    <button
      style={
        {
          "--width": `${width}px`,
          "--height": `${height}px`,
        } as React.CSSProperties
      }
      onClick={onClick}
      type={type}
      disabled={disabled}
      className="icon-btn-wrapper"
    >
      <div
        className={bem(
          "",
          [!!variant, `--${variant}`],
          [!!appendText, "--with-text"],
          [!!border, "--border"],
          [!!small, "--small"],
          [!!disabled, "--disabled"],
        )}
      >
        {/* {tooltip ? <div className={bem("tooltip")}>{tooltip}</div> : null} */}
        {children}
        {appendText ? (
          <span className={bem("append-text")}>{appendText}</span>
        ) : null}
      </div>
    </button>
  )
}

export function IconPlus(iconProps: IconProps) {
  return (
    <IconWrapper {...iconProps}>
      <svg fill="currentColor" viewBox="0 0 16 16" height="100%" width="100%">
        <path
          fillRule="evenodd"
          d="M8 2a.5.5 0 01.5.5v5h5a.5.5 0 010 1h-5v5a.5.5 0 01-1 0v-5h-5a.5.5 0 010-1h5v-5A.5.5 0 018 2z"
        />
      </svg>
    </IconWrapper>
  )
}

export function IconPlusList(iconProps: IconProps) {
  return (
    <IconWrapper {...iconProps}>
      <svg viewBox="0 0 24 24" fill="currentColor" height="100%" width="100%">
        <path d="M19 15v-3h-2v3h-3v2h3v3h2v-3h3v-2h-.937zM4 7h11v2H4zm0 4h11v2H4zm0 4h8v2H4z" />
      </svg>
    </IconWrapper>
  )
}

export function IconPanel(iconProps: IconProps) {
  return (
    <IconWrapper {...iconProps}>
      <svg
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        viewBox="0 0 24 24"
        height="100%"
        width="100%"
      >
        <path d="M4 3 H9 A1 1 0 0 1 10 4 V20 A1 1 0 0 1 9 21 H4 A1 1 0 0 1 3 20 V4 A1 1 0 0 1 4 3 z" />
        <path d="M15 3 H20 A1 1 0 0 1 21 4 V9 A1 1 0 0 1 20 10 H15 A1 1 0 0 1 14 9 V4 A1 1 0 0 1 15 3 z" />
        <path d="M15 14 H20 A1 1 0 0 1 21 15 V20 A1 1 0 0 1 20 21 H15 A1 1 0 0 1 14 20 V15 A1 1 0 0 1 15 14 z" />
      </svg>
    </IconWrapper>
  )
}

export function IconClose(iconProps: IconProps) {
  return (
    <IconWrapper {...iconProps}>
      <svg width="100%" height="100%" fill="none" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M6.225 4.811a1 1 0 00-1.414 1.414L10.586 12 4.81 17.775a1 1 0 101.414 1.414L12 13.414l5.775 5.775a1 1 0 001.414-1.414L13.414 12l5.775-5.775a1 1 0 00-1.414-1.414L12 10.586 6.225 4.81z"
        />
      </svg>
    </IconWrapper>
  )
}

export function IconBxCollapseVertical(iconProps: IconProps) {
  return (
    <IconWrapper {...iconProps}>
      <svg viewBox="0 0 24 24" fill="currentColor" height="100%" width="100%">
        <path d="M12 7.59L7.05 2.64 5.64 4.05 12 10.41l6.36-6.36-1.41-1.41L12 7.59zM5.64 19.95l1.41 1.41L12 16.41l4.95 4.95 1.41-1.41L12 13.59l-6.36 6.36z" />
      </svg>
    </IconWrapper>
  )
}

export function IconBxExpandVertical(iconProps: IconProps) {
  return (
    <IconWrapper {...iconProps}>
      <svg viewBox="0 0 24 24" fill="currentColor" height="100%" width="100%">
        <path d="M12 19.24l-4.95-4.95-1.41 1.42L12 22.07l6.36-6.36-1.41-1.42L12 19.24zM5.64 8.29l1.41 1.42L12 4.76l4.95 4.95 1.41-1.42L12 1.93 5.64 8.29z" />
      </svg>
    </IconWrapper>
  )
}

export function IconGrow(iconProps: IconProps) {
  return (
    <IconWrapper {...iconProps}>
      <svg fill="none" viewBox="0 0 24 24" height="100%" width="100%">
        <path
          fill="currentColor"
          d="M4.243 7.757l1.414 1.415L3.828 11h16.344l-1.829-1.828 1.414-1.415L24 12l-4.243 4.243-1.414-1.415L20.171 13H3.828l1.829 1.828-1.414 1.415L0 12l4.243-4.243z"
        />
      </svg>
    </IconWrapper>
  )
}

export function IconShrink(iconProps: IconProps) {
  return (
    <IconWrapper {...iconProps}>
      <svg fill="none" viewBox="0 0 24 24" height="100%" width="100%">
        <path
          fill="currentColor"
          d="M1.503 6h2v5h4.172L5.846 9.172l1.415-1.415L11.503 12l-4.242 4.243-1.415-1.415L7.675 13H3.503v5h-2V6zM20.497 6h2v12h-2v-5h-4.172l1.829 1.829-1.415 1.414L12.497 12l4.242-4.243 1.415 1.415L16.325 11h4.172V6z"
        />
      </svg>
    </IconWrapper>
  )
}

export function IconTrash(iconProps: IconProps) {
  return (
    <IconWrapper {...iconProps}>
      <svg viewBox="0 0 24 24" fill="currentColor" height="100%" width="100%">
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M17 6h5v2h-2v13a1 1 0 01-1 1H5a1 1 0 01-1-1V8H2V6h5V3a1 1 0 011-1h8a1 1 0 011 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z" />
      </svg>
    </IconWrapper>
  )
}

export function IconLightOff(iconProps: IconProps) {
  return (
    <IconWrapper {...iconProps}>
      <svg fill="currentColor" viewBox="0 0 16 16" height="100%" width="100%">
        <path
          fillRule="evenodd"
          d="M2.23 4.35A6.004 6.004 0 002 6c0 1.691.7 3.22 1.826 4.31.203.196.359.4.453.619l.762 1.769A.5.5 0 005.5 13a.5.5 0 000 1 .5.5 0 000 1l.224.447a1 1 0 00.894.553h2.764a1 1 0 00.894-.553L10.5 15a.5.5 0 000-1 .5.5 0 000-1 .5.5 0 00.288-.091L9.878 12H5.83l-.632-1.467a2.954 2.954 0 00-.676-.941 4.984 4.984 0 01-1.455-4.405l-.837-.836zm1.588-2.653l.708.707a5 5 0 017.07 7.07l.707.707a6 6 0 00-8.484-8.484zm-2.172-.051a.5.5 0 01.708 0l12 12a.5.5 0 01-.708.708l-12-12a.5.5 0 010-.708z"
        />
      </svg>
    </IconWrapper>
  )
}

export function IconLightOn(iconProps: IconProps) {
  return (
    <IconWrapper {...iconProps}>
      <svg fill="currentColor" viewBox="0 0 16 16" height="100%" width="100%">
        <path d="M2 6a6 6 0 1110.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0110.5 13a.5.5 0 010 1 .5.5 0 010 1l-.224.447a1 1 0 01-.894.553H6.618a1 1 0 01-.894-.553L5.5 15a.5.5 0 010-1 .5.5 0 010-1 .5.5 0 01-.46-.302l-.761-1.77a1.964 1.964 0 00-.453-.618A5.984 5.984 0 012 6zm6-5a5 5 0 00-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 008 1z" />
      </svg>
    </IconWrapper>
  )
}

export function IconRandomArrows(iconProps: IconProps) {
  return (
    <IconWrapper {...iconProps}>
      <svg
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        viewBox="0 0 24 24"
        height="100%"
        width="100%"
      >
        <path stroke="none" d="M0 0h24v24H0z" />
        <path d="M20 21.004h-4v-4M16 21.004l5-5M6.5 9.504l-3.5-2L5 4M3 7.504l6.83-1.87M4 16.004l4-1 1 4M8 15.004l-3.5 6M21 5.004l-.5 4-4-.5M20.5 9.004l-4.5-5.5" />
      </svg>
    </IconWrapper>
  )
}

export function IconThreeDots(iconProps: IconProps) {
  return (
    <IconWrapper {...iconProps}>
      <svg
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        viewBox="0 0 24 24"
        height="100%"
        width="100%"
      >
        <path stroke="none" d="M0 0h24v24H0z" />
        <path d="M6 12 A1 1 0 0 1 5 13 A1 1 0 0 1 4 12 A1 1 0 0 1 6 12 z" />
        <path d="M13 12 A1 1 0 0 1 12 13 A1 1 0 0 1 11 12 A1 1 0 0 1 13 12 z" />
        <path d="M20 12 A1 1 0 0 1 19 13 A1 1 0 0 1 18 12 A1 1 0 0 1 20 12 z" />
      </svg>
    </IconWrapper>
  )
}

export function IconUnlock(iconProps: IconProps) {
  return (
    <IconWrapper {...iconProps}>
      <svg
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        viewBox="0 0 24 24"
        height="100%"
        width="100%"
      >
        <path d="M5 11 H19 A2 2 0 0 1 21 13 V20 A2 2 0 0 1 19 22 H5 A2 2 0 0 1 3 20 V13 A2 2 0 0 1 5 11 z" />
        <path d="M7 11V7a5 5 0 019.9-1" />
      </svg>
    </IconWrapper>
  )
}

export function IconLock(iconProps: IconProps) {
  return (
    <IconWrapper {...iconProps}>
      <svg
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        viewBox="0 0 24 24"
        height="100%"
        width="100%"
      >
        <path
          fill="currentColor"
          d="M5 11 H19 A2 2 0 0 1 21 13 V20 A2 2 0 0 1 19 22 H5 A2 2 0 0 1 3 20 V13 A2 2 0 0 1 5 11 z"
        />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    </IconWrapper>
  )
}

export function IconChevronLeft(iconProps: IconProps) {
  return (
    <IconWrapper {...iconProps}>
      <svg fill="currentColor" viewBox="0 0 16 16" height="100%" width="100%">
        <path
          fillRule="evenodd"
          d="M11.354 1.646a.5.5 0 010 .708L5.707 8l5.647 5.646a.5.5 0 01-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z"
        />
      </svg>
    </IconWrapper>
  )
}

export function IconChevronRight(iconProps: IconProps) {
  return (
    <IconWrapper {...iconProps}>
      <svg fill="currentColor" viewBox="0 0 16 16" height="100%" width="100%">
        <path
          fillRule="evenodd"
          d="M4.646 1.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L10.293 8 4.646 2.354a.5.5 0 010-.708z"
        />
      </svg>
    </IconWrapper>
  )
}

export function IconUpdate(iconProps: IconProps) {
  return (
    <IconWrapper {...iconProps}>
      <svg fill="currentColor" viewBox="0 0 15 15" height="100%" width="100%">
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M1.903 7.297c0 3.044 2.207 5.118 4.686 5.547a.521.521 0 11-.178 1.027C3.5 13.367.861 10.913.861 7.297c0-1.537.699-2.745 1.515-3.663.585-.658 1.254-1.193 1.792-1.602H2.532a.5.5 0 010-1h3a.5.5 0 01.5.5v3a.5.5 0 01-1 0V2.686l-.001.002c-.572.43-1.27.957-1.875 1.638-.715.804-1.253 1.776-1.253 2.97zm11.108.406c0-3.012-2.16-5.073-4.607-5.533a.521.521 0 11.192-1.024c2.874.54 5.457 2.98 5.457 6.557 0 1.537-.699 2.744-1.515 3.663-.585.658-1.254 1.193-1.792 1.602h1.636a.5.5 0 110 1h-3a.5.5 0 01-.5-.5v-3a.5.5 0 111 0v1.845h.002c.571-.432 1.27-.958 1.874-1.64.715-.803 1.253-1.775 1.253-2.97z"
          clipRule="evenodd"
        />
      </svg>
    </IconWrapper>
  )
}

export function IconArrowUpShort(iconProps: IconProps) {
  return (
    <IconWrapper {...iconProps}>
      <svg fill="currentColor" viewBox="0 0 16 16" height="100%" width="100%">
        <path
          fillRule="evenodd"
          d="M8 12a.5.5 0 00.5-.5V5.707l2.146 2.147a.5.5 0 00.708-.708l-3-3a.5.5 0 00-.708 0l-3 3a.5.5 0 10.708.708L7.5 5.707V11.5a.5.5 0 00.5.5z"
        />
      </svg>
    </IconWrapper>
  )
}

export function IconArrowDownShort(iconProps: IconProps) {
  return (
    <IconWrapper {...iconProps}>
      <svg fill="currentColor" viewBox="0 0 16 16" height="100%" width="100%">
        <path
          fillRule="evenodd"
          d="M8 4a.5.5 0 01.5.5v5.793l2.146-2.147a.5.5 0 01.708.708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 11.708-.708L7.5 10.293V4.5A.5.5 0 018 4z"
        />
      </svg>
    </IconWrapper>
  )
}
export function IconDrag(iconProps: IconProps) {
  return (
    <IconWrapper {...iconProps}>
      <svg fill="none" viewBox="0 0 15 15" height="100%" width="100%">
        <path
          stroke="currentColor"
          d="M9.5 3a.5.5 0 110-1 .5.5 0 010 1zM9.5 8a.5.5 0 110-1 .5.5 0 010 1zM9.5 13a.5.5 0 110-1 .5.5 0 010 1zM5.5 3a.5.5 0 110-1 .5.5 0 010 1zM5.5 8a.5.5 0 110-1 .5.5 0 010 1zM5.5 13a.5.5 0 110-1 .5.5 0 010 1z"
        />
      </svg>
    </IconWrapper>
  )
}
