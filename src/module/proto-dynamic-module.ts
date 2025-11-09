import { html, LitElement, nothing } from "lit"
import { customElement, property } from "lit/decorators.js"
import type { ButtonUrl } from "../hero/proto-dynamic-hero"

interface ModuleProps {
  fields: HighlightFields
}

interface HighlightFields {
  key: string
  content?: ActionEntry[]
}

interface ActionEntry {
  fields: {
    key: string
    text?: string
    url?: string
    icon?: string
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
  @property({ type: Array }) buttonUrls?: ButtonUrl[] // Button URLs are only for proto use

  override render() {
    const fields = this.props?.[0]?.fields
    const content = fields?.content

    function getGridTemplate() {
      if (content?.length === 1) return nothing
      if (content?.length === 2) return "two-columns"
      return "three-columns"
    }

    function getComponent(item: ActionEntry, buttonUrls?: ButtonUrl[]) {
      switch (item.sys.contentType.sys.id) {
        case "highlight":
          return html`<proto-dynamic-highlight .buttonUrls=${buttonUrls} .props=${item}></proto-dynamic-highlight>`
        case "dynamicGroup":
          return html`<proto-dynamic-group .buttonUrls=${buttonUrls} .props=${item}></proto-dynamic-group>`
        default:
          return nothing
      }
    }

    return content
      ? html`
      <duet-grid grid-template=${getGridTemplate()}>
          ${content.map(
            item => html`
              <duet-grid-item fill>
                ${getComponent(item, this.buttonUrls)}
              </duet-grid-item>
            `
          )}
      </duet-grid>
   `
      : nothing
  }
}
