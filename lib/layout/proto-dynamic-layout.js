var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
let ProtoDynamicLayout = class ProtoDynamicLayout extends LitElement {
    render() {
        const dynamicComponents = this.props?.__dynamicLayout;
        if (!dynamicComponents)
            return nothing;
        return html `
      ${dynamicComponents.map(component => {
            const container = this.props?.[component.key];
            const data = container?.__dynamicComponent;
            return html `
          <proto-dynamic-module .props=${data}></proto-dynamic-module>
        `;
        })}
    `;
    }
};
__decorate([
    property({ type: Object })
], ProtoDynamicLayout.prototype, "props", void 0);
ProtoDynamicLayout = __decorate([
    customElement("proto-dynamic-layout")
], ProtoDynamicLayout);
export { ProtoDynamicLayout };
//# sourceMappingURL=proto-dynamic-layout.js.map