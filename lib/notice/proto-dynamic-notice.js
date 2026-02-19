var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { attributeMarginNone, renderRichText } from "../utils/helper-functions";
let ProtoDynamicNotice = class ProtoDynamicNotice extends LitElement {
    render() {
        const fields = this.props?.fields;
        const variation = fields?.variation;
        const richTextContent = fields?.message ?? []; // message is always RichText
        return html `
      <duet-alert margin="none" variation=${variation}>
        ${unsafeHTML(attributeMarginNone(renderRichText(richTextContent)))}
      </duet-alert>
    `;
    }
};
__decorate([
    property({ type: Object })
], ProtoDynamicNotice.prototype, "props", void 0);
ProtoDynamicNotice = __decorate([
    customElement("proto-dynamic-notice")
], ProtoDynamicNotice);
export { ProtoDynamicNotice };
//# sourceMappingURL=proto-dynamic-notice.js.map