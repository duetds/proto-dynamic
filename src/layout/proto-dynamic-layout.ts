import { html, LitElement, nothing } from "lit"
import { customElement, property } from "lit/decorators.js"

interface DynamicLayoutItem {
  key: string
}

interface DynamicComponentContainer {
  __dynamicComponent: unknown[]
}

interface DynamicLayoutProps {
  __dynamicLayout: DynamicLayoutItem[]
  [key: string]: DynamicComponentContainer | DynamicLayoutItem[] | undefined
}

@customElement("proto-dynamic-layout")
export class ProtoDynamicLayout extends LitElement {
  @property({ type: Object }) props?: DynamicLayoutProps

  override render() {
    const dynamicComponents = this.props?.__dynamicLayout
    if (!dynamicComponents) return nothing
    console.log('DYNAMIC LAYOUT this.props', this.props)
    console.log('DYNAMIC LAYOUT', dynamicComponents)
    return html`
      ${dynamicComponents.map(component => {
        const container = this.props?.[component.key] as DynamicComponentContainer | undefined
        const data = container?.__dynamicComponent

        return html`
          <proto-dynamic-module .props=${data}></proto-dynamic-module>
        `
      })}
    `
  }
}
