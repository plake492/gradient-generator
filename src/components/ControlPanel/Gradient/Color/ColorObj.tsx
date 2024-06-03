import React from "react"
import HexInput from "./HexInput"
import ColorActions from "./ColorActions"
import { convertHexToHsl, convertHslToHex } from "../../../../helpers/utils"
import { HslaObj, HslaColorOptions } from "../../../../types"
import { useGradientStore } from "../../../../store"
import useBemify from "../../../../hooks/useBemify"
// import { useAutoAnimate } from "@formkit/auto-animate/react"

interface ColorSelectorsProps {
  colorGroup: HslaObj
  parentId: string
  index: number
  disableRemove: boolean
  positionDefault: number
  DragIcon: React.ReactNode
}

export default function ColorObj({
  colorGroup,
  parentId,
  index,
  disableRemove,
  positionDefault,
  DragIcon,
}: ColorSelectorsProps) {
  // const [parent] = useAutoAnimate()
  const [collapse, setCollapse] = React.useState(false)
  const bem = useBemify("control-panel")

  const { widthSmall, setColorValue, setGradientHsl } = useGradientStore()

  const {
    id,
    hue,
    saturation,
    lightness,
    position,
    alpha,
    hsla,
    disabled,
    locked,
  } = colorGroup

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColorValue(colorGroup.id, parentId, {
      key: e.target.name as HslaColorOptions,
      value: Number(e.target.value),
    })
  }

  const handleAltClick = (
    e: React.MouseEvent<HTMLInputElement>,
    value: number,
  ) => {
    if (e.altKey) {
      const target = e.target as HTMLInputElement
      setColorValue(colorGroup.id, parentId, {
        key: target.name as HslaColorOptions,
        value: value,
      })
    }
  }

  const handleSubmitHexValue = (value: string) => {
    setGradientHsl(id, parentId, convertHexToHsl(value))
  }

  return (
    <section className={bem("slide-group-wrapper")}>
      <div
        // ref={parent}
        className={bem("slide-group", "--child", "flex-1")}
        style={
          {
            "--child-gradient": hsla,
          } as React.CSSProperties
        }
      >
        {/* Color Header */}
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-sm">
            {DragIcon}
            <span className={bem("slide-group-color-indicator")}></span>
            <p className="text-sm mb-none text-end no-wrap">
              {!widthSmall ? `Color: ${index + 1}` : ""}
            </p>
          </div>
          <ColorActions
            id={id}
            parentId={parentId}
            collapse={collapse}
            setCollapse={setCollapse}
            locked={locked}
            disabled={disabled}
            disableRemove={disableRemove}
          />
        </div>
        {collapse ? (
          <div className="ml-lg">
            <HexInput
              hsla={convertHslToHex(hsla)}
              onSubmit={handleSubmitHexValue}
            />

            <div className={bem("slider-wrapper")}>
              <label htmlFor="slider" className={bem("label")}>
                Color ({hue.toFixed(0)})
              </label>
              <input
                type="range"
                min="0"
                max="360"
                step="1"
                id="slider"
                value={hue}
                name="hue"
                onChange={handleChange}
                className={bem("slider", "--child")}
              />
            </div>
            <div className={bem("slider-wrapper")}>
              <label htmlFor="saturation" className={bem("label")}>
                Saturation ({saturation.toFixed(0)}%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                id="saturation"
                value={saturation}
                name="saturation"
                onChange={handleChange}
                onClick={(e) => handleAltClick(e, 100)}
                className={bem("slider", "--child")}
              />
            </div>
            <div className={bem("slider-wrapper")}>
              <label htmlFor="Lightness" className={bem("label")}>
                Lightness ({lightness.toFixed(0)}%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                id="Lightness"
                value={lightness}
                name="lightness"
                onChange={handleChange}
                className={bem("slider", "--child")}
                onClick={(e) => handleAltClick(e, 50)}
              />
            </div>
            <div className={bem("slider-wrapper")}>
              <label htmlFor="alpha" className={bem("label")}>
                Alpha ({alpha.toFixed(2)}%)
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                id="alpha"
                value={alpha}
                name="alpha"
                onChange={handleChange}
                className={bem("slider", "--child")}
                onClick={(e) => handleAltClick(e, 0.5)}
              />
            </div>
            <div className={bem("slider-wrapper")}>
              <label htmlFor="position" className={bem("label")}>
                Position ({position.toFixed(0)}%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                id="position"
                value={position}
                name="position"
                onChange={handleChange}
                onClick={(e) => handleAltClick(e, positionDefault)}
                className={bem("slider", "--child")}
              />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
