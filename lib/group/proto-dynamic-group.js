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
        console.log("ICON BG: ", iconBackground);
        const iconColor = iconBackground ? "color-gray-lightest" : "primary";
        function getLinkVariation() {
            console.log("LINK VARIATION: ", linkVariation);
            return linkVariation ? (linkVariation === "button" ? linkVariation : "block") : nothing;
        }
        return html `
      <duet-heading level="h3">${groupTitle}</duet-heading>

      <duet-grid>
        <duet-grid-item fill margin="none">
          <ul class="dynamic-group-claims-list">
            ${content?.map(item => html `
                <li>
                  <duet-link
                    class="link-item"
                    url=${item.fields.url ?? nothing}
                    icon=${item.fields?.icon ?? nothing}
                    icon-responsive
                    icon-color=${iconColor}
                    icon-background=${iconBackground}
                    external=${isUrlExternal(item.fields.url)}
                    variation=${getLinkVariation()}
                  >
                    ${item.fields.text ?? ""}
                  </duet-link>
                </li>
              `)}
          </ul>
          <duet-spacer size="xx-large"></duet-spacer>
        </duet-grid-item>
      </duet-grid>
    `;
    }
};
// TODO: check if possible to remove horizontal padding without ::part
ProtoDynamicGroup.styles = css `
      ul.dynamic-group-claims-list {
          list-style: none;
          margin: 0;
          padding: 0;
      }
      

      ul.dynamic-group-claims-list li .link-item {
          border-bottom: 1px solid var(--color-gray-light);
          border-radius: 0;
      }
      
      ul.dynamic-group-claims-list li:first-of-type .link-item {
          border-top: 1px solid var(--color-gray-light);
      }
      
      ul.dynamic-group-claims-list li .link-item::part(duet-link) {
          padding-left: 0;
          padding-right: 0;
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