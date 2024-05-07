import React from "react"
import Draggable, {
  DraggableData,
  DraggableProps,
  DraggableEvent,
} from "react-draggable"
import { useGradientStore } from "../store"

const size = 150

const foramtAtValue = (at: string): { x: number; y: number } => {
  const [xValue, yValue] = at.split(" ")
  return {
    x: parseFloat(xValue),
    y: parseFloat(yValue),
  }
}

export default function ControlPanelPositionPad({
  parentId,
  at,
}: {
  parentId: string
  at: string
}) {
  console.log("at ==>", at)

  const { setGradientAt } = useGradientStore()
  const [position, setPosition] = React.useState(foramtAtValue(at))

  const handleDrag = (_e: DraggableEvent, data: DraggableData) => {
    const x = data.x
    const y = data.y
    setPosition({ x, y })

    const adjustedSize = size - size * 0.14 // Adjust the size
    const xPercentage = Math.max(0, Math.min(100, (x / adjustedSize) * 100))
    const yPercentage = Math.max(0, Math.min(100, (y / adjustedSize) * 100))
    const at = `${xPercentage.toFixed(0)}% ${yPercentage.toFixed(0)}%`
    setGradientAt(at, parentId)
  }

  const draggableProps: Partial<DraggableProps> = {
    bounds: "parent",
    onDrag: handleDrag,
    position: position,
  }

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        position: "relative",
        backgroundColor: "#cccccc",
        borderRadius: "5px",
        boxShadow: "inset 1px 1px 32px 8px #444",
      }}
    >
      <Draggable {...draggableProps}>
        <div
          style={{
            height: "20px",
            width: "20px",
            borderRadius: "50%",
            backgroundColor: "#000",
            position: "absolute",
            cursor: "grab",
          }}
        />
      </Draggable>
    </div>
  )
}
