import React from "react"
import { useGradientStore } from "../store"
import { IconClose, IconGrow, IconShrink } from "./BaseIcons"

export default function ControlPanelGlobalSettings({
  bem,
  handleSetShow,
  widthSmall,
  setWidthSmall,
}: {
  bem: Function
  handleSetShow: () => void
  widthSmall: boolean
  setWidthSmall: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const {
    backgroundGradient,
    rotate,
    setRotate,
    bgWidth,
    setBgWidth,
    noiseOn,
    setNoise,
    isWindowHeight,
    setIsWindowHeight,
  } = useGradientStore()

  const [showHslText, setShowHslText] = React.useState(false)

  return (
    <>
      <div
        className={bem(
          "close-btn",
          "d-flex",
          "justify-content-between",
          "align-items-baseline",
        )}
      >
        <IconClose
          onClick={handleSetShow}
          variant="dark"
          tooltip="Close Panel"
        />
        {/* <button
                onClick={() =>
                  setPosition((prev) =>
                    prev === 0
                      ? `calc(100% - ${widthSmall ? 250 : 500}px - 4rem)`
                      : 0,
                  )
                }
              >
                {position !== 0 ? "Left" : "Right"}
              </button> */}
        {widthSmall ? (
          <IconGrow onClick={() => setWidthSmall((prev) => !prev)} />
        ) : (
          <IconShrink onClick={() => setWidthSmall((prev) => !prev)} />
        )}
      </div>
      <div
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          background: "black",
          zIndex: 3,
          padding: "0.25rem",
          borderRadius: "10px",
        }}
      >
        <input
          id="showCode"
          className="mr-sm"
          type="checkbox"
          checked={showHslText}
          onChange={() => setShowHslText((prev) => !prev)}
        />
        <label htmlFor="showCode" className="text-xs font-weight-700 d-inline">
          {showHslText ? backgroundGradient : "Show Code"}
        </label>
      </div>
      <div
        className={bem("slide-group")}
        style={
          {
            "--parent-gradient": backgroundGradient,
          } as React.CSSProperties
        }
      >
        <div className={bem("slider-wrapper")}>
          <label htmlFor="bgWidth" className={bem("label")}>
            BG Width ({bgWidth}%)
          </label>
          <input
            type="range"
            min="100"
            max="500"
            step="50"
            id="bgWidth"
            value={bgWidth}
            onChange={(e) => setBgWidth(Number(e.target.value))}
            className={bem("slider", "--parent")}
          />
        </div>

        <div className={bem("slider-wrapper")}>
          <label htmlFor="rotate" className={bem("label")}>
            Rotate ({rotate}deg)
          </label>
          <input
            type="range"
            min="0"
            max="360"
            step="1"
            id="rotate"
            value={rotate}
            onChange={(e) => setRotate(Number(e.target.value))}
            className={bem("slider", "--parent")}
          />
        </div>

        <div>
          <input
            id="noiseOn"
            className="mr-sm"
            type="checkbox"
            checked={noiseOn}
            onChange={() => setNoise(!noiseOn)}
          />
          <label htmlFor="noiseOn" className="text-xs font-weight-700 d-inline">
            Noise overlay
          </label>
        </div>
        <div>
          <input
            id="windowHeight"
            className="mr-sm"
            type="checkbox"
            checked={isWindowHeight}
            onChange={() => setIsWindowHeight(!isWindowHeight)}
          />
          <label
            htmlFor="windowHeight"
            className="text-xs font-weight-700 d-inline"
          >
            Fixed to window height
          </label>
        </div>
      </div>
    </>
  )
}
