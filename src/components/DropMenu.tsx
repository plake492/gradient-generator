// import React from "react"
import { IconThreeDots } from "./BaseIcons"
// import { CSSTransition } from "react-transition-group"
// import useBemify from "../hooks/useBemify"
// import { useOnClickOutside } from "../hooks/useOnClickOutside"

export default function DropMenu() {
  // { children }: { children: React.ReactNode }
  // const [show, setShow] = React.useState(false)
  // const dropMenuRef = useOnClickOutside<HTMLDivElement>(() => setShow(false))
  // const bem = useBemify("drop-menu")

  return (
    <>
      <IconThreeDots
      //  onClick={() => setShow(true)}
      />
      {/* 
      <CSSTransition
        in={show}
        nodeRef={dropMenuRef}
        timeout={300}
        classNames={bem("animation")}
        unmountOnExit
      >
        {show ? (
          <div className={bem()} ref={dropMenuRef}>
            {children}
          </div>
        ) : (
          <></>
        )}
      </CSSTransition> */}
    </>
  )
}
