var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getLinkUrl, isUrlExternal } from "../utils/helper-functions";
let ProtoDynamicHero = class ProtoDynamicHero extends LitElement {
    render() {
        const fields = this.props?.[0]?.fields;
        const headingObject = fields?.heading;
        const intoText = fields?.intro?.content[0].content[0]?.value;
        const content = fields?.content;
        const buttons = fields?.buttons;
        return html `
      <duet-page-heading icon=${fields?.icon ?? nothing} layout="auto">
        ${headingObject &&
            html `
          <duet-heading level="h1" slot="heading" margin="none">${headingObject}</duet-heading>`}
      </duet-page-heading>


      <!--TODO: When parent has wider grid-template, we need to set grid-template="sidebar-right" for this duet-grid-->
      <duet-grid>
        ${intoText &&
            html `
            <div>
              ${intoText}
              <duet-spacer size="large"></duet-spacer>
            </div>`}

        <!--  TODO: Check if this main is required. LLA might've forgotten it   -->
        <div slot="main">
          <!-- Custom content -->
          <slot></slot>
        </div>

        <!-- Dynamic Group -->
        ${content?.length
            ? html `
              <div class="grid" id="dynamichero_content">
                ${content.map(item => {
                const fields = item.fields.content?.[0]?.fields ?? {};
                return html `
                    <duet-link
                      id=${item.fields.key ?? nothing}
                      icon=${fields.icon ?? nothing}
                      icon-color=${item.fields.linkIconColorVariation ?? nothing}
                      variation=${item.fields.linkVariation ?? nothing}
                      url=${fields.url ?? nothing}
                    >
                      ${fields.text ?? ""}
                    </duet-link>
                  `;
            })}
              </div>
            `
            : nothing}
      </duet-grid>

      <!-- Buttons -->
      ${buttons?.length
            ? html `
          <div class="grid" id="dynamichero_buttons">
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
          </div>
        `
            : nothing}

      <duet-spacer size="x-large"></duet-spacer>
    `;
    }
};
// TODO: fix these custom styles with duet props
ProtoDynamicHero.styles = css `
    /* Only display the spacer in heading if a "back link" is present */

    duet-page-heading div[slot='heading'] > duet-spacer:first-child {
      display: none;
    }

    /* Only display the after-content spacer if content is present */

    div[slot='main'] > duet-spacer + duet-spacer:last-child {
      display: none;
    }

    .grid {
      display: grid;
      grid-template-columns: 1fr;
      max-width: 100%;
      align-items: center;
    }

    @media (min-width: 48em) {
      .grid {
        grid-template-columns: 1fr 1fr;
        column-gap: 12px;
        row-gap: 8px;
      }
    }

    @media (min-width: 62em) {
      .grid {
        grid-template-columns: 1fr 1fr 1fr;
        column-gap: 12px;
        row-gap: 8px;
      }
    }
  `;
__decorate([
    property({ type: Array })
], ProtoDynamicHero.prototype, "props", void 0);
__decorate([
    property({ type: Array })
], ProtoDynamicHero.prototype, "protoButtonHandlers", void 0);
ProtoDynamicHero = __decorate([
    customElement("proto-dynamic-hero")
], ProtoDynamicHero);
export { ProtoDynamicHero };
//# sourceMappingURL=proto-dynamic-hero.js.map