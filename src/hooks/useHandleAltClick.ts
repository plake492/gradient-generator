import React from "react"

export default function useHandleAltClick<T>(
  cb: (name: T, value: number) => void,
) {
  const handleAltClick = (
    e: React.MouseEvent<HTMLInputElement>,
    value: number,
  ) => {
    if (e.altKey) {
      const target = e.target as HTMLInputElement
      cb(target.name as T, value)
    }
  }

  return handleAltClick
}
