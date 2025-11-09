var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
let ProtoDynamicModule = class ProtoDynamicModule extends LitElement {
    render() {
        const fields = this.props?.[0]?.fields;
        const content = fields?.content;
        function getGridTemplate() {
            if (content?.length === 1)
                return nothing;
            if (content?.length === 2)
                return "two-columns";
            return "three-columns";
        }
        function getComponent(item, protoButtons) {
            switch (item.sys.contentType.sys.id) {
                case "highlight":
                    return html `<proto-dynamic-highlight .protoButtons=${protoButtons} .props=${item}></proto-dynamic-highlight>`;
                case "dynamicGroup":
                    return html `<proto-dynamic-group .protoButtons=${protoButtons} .props=${item}></proto-dynamic-group>`;
                default:
                    return nothing;
            }
        }
        return content
            ? html `
      <duet-grid grid-template=${getGridTemplate()}>
          ${content.map(item => html `
              <duet-grid-item fill>
                ${getComponent(item, this.protoButtons)}
              </duet-grid-item>
            `)}
      </duet-grid>
   `
            : nothing;
    }
};
__decorate([
    property({ type: Array })
], ProtoDynamicModule.prototype, "props", void 0);
__decorate([
    property({ type: Array })
], ProtoDynamicModule.prototype, "protoButtons", void 0);
ProtoDynamicModule = __decorate([
    customElement("proto-dynamic-module")
], ProtoDynamicModule);
export { ProtoDynamicModule };
//# sourceMappingURL=proto-dynamic-module.js.map