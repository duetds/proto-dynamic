import { documentToHtmlString, type NodeRenderer } from "@contentful/rich-text-html-renderer"
import { BLOCKS, type Document, INLINES, type Inline } from "@contentful/rich-text-types"
import { nothing } from "lit"
import type { GroupItem } from "../group/proto-dynamic-group"
import type { ProtoButtonHandler, RichTextNode } from "../hero/proto-dynamic-hero"
import type { HighlightItem } from "../highlight/proto-dynamic-highlight"

type ButtonLinkedItem = GroupItem | HighlightItem

/* -------------------------------------------------------
 * Proto button handlers & URL helpers
 * ----------------------------------------------------- */

export function isUrlExternal(url: string | undefined): boolean {
  return !!url?.includes("https://")
}

export function getProtoButtonHandler(item: ButtonLinkedItem, protoButtonHandlers?: ProtoButtonHandler[]) {
  return protoButtonHandlers?.find(b => b.buttonId === item.fields.key)
}

export function getLinkUrl(item: ButtonLinkedItem, protoButtonHandlers?: ProtoButtonHandler[]) {
  const button = getProtoButtonHandler(item, protoButtonHandlers)
  return button?.url || item.fields.url || nothing
}

export function handleLinkClick(item: ButtonLinkedItem, protoButtonHandlers?: ProtoButtonHandler[]) {
  const button = getProtoButtonHandler(item, protoButtonHandlers)
  button?.clickHandler?.()
}

/* -------------------------------------------------------
 * RichText content handler
 * ----------------------------------------------------- */

export const renderRichText = (input: RichTextNode | RichTextNode[], data?: Record<string, unknown>): string => {
  if (!input) return ""

  const document: RichTextNode = Array.isArray(input)
    ? { nodeType: "document", data: {}, content: input }
    : input?.nodeType === "document"
      ? input
      : { nodeType: "document", data: {}, content: [input] }

  return documentToHtmlString(<Document>document, {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, next): string => `<duet-paragraph>${next(node.content)}</duet-paragraph>`,
      [BLOCKS.HEADING_1]: (node, next): string => `<duet-heading level="h1">${next(node.content)}</duet-heading>`,
      [BLOCKS.HEADING_2]: (node, next): string => `<duet-heading level="h2">${next(node.content)}</duet-heading>`,
      [BLOCKS.HEADING_3]: (node, next): string => `<duet-heading level="h3">${next(node.content)}</duet-heading>`,
      [BLOCKS.HEADING_4]: (node, next): string => `<duet-heading level="h4">${next(node.content)}</duet-heading>`,
      [BLOCKS.HEADING_5]: (node, next): string => `<duet-heading level="h5">${next(node.content)}</duet-heading>`,
      [BLOCKS.HEADING_6]: (node, next): string => `<duet-heading level="h6">${next(node.content)}</duet-heading>`,
      [BLOCKS.EMBEDDED_ENTRY]: node => {
        const fields = node.data?.target?.fields
        if (!fields) return ""

        const typeId = node.data.target.sys.contentType.sys.id
        switch (typeId) {
          case "componentCollapsible":
            return `<duet-collapsible heading="${fields.heading || ""}">${renderRichText(fields.body)}</duet-collapsible>`
          case "componentShowMore":
            return `<duet-show-more>${renderRichText(fields.body)}</duet-show-more>`
          default:
            return fields.body ? renderRichText(fields.body) : ""
        }
      },
      [INLINES.EMBEDDED_ENTRY]: (node: Inline) => {
        const target = node.data?.target
        if (!target) return ""

        const typeId = target.sys.contentType.sys.id
        const key = target.fields.key
        const entry = target.fields.entry

        switch (typeId) {
          case "componentRichTextVariable":
            return String(data?.[key] ?? `{{${key}}}`)
          case "buttonResource":
            //icon comes in json, but variation not TODO: see what Oskari answers and update variable
            // ticketti, tyyppien eristämisestä omaan filuun
            if (entry?.sys.contentType.sys.id === "dynamicModal") {
              console.log("ENTRY: ", entry)
              return `<duet-button
              icon=${entry.fields.icon} 
              variation="plain"
              margin="none"
              onclick='this.dispatchEvent(new CustomEvent("open-dynamic-modal", {
                detail: { entryId: "${entry.sys.id}", fields: ${JSON.stringify(entry.fields)} },
                bubbles: true,
                composed: true
              }))'>
                ${target.fields.text}
            </duet-button>`
            }
            return ""
          default:
            return `${typeId}: {{${key}}}`
        }
      },
      [BLOCKS.HR]: (): string => "<duet-divider></duet-divider>",
    } as Record<string, NodeRenderer>,
  })
}
