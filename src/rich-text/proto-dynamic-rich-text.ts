import { html, LitElement } from "lit"
import { customElement, property } from "lit/decorators.js"
import { unsafeHTML } from "lit/directives/unsafe-html.js"
import type { RichTextNode } from "../hero/proto-dynamic-hero"
import { formatRichText, renderRichText } from "../utils/helper-functions"

@customElement("proto-dynamic-rich-text")
export class ProtoDynamicRichText extends LitElement {
  @property({ type: Array }) props?: RichTextNode[]
  @property({ type: String }) currentModalEntryId?: string

  override render() {
    const fields = this.props
    if (!fields) return

    return html`
      ${unsafeHTML(formatRichText(renderRichText(fields), { margin: "none" }))}
    `
  }
}
