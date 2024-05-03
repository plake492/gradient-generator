// icon:layout-panel-left | Lucide https://lucide.dev/ | Lucide
import * as React from "react"

function IconLayoutPanelLeft({
  width = 36,
  height = 36,
  onClick,
}: {
  width?: number
  height?: number
  onClick?: React.MouseEventHandler<HTMLDivElement>
}) {
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
      onClick={onClick}
    >
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
    </div>
  )
}

export default IconLayoutPanelLeft
