var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { getLinkUrl, isUrlExternal, renderRichText } from "../utils/helper-functions";
let ProtoDynamicHero = class ProtoDynamicHero extends LitElement {
    constructor() {
        super(...arguments);
        this.isLargeScreen = false;
        this.isParentLarge = false; // Parent grids with wider grid-template settings require narrower text fields.
        this._onMediaChange = (event) => {
            this.isLargeScreen = event.matches;
        };
        this.openDynamicModal = async (event) => {
            this.currentModalEntryId = event.detail.entryId;
            this.entryFields = event.detail.fields;
            await this.updateComplete;
            const dynamicModal = document.getElementById(this.currentModalEntryId);
            dynamicModal?.show();
        };
    }
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener("open-dynamic-modal", async (event) => {
            await this.openDynamicModal(event);
        });
        const parentGrid = this.closest("duet-grid");
        if (parentGrid?.getAttribute("grid-template") === "large") {
            this.isParentLarge = true;
            this._mediaQuery = window.matchMedia("(min-width: 1220px)"); // Duet media-query-xx-large
            this.isLargeScreen = this._mediaQuery.matches;
            this._mediaQuery.addEventListener("change", this._onMediaChange);
        }
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this._mediaQuery?.removeEventListener("change", this._onMediaChange);
    }
    render() {
        const fields = this.props?.[0]?.fields;
        const { heading, intro, buttons, icon } = fields ?? {};
        const nodes = intro?.content ?? [];
        return html `
      <duet-page-heading icon=${icon ?? nothing} layout="auto">
        ${heading
            ? html `
              <duet-heading
                level="h1"
                visual-level=${this.isParentLarge ? "h1" : "h2"}
                slot="heading"
                margin="none"
              >
                ${heading}
              </duet-heading>
            `
            : nothing}
      </duet-page-heading>

      <slot name="main"></slot>

      <!-- Nodes -->
      ${nodes.map(node => {
            let renderedContent = "";
            if (node.nodeType === "paragraph") {
                renderedContent = node.content?.map(n => (n.nodeType === "text" ? n.value : renderRichText(n))).join("") ?? "";
            }
            else if (node.nodeType === "embedded-entry-block" && node.data?.target?.fields) {
                renderedContent = renderRichText(node);
            }
            return html `
          <duet-grid
            grid-template=${this.isParentLarge && this.isLargeScreen ? "sidebar-right" : nothing}
          >
            <duet-paragraph>${unsafeHTML(renderedContent)}</duet-paragraph>
          </duet-grid>
        `;
        })}

      ${buttons?.length
            ? html `
            <duet-grid
              grid-template="button-grid"
              id="dynamichero_buttons"
            >
              ${buttons.map(b => html `
                  <duet-link
                    id=${b.fields.key ?? nothing}
                    icon=${b.fields.icon ?? nothing}
                    url=${getLinkUrl(b, this.protoButtonHandlers)}
                    variation="button"
                    external=${isUrlExternal(b.fields.url)}
                  >
                    ${b.fields.text ?? ""}
                  </duet-link>
                `)}
            </duet-grid>

            <duet-spacer size="x-large"></duet-spacer>
          `
            : nothing}

      <proto-dynamic-modal
        .entryFields=${this.entryFields}
        .currentModalEntryId=${this.currentModalEntryId}
      ></proto-dynamic-modal>
    `;
    }
};
__decorate([
    property({ type: Array })
], ProtoDynamicHero.prototype, "props", void 0);
__decorate([
    property({ type: Array })
], ProtoDynamicHero.prototype, "protoButtonHandlers", void 0);
__decorate([
    property({ type: String })
], ProtoDynamicHero.prototype, "currentModalEntryId", void 0);
__decorate([
    property({ type: Object })
], ProtoDynamicHero.prototype, "entryFields", void 0);
__decorate([
    property({ type: Boolean })
], ProtoDynamicHero.prototype, "isLargeScreen", void 0);
ProtoDynamicHero = __decorate([
    customElement("proto-dynamic-hero")
], ProtoDynamicHero);
export { ProtoDynamicHero };
//# sourceMappingURL=proto-dynamic-hero.js.map