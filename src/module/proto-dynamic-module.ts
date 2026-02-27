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

  override render() {
    const fields = this.props?.[0]?.fields
    const content = fields?.content || []
    const columns = Math.min(content?.length, 3) || 1
    const gridStyle = `grid-template-columns: repeat(${columns}, 1fr);`

    function getComponent(item: ActionEntry, protoButtonHandlers?: ProtoButtonHandler[]) {
      const result = renderComponent({ target: item, protoButtonHandlers })
      return result === "default" ? nothing : unsafeHTML(result)
    }

    return content?.length
      ? html`
        <div class="no-padding module-grid" style=${gridStyle}>
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
