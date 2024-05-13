import React from "react"
import { useGradientStore } from "../store"
import useBemify from "../hooks/useBemify"
import { HslaObj, HslaColorOptions } from "../types"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import {
  IconBxCollapseVertical,
  IconBxExpandVertical,
  IconTrash,
  IconLightOn,
  IconLightOff,
  IconUnlock,
  IconLock,
} from "./BaseIcons"
// import DropMenu from "./DropMenu"
// import HexInput from "./HexInput"
// import { convertHexToHsl, convertHslToHex } from "../helpers/utils"

interface ColorSelectorsProps {
  colorGroup: HslaObj
  parentId: string
  index: number
  disableRemove: boolean
  positionDefault: number
}

export default function ColorSelectors({
  colorGroup,
  parentId,
  index,
  disableRemove,
  positionDefault,
}: ColorSelectorsProps) {
  const [parent] = useAutoAnimate()
  const [collapse, setCollapse] = React.useState(false)
  const bem = useBemify("control-panel")

  const {
    widthSmall,
    setColorValue,
    removeColor,
    setColorDisabled,
    setColorLock,
    // setGradientHsl,
  } = useGradientStore()
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

  console.log("hsla ==>", hsla)

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

  const handleDisable = () => setColorDisabled(id, parentId)
  const handleLock = () => setColorLock(id, parentId)

  return (
    <section className={bem("slide-group-wrapper")}>
      <div>
        {/* {!disableRemove ? (
          disabled ? (
            <IconLightOff onClick={handleDisable} width={16} height={16} />
          ) : (
            <IconLightOn onClick={handleDisable} width={16} height={16} />
          )
        ) : null} */}
      </div>
      <div
        ref={parent}
        className={bem("slide-group", "--child", "flex-1")}
        style={
          {
            "--child-gradient": hsla,
          } as React.CSSProperties
        }
      >
        <div className="d-flex justify-content-between align-items-center">
          <p className="text-sm mb-none text-end no-wrap">
            <span className={bem("slide-group-color-indicator")}></span>
            {!widthSmall ? `Color: ${index + 1}` : ""}
          </p>
          <div className="d-flex align-items-center gap-">
            {/* <DropMenu>
              <p className="text-xs mb-none text-end mr-sm">{hsla}</p>
            </DropMenu> */}
            {!disableRemove ? (
              disabled ? (
                <IconLightOff onClick={handleDisable} width={16} height={16} />
              ) : (
                <IconLightOn onClick={handleDisable} width={16} height={16} />
              )
            ) : null}
            {!locked ? (
              <IconUnlock onClick={handleLock} width={16} height={16} />
            ) : (
              <IconLock onClick={handleLock} width={16} height={16} />
            )}
            {!disableRemove ? (
              <IconTrash
                onClick={() => removeColor(id, parentId)}
                width={16}
                height={16}
              />
            ) : (
              <div></div>
            )}
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
          <div>
            <div className="d-flex justify-content-between align-items-center">
              {/* <HexInput
                hsla={convertHslToHex(hsla)}
                onSubmit={(value) => setGradientHsl(id, convertHexToHsl(value))}
              /> */}
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
