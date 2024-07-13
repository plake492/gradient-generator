import React from "react"
import { IconUpdate } from "../../../BaseIcons"
import useBemify from "../../../../hooks/useBemify"
import { convertToRgba } from "../../../../helpers/utils"

interface HexInputProps {
  onSubmit: (hex: string) => void
  hsla: string
  widthSmall: boolean
}

const testValue = (v: string) =>
  /^#([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i.test(v)

/**
 * A component that renders an input box for hex color values.
 * It automatically triggers the `onSubmit` function when a valid hex color is entered.
 */
export default function HexInput({
  onSubmit,
  hsla,
  widthSmall,
}: HexInputProps) {
  const [value, setValue] = React.useState(hsla)
  const [error, setError] = React.useState(false)

  const handleOnBlur = () => setError(!testValue(value))

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    const formattedValue = (
      newValue.startsWith("#") ? newValue : `#${newValue}`
    ).toLowerCase()

    // Check if the formattedValue is valid
    if (
      /^#?[0-9A-Fa-f]*$/i.test(formattedValue) &&
      formattedValue.length <= 9
    ) {
      setValue(formattedValue) // Convert to uppercase to match the regex
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isValid = testValue(value)
    setError(!isValid)

    if (isValid) {
      onSubmit(value)
    }
  }

  const bem = useBemify("input")

  return (
    <form
      className={`d-flex py-md ${
        widthSmall ? "flex-col gap-sm" : "flex-row gap-md"
      }`}
      onSubmit={handleSubmit}
    >
      <input
        className={bem("", [error, "error"])}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Enter a hex color..."
        maxLength={9}
        onBlur={handleOnBlur}
      />
      <IconUpdate
        appendText="Update"
        border
        width={14}
        height={14}
        small
        type="submit"
        className={widthSmall ? "w-100" : ""}
      />
    </form>
  )
}
