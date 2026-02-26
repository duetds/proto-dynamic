var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { formatRichText, renderRichText } from "../utils/helper-functions";
let ProtoDynamicRichText = class ProtoDynamicRichText extends LitElement {
    constructor() {
        super(...arguments);
        this.props = { data: [], options: {} };
    }
    render() {
        const { data, options } = this.props;
        return html `
      ${unsafeHTML(formatRichText(renderRichText(data), options))}
    `;
    }
};
__decorate([
    property({ attribute: false })
], ProtoDynamicRichText.prototype, "props", void 0);
__decorate([
    property({ type: String })
], ProtoDynamicRichText.prototype, "currentModalEntryId", void 0);
ProtoDynamicRichText = __decorate([
    customElement("proto-dynamic-rich-text")
], ProtoDynamicRichText);
export { ProtoDynamicRichText };
//# sourceMappingURL=proto-dynamic-rich-text.js.map