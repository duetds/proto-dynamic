import { documentToHtmlString, type NodeRenderer } from "@contentful/rich-text-html-renderer"
import { BLOCKS, type Document, INLINES, type Inline } from "@contentful/rich-text-types"
import { html, nothing } from "lit"
import type { GroupItem } from "../group/proto-dynamic-group"
import type { ProtoButtonHandler, RichTextNode } from "../hero/proto-dynamic-hero"
import type { HighlightItem } from "../highlight/proto-dynamic-highlight"

/* -------------------------------------------------------
 * Embedded entry types
 * ----------------------------------------------------- */
type ButtonLinkedItem = GroupItem | HighlightItem

interface ComponentProps {
  embedded?: EmbeddedEntryData
  fields?: EmbeddedTargetFields
  target?: EmbeddedTarget
  protoButtonHandlers?: ProtoButtonHandler[]
  key?: string
  data?: Record<string, unknown>
}

interface EmbeddedEntry {
  sys: { id: string; contentType: { sys: { id: string } } }
  fields: Record<string, unknown>
}

interface EmbeddedTargetFields {
  key?: string
  entry?: EmbeddedEntry
  icon?: string
  text?: string
  richTextAppearance?: string
  heading?: string
  body?: { content: RichTextNode[] }
  items?: EmbeddedEntryData[]
}

interface EmbeddedTarget {
  sys: { contentType?: { sys?: { id?: string } } }
  fields: EmbeddedTargetFields
}

interface EmbeddedEntryData {
  target: EmbeddedTarget
  key?: string
  typeId?: string
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
 * RichText content helpers
 * ----------------------------------------------------- */
const transformVariation = (resourceType?: string) => {
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

export const getEmbeddedEntryData = (node: RichTextNode | Inline): EmbeddedEntryData | null => {
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

        const inlineRT = renderComponent({ embedded, target: embedded.target, fields: embedded.fields })

        return inlineRT === "default" ? renderRichText(embedded.fields.body?.content ?? []) : inlineRT
      },
      [INLINES.EMBEDDED_ENTRY]: node => {
        const embedded = getEmbeddedEntryData(node)
        if (!embedded) return ""

        const inlineRT = renderComponent({
          embedded,
          target: embedded.target,
          fields: embedded.fields,
          key: embedded.key,
          data,
        })
        return inlineRT === "default" ? `${embedded.typeId}: {{${embedded.key}}}` : inlineRT
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

  const icon = target.fields.icon ?? ""
  const text = target.fields.text ?? ""
  const variation = transformVariation(target.fields.richTextAppearance ?? "default")

  return `<duet-button
    icon="${icon}"
    variation="${variation}"
    margin="none"
    onclick='this.dispatchEvent(new CustomEvent("open-dynamic-modal", {
      detail: { entryId: "${entry.sys.id}", fields: ${JSON.stringify(entry.fields)} },
      bubbles: true,
      composed: true
    }))'>
      ${text}
  </duet-button>`
}

const renderCollapsibleElement = (item: EmbeddedEntryData) => `<li>
  <duet-collapsible heading="${item.fields.heading ?? ""}">
    ${renderRichText(item.fields.body?.content ?? [])}
  </duet-collapsible>
  <duet-divider margin="small"></duet-divider>
</li>`

const renderCollapsibleGroup = (heading: string, collapsibleElements: string) => `<style>
ul.collapsible-list { list-style: none; margin: 0; padding: 0; }
</style>
 ${
   heading &&
   `<duet-heading level="h3" visual-level="h4">${heading}</duet-heading>
    <duet-spacer size="small"></duet-spacer>
    <duet-divider margin="small"></duet-divider>`
 }
<ul class="collapsible-list">${collapsibleElements}</ul>`

/* -------------------------------------------------------
 * Rich Text formatter
 * ----------------------------------------------------- */
/**
 * @param html
 * @param options object, supported keys: "margin" with value "none", "stylePreset" with value one of "small", "intro", "caption", "smallCaption"
 * @returns HTML text
 */
export function formatRichText(html: string, options?: { margin?: string; stylePreset?: string }): string {
  if (!options) return html

  const container = document.createElement("div")
  container.innerHTML = html

  if (options.margin === "none") {
    container.querySelector("duet-paragraph:last-of-type")?.setAttribute("margin", "none")
  }

  if (options.stylePreset) {
    if (options.stylePreset.startsWith("caption")) {
      container.querySelectorAll("duet-paragraph").forEach(el => {
        const caption = document.createElement("duet-caption")
        if (options.stylePreset === "captionSmall") {
          caption.setAttribute("size", "small")
        }
        caption.innerHTML = el.innerHTML
        el.replaceWith(caption)
      })
    }
    if (options.stylePreset === "small") {
      container.querySelectorAll("duet-paragraph").forEach(el => el.setAttribute("size", "small"))
    }
    if (options.stylePreset === "intro") {
      container.querySelectorAll("duet-paragraph").forEach(el => el.setAttribute("variation", "intro"))
    }
  }

  return container.innerHTML
}

/* -------------------------------------------------------
 * Component renderer
 * ----------------------------------------------------- */
export function renderComponent(props: ComponentProps) {
  const { embedded, target, fields, protoButtonHandlers, key, data } = props
  const typeId = target?.sys?.contentType?.sys?.id

  switch (typeId) {
    case "componentRichTextVariable":
      return key ? String(data?.[key] ?? `{{${key}}}`) : ""
    case "highlight":
      return html`<proto-dynamic-highlight
        .protoButtonHandlers=${protoButtonHandlers}
        props='${JSON.stringify(target)}'>
      </proto-dynamic-highlight>`
    case "dynamicGroup":
      return html`<proto-dynamic-group
        .protoButtonHandlers=${protoButtonHandlers}
        props='${JSON.stringify(target)}'>
      </proto-dynamic-group>`
    case "collapsibleGroup": {
      const heading = target?.fields?.heading ?? ""
      const collapsibleElements = (target?.fields?.items ?? []).map(renderCollapsibleElement).join("")
      return renderCollapsibleGroup(heading, collapsibleElements)
    }
    case "componentShowMore":
      return `<duet-show-more>${renderRichText(fields?.body?.content ?? [])}</duet-show-more>`
    case "buttonResource":
      if (!embedded) return "default"
      return renderButtonResource(embedded)
    case "alert":
      return `<proto-dynamic-notice props='${JSON.stringify(target)}'></proto-dynamic-notice>`
    default:
      return "default"
  }
}
