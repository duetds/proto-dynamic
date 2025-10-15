import { html, LitElement } from "lit"
import { customElement } from "lit/decorators.js"

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement("proto-dynamic-test")
export class ProtoDynamicTest extends LitElement {
  override render() {
    return html`
      <duet-heading>
        <slot></slot>
      </duet-heading>
    `
  }
}
