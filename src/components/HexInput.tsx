import React, { useState, useEffect } from "react"
import { convertHslToHex } from "../helpers/utils"

/**
 * A component that renders an input box for hex color values.
 * It automatically triggers the `onSubmit` function when a valid hex color is entered.
 */
const HexInput = ({
  onSubmit,
  hsl,
}: {
  onSubmit: (hex: string) => void
  hsl: string
}) => {
  //   const [value, setValue] = useState(hsl)

  //   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setValue(event.target.value)
  //   }

  //   useEffect(() => {
  //     if (/^#([0-9A-F]{3}){1,2}$/i.test(value)) {
  //       console.log("value ==>", value)

  //       onSubmit(value)
  //     }
  //   }, [value])

  return (
    <input
      type="text"
      value={hsl}
      //   onChange={handleChange}
      placeholder="Enter a hex color..."
    />
  )
}

export default HexInput
