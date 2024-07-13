import React from "react"
import DropMenu from "./DropMenu"
import { useGradientStore } from "../store"

export default function MenuWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const { widthSmall } = useGradientStore()

  return widthSmall ? <DropMenu>{children}</DropMenu> : children
}
