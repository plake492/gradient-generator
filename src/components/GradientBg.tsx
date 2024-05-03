import React from "react"
import useAnimationFrame from "../hooks/useAnimationFrame"
import { easeOutCubic } from "../helpers/easings"
import { useGradientStore } from "../store"

// const steps = ["0%", "100%"]
// const colorChunk = 66 / steps.length

export default function GradientBg() {
  const {
    startColor,
    saturation,
    lightness,
    position,
    setStartColor,
    setSaturation,
    setLightness,
    setPosition,
    startColor2,
    saturation2,
    lightness2,
    position2,
    setStartColor2,
    setSaturation2,
    setLightness2,
    setPosition2,
    rotate,
    setRotate,
    bgWidth,
    setBgWidth,
  } = useGradientStore()

  const inertia = 0.04 // Adjust this value to change the speed of the interpolation

  const startingColor = 200
  const startingRotate = 100

  const colorRange = 120
  const rotateRange = 80

  const endingColor = startingColor + colorRange
  const endingRotate = startingRotate + rotateRange

  // const [color, setColor] = React.useState(startingColor)
  // const [targetColor, setTargetColor] = React.useState(startingColor)
  // const [rotate, setRotate] = React.useState(startingRotate)
  // const [targetRotate, setTargetRotate] = React.useState(startingRotate)

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const height = document.documentElement.scrollHeight - window.innerHeight
      const hue =
        startingColor + (scrollY / height) * (endingColor - startingColor)
      const rotate =
        startingRotate + (scrollY / height) * (endingRotate - startingRotate)

      setTargetColor(hue)
      setTargetRotate(rotate)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const animation = (animationFrameId: number): void => {
    setColor((prevColor) => {
      const t = Math.abs(targetColor - prevColor) / 360
      const easedT = easeOutCubic(t)

      if (easedT < 0.14) {
        cancelAnimationFrame(animationFrameId)
        return prevColor
      }

      return prevColor + (targetColor - prevColor) * easedT * inertia
    })

    const t1 = Math.abs(targetColor - startColor) / 360
    const easedT = easeOutCubic(t1)

    setStartColor(startColor + (targetColor - startColor) * easedT * inertia)

    setRotate((prevRotate) => {
      const t = Math.abs(targetRotate - prevRotate) / 180
      const easedT = easeOutCubic(t)

      if (easedT < 0.14) {
        cancelAnimationFrame(animationFrameId)
        return prevRotate
      }

      return prevRotate + (targetRotate - prevRotate) * easedT * inertia
    })
  }

  useAnimationFrame(animation, targetColor)

  const hslGradient = `linear-gradient(${rotate}deg, hsl(${startColor} ${saturation}%, ${lightness}%) ${position}%, hsl(${startColor2} ${saturation2}%, ${lightness2}%) ${position2}%)`

  // const colorSteps = steps
  //   .map((step, i) => `hsl(${color + colorChunk * i} 88%, 45%) ${step}`)
  //   .join(", ")

  // const hslGradient = `
  //   linear-gradient(0deg, hsl(${startColor} 75%, 33%) 0%, rgba(0,0,0,0) 50%),
  //   linear-gradient(${rotate}deg, ${colorSteps})
  //   `

  return (
    <>
      <div
        style={{
          backgroundImage: hslGradient,
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: -1,
          width: "100vw",
          height: "100vh",
          backgroundSize: `${bgWidth}% 100%`,
          backgroundPosition: "33% 33%", // Start the gradient from the middle of the div
        }}
      ></div>
    </>
  )
}
