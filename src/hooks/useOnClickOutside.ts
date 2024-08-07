import React, { useEffect, useRef } from "react"

export const useOnClickOutside = <T extends HTMLElement | undefined>(
  handler: (e: Event) => void,
  exception?: React.RefObject<HTMLElement> | undefined,
): React.RefObject<T> => {
  const reference = useRef<T>(null)

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent): void => {
      // Do nothing if clicking reference's element or descendent elements
      if (
        !reference.current ||
        reference.current?.contains(event.target as Node) ||
        (exception && exception.current?.contains(event.target as Node))
      ) {
        return
      }
      handler(event)
    }

    document.addEventListener("mousedown", listener)
    document.addEventListener("touchstart", listener)

    return () => {
      document.removeEventListener("mousedown", listener)
      document.removeEventListener("touchstart", listener)
    }
  }, [reference, handler, exception])

  return reference
}
