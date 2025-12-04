import { html, LitElement } from "lit"
import { customElement, property } from "lit/decorators.js"
import type { RichTextDocument } from "../highlight/proto-dynamic-highlight"

export interface AlertNotice {
  fields: {
    variation: string
    message: RichTextDocument
  }
}

@customElement("proto-dynamic-notice")
export class ProtoDynamicNotice extends LitElement {
  @property({ type: Object }) props?: AlertNotice

  override render() {
    const fields = this.props?.fields
    const variation = fields?.variation
    const text = fields?.message?.content?.[0]?.content?.[0]?.value
    return html`
      <duet-alert margin="none" variation=${variation}>${text}</duet-alert>
    `
  }
}
