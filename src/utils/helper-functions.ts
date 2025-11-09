import { nothing } from "lit"
import type { GroupItem } from "../group/proto-dynamic-group"
import type { ProtoButton } from "../hero/proto-dynamic-hero"
import type { HighlightItem } from "../highlight/proto-dynamic-highlight"

export function isUrlExternal(url: string | undefined): boolean {
  return !!url?.includes("https://")
}

export function getButton(item: GroupItem | HighlightItem, protoButtons?: ProtoButton[]) {
  return protoButtons?.find(b => b.buttonId === item.fields.key)
}

export function getLinkUrl(item: GroupItem | HighlightItem, protoButtons?: ProtoButton[]) {
  const button = getButton(item, protoButtons)
  return button?.buttonUrl || item.fields.url || nothing
}

export function handleLinkClick(item: GroupItem | HighlightItem, protoButtons?: ProtoButton[]) {
  const button = getButton(item, protoButtons)
  button?.onClick?.()
}
