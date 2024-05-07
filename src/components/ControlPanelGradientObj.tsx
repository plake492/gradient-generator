import React from "react"
import { useGradientStore } from "../store"
import ControlPanelColorSelectors from "./ControlPanelColorSelectors"
import ControlPanelTypeSelection from "./ControlPanelTypeSelection"
import ControlPanelPositionPad from "./ControlPanelPositionPad"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { GradientObj, ClassValue } from "../types"
import {
  IconPlusList,
  IconBxCollapseVertical,
  IconBxExpandVertical,
  IconTrash,
  IconLightOn,
  IconLightOff,
  IconRandomArrows,
  IconLock,
  IconUnlock,
} from "./BaseIcons"
// import DropMenu from "./DropMenu"

interface ControlPanelGradientObjProps {
  gradientObj: GradientObj
  parentIndex: number
  bem: (block: string, ...rest: ClassValue[]) => string
  disableOffOptions: boolean
}

export default function ControlPanelGradientObj({
  gradientObj,
  parentIndex,
  bem,
  disableOffOptions,
}: ControlPanelGradientObjProps) {
  const [collapseGradient, setCollapseGradient] = React.useState(false)
  const [gradientParent] = useAutoAnimate()
  const [colorParent] = useAutoAnimate()
  const {
    id: parentId,
    colors,
    rotate,
    disabled,
    gradient,
    locked,
    type,
  } = gradientObj

  const {
    addColor,
    setGradientRotate,
    removeGradient,
    setGradientDisabled,
    randomGradient,
    widthSmall,
    setGradeintLock,
  } = useGradientStore()

  const handleDisable = () => setGradientDisabled(parentId)
  const handleLock = () => setGradeintLock(parentId)

  const showDegrees = type !== "radial"
  const showPositionPad = type === "conic"

  const [expand, setExpand] = React.useState<boolean>(false)

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
        <div className="mb-none no-wrap d-flex align-items-center gap-sm">
          <span
            onClick={() => setExpand((prev) => !prev)}
            className={bem("gradient-indicator", [expand, "expand"])}
          ></span>
          <span>{!widthSmall ? `Gradient: ${parentIndex + 1}` : ""}</span>
        </div>
        <div className="d-flex align-item-center gap-sm">
          {!locked ? (
            <IconUnlock onClick={handleLock} width={16} height={16} />
          ) : (
            <IconLock onClick={handleLock} width={16} height={16} />
          )}
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

      <div ref={gradientParent} className={bem("color-children")}>
        {collapseGradient ? (
          <>
            <ControlPanelTypeSelection
              bem={bem}
              type={type}
              parentId={parentId}
            />
            {showDegrees ? (
              <div className={bem("slider-wrapper", "--child", "mb-md")}>
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
            ) : null}

            {showPositionPad ? (
              <ControlPanelPositionPad parentId={parentId} />
            ) : null}

            <div ref={colorParent}>
              {colors.map((colorGroup, index, arr) => (
                <ControlPanelColorSelectors
                  key={colorGroup.id}
                  colorGroup={colorGroup}
                  index={index}
                  parentId={parentId}
                  disableRemove={arr.length === 2}
                  positionDefault={Number(
                    ((index / (arr.length - 1)) * 100).toFixed(0),
                  )}
                />
              ))}
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-sm">
                  <IconPlusList
                    onClick={() => addColor(parentId)}
                    border
                    appendText={!widthSmall ? "Add color" : undefined}
                  />
                  <IconRandomArrows
                    onClick={() => randomGradient(parentId)}
                    border
                    appendText={!widthSmall ? "Random" : undefined}
                  />
                </div>
                {/* <div>
                  <DropMenu>Test</DropMenu>
                </div> */}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}
