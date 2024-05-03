// import useAnimationFrame from "../hooks/useAnimationFrame"
// import { easeOutCubic } from "../helpers/easings"
import { useGradientStore } from "../store"

// const steps = ["0%", "100%"]
// const colorChunk = 66 / steps.length

export default function GradientBg() {
  // React.useEffect(() => {
  //   const hslColors = gradient
  //     .map((color: ColorGroup) => `${color.hsl} ${color.position}%`)
  //     .join(", ")

  //   const hslGradient = `linear-gradient( ${rotate}deg, ${hslColors})`

  //   setBackgroundGradient(hslGradient)
  // }, [gradient, rotate, setBackgroundGradient])

  // const inertia = 0.04 // Adjust this value to change the speed of the interpolation

  // const startingColor = hue
  // const startingRotate = rotate

  // const rotateRange = 80

  // const endingColor = startColor2
  // const endingRotate = startingRotate + rotateRange

  // const [color, setColor] = React.useState(startingColor)
  // const [rotate, setRotate] = React.useState(startingRotate)
  // const [targetColor, setTargetColor] = React.useState(startingColor)
  // const [targetRotate, setTargetRotate] = React.useState(startingRotate)

  // React.useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollY = window.scrollY
  //     const height = document.documentElement.scrollHeight - window.innerHeight
  //     const hue =
  //       startingColor + (scrollY / height) * (endingColor - startingColor)
  //     const rotate =
  //       startingRotate + (scrollY / height) * (endingRotate - startingRotate)

  //     setTargetColor(hue)
  //     setTargetRotate(rotate)
  //   }

  //   window.addEventListener("scroll", handleScroll)

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll)
  //   }
  // }, [])

  // const animation = (animationFrameId: number): void => {
  //   const t = Math.abs(targetColor - hue) / 360
  //   const easedT = easeOutCubic(t)
  //   if (easedT < 0.14) {
  //     cancelAnimationFrame(animationFrameId)
  //     setStartColor(hue)
  //   }
  //   setStartColor(hue + (targetColor - hue) * easedT * inertia)

  //   const tR = Math.abs(targetRotate - rotate) / 180
  //   const easedTR = easeOutCubic(tR)

  //   if (easedTR < 0.14) {
  //     cancelAnimationFrame(animationFrameId)
  //     setRotate(rotate)
  //   }
  //   setRotate(rotate + (targetRotate - rotate) * easedT * inertia)
  // }

  // useAnimationFrame(animation, targetColor)

  const { bgWidth, backgroundGradient, isWindowHeight } = useGradientStore()

  return (
    <>
      <div
        style={{
          // backgroundImage: backgroundGradient,
          background: backgroundGradient,
          position: isWindowHeight ? "fixed" : "absolute",
          left: 0,
          top: 0,
          zIndex: -1,
          width: "100vw",
          height: isWindowHeight ? "100vh" : "100%",
          backgroundSize: `${bgWidth}% 100%`,
          backgroundPosition: "33% 33%", // Start the gradient from the middle of the div
        }}
      ></div>
    </>
  )
}
