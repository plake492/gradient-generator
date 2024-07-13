import React from "react"
import { useGradientStore } from "../../../store"

import {
  IconBxCollapseVertical,
  IconBxExpandVertical,
  IconTrash,
  IconLightOn,
  IconLightOff,
  IconLock,
  IconUnlock,
} from "../../BaseIcons"
import MenuWrapper from "../../MenuWrapper"

interface GradientActionsProps {
  parentId: string
  disabled: boolean
  locked: boolean
  collapseGradient: boolean
  setCollapseGradient: React.Dispatch<React.SetStateAction<boolean>>
  disableOffOptions: boolean
}

export default function GradientActions({
  parentId,
  disabled,
  locked,
  collapseGradient,
  setCollapseGradient,
  disableOffOptions,
}: GradientActionsProps) {
  const { setGradientDisabled, removeGradient, setGradeintLock } =
    useGradientStore()
  const handleDisable = () => setGradientDisabled(parentId)
  const handleLock = () => setGradeintLock(parentId)

  return (
    <div className="d-flex align-item-center gap-sm">
      <MenuWrapper>
        {!locked ? (
          <IconUnlock onClick={handleLock} width={16} height={16} />
        ) : (
          <IconLock onClick={handleLock} width={16} height={16} />
        )}
        {!disableOffOptions ? (
          !disabled ? (
            <IconLightOn onClick={handleDisable} width={16} height={16} />
          ) : (
            <IconLightOff onClick={handleDisable} width={16} height={16} />
          )
        ) : null}
        {!disableOffOptions ? (
          <IconTrash
            onClick={() => removeGradient(parentId)}
            width={16}
            height={16}
          />
        ) : null}
      </MenuWrapper>
      {collapseGradient ? (
        <IconBxCollapseVertical
          tooltip="Collapse"
          width={16}
          height={16}
          onClick={() => setCollapseGradient((prev) => !prev)}
          border
        />
      ) : (
        <IconBxExpandVertical
          tooltip="Expand"
          width={16}
          height={16}
          onClick={() => setCollapseGradient((prev) => !prev)}
          border
        />
      )}
    </div>
  )
}
