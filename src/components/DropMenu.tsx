import React from "react"
import { IconThreeDots } from "./BaseIcons"
import useBemify from "../hooks/useBemify"
import { useOnClickOutside } from "../hooks/useOnClickOutside"

export default function DropMenu({ children }: { children: React.ReactNode }) {
  const [show, setShow] = React.useState(false)
  const dropDownButtonRef = React.useRef<HTMLDivElement>(null)
  console.log("dropDownButtonRef ==>", dropDownButtonRef)

  const dropMenuRef = useOnClickOutside<HTMLDivElement>(
    () => setShow(false),
    dropDownButtonRef,
  )

  const bem = useBemify("drop-menu")

  return (
    <div className="position-relative">
      <div ref={dropDownButtonRef} onClick={() => setShow((prev) => !prev)}>
        <IconThreeDots />
      </div>

      {show ? (
        <div className={bem()} ref={dropMenuRef}>
          {children}
        </div>
      ) : null}
    </div>
  )
}
