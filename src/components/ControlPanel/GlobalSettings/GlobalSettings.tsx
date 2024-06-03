import React from "react"
import { useGradientStore } from "../../../store"
import { IconClose, IconGrow, IconShrink } from "../../BaseIcons"
import CodeDisplay from "./CodeDisplay"
import { ClassValue } from "../../../types"
import { useAutoAnimate } from "@formkit/auto-animate/react"

interface ControlPanelGlobalSettingsProps {
  bem: (block: string, ...classes: ClassValue[]) => string
  handleSetShow: () => void
}

export default function GlobalSettings({
  bem,
  handleSetShow,
}: ControlPanelGlobalSettingsProps) {
  const [parent] = useAutoAnimate()
  const {
    backgroundGradient,
    bgWidth,
    setBgWidth,
    noiseOn,
    setNoise,
    isWindowHeight,
    setIsWindowHeight,
    setWidthSmall,
    widthSmall,
    // particlesOn,
    // setParticlesOn,
    // gridOn,
    // setGridOn,
  } = useGradientStore()

  const handleGrowShrinkClick = () => {
    setWidthSmall(!widthSmall)
  }

  return (
    <section ref={parent}>
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

        {widthSmall ? (
          <IconGrow onClick={handleGrowShrinkClick} />
        ) : (
          <IconShrink onClick={handleGrowShrinkClick} />
        )}
      </div>

      <CodeDisplay />

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
            id="bgWidth"
            value={bgWidth}
            onChange={(e) => setBgWidth(Number(e.target.value))}
            className={bem("slider", "--parent")}
          />
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

        {/* <div>
          <input
            id="gridOn"
            className="mr-sm"
            type="checkbox"
            checked={gridOn}
            onChange={() => setGridOn(!gridOn)}
          />
          <label htmlFor="gridOn" className="text-xs font-weight-700 d-inline">
            Grid overlay
          </label>
        </div> */}

        {/* <div>
          <input
            id="particelEffect"
            className="mr-sm"
            type="checkbox"
            checked={particlesOn}
            onChange={() => setParticlesOn(!particlesOn)}
          />
          <label
            htmlFor="particelEffect"
            className="text-xs font-weight-700 d-inline"
          >
            Particle Effect
          </label>
        </div> */}
      </div>
    </section>
  )
}
