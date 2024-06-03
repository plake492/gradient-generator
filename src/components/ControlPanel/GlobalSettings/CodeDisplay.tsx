import React from "react"
import { useGradientStore } from "../../../store"

export default function CodeDisplay() {
  const [showHslText, setShowHslText] = React.useState(false)
  const [cursorPos, setCursorPos] = React.useState({ x: 0, y: 0 })
  const [showCopyText, setShowCopyText] = React.useState(false)
  const [copied, setCopied] = React.useState(false)

  const { cssProps } = useGradientStore()

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY })
  }

  const handleMouseEnter = () => setShowCopyText(true)
  const handleMouseLeave = () => setShowCopyText(false)

  const handleClipboard = () => {
    navigator.clipboard.writeText(cssProps.css)
    setCopied(true)
  }

  return (
    <>
      <div>
        {showCopyText ? (
          <div
            style={{
              position: "fixed",
              top: cursorPos.y,
              left: cursorPos.x,
              background: copied ? "#8f84" : "#ffffff44",
              backdropFilter: "blur(8px)",
              padding: "0.5rem",
              borderRadius: "10px",
              color: copied ? "#dddddd" : "#111111",
            }}
          >
            {/* Replace this with the content you want in the text box */}
            {copied ? "Copied" : "Copy to clipboard"}
          </div>
        ) : null}
      </div>
      <div>
        <input
          id="showCode"
          className="mr-sm"
          type="checkbox"
          checked={showHslText}
          onChange={() => setShowHslText((prev) => !prev)}
        />
        <label htmlFor="showCode" className="text-xs font-weight-700 d-inline">
          {showHslText ? "Hide Code" : "Show Code"}
        </label>
      </div>
      {showHslText ? (
        <div
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClipboard}
          style={{
            backgroundColor: "#000",
            borderRadius: "10px",
            cursor: "pointer",
          }}
          className="p-sm"
        >
          {cssProps.css.split(";").map((text, i, arr) => (
            <p
              className="text-xs mb-none ml-sm"
              style={{ lineHeight: "1.75rem" }}
              key={text}
            >
              {text.split(":").map((text, j) =>
                j === 0 ? (
                  <b>
                    {text}
                    {i === arr.length - 1 ? "" : ":"}{" "}
                  </b>
                ) : (
                  text.trim()
                ),
              )}
              {i === arr.length - 1 ? "" : ";"}
            </p>
          ))}
        </div>
      ) : null}
    </>
  )
}
