import React from "react"
import ColorSelectors from "./ColorSelectors"
import useBemify from "../hooks/useBemify"
import { CSSTransition } from "react-transition-group"
import { useGradientStore } from "../store"
import { useOnClickOutside } from "../hooks/useOnClickOutside"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import {
  IconPlus,
  IconPlusList,
  IconPanel,
  IconClose,
  IconGrow,
  IconShrink,
} from "./BaseIcons"

import { ColorGroup } from "../types"

export default function ControlPanel() {
  const [parent] = useAutoAnimate()

  const {
    backgroundGradient,
    rotate,
    setRotate,
    bgWidth,
    setBgWidth,
    gradient,
    addColor,
    random,
    noiseOn,
    setNoise,
    isWindowHeight,
    setIsWindowHeight,
  } = useGradientStore()

  const [show, setShow] = React.useState(false)
  const [widthSmall, setWidthSmall] = React.useState(false)
  const [position, setPosition] = React.useState(0)
  const [showHslText, setShowHslText] = React.useState(false)

  const handleSetShow = () => setShow((prev) => !prev)

  const bem = useBemify("control-panel")

  const outsideClickRef = useOnClickOutside(() => setShow(false))

  const disableRemove = gradient.length <= 2

  return (
    <>
      <div className={bem("open-btn")}>
        <IconPanel onClick={handleSetShow} tooltip="Hello" />
      </div>

      <CSSTransition
        in={show}
        nodeRef={outsideClickRef}
        timeout={300}
        classNames={bem("animation")}
        unmountOnExit
      >
        <aside
          className={bem()}
          style={
            {
              "--width": `${widthSmall ? 250 : 500}px`,
              "--position": position,
            } as React.CSSProperties
          }
          ref={outsideClickRef}
        >
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
            <label
              htmlFor="showCode"
              className="text-xs font-weight-700 d-inline"
            >
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
              <label
                htmlFor="noiseOn"
                className="text-xs font-weight-700 d-inline"
              >
                Turn on noise overlay
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

          {/* Color Section */}
          <div ref={parent}>
            {gradient.map((colorGroup: ColorGroup, index: number) => (
              <ColorSelectors
                key={colorGroup.id}
                colorGroup={colorGroup}
                index={index}
                disableRemove={disableRemove}
                hideColorText={widthSmall}
              />
            ))}
          </div>

          <div
            className="ml-md d-flex align-items-center gap-sm"
            onClick={addColor}
          >
            <IconPlusList appendText={"Add color"} />
          </div>

          <button onClick={random}>Random</button>
          <div className="d-flex align-items-center gap-sm">
            <IconPlus />
            <p className="text-xs">Add new Gradient</p>
          </div>
        </aside>
      </CSSTransition>
    </>
  )
}
