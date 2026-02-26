import { html, LitElement } from "lit"
import { customElement, property } from "lit/decorators.js"
import { unsafeHTML } from "lit/directives/unsafe-html.js"
import type { RichTextNode } from "../hero/proto-dynamic-hero"
import { formatRichText, renderRichText } from "../utils/helper-functions"

export interface ProtoDynamicRichTextProps {
  data: RichTextNode[]
  options?: {
    margin?: "none" | "small" | "medium" | "large"
    stylePreset?: "small" | "intro"
    [key: string]: unknown
  }
}

@customElement("proto-dynamic-rich-text")
export class ProtoDynamicRichText extends LitElement {
  @property({ attribute: false }) props: ProtoDynamicRichTextProps = { data: [], options: {} }
  @property({ type: String }) currentModalEntryId?: string

  override render() {
    const { data, options } = this.props

    return html`
      ${unsafeHTML(formatRichText(renderRichText(data), options))}
    `
  }
}
