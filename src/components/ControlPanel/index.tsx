import React from "react"
import ControlPanelGlobalSettings from "./GlobalSettings/GlobalSettings"
import GradientObj from "./Gradient/GradientObj"
import useBemify from "../../hooks/useBemify"
import { CSSTransition } from "react-transition-group"
import { useGradientStore } from "../../store"
import { useOnClickOutside } from "../../hooks/useOnClickOutside"
import { IconPlus, IconPanel, IconRandomArrows, IconDrag } from "../BaseIcons"
import {
  DragDropContext,
  Droppable,
  Draggable,
  DroppableProvided,
  DraggableProvided,
  DropResult,
} from "react-beautiful-dnd"

export default function ControlPanel() {
  const bem = useBemify("control-panel")

  // const [position, setPosition] = React.useState(0)
  const [show, setShow] = React.useState(false)
  const handleSetShow = () => setShow((prev) => !prev)

  const { gradientList, randomAll, addGradient, widthSmall, reorderGradient } =
    useGradientStore()

  const outsideClickRef = useOnClickOutside<HTMLDivElement>(() =>
    setShow(false),
  )

  const panelStyleVars = {
    "--width": `${widthSmall ? 250 : 500}px`,
    // "--position": position,
  } as React.CSSProperties

  const handleDragEnd = (result: DropResult) => {
    reorderGradient(result.source.index, result.destination!.index)
  }

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
        <aside className={bem()} style={panelStyleVars} ref={outsideClickRef}>
          {/* Gloabl Settings */}
          <ControlPanelGlobalSettings bem={bem} handleSetShow={handleSetShow} />

          {/* Gradient Section */}
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable">
              {(provided: DroppableProvided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {gradientList.map((gradientObj, parentIndex) => (
                    <Draggable
                      key={gradientObj.id}
                      draggableId={gradientObj.id}
                      index={parentIndex}
                    >
                      {(provided: DraggableProvided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <GradientObj
                            gradientObj={gradientObj}
                            parentIndex={parentIndex}
                            bem={bem}
                            disableOffOptions={gradientList.length === 1}
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

          <div className="d-flex align-items-center gap-sm">
            <IconPlus
              appendText={!widthSmall ? "Add new Gradient" : undefined}
              border
              onClick={addGradient}
            />
            <IconRandomArrows
              onClick={randomAll}
              appendText={!widthSmall ? "Random" : undefined}
              border
            />
          </div>
        </aside>
      </CSSTransition>
    </>
  )
}
