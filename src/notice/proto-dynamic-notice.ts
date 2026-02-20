import { html, LitElement } from "lit"
import { customElement, property } from "lit/decorators.js"
import type { RichTextNode } from "../hero/proto-dynamic-hero"
import { formatRichText, renderRichText } from "../utils/helper-functions"

export interface AlertNotice {
  fields: {
    variation: string
    message?: { content: { content: RichTextNode[] }[] }
  }
}

@customElement("proto-dynamic-notice")
export class ProtoDynamicNotice extends LitElement {
  @property({ type: Object }) props?: AlertNotice

  override render() {
    const fields = this.props?.fields
    const variation = fields?.variation
    const richTextContent = fields?.message ?? [] // message is always RichText

    return html`
      <duet-alert margin="none" variation=${variation}>
        ${formatRichText(renderRichText(richTextContent), { margin: "none" })}
      </duet-alert>
    `
  }
}
