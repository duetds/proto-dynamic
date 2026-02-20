var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getLinkUrl, handleLinkClick, isUrlExternal } from "../utils/helper-functions";
let ProtoDynamicGroup = class ProtoDynamicGroup extends LitElement {
    render() {
        const fields = this.props?.fields;
        const headingVisualLevel = this.props?.fields?.headingVisualLevel || "h4";
        const accessibilityHeading = this.props?.fields?.accessibilityHeading;
        const groupTitle = fields?.heading;
        const content = fields?.content;
        const linkVariation = fields?.linkVariation;
        const iconBackground = fields?.linkIconColorVariation;
        const iconColor = iconBackground ? "color-gray-lightest" : "primary";
        function getLinkVariation() {
            return linkVariation ? (linkVariation === "button" ? linkVariation : "block") : nothing;
        }
        return html `
      ${groupTitle && html `<duet-heading level="h2" visual-level=${headingVisualLevel}>${groupTitle}</duet-heading>`}
      <nav aria-label=${accessibilityHeading || nothing}>
        <ul class="link-list">
          <duet-divider margin="none"></duet-divider>
          
          ${content?.map(item => {
            const { fields } = item;
            const variation = getLinkVariation();
            return html `
              <li>
                <duet-link
                  id=${fields.key}
                  class=${variation === "block" ? "link-item" : nothing}
                  url=${getLinkUrl(item, this.protoButtonHandlers)}
                  icon=${fields.icon ?? nothing}
                  icon-responsive
                  icon-color=${iconColor}
                  icon-background=${iconBackground}
                  external=${isUrlExternal(fields.url)}
                  variation=${variation}
                  @click=${() => handleLinkClick(item, this.protoButtonHandlers)}
                >
                  ${fields.text ?? ""}
                </duet-link>
                <duet-divider margin="none"/>
              </li>
            `;
        })}
        </ul>
      </nav>
      <duet-spacer size="xx-large"></duet-spacer>
    `;
    }
};
// TODO: check if possible to remove horizontal padding without ::part
ProtoDynamicGroup.styles = css `
      ul.link-list {
          list-style: none;
          margin: 0;
          padding: 0;
      }

      ul.link-list li .link-item {
          border-radius: 0;
      }

      ul.link-list li .link-item::part(duet-link) {
          padding-left: 0;
          padding-right: 0;
      }
  `;
__decorate([
    property({ type: Object })
], ProtoDynamicGroup.prototype, "props", void 0);
__decorate([
    property({ type: Array })
], ProtoDynamicGroup.prototype, "protoButtonHandlers", void 0);
ProtoDynamicGroup = __decorate([
    customElement("proto-dynamic-group")
], ProtoDynamicGroup);
export { ProtoDynamicGroup };
//# sourceMappingURL=proto-dynamic-group.js.map