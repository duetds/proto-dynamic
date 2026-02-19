import { html, LitElement } from "lit"
import { customElement, property } from "lit/decorators.js"
import type { RichTextNode } from "../hero/proto-dynamic-hero"
import { renderNodes } from "../utils/helper-functions"

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
    const messageNodes: RichTextNode[] = fields?.message?.content ?? []
    return html`
      <duet-alert margin="none" variation=${variation}>
        <duet-paragraph margin="none">${renderNodes(messageNodes)}</duet-paragraph>
      </duet-alert>
    `
  }
}
