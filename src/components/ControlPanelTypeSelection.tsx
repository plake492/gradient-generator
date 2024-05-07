import { useGradientStore } from "../store"
import { ClassValue } from "../types"

interface ControlPanelTypeSelectionProps {
  bem: (block: string, ...classes: ClassValue[]) => string
  type: string
  parentId: string
}

export default function ControlPanelTypeSelection({
  bem,
  type,
  parentId,
}: ControlPanelTypeSelectionProps) {
  const { setGradientType, widthSmall } = useGradientStore()

  const handleSelectType = (type: "linear" | "radial" | "conic") =>
    setGradientType(type, parentId)

  const isLinear = type === "linear"
  const isRadial = type === "radial"
  const isConic = type === "conic"

  return (
    <div className={bem("slider-wrapper", "--child", "mb-md")}>
      <div className={bem("select-type-wrapper")}>
        {!widthSmall ? (
          <div className={bem("select-type-label")}>Type:</div>
        ) : null}
        <div
          onClick={() => handleSelectType("linear")}
          className={bem("select-type", [isLinear, "active"])}
        >
          Linear
        </div>
        <div
          onClick={() => handleSelectType("radial")}
          className={bem("select-type", [isRadial, "active"])}
        >
          Radial
        </div>
        <div
          onClick={() => handleSelectType("conic")}
          className={bem("select-type", [isConic, "active"])}
        >
          Concical
        </div>
      </div>
    </div>
  )
}
