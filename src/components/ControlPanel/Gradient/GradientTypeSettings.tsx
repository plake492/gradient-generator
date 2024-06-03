import RadialOptions from "./TypeSettings/RadialOptions"
import ConicOptions from "./TypeSettings/ConicOptions"
import LinearOptions from "./TypeSettings/LinearOptions"
import { GradientObj as GradientObjType, ClassValue } from "../../../types"

interface GradientTypeSettingsProps {
  bem: (block: string, ...rest: ClassValue[]) => string
  gradientObj: GradientObjType
  type: string
}

export default function GradientTypeSettings({
  bem,
  gradientObj,
  type,
}: GradientTypeSettingsProps) {
  const isLinear = type === "linear"
  const isRadial = type === "radial"
  const isConic = type === "conic"
  return (
    <>
      {isLinear ? <LinearOptions bem={bem} gradientObj={gradientObj} /> : null}
      {isRadial ? <RadialOptions bem={bem} gradientObj={gradientObj} /> : null}
      {isConic ? <ConicOptions bem={bem} gradientObj={gradientObj} /> : null}
    </>
  )
}
