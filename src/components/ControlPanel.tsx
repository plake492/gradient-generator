import React from "react"
import IconClose from "./CloseIcon"
import IconLayoutPanelLeft from "./IconLayoutPanelLeft"
import useBemify from "../hooks/useBemify"
import { CSSTransition } from "react-transition-group"
import { useGradientStore } from "../store"
import { useOnClickOutside } from "../hooks/useOnClickOutside"

export default function ControlPanel() {
  const {
    startColor,
    saturation,
    lightness,
    position,
    setStartColor,
    setSaturation,
    setLightness,
    setPosition,
    startColor2,
    saturation2,
    lightness2,
    position2,
    setStartColor2,
    setSaturation2,
    setLightness2,
    setPosition2,
    rotate,
    setRotate,
    bgWidth,
    setBgWidth,
  } = useGradientStore()

  const [show, setShow] = React.useState(false)
  const handleSetShow = () => setShow((prev) => !prev)

  const bem = useBemify("control-panel")

  const outsideClickRef = useOnClickOutside(() => setShow(false))

  return (
    <>
      <div className={bem("open-btn")}>
        <IconLayoutPanelLeft onClick={handleSetShow} />
      </div>

      <CSSTransition
        in={show}
        nodeRef={outsideClickRef}
        timeout={300}
        classNames={bem("animation")}
        unmountOnExit
      >
        <aside className={bem()} ref={outsideClickRef}>
          <div className={bem("close-btn")}>
            <IconClose onClick={handleSetShow} />
          </div>
          <div
            className={bem("slide-group")}
            style={
              {
                "--slider-thumb-color": startColor,
                "--slider-thumb-saturation": `${saturation}%`,
                "--slider-thumb-lightness": `${lightness}%`,
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
                step="1"
                id="bgWidth"
                value={bgWidth}
                onChange={(e) => setBgWidth(Number(e.target.value))}
                className={bem("slider")}
              />
            </div>
          </div>
          <div
            className={bem("slide-group", "child")}
            style={
              {
                "--slider-thumb-color": startColor,
                "--slider-thumb-saturation": `${saturation}%`,
                "--slider-thumb-lightness": `${lightness}%`,
              } as React.CSSProperties
            }
          >
            <div className={bem("slider-wrapper")}>
              <label htmlFor="slider" className={bem("label")}>
                Color ({startColor})
              </label>
              <input
                type="range"
                min="0"
                max="360"
                step="1"
                id="slider"
                value={startColor}
                onChange={(e) => setStartColor(Number(e.target.value))}
                className={bem("slider")}
              />
            </div>
            <div className={bem("slider-wrapper")}>
              <label htmlFor="saturation" className={bem("label")}>
                Saturation ({saturation}%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                id="saturation"
                value={saturation}
                onChange={(e) => setSaturation(Number(e.target.value))}
                className={bem("slider")}
              />
            </div>
            <div className={bem("slider-wrapper")}>
              <label htmlFor="Lightness" className={bem("label")}>
                Lightness ({lightness}%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                id="Lightness"
                value={lightness}
                onChange={(e) => setLightness(Number(e.target.value))}
                className={bem("slider")}
              />
            </div>
            <div className={bem("slider-wrapper")}>
              <label htmlFor="position" className={bem("label")}>
                Position ({position}%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                id="position"
                value={position}
                onChange={(e) => setPosition(Number(e.target.value))}
                className={bem("slider")}
              />
            </div>
          </div>
          <div
            className={bem("slide-group", "child")}
            style={
              {
                "--slider-thumb-color": startColor2,
                "--slider-thumb-saturation": `${saturation2}%`,
                "--slider-thumb-lightness": `${lightness2}%`,
              } as React.CSSProperties
            }
          >
            <div className={bem("slider-wrapper")}>
              <label htmlFor="slider2" className={bem("label")}>
                Color 2 ({startColor2})
              </label>
              <input
                type="range"
                min="0"
                max="360"
                step="1"
                id="slider2"
                value={startColor2}
                onChange={(e) => setStartColor2(Number(e.target.value))}
                className={bem("slider")}
              />
            </div>
            <div className={bem("slider-wrapper")}>
              <label htmlFor="saturation2" className={bem("label")}>
                Saturation 2 ({saturation2}%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                id="saturation2"
                value={saturation2}
                onChange={(e) => setSaturation2(Number(e.target.value))}
                className={bem("slider")}
              />
            </div>
            <div className={bem("slider-wrapper")}>
              <label htmlFor="Lightness2" className={bem("label")}>
                Lightness 2 ({lightness2}%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                id="Lightness2"
                value={lightness2}
                onChange={(e) => setLightness2(Number(e.target.value))}
                className={bem("slider")}
              />
            </div>
            <div className={bem("slider-wrapper")}>
              <label htmlFor="position2" className={bem("label")}>
                Position 2 ({position2}%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                id="position2"
                value={position2}
                onChange={(e) => setPosition2(Number(e.target.value))}
                className={bem("slider")}
              />
            </div>
          </div>
          <div
            className={bem("slide-group", "child")}
            style={
              {
                "--grad-1-color": startColor,
                "--grad-1-saturation": `${saturation}%`,
                "--grad-1-lightness": `${lightness}%`,
                "--grad-2-color": startColor2,
                "--grad-2-saturation": `${saturation2}%`,
                "--grad-2-lightness": `${lightness2}%`,
                "--rotate": `${rotate}deg`,
              } as React.CSSProperties
            }
          >
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
                className={bem("slider", "rotate")}
              />
            </div>
          </div>
        </aside>
      </CSSTransition>
    </>
  )
}
