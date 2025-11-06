import { html, LitElement, nothing } from "lit"
import { customElement, property } from "lit/decorators.js"

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

  override render() {
    const fields = this.props?.[0]?.fields
    const content = fields?.content

    function getGridTemplate() {
      if (content?.length === 1) return "large"
      if (content?.length === 2) return "two-columns"
      return "three-columns"
    }

    function getComponent(item: ActionEntry) {
      switch (item.sys.contentType.sys.id) {
        case "highlight":
          return html`<proto-dynamic-highlight .props=${item}></proto-dynamic-highlight>`
        case "dynamicGroup":
          return html`<span>Dynamic Group</span>`
        default:
          return nothing
      }
    }

    return content
      ? html`
      <duet-grid grid-template=${getGridTemplate()}>
        ${content.map(item => {
          getComponent(item)
        })}
      </duet-grid>
   `
      : nothing
  }
}
