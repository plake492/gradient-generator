import React from "react"
import { useGradientStore } from "../store"
import ControlPanelColorSelectors from "./ControlPanelColorSelectors"
import ControlPanelSelectList from "./ControlPanelSelectList"
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
  IconDrag,
} from "./BaseIcons"
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd"
// import DropMenu from "./DropMenu"

interface ControlPanelGradientObjProps {
  gradientObj: GradientObj
  parentIndex: number
  bem: (block: string, ...rest: ClassValue[]) => string
  disableOffOptions: boolean
  DragIcon: React.ReactNode
}

type ValueType = number | string | null | undefined

export default function ControlPanelGradientObj({
  gradientObj,
  parentIndex,
  bem,
  disableOffOptions,
  DragIcon,
}: ControlPanelGradientObjProps) {
  const [collapseGradient, setCollapseGradient] = React.useState(false)
  const [collapseOptions, setCollapseOptions] = React.useState(false)
  const { id: parentId, colors, disabled, gradient, locked, type } = gradientObj

  const {
    addColor,
    removeGradient,
    setGradientDisabled,
    randomGradient,
    widthSmall,
    setGradeintLock,
    setGradientValue,
    reorderColors,
  } = useGradientStore()

  const handleDisable = () => setGradientDisabled(parentId)
  const handleLock = () => setGradeintLock(parentId)

  const isLinear = type === "linear"
  const isRadial = type === "radial"
  const isConic = type === "conic"

  const [expand, setExpand] = React.useState<boolean>(false)

  const handleDragEnd = (result: DropResult) => {
    reorderColors(parentId, result.source.index, result.destination!.index)
  }

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
          {DragIcon}
          <span
            onClick={() => setExpand((prev) => !prev)}
            className={bem("gradient-indicator", [expand, "expand"])}
          ></span>
          <span className="text-sm">
            {!widthSmall ? `Gradient: ${parentIndex + 1}` : ""}
          </span>
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

      <div className={bem("color-children")}>
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
              <p className="mb-none text-sm">Type Options</p>
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

            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="droppable">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {colors.map((colorGroup, index) => (
                      <Draggable
                        key={colorGroup.id}
                        draggableId={colorGroup.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            <ControlPanelColorSelectors
                              key={colorGroup.id}
                              colorGroup={colorGroup}
                              index={index}
                              parentId={parentId}
                              disableRemove={colors.length === 2}
                              positionDefault={Number(
                                ((index / (colors.length - 1)) * 100).toFixed(
                                  0,
                                ),
                              )}
                              DragIcon={
                                <div
                                  {...provided.dragHandleProps}
                                  style={{ cursor: "grab" }}
                                >
                                  <IconDrag small />
                                </div>
                              }
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
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
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}
