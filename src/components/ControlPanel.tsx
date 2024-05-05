import React from "react"
import ControlPanelGlobalSettings from "./ControlPanelGlobalSettings"
import ControlPanelGradient from "./ControlPanelGradientObj"
import useBemify from "../hooks/useBemify"
import { CSSTransition } from "react-transition-group"
import { useGradientStore } from "../store"
import { useOnClickOutside } from "../hooks/useOnClickOutside"
import { IconPlus, IconPanel, IconRandomArrows } from "./BaseIcons"
import { useAutoAnimate } from "@formkit/auto-animate/react"

export default function ControlPanel() {
  const [gradientParent] = useAutoAnimate()
  const bem = useBemify("control-panel")

  // const [position, setPosition] = React.useState(0)
  const [show, setShow] = React.useState(false)
  const handleSetShow = () => setShow((prev) => !prev)

  const { gradientList, randomAll, addGradient, widthSmall } =
    useGradientStore()

  const outsideClickRef = useOnClickOutside<HTMLDivElement>(() =>
    setShow(false),
  )

  const panelStyleVars = {
    "--width": `${widthSmall ? 250 : 500}px`,
    // "--position": position,
  } as React.CSSProperties

  return (
    <>
      <div className={bem("open-btn")}>
        <IconPanel onClick={handleSetShow} tooltip="Hello" />
      </div>

      <CSSTransition
        in={show}
        nodeRef={outsideClickRef}
        timeout={300}
        classNames={bem("animation")}
        unmountOnExit
      >
        <aside className={bem()} style={panelStyleVars} ref={outsideClickRef}>
          {/* Gloabl Settings */}
          <ControlPanelGlobalSettings bem={bem} handleSetShow={handleSetShow} />

          <div ref={gradientParent}>
            {/* Gradient Section */}
            {gradientList.map((gradientObj, parentIndex, arr) => (
              <ControlPanelGradient
                gradientObj={gradientObj}
                parentIndex={parentIndex}
                bem={bem}
                disableOffOptions={arr.length === 1}
              />
            ))}
          </div>

          <div className="d-flex align-items-center gap-sm">
            <IconPlus
              appendText={!widthSmall ? "Add new Gradient" : undefined}
              onClick={addGradient}
            />
            <IconRandomArrows
              onClick={randomAll}
              appendText={!widthSmall ? "Random" : undefined}
            />
          </div>
        </aside>
      </CSSTransition>
    </>
  )
}
