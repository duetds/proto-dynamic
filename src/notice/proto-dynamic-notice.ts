import { html, LitElement, nothing } from "lit"
import { customElement, property } from "lit/decorators.js"
import type { RichTextNode } from "../hero/proto-dynamic-hero"

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
    const messageNodes = fields?.message?.content?.[0]?.content ?? []

    return html`
      <duet-alert margin="none" variation=${variation}>
        <duet-paragraph>
          ${messageNodes.map(node => {
            if (node.nodeType === "text") {
              return node.value ?? nothing
            }

            if (node.nodeType === "hyperlink") {
              return html`
                <duet-link url=${node.data?.uri ?? nothing}>
                  ${node.content?.[0]?.value ?? nothing}
                </duet-link>
              `
            }

            return nothing
          })}
        </duet-paragraph>
      </duet-alert>

    `
  }
}
