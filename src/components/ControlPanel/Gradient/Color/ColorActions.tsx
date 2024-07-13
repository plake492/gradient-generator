import React from "react"
import {
  IconBxCollapseVertical,
  IconBxExpandVertical,
  IconTrash,
  IconLightOn,
  IconLightOff,
  IconUnlock,
  IconLock,
} from "../../../BaseIcons"
import { useGradientStore } from "../../../../store"
import MenuWrapper from "../../../MenuWrapper"

interface ColorActionsProps {
  id: string
  parentId: string
  collapse: boolean
  setCollapse: React.Dispatch<React.SetStateAction<boolean>>
  locked: boolean
  disabled?: boolean
  disableRemove?: boolean
}

export default function ColorActions({
  id,
  parentId,
  collapse,
  setCollapse,
  locked,
  disabled,
  disableRemove = false,
}: ColorActionsProps) {
  const { removeColor, setColorDisabled, setColorLock } = useGradientStore()

  const handleDisable = () => setColorDisabled(id, parentId)
  const handleLock = () => setColorLock(id, parentId)

  return (
    <div className="d-flex align-items-center gap-sm">
      <MenuWrapper>
        {!locked ? (
          <IconUnlock onClick={handleLock} width={16} height={16} />
        ) : (
          <IconLock onClick={handleLock} width={16} height={16} />
        )}
        {disabled ? (
          <IconLightOff onClick={handleDisable} width={16} height={16} />
        ) : (
          <IconLightOn
            disabled={disableRemove}
            onClick={handleDisable}
            width={16}
            height={16}
          />
        )}
        <IconTrash
          onClick={() => removeColor(id, parentId)}
          width={16}
          height={16}
          disabled={disableRemove}
        />
      </MenuWrapper>

      {collapse ? (
        <IconBxCollapseVertical
          tooltip="Collapse"
          width={16}
          height={16}
          onClick={() => setCollapse((prev) => !prev)}
          border
        />
      ) : (
        <IconBxExpandVertical
          tooltip="Expand"
          width={16}
          height={16}
          onClick={() => setCollapse((prev) => !prev)}
          border
        />
      )}
    </div>
  )
}
