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

    function gridTemplateCheck() {
      const contentLength = fields?.content?.length
      return contentLength === 1 ? "large" : contentLength === 2 ? "two-columns" : "three-columns"
    }

    return content
      ? html`
      <duet-grid grid-template=${gridTemplateCheck()}>
        ${content.map(item =>
          item.sys.contentType.sys.id === "highlight"
            ? html`<proto-dynamic-highlight .props=${item}></proto-dynamic-highlight>`
            : item.sys.contentType.sys.id === "dynamicGroup"
              ? html`<proto-dynamic-group .props=${item}></proto-dynamic-group>`
              : nothing
        )}
      </duet-grid>
   `
      : nothing
  }
}
