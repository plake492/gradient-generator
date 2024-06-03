import { GradientObj, ClassValue } from "../../../../types"
import { useGradientStore } from "../../../../store"
import ControlPanelPositionPad from "./PositionPad"
import ControlPanelSelectList from "../../SelectList"

interface ControlPanelRadialOptionsProps {
  gradientObj: GradientObj
  bem: (block: string, ...rest: ClassValue[]) => string
}

type ValueType = number | string | null | undefined

export default function ControlPanelRadialOptions({
  bem,
  gradientObj,
}: ControlPanelRadialOptionsProps) {
  const { id: parentId, at, radialType, radialSize, radialHue } = gradientObj

  const { setGradientValue } = useGradientStore()

  return (
    <div className="ml-md">
      <ControlPanelSelectList
        bem={bem}
        list={[
          {
            label: "Circle",
            value: "circle",
          },
          {
            label: "Ellipse",
            value: "ellipse",
          },
        ]}
        value={radialType}
        label="Shape:"
        onClick={(type: ValueType) =>
          setGradientValue(parentId, {
            key: "radialType",
            value: type as string,
          })
        }
      />

      <ControlPanelSelectList
        bem={bem}
        list={[
          {
            label: "Farthest Corner",
            value: "farthest-corner",
          },
          {
            label: "Closest Side",
            value: "closest-side",
          },
          {
            label: "Farthest Side",
            value: "farthest-side",
          },
          {
            label: "Closest Corner",
            value: "closest-corner",
          },
        ]}
        value={radialSize}
        label="Size:"
        onClick={(size: ValueType) =>
          setGradientValue(parentId, {
            key: "radialSize",
            value: size as string,
          })
        }
      />

      <ControlPanelSelectList
        bem={bem}
        list={[
          {
            label: "None",
            value: null,
          },
          {
            label: "HSL Shorter",
            value: "in hsl shorter hue",
          },
          {
            label: "HSL Longer",
            value: "in hsl longer hue",
          },
        ]}
        value={radialHue}
        label="Radial Hue:"
        onClick={(hue: ValueType) =>
          setGradientValue(parentId, {
            key: "radialHue",
            value: hue as string,
          })
        }
      />

      <ControlPanelPositionPad parentId={parentId} at={at} bem={bem} />
    </div>
  )
}
