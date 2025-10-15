var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
let ProtoDynamicHero = class ProtoDynamicHero extends LitElement {
    render() {
        const fields = this.props?.[0]?.fields;
        const headingObject = fields?.heading;
        const introObject = fields?.intro;
        const content = fields?.content;
        const buttons = fields?.buttons;
        return html `
      <duet-page-heading
        data-testid="dynamichero_page-heading"
        icon=${fields?.icon ?? nothing}
        id="dynamichero_page-heading"
        layout="auto"
      >
        <!-- Title -->
        ${headingObject
            ? html `
              <duet-heading
                data-testid="dynamichero_page-title"
                id="dynamichero_page-title"
                level="h1"
                margin="none"
                slot="heading"
              >
                ${headingObject}
              </duet-heading>
            `
            : null}
      </duet-page-heading>

      <!-- Render if intro exists -->
      ${introObject
            ? html `
            <div>
              ${introObject.content[0].content[0]?.value}
              <duet-spacer size="large"></duet-spacer>
            </div>
          `
            : null}

      <!--  TODO: Check if this main is required. LLA might've forgotten it   -->
      <div slot="main">
        <!-- Custom content -->
        <slot></slot>
      </div>

      <!-- Dynamic Group -->
      ${content?.length && content.length > 0
            ? html `
            <div
              class="grid"
              data-testid="dynamichero_content"
              id="dynamichero_content"
            >
              ${content.map(content => {
                if (content.sys.contentType.sys.id === "dynamicGroup") {
                    return html `
                    <duet-link
                      id=${content.fields.key ?? nothing}
                      icon=${content.fields.content?.[0]?.fields?.icon ?? nothing}
                      icon-color=${content.fields.linkIconColorVariation ?? nothing}
                      variation=${content.fields.linkVariation ?? nothing}
                      url=${content.fields.content?.[0]?.fields?.url ?? nothing}
                    >
                      ${content.fields.content?.[0]?.fields?.text ?? ""}
                    </duet-link>
                  `;
                }
                return nothing;
            })}
            </div>
          `
            : nothing}

      <!-- Buttons -->
      ${buttons?.length && buttons.length > 0
            ? html `
            <div
              class="grid"
              data-testid="dynamichero_buttons"
              id="dynamichero_buttons"
            >
              ${buttons.map(button => {
                if (button.sys.contentType.sys.id === "linkResource") {
                    return html `
                    <duet-link
                      id=${button.fields.key ?? nothing}
                      icon=${button.fields.icon ?? nothing}
                      url=${button.fields.url ?? nothing}
                      variation="button"
                    >
                      ${button.fields.text ?? ""}
                    </duet-link>
                  `;
                }
                if (button.sys.contentType.sys.id === "buttonResource") {
                    return html ` <duet-button
                    id=${button.fields.key ?? nothing}
                    icon=${button.fields.icon ?? nothing}
                    >${button.fields.text ?? ""}
                  </duet-button>`;
                }
                return nothing;
            })}
            </div>
          `
            : nothing}

      <!-- Spacer -->
      <duet-spacer size="xxx-large"></duet-spacer>
    `;
    }
};
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
ProtoDynamicHero = __decorate([
    customElement("proto-dynamic-hero")
], ProtoDynamicHero);
export { ProtoDynamicHero };
//# sourceMappingURL=proto-dynamic-hero.js.map