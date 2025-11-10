import { html, LitElement, nothing } from "lit"
import { customElement, property } from "lit/decorators.js"
import type { ProtoButtonHandler } from "../hero/proto-dynamic-hero"

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
  @property({ type: Array }) protoButtonHandlers?: ProtoButtonHandler[] // Button URLs are only for proto use

  override render() {
    const dynamicComponents = this.props?.__dynamicLayout
    if (!dynamicComponents) return nothing

    return html`
      ${dynamicComponents.map(component => {
        const container = this.props?.[component.key] as DynamicComponentContainer | undefined
        const data = container?.__dynamicComponent

        return html`
          <proto-dynamic-module .protoButtonHandlers=${this.protoButtonHandlers} .props=${data}></proto-dynamic-module>
        `
      })}
    `
  }
}
