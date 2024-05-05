// import React, { useState, useEffect } from "react"
// import { convertHslToHex } from "../helpers/utils"

/**
 * A component that renders an input box for hex color values.
 * It automatically triggers the `onSubmit` function when a valid hex color is entered.
 */
const HexInput = ({
  // onSubmit,
  hsla,
}: {
  onSubmit: (hex: string) => void
  hsla: string
}) => {
  //   const [value, setValue] = useState(hsla)

  //   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setValue(event.target.value)
  //   }

  //   useEffect(() => {
  //     if (/^#([0-9A-F]{3}){1,2}$/i.test(value)) {

  //       onSubmit(value)
  //     }
  //   }, [value])

  return (
    <input
      className="input"
      type="text"
      value={hsla}
      //   onChange={handleChange}
      placeholder="Enter a hex color..."
    />
  )
}

export default HexInput
