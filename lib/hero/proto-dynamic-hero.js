var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getLinkUrl, isUrlExternal } from "../utils/helper-functions";
let ProtoDynamicHero = class ProtoDynamicHero extends LitElement {
    constructor() {
        super(...arguments);
        this.isLargeScreen = false;
        this.isParentLarge = false; // Parent grids with wider grid-template settings require narrower text fields.
        this._onMediaChange = (event) => {
            this.isLargeScreen = event.matches;
        };
    }
    connectedCallback() {
        super.connectedCallback();
        const parentGrid = this.closest("duet-grid");
        const gridTemplate = parentGrid?.getAttribute("grid-template");
        if (gridTemplate === "large") {
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
        const subTitleText = intro?.content?.[0]?.content?.[0]?.value ?? "";
        return html `
      <duet-page-heading icon=${icon ?? nothing} layout="auto">
        ${heading &&
            html `
          <duet-heading level="h1" slot="heading" margin="none">${heading}</duet-heading>`}
      </duet-page-heading>

      <duet-grid grid-template=${this.isParentLarge && this.isLargeScreen ? "sidebar-right" : nothing}>
        ${subTitleText &&
            html `
            <duet-paragraph>
              ${subTitleText}
              <duet-spacer size="large"></duet-spacer>
            </duet-paragraph>`}
      </duet-grid>

      <!-- Custom content -->
      <slot name="main"></slot>
      
      <!-- Buttons -->
      ${buttons?.length
            ? html `
          <duet-grid grid-template="button-grid"  id="dynamichero_buttons">
            ${buttons.map(({ fields }) => html `
              <duet-link
                id=${fields.key ?? nothing}
                icon=${fields.icon ?? nothing}
                url=${getLinkUrl({ fields }, this.protoButtonHandlers)}
                variation="button"
                external=${isUrlExternal(fields.url)}
              >
                ${fields.text ?? ""}
              </duet-link>
            `)}
          </duet-grid>
        `
            : nothing}

      <duet-spacer size="x-large"></duet-spacer>
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
    property({ type: Boolean })
], ProtoDynamicHero.prototype, "isLargeScreen", void 0);
ProtoDynamicHero = __decorate([
    customElement("proto-dynamic-hero")
], ProtoDynamicHero);
export { ProtoDynamicHero };
//# sourceMappingURL=proto-dynamic-hero.js.map