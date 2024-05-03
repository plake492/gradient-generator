import React from "react"
import ColorSelectors from "./ControlPanelColorSelectors"
import ControlPanelGlobalSettings from "./ControlPanelGlobalSettings"
import useBemify from "../hooks/useBemify"
import { CSSTransition } from "react-transition-group"
import { useGradientStore } from "../store"
import { useOnClickOutside } from "../hooks/useOnClickOutside"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { IconPlus, IconPlusList, IconPanel } from "./BaseIcons"

import { ColorGroup } from "../types"

export default function ControlPanel() {
  const bem = useBemify("control-panel")
  const [parent] = useAutoAnimate()

  const { gradient, addColor, random } = useGradientStore()

  const [show, setShow] = React.useState(false)
  const [widthSmall, setWidthSmall] = React.useState(false)
  const [position, setPosition] = React.useState(0)

  const handleSetShow = () => setShow((prev) => !prev)

  const outsideClickRef = useOnClickOutside(() => setShow(false))
  const disableRemove = gradient.length <= 2

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
        <aside
          className={bem()}
          style={
            {
              "--width": `${widthSmall ? 250 : 500}px`,
              "--position": position,
            } as React.CSSProperties
          }
          ref={outsideClickRef}
        >
          {/* Gloabl Settings */}
          <ControlPanelGlobalSettings
            bem={bem}
            handleSetShow={handleSetShow}
            widthSmall={widthSmall}
            setWidthSmall={setWidthSmall}
          />

          {/* Color Section */}
          <div ref={parent}>
            {gradient.map((colorGroup: ColorGroup, index: number) => (
              <ColorSelectors
                key={colorGroup.id}
                colorGroup={colorGroup}
                index={index}
                disableRemove={disableRemove}
                hideColorText={widthSmall}
              />
            ))}
          </div>

          <div
            className="ml-md d-flex align-items-center gap-sm"
            onClick={addColor}
          >
            <IconPlusList appendText={"Add color"} />
          </div>

          <button onClick={random}>Random</button>
          <div className="d-flex align-items-center gap-sm ">
            <IconPlus appendText="Add new Gradient" />
          </div>
        </aside>
      </CSSTransition>
    </>
  )
}
