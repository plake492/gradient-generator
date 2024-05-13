import { GradientObj, ClassValue } from "../types"
import { useGradientStore } from "../store"

interface ControlPanelLinearOptionsProps {
  gradientObj: GradientObj
  bem: (block: string, ...rest: ClassValue[]) => string
}

export default function ControlPanelLinearOptions({
  bem,
  gradientObj,
}: ControlPanelLinearOptionsProps) {
  const { id: parentId, rotate } = gradientObj

  const { setGradientValue } = useGradientStore()
  return (
    <div className="ml-md">
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
            setGradientValue(parentId, {
              key: "rotate",
              value: Number(e.target.value),
            })
          }
          className={bem("slider", "--parent")}
        />
      </div>
    </div>
  )
}
