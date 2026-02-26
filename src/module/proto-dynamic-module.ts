import { css, html, LitElement, nothing } from "lit"
import { customElement, property } from "lit/decorators.js"
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
    url?: string
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
  `

  override render() {
    const fields = this.props?.[0]?.fields
    const content = fields?.content

    //TODO: grid template should be used only on page level
    // delete this and check what was the requirement with dynamic components and how we want to present them
    function getGridTemplate() {
      if (!content?.length || content.length === 1) return nothing
      return content.length === 2 ? "two-columns" : "three-columns"
    }

    function getComponent(item: ActionEntry, protoButtonHandlers?: ProtoButtonHandler[]) {
      const result = renderComponent({ target: item, protoButtonHandlers })
      return result === "default" ? nothing : result
    }

    return content?.length
      ? html`
        <duet-grid class="no-padding" grid-template=${getGridTemplate()}>
          ${content.map(
            item => html`
            <duet-grid-item fill>
              ${getComponent(item, this.protoButtonHandlers)}
            </duet-grid-item>
          `
          )}
        </duet-grid>
      `
      : nothing
  }
}
