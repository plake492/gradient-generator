import React from "react"
import GradientActions from "./GradientActions"
import ColorObj from "./Color/ColorObj"
import ControlPanelSelectList from "../SelectList"
import GradientTypeSettings from "./GradientTypeSettings"
import {
  IconPlusList,
  IconBxCollapseVertical,
  IconBxExpandVertical,
  IconRandomArrows,
  IconDrag,
} from "../../BaseIcons"
import { useGradientStore } from "../../../store"
import { gradientTypeList } from "../../../lib/gradientObject"
import { GradientObj as GradientObjType, ClassValue } from "../../../types"
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd"
// import DropMenu from "./DropMenu"

interface ControlPanelGradientObjProps {
  gradientObj: GradientObjType
  parentIndex: number
  bem: (block: string, ...rest: ClassValue[]) => string
  disableOffOptions: boolean
  DragIcon: React.ReactNode
}

type ValueType = number | string | null | undefined

export default function GradientObj({
  gradientObj,
  parentIndex,
  bem,
  disableOffOptions,
  DragIcon,
}: ControlPanelGradientObjProps) {
  const [collapseGradient, setCollapseGradient] = React.useState(false)
  const [expand, setExpand] = React.useState<boolean>(false)
  const [collapseOptions, setCollapseOptions] = React.useState(false)

  const { id: parentId, colors, disabled, gradient, locked, type } = gradientObj

  const {
    addColor,
    randomGradient,
    widthSmall,
    setGradientValue,
    reorderColors,
  } = useGradientStore()

  const handleGradientTypeClick = (type: ValueType) => {
    setGradientValue(parentId, {
      key: "type",
      value: type as string,
    })
  }

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
      {/* Gradeitn Header */}
      <div className="d-flex justify-content-between align-items-center">
        {/* Title Info */}
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

        {/* Action Buttons */}
        <GradientActions
          parentId={parentId}
          disabled={disabled}
          locked={locked}
          collapseGradient={collapseGradient}
          setCollapseGradient={setCollapseGradient}
          disableOffOptions={disableOffOptions}
        />
      </div>

      <div className={bem("color-children")}>
        {collapseGradient ? (
          <>
            <ControlPanelSelectList
              bem={bem}
              list={gradientTypeList}
              value={type}
              label="Type:"
              onClick={handleGradientTypeClick}
            />

            {/* Expandable */}
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
            {/* Type Settings */}
            {!collapseOptions ? (
              <GradientTypeSettings
                gradientObj={gradientObj}
                type={type}
                bem={bem}
              />
            ) : null}

            {/* Colors  */}
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
                            <ColorObj
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
