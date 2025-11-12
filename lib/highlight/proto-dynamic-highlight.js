var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getLinkUrl, handleLinkClick, isUrlExternal } from "../utils/helper-functions";
let ProtoDynamicHighlight = class ProtoDynamicHighlight extends LitElement {
    render() {
        const fields = this.props?.fields;
        const highlightTitle = fields?.heading;
        const iconName = fields?.icon;
        const description = fields?.description?.content?.[0]?.content?.[0]?.value;
        const actions = fields?.actions;
        const highlightVariation = fields?.style;
        // Default variant of highlight component$
        return highlightVariation === "default"
            ? html `
          <duet-grid
            alignment="stretch"
            breakpoint="medium"
            mobile="left"
            responsive
          >
            <duet-grid-item fill>
              ${iconName
                ? html `
                  <duet-icon
                    shape="brand"
                    size="x-large"
                    background="primary-lighter"
                    color="primary"
                    name=${iconName}
                  ></duet-icon>
                `
                : nothing}

              <duet-heading level="h3">${highlightTitle}</duet-heading>

              ${description ? html `<duet-paragraph>${description}</duet-paragraph>` : nothing}

              <!-- Buttons -->
              ${actions?.length
                ? html `
                    ${actions.map(action => {
                    const { fields } = action;
                    return html `
                        <duet-button
                          fixed
                          id=${fields.key}
                          icon=${fields.icon ?? nothing}
                          icon-right
                          variation="plain"
                          external=${isUrlExternal(fields.url)}
                          url=${getLinkUrl(action, this.protoButtonHandlers)}
                          @click=${() => handleLinkClick(action, this.protoButtonHandlers)}
                        >
                          ${fields.text ?? ""}
                        </duet-button>
                      `;
                })}
                `
                : nothing}

            </duet-grid-item>
          </duet-grid>
      `
            : nothing;
    }
};
ProtoDynamicHighlight.styles = css `
      .actions {
          display: flex;
          flex-direction: column;
          gap: var(--space-small);
          margin-top: var(--space-small);

          // Media query small
          @media (min-width: 36em) {
              flex-direction: row;
              flex-wrap: wrap;
          }
      }
  `;
__decorate([
    property({ type: Object })
], ProtoDynamicHighlight.prototype, "props", void 0);
__decorate([
    property({ type: Array })
], ProtoDynamicHighlight.prototype, "protoButtonHandlers", void 0);
ProtoDynamicHighlight = __decorate([
    customElement("proto-dynamic-highlight")
], ProtoDynamicHighlight);
export { ProtoDynamicHighlight };
//# sourceMappingURL=proto-dynamic-highlight.js.map