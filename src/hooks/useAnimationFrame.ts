import React from "react"

/**
 * `useAnimationFrame` is a custom React hook that uses the `requestAnimationFrame` method
 * to perform smooth animations by calling the provided callback before the browser performs
 * the next repaint.
 *
 * @param {Function} cb - The callback function to be executed on each animation frame.
 * The callback receives a timestamp as its argument, which can be used to calculate the
 * state of the animation at the current frame.
 *
 * @param {...any[]} deps - The list of dependencies for the `useEffect` hook. The animation
 * will be restarted if any of these dependencies change.
 *
 * @returns {void} This hook does not return a value.
 *
 * @example
 * useAnimationFrame((timestamp) => {
 *  ...Animation logic here
 * }, [dependency1, dependency2]);
 */
export default function useAnimationFrame(
  cb: (timestamp: number) => void,
  ...deps: unknown[]
): void {
  React.useEffect(() => {
    let animationFrameId: number

    const animate = (timestamp: number) => {
      cb(timestamp)

      animationFrameId = requestAnimationFrame(animate)
    }
    animate(performance.now())

    return () => cancelAnimationFrame(animationFrameId)
  }, [cb, ...deps])
}
