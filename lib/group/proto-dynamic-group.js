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
        const groupVariation = fields?.linkVariation ?? undefined;
        return html `
        <duet-grid-item fill>
          <duet-grid
            breakpoint="medium"
            class="grid-demo"
            mobile="left"
            responsive
          >
            <duet-grid-item
              fill
            >
              <duet-heading level="h3">${groupTitle}</duet-heading>

              <duet-grid class="content" direction="horizontal">
                <!-- Links -->
                ${content?.length
            ? html `
                      <duet-grid-item fill class="grid">
                        ${content?.map(item => html `
                            <duet-link
                              id=${item.fields.key}
                              icon=${item.fields?.icon ?? nothing}
                              icon-right
                              variation=${groupVariation}
                              external=${isUrlExternal(item.fields.url)}
                              url=${item.fields.url ?? nothing}
                            >${item.fields.text ?? ""}
                            </duet-link>
                          `)}
                      </duet-grid-item>
                    `
            : nothing}
              </duet-grid>
            </duet-grid-item>
          </duet-grid>
        </duet-grid-item>
      `;
    }
};
ProtoDynamicGroup.styles = css `
      .content {
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
], ProtoDynamicGroup.prototype, "props", void 0);
ProtoDynamicGroup = __decorate([
    customElement("proto-dynamic-group")
], ProtoDynamicGroup);
export { ProtoDynamicGroup };
//# sourceMappingURL=proto-dynamic-group.js.map