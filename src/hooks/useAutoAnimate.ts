import { useRef, useEffect } from "react"
import autoAnimate from "@formkit/auto-animate"

export const useAutoAnimate = () => {
  const elRef = useRef(null)

  useEffect(() => {
    elRef.current && autoAnimate(elRef.current)
  }, [elRef])

  return elRef
}
