import React from "react"
import { useGradientStore } from "../store"
import ControlPanelColorSelectors from "./ControlPanelColorSelectors"
import ControlPanelSelectList from "./ControlPanelSelectList"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { GradientObj, ClassValue } from "../types"
import ControlPanelRadialOptions from "./ControlPanelRadialOptions"
import ControlPanelConicOptions from "./ControlPanelConicOptions"
import ControlPanelLinearOptions from "./ControlPanelLinearOptions"
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

type ValueType = number | string | null | undefined

export default function ControlPanelGradientObj({
  gradientObj,
  parentIndex,
  bem,
  disableOffOptions,
}: ControlPanelGradientObjProps) {
  const [collapseGradient, setCollapseGradient] = React.useState(false)
  const [collapseOptions, setCollapseOptions] = React.useState(false)
  const [gradientParent] = useAutoAnimate()
  const [colorParent] = useAutoAnimate()
  const { id: parentId, colors, disabled, gradient, locked, type } = gradientObj

  const {
    addColor,
    removeGradient,
    setGradientDisabled,
    randomGradient,
    widthSmall,
    setGradeintLock,
    setGradientValue,
  } = useGradientStore()

  const handleDisable = () => setGradientDisabled(parentId)
  const handleLock = () => setGradeintLock(parentId)

  const isLinear = type === "linear"
  const isRadial = type === "radial"
  const isConic = type === "conic"

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
            <ControlPanelSelectList
              bem={bem}
              list={[
                {
                  label: "Linear",
                  value: "linear",
                },
                {
                  label: "Radial",
                  value: "radial",
                },
                {
                  label: "Conic",
                  value: "conic",
                },
              ]}
              value={type}
              label="Type:"
              onClick={(type: ValueType) =>
                setGradientValue(parentId, {
                  key: "type",
                  value: type as string,
                })
              }
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              className="mb-sm"
            >
              <p className="mb-none">Type Options</p>
              {collapseOptions ? (
                <IconBxCollapseVertical
                  tooltip="Collapse"
                  width={16}
                  height={16}
                  onClick={() => setCollapseOptions((prev) => !prev)}
                  border
                />
              ) : (
                <IconBxExpandVertical
                  tooltip="Expand"
                  width={16}
                  height={16}
                  onClick={() => setCollapseOptions((prev) => !prev)}
                  border
                />
              )}
            </div>
            {!collapseOptions ? (
              <>
                {isLinear ? (
                  <ControlPanelLinearOptions
                    bem={bem}
                    gradientObj={gradientObj}
                  />
                ) : null}
                {isRadial ? (
                  <ControlPanelRadialOptions
                    bem={bem}
                    gradientObj={gradientObj}
                  />
                ) : null}
                {isConic ? (
                  <ControlPanelConicOptions
                    bem={bem}
                    gradientObj={gradientObj}
                  />
                ) : null}
              </>
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
