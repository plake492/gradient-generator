import { useGradientStore } from "../../store"
import { ClassValue } from "../../types"

type ValueType = number | string | null | undefined

interface ControlPanelSelectListProps {
  bem: (block: string, ...classes: ClassValue[]) => string
  list: { label: string; value: ValueType }[]
  label: string
  value: ValueType
  onClick: (item: ValueType) => void
}

export default function ControlPanelSelectList({
  bem,
  list,
  label,
  value,
  onClick,
}: ControlPanelSelectListProps) {
  const { widthSmall } = useGradientStore()

  const handleSelect = (item: ValueType) => {
    onClick(item)
  }

  return (
    <div className={bem("slider-wrapper", "--child", "mb-md")}>
      <div className={bem("select-type-wrapper")}>
        {!widthSmall ? (
          <p className={bem("select-type-label")}>{label}</p>
        ) : null}
        {list.map((item) => (
          <p
            key={item.value}
            onClick={() => handleSelect(item.value)}
            className={bem("select-type", [value === item.value, "active"])}
          >
            {item.label}
          </p>
        ))}
      </div>
    </div>
  )
}
