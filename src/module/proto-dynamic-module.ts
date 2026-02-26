import { css, html, LitElement, nothing } from "lit"
import { customElement, property } from "lit/decorators.js"
import { unsafeHTML } from "lit/directives/unsafe-html.js"
import type { ProtoButtonHandler } from "../hero/proto-dynamic-hero"
import { renderComponent } from "../utils/helper-functions"

interface ModuleProps {
  fields: HighlightFields
}

interface HighlightFields {
  key: string
  content?: ActionEntry[]
}

export interface ActionEntry {
  fields: {
    key: string
    text?: string
    url: string
    icon?: string
    heading?: string | undefined
    items?: [] | undefined
  }
  sys: {
    contentType: {
      sys: { id: string }
    }
  }
}

@customElement("proto-dynamic-module")
export class ProtoDynamicModule extends LitElement {
  @property({ type: Array }) props?: ModuleProps[]
  @property({ type: Array }) protoButtonHandlers?: ProtoButtonHandler[] // Overrides button behavior for prototype use

  static override styles = css`
   .no-padding {
       padding: 0;
   }
      .module-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-medium);
      }       
  `

  override render() {
    const fields = this.props?.[0]?.fields
    const content = fields?.content

    function getComponent(item: ActionEntry, protoButtonHandlers?: ProtoButtonHandler[]) {
      const result = renderComponent({ target: item, protoButtonHandlers })

      return result === "default" ? nothing : unsafeHTML(result)
    }

    return content?.length
      ? html`
        <div class="no-padding module-grid">
          ${content.map(
            item => html`
            <div>
              ${getComponent(item, this.protoButtonHandlers)}
            </div>
          `
          )}
        </duet-grid>
      `
      : nothing
  }
}
