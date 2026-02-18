import { documentToHtmlString, type NodeRenderer } from "@contentful/rich-text-html-renderer"
import { BLOCKS, type Document, INLINES, type Inline } from "@contentful/rich-text-types"
import { nothing } from "lit"
import type { GroupItem } from "../group/proto-dynamic-group"
import type { ProtoButtonHandler, RichTextNode } from "../hero/proto-dynamic-hero"
import type { HighlightItem } from "../highlight/proto-dynamic-highlight"

/* -------------------------------------------------------
 * Embedded entry types
 * ----------------------------------------------------- */
type ButtonLinkedItem = GroupItem | HighlightItem

interface EmbeddedEntry {
  sys: { id: string; contentType: { sys: { id: string } } }
  fields: Record<string, unknown>
}

interface EmbeddedTargetFields {
  key?: string
  entry?: EmbeddedEntry
  icon?: string
  text?: string
  richTextAppearance: string
  heading?: string
  body?: { content: RichTextNode[] }
}

interface EmbeddedTarget {
  sys: { contentType?: { sys?: { id?: string } } }
  fields: EmbeddedTargetFields
}

interface EmbeddedEntryData {
  target: EmbeddedTarget
  typeId?: string
  key?: string
  entry?: EmbeddedEntry
  fields: EmbeddedTargetFields
}

/* -------------------------------------------------------
 * Proto button handlers & URL helpers
 * ----------------------------------------------------- */

export function isUrlExternal(url: string): boolean {
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
  getProtoButtonHandler(item, protoButtonHandlers)?.clickHandler?.()
}

/* -------------------------------------------------------
 * RichText content handler
 * ----------------------------------------------------- */
const transformVariation = (resourceType: string) => {
  switch (resourceType) {
    case "button-primary":
      return "primary"
    case "button-default":
      return "default"
    case "button-plain":
      return "plain"
    case "link-plain":
      return "default"
    case "link-button":
      return "button"
    default:
      return "default"
  }
}

const getEmbeddedEntryData = (node: RichTextNode | Inline): EmbeddedEntryData | null => {
  const target = node.data?.target as EmbeddedTarget | undefined
  if (!target?.fields) return null

  return {
    target,
    typeId: target.sys?.contentType?.sys?.id,
    key: target.fields.key,
    entry: target.fields.entry,
    fields: target.fields,
  }
}

export const renderRichText = (input: RichTextNode | RichTextNode[], data?: Record<string, unknown>): string => {
  if (!input) return ""

  let document: RichTextNode

  if (Array.isArray(input)) {
    document = { nodeType: "document", data: {}, content: input }
  } else if (input.nodeType === "document") {
    document = input
  } else {
    document = { nodeType: "document", data: {}, content: [input] }
  }

  return documentToHtmlString(document as Document, {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, next) => `<duet-paragraph>${next(node.content)}</duet-paragraph>`,
      [BLOCKS.HEADING_1]: (node, next) => `<duet-heading level="h1">${next(node.content)}</duet-heading>`,
      [BLOCKS.HEADING_2]: (node, next) => `<duet-heading level="h2">${next(node.content)}</duet-heading>`,
      [BLOCKS.HEADING_3]: (node, next) => `<duet-heading level="h3">${next(node.content)}</duet-heading>`,
      [BLOCKS.HEADING_4]: (node, next) => `<duet-heading level="h4">${next(node.content)}</duet-heading>`,
      [BLOCKS.HEADING_5]: (node, next) => `<duet-heading level="h5">${next(node.content)}</duet-heading>`,
      [BLOCKS.HEADING_6]: (node, next) => `<duet-heading level="h6">${next(node.content)}</duet-heading>`,
      [BLOCKS.EMBEDDED_ENTRY]: node => {
        const embedded = getEmbeddedEntryData(node)
        if (!embedded) return ""

        const { typeId, fields } = embedded
        if (!fields) return ""

        switch (typeId) {
          case "collapsibleGroup": {
            const heading = node.data.target.fields.heading || ""
            const collapsibleElements = (node.data.target.fields.items || [])
              .map(
                (item: EmbeddedEntryData) => `<li>
        <duet-collapsible heading="${item.fields.heading || ""}">
          ${renderRichText(item.fields.body?.content ?? [])}
        </duet-collapsible>
        <duet-divider margin="small"></duet-divider>
      </li>`
              )
              .join("") // join array into string

            return `
    <style>
      ul.collapsible-list {
        list-style: none;
        margin: 0;
        padding: 0;
      }
    </style>

    ${
      heading &&
      `<duet-heading level="h3" visual-level="h4">${heading}</duet-heading>
<duet-spacer size="small"></duet-spacer>
<duet-divider margin="small"></duet-divider>`
    }

    <ul class="collapsible-list">
      ${collapsibleElements}
    </ul>
  `
          }
          case "componentShowMore":
            return `<duet-show-more>${renderRichText(fields.body?.content ?? [])}</duet-show-more>`
          case "buttonResource":
            return renderButtonResource(embedded)
          default:
            return fields.body ? renderRichText(fields.body.content ?? []) : ""
        }
      },
      [INLINES.EMBEDDED_ENTRY]: node => {
        const embedded = getEmbeddedEntryData(node)
        if (!embedded) return ""

        const { typeId, key } = embedded
        switch (typeId) {
          case "componentRichTextVariable":
            return key ? String(data?.[key] ?? `{{${key}}}`) : ""
          case "buttonResource":
            return renderButtonResource(embedded)
          default:
            return `${typeId}: {{${key}}}`
        }
      },
      [BLOCKS.HR]: () => "<duet-divider></duet-divider>",
    } as Record<string, NodeRenderer>,
  })
}

/* -------------------------------------------------------
 * Resource renderers
 * ----------------------------------------------------- */
const renderButtonResource = (embedded: EmbeddedEntryData) => {
  const { target, entry } = embedded
  if (!entry || entry.sys.contentType.sys.id !== "dynamicModal") return ""

  return `<duet-button
    icon=${target.fields.icon}
    variation=${transformVariation(target.fields.richTextAppearance)}
    margin="none"
    onclick='this.dispatchEvent(new CustomEvent("open-dynamic-modal", {
      detail: { entryId: "${entry.sys.id}", fields: ${JSON.stringify(entry.fields)} },
      bubbles: true,
      composed: true
    }))'>
      ${target.fields.text}
  </duet-button>`
}
