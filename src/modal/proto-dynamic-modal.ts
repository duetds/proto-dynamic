import { html, LitElement } from "lit"
import { customElement, property } from "lit/decorators.js"
import { unsafeHTML } from "lit/directives/unsafe-html.js"
import type { EntryFields } from "../hero/proto-dynamic-hero"
import { renderRichText } from "../utils/helper-functions"

@customElement("proto-dynamic-modal")
export class ProtoDynamicModal extends LitElement {
  @property({ type: String }) currentModalEntryId?: string
  @property({ type: Object }) entryFields?: EntryFields

  override render() {
    return html`
      <duet-modal
        heading=${this.entryFields?.heading}
        icon=${this.entryFields?.icon}
        id=${this.currentModalEntryId}
      >
        <duet-spacer size="large"></duet-spacer>

        ${(this.entryFields?.body?.content ?? []).map(
          node => html`
            <div>
              ${unsafeHTML(renderRichText(node))}
            </div>
          `
        )}
      </duet-modal>
    `
  }
}
