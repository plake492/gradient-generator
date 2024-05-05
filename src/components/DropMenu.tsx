import React from "react"
import { IconThreeDots } from "./BaseIcons"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import useBemify from "../hooks/useBemify"
// import { useOnClickOutside } from "../hooks/useOnClickOutside"

export default function DropMenu() {
  const [parent] = useAutoAnimate()
  const [show, setShow] = React.useState(false)
  const bem = useBemify("drop-menu")
  //   const dropMenu = useOnClickOutside(() => setShow(false))

  return (
    <>
      <IconThreeDots onClick={() => setShow((prev) => !prev)} />
      <aside ref={parent}>{show ? <div className={bem()}>Hello</div> : null}</aside>
    </>
  )
}
