import React from "react"
import Draggable, {
  DraggableData,
  DraggableProps,
  DraggableEvent,
} from "react-draggable"
import { useGradientStore } from "../store"
import { ClassValue } from "../types"

const size = 150
const adjustedSize = size - size * 0.14 // Adjust the size

const foramtAtValue = (at: string): { x: number; y: number } => {
  const [xValue, yValue] = at.split(" ")
  return {
    x: parseFloat(xValue),
    y: parseFloat(yValue),
  }
}

const getPercentage = (x: number) => {
  return Math.max(0, Math.min(100, (x / adjustedSize) * 100)).toFixed(0)
}

export default function ControlPanelPositionPad({
  parentId,
  at,
  bem,
}: {
  parentId: string
  at: string
  bem: (block: string, ...rest: ClassValue[]) => string
}) {
  const { setGradientValue } = useGradientStore()
  const [position, setPosition] = React.useState(foramtAtValue(at))

  const handleDrag = (_e: DraggableEvent, data: DraggableData) => {
    const x = data.x
    const y = data.y
    setPosition({ x, y })

    // const adjustedSize = size - size * 0.14 // Adjust the size
    const xPercentage = getPercentage(x)
    const yPercentage = getPercentage(y)
    const at = `${xPercentage}% ${yPercentage}%`
    setGradientValue(parentId, { key: "at", value: at })
  }

  const draggableProps: Partial<DraggableProps> = {
    bounds: "parent",
    onDrag: handleDrag,
    position: position,
  }

  // const handleAtSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const key = e.target.name
  //   const value = Number(e.target.value)
  //   setPosition((prev) => ({ ...prev, [key]: value }))
  //   setGradientValue(parentId, {
  //     key: "at",
  //     value: `${position.x}% ${position.y}%`,
  //   })
  // }

  return (
    <div className="d-flex gap-md">
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

      <div className="flex-1">
        <p className={bem("label")}>X ({getPercentage(position.x)}%)</p>

        <p className={bem("label")}>Y ({getPercentage(position.y)}%)</p>

        {/* <div className={bem("slider-wrapper", "--child", "mb-md")}>
          <label htmlFor="rotate" className={bem("label")}>
            X ({getPercentage(position.x)}%)
          </label>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            id="rotate"
            value={position.x}
            className={bem("slider", "--parent")}
            name="x"
            // onChange={handleAtSlider}
          />
        </div>

        <div className={bem("slider-wrapper", "--child", "mb-md")}>
          <label htmlFor="rotate" className={bem("label")}>
            Y ({getPercentage(position.y)}%)
          </label>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            id="rotate"
            value={position.y}
            className={bem("slider", "--parent")}
            name="y"
            // onChange={handleAtSlider}
          />
        </div> */}
      </div>
    </div>
  )
}
