import React from "react"
import { useGradientStore } from "../store"
import useBemify from "../hooks/useBemify"
import { ColorGroup } from "../types"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import {
  IconBxCollapseVertical,
  IconBxExpandVertical,
  IconTrash,
  IconLightOn,
  IconLightOff,
} from "./BaseIcons"
import HexInput from "./HexInput"
import { convertHexToHsl, convertHslToHex } from "../helpers/utils"

export default function ColorSelectors({
  colorGroup,
  index,
  disableRemove,
  hideColorText,
}: {
  colorGroup: ColorGroup
  index: number
  disableRemove: boolean
  hideColorText?: boolean
}) {
  const [parent] = useAutoAnimate()

  const [collapse, setCollapse] = React.useState(false)

  const { setGradient, removeColor, setGradientHsl, setGradientDisabled } =
    useGradientStore()
  const { id, hue, saturation, lightness, position, opacity, hsl, disabled } =
    colorGroup

  const bem = useBemify("control-panel")
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGradient(colorGroup.id, {
      key: e.target.name,
      value: Number(e.target.value),
    })
  }

  const handleDisable = () => setGradientDisabled(id, !disabled)

  return (
    <section className={bem("slide-group-wrapper")}>
      <div>
        {!disableRemove ? (
          disabled ? (
            <IconLightOff onClick={handleDisable} width={16} height={16} />
          ) : (
            <IconLightOn onClick={handleDisable} width={16} height={16} />
          )
        ) : null}
      </div>
      <div
        ref={parent}
        className={bem("slide-group", "--child", "flex-1")}
        style={
          {
            "--child-gradient": hsl,
          } as React.CSSProperties
        }
      >
        <div className="d-flex justify-content-between align-items-center">
          <p className="text-sm mb-none text-end">Color: {index + 1}</p>
          <div className="d-flex align-items-center gap-">
            {!hideColorText ? (
              <p className="text-xs mb-none text-end mr-sm">{hsl}</p>
            ) : null}
            {collapse ? (
              <IconBxCollapseVertical
                tooltip="Collapse"
                width={16}
                height={16}
                onClick={() => setCollapse((prev) => !prev)}
                border
              />
            ) : (
              <IconBxExpandVertical
                tooltip="Expand"
                width={16}
                height={16}
                onClick={() => setCollapse((prev) => !prev)}
                border
              />
            )}
          </div>
        </div>
        {collapse ? (
          <>
            <div className="d-flex justify-content-between align-items-center">
              {!disableRemove ? (
                <IconTrash
                  onClick={() => removeColor(id)}
                  width={16}
                  height={16}
                />
              ) : (
                <div></div>
              )}
              <HexInput
                hsl={convertHslToHex(hsl)}
                onSubmit={(value) => setGradientHsl(id, convertHexToHsl(value))}
              />
            </div>
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
                className={bem("slider", "--child")}
              />
            </div>
            <div className={bem("slider-wrapper")}>
              <label htmlFor="opacity" className={bem("label")}>
                Opacity ({opacity.toFixed(2)}%)
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                id="opacity"
                value={opacity}
                name="opacity"
                onChange={handleChange}
                className={bem("slider", "--child")}
              />
            </div>
          </>
        ) : null}
      </div>
    </section>
  )
}
