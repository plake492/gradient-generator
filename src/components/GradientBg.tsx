import { useGradientStore } from "../store"
import GradientGrid from "./GradientGrid"

export default function GradientBg() {
  const { cssProps } = useGradientStore()

  return (
    <>
      <GradientGrid />
      <div
        style={{
          backgroundImage: cssProps["background-image"],
          position: cssProps.position,
          left: 0,
          top: 0,
          zIndex: -1,
          width: "100vw",
          height: cssProps.height,
          backgroundSize: cssProps["background-size"],
        }}
      ></div>
    </>
  )
}
