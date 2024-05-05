import { useGradientStore } from "../store"

export default function GradientGrid() {
  const { gradientList, gridOn, isWindowHeight } = useGradientStore()

  const grid = gradientList.reduce<JSX.Element[]>((acc, gradientObj) => {
    if (!gradientObj.disabled) {
      gradientObj.colors.forEach((color) => {
        const style = {
          position: (isWindowHeight ? "fixed" : "absolute") as
            | "fixed"
            | "absolute",
          left: "0%",
          top: `${color.position}%`,
          height: "4px",
          width: "100%",
          backgroundColor: "black",
          transform: `rotate(${gradientObj.rotate}deg)`,
          transformOrigin: "center",
          zIndex: "2",
        }
        acc.push(<div style={style} key={color.id} />)
      })
    }
    return acc
  }, [])

  return gridOn ? grid : <></>
}
