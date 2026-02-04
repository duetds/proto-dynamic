var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { renderRichText } from "../utils/helper-functions";
let ProtoDynamicModal = class ProtoDynamicModal extends LitElement {
    render() {
        return html `
      <duet-modal
        heading=${this.entryFields?.heading}
        icon=${this.entryFields?.icon}
        id=${this.currentModalEntryId}
      >
        <duet-spacer size="large"></duet-spacer>

        ${(this.entryFields?.body?.content ?? []).map(node => html `
            <div>
              ${unsafeHTML(renderRichText(node))}
            </div>
          `)}
      </duet-modal>
    `;
    }
};
__decorate([
    property({ type: String })
], ProtoDynamicModal.prototype, "currentModalEntryId", void 0);
__decorate([
    property({ type: Object })
], ProtoDynamicModal.prototype, "entryFields", void 0);
ProtoDynamicModal = __decorate([
    customElement("proto-dynamic-modal")
], ProtoDynamicModal);
export { ProtoDynamicModal };
//# sourceMappingURL=proto-dynamic-modal.js.map