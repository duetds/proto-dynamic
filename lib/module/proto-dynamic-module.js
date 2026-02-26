var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { renderComponent } from "../utils/helper-functions";
let ProtoDynamicModule = class ProtoDynamicModule extends LitElement {
    render() {
        const fields = this.props?.[0]?.fields;
        const content = fields?.content;
        //TODO: grid template should be used only on page level
        // delete this and check what was the requirement with dynamic components and how we want to present them
        function getGridTemplate() {
            if (!content?.length || content.length === 1)
                return nothing;
            return content.length === 2 ? "two-columns" : "three-columns";
        }
        function getComponent(item, protoButtonHandlers) {
            const result = renderComponent({ target: item, protoButtonHandlers });
            return result === "default" ? nothing : result;
        }
        return content?.length
            ? html `
        <duet-grid class="no-padding" grid-template=${getGridTemplate()}>
          ${content.map(item => html `
            <duet-grid-item fill>
              ${getComponent(item, this.protoButtonHandlers)}
            </duet-grid-item>
          `)}
        </duet-grid>
      `
            : nothing;
    }
};
ProtoDynamicModule.styles = css `
   .no-padding {
       padding: 0;
   }
  `;
__decorate([
    property({ type: Array })
], ProtoDynamicModule.prototype, "props", void 0);
__decorate([
    property({ type: Array })
], ProtoDynamicModule.prototype, "protoButtonHandlers", void 0);
ProtoDynamicModule = __decorate([
    customElement("proto-dynamic-module")
], ProtoDynamicModule);
export { ProtoDynamicModule };
//# sourceMappingURL=proto-dynamic-module.js.map