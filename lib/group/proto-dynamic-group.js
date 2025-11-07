var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { isUrlExternal } from "../utils/helper-functions";
let ProtoDynamicGroup = class ProtoDynamicGroup extends LitElement {
    render() {
        const fields = this.props?.fields;
        const groupTitle = fields?.heading;
        const content = fields?.content;
        // TODO: and block-menu variant functionality missing
        const linkVariation = fields?.linkVariation;
        const iconBackground = fields?.linkIconColorVariation;
        const iconColor = iconBackground ? "color-gray-lightest" : nothing;
        function getLinkVariation() {
            return linkVariation !== "block-divider" ? linkVariation : "button";
        }
        return html `
        <duet-grid-item fill>
            <duet-grid-item fill>
              <duet-heading level="h3">${groupTitle}</duet-heading>

              <duet-grid>
                <duet-grid-item margin="none" fill>
                  <duet-list margin="none">
                    ${content?.map(item => html `
                        <dt>
                        <duet-link
                              margin="none"
                              id=${item.fields.key}
                              icon=${item.fields?.icon ?? nothing}
                              icon-right
                              icon-background=${iconBackground}
                              icon-color=${iconColor}
                              variation=${getLinkVariation()}
                              external=${isUrlExternal(item.fields.url)}
                              url=${item.fields.url ?? nothing}
                            >${item.fields.text ?? ""}
                            </duet-link>
                        </dt>
                          `)}
                  </duet-list>
                  <duet-spacer size="xx-large"></duet-spacer>
                </duet-grid-item>
                
              </duet-grid>
            </duet-grid-item>
        </duet-grid-item>
      `;
    }
};
ProtoDynamicGroup.styles = css `
      .claims-list {
          dt:first-of-type {
              border-top: 1px solid var(--color-gray-light);
          }
      }

      duet-link::part(duet-link) {
          padding: 0;
          border: none;
          border-bottom: 1px solid var(--color-gray-light);
          border-radius: 0;
      }
  `;
__decorate([
    property({ type: Object })
], ProtoDynamicGroup.prototype, "props", void 0);
ProtoDynamicGroup = __decorate([
    customElement("proto-dynamic-group")
], ProtoDynamicGroup);
export { ProtoDynamicGroup };
//# sourceMappingURL=proto-dynamic-group.js.map