// icon:close | CSS Icons https://css.gg/ | Astrit
import React from "react"

function IconClose({
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
      style={{ width: `${width}px`, height: `${height}px` }}
      onClick={onClick}
    >
      <svg width="100%" height="100%" fill="none" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M6.225 4.811a1 1 0 00-1.414 1.414L10.586 12 4.81 17.775a1 1 0 101.414 1.414L12 13.414l5.775 5.775a1 1 0 001.414-1.414L13.414 12l5.775-5.775a1 1 0 00-1.414-1.414L12 10.586 6.225 4.81z"
        />
      </svg>
    </div>
  )
}

export default IconClose
