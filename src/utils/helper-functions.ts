import { nothing } from "lit"
import type { GroupItem } from "../group/proto-dynamic-group"
import type { ButtonResource, ProtoButtonHandler } from "../hero/proto-dynamic-hero"
import type { HighlightItem } from "../highlight/proto-dynamic-highlight"

export function isUrlExternal(url: string | undefined): boolean {
  return !!url?.includes("https://")
}

export function getProtoButtonHandler(
  item: GroupItem | HighlightItem | ButtonResource,
  protoButtonHandlers?: ProtoButtonHandler[]
) {
  return protoButtonHandlers?.find(b => b.buttonId === item.fields.key)
}

export function getLinkUrl(
  item: GroupItem | HighlightItem | ButtonResource,
  protoButtonHandlers?: ProtoButtonHandler[]
) {
  const button = getProtoButtonHandler(item, protoButtonHandlers)
  return button?.buttonUrl || item.fields.url || nothing
}

export function handleLinkClick(
  item: GroupItem | HighlightItem | ButtonResource,
  protoButtonHandlers?: ProtoButtonHandler[]
) {
  const button = getProtoButtonHandler(item, protoButtonHandlers)
  button?.clickHandler?.()
}
