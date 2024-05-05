import React from "react"
import { useGradientStore } from "../store"
import ControlPanelColorSelectors from "./ControlPanelColorSelectors"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { GradientObj } from "../types"

import {
  IconPlusList,
  IconBxCollapseVertical,
  IconBxExpandVertical,
  IconTrash,
  IconLightOn,
  IconLightOff,
  IconRandomArrows,
} from "./BaseIcons"
import DropMenu from "./DropMenu"

interface ControlPanelGradientObjProps {
  gradientObj: GradientObj
  parentIndex: number
  widthSmall: boolean
  bem: (element?: string | undefined, ...classes: string[]) => string
  disableOffOptions: boolean
}

export default function ControlPanelGradientObj({
  gradientObj,
  parentIndex,
  widthSmall,
  bem,
  disableOffOptions,
}: ControlPanelGradientObjProps) {
  const [collapseGradient, setCollapseGradient] = React.useState(false)
  const [gradientParent] = useAutoAnimate()
  const [colorParent] = useAutoAnimate()
  const { id: parentId, colors, rotate, disabled, gradient } = gradientObj
  const {
    addColor,
    setGradientRotate,
    removeGradient,
    setGradientDisabled,
    randomGradient,
  } = useGradientStore()

  const handleDisable = () => setGradientDisabled(parentId)
  console.log("gradient ==>", gradient)

  return (
    <div
      className={bem("gradient-group")}
      style={
        {
          "--linear-gradient": gradient,
        } as React.CSSProperties
      }
    >
      <div className="d-flex justify-content-between align-items-center">
        <p className="mb-none">
          <span className={bem("gradient-indicator")}></span>Gradient:{" "}
          {parentIndex + 1}
        </p>
        <div className="d-flex align-item-center gap-sm">
          {!disableOffOptions ? (
            !disabled ? (
              <IconLightOn onClick={handleDisable} width={16} height={16} />
            ) : (
              <IconLightOff onClick={handleDisable} width={16} height={16} />
            )
          ) : null}
          {!disableOffOptions ? (
            <IconTrash
              onClick={() => removeGradient(parentId)}
              width={16}
              height={16}
            />
          ) : null}
          {collapseGradient ? (
            <IconBxCollapseVertical
              tooltip="Collapse"
              width={16}
              height={16}
              onClick={() => setCollapseGradient((prev) => !prev)}
              border
            />
          ) : (
            <IconBxExpandVertical
              tooltip="Expand"
              width={16}
              height={16}
              onClick={() => setCollapseGradient((prev) => !prev)}
              border
            />
          )}
        </div>
      </div>

      <div ref={gradientParent}>
        {collapseGradient ? (
          <>
            <div className={bem("slider-wrapper", "--child")}>
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
                onChange={(e) =>
                  setGradientRotate(Number(e.target.value), parentId)
                }
                className={bem("slider", "--parent")}
              />
            </div>

            <div ref={colorParent}>
              {colors.map((colorGroup, index, arr) => (
                <ControlPanelColorSelectors
                  key={colorGroup.id}
                  colorGroup={colorGroup}
                  index={index}
                  parentId={parentId}
                  disableRemove={arr.length === 2}
                  hideColorText={widthSmall}
                />
              ))}
              <div className="ml-xl d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-sm">
                  <IconPlusList
                    onClick={() => addColor(parentId)}
                    appendText={"Add color"}
                  />
                  <IconRandomArrows
                    onClick={() => randomGradient(parentId)}
                    appendText={"Random"}
                  />
                </div>
                <div>
                  <DropMenu />
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}
