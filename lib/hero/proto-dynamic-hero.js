var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let ProtoDynamicHero = class ProtoDynamicHero extends LitElement {
    render() {
        const fields = this.props?.[0]?.fields;
        const headingObject = fields?.heading; // { value?: string } | undefined
        const introObject = fields?.intro;
        const buttons = fields?.buttons;
        return html `
      <!--   TODO: duet-page-heading creates horizontal padding on smaller screens   -->
      <duet-page-heading
        data-testid="dynamichero_page-heading"
        icon=${fields?.icon ?? nothing}
        id="dynamichero_page-heading"
        layout="fluid"
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
                ${headingObject.value}
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

      <!-- Buttons -->
      ${buttons?.length && buttons.length > 0
            ? html `
            <div
              class="grid"
              data-testid="dynamichero_buttons"
              id="dynamichero_buttons"
            >
              ${buttons.map((button) => {
                console.log('button.sys.contentType.sys.id', button.sys.contentType.sys.id);
                if (button.sys.contentType.sys.id === 'linkResource') {
                    return html `
                    <duet-link
                      id=${button.fields.key ?? nothing}
                      external=${button.fields.external ?? nothing}
                      icon=${button.fields.icon?.value ?? nothing}
                      icon-background=${button.fields.iconBackground ?? nothing}
                      icon-color=${button.fields.iconColor ?? nothing}
                      margin=${button.fields.margin ?? nothing}
                      padding=${button.fields.padding ?? nothing}
                      url=${button.fields.url?.value ?? nothing}
                      variation=${button.fields.variation ?? nothing}
                      class=${button.fields.variation ? 'block-menu' : ''}
                    >
                      ${button.fields.text ? button.fields.text?.value : ''}
                    </duet-link>
                  `;
                }
                if (button.sys.contentType.sys.id === 'buttonResource') {
                    return html ` <duet-button
                    id=${button.fields.key ?? nothing}
                    name=${button.fields.name ?? nothing}
                    external=${button.fields.external ?? nothing}
                    expand=${button.fields.expand ?? nothing}
                    negative=${button.fields.negative ?? nothing}
                    icon=${button.fields.icon?.value ?? nothing}
                    icon-background=${button.fields.iconBackground ?? nothing}
                    icon-color=${button.fields.iconColor ?? nothing}
                    margin=${button.fields.margin ?? nothing}
                    padding=${button.fields.padding ?? nothing}
                    url=${button.fields.url?.value ?? nothing}
                    variation=${button.fields.variation ?? nothing}
                    center-text=${button.fields.centerText ?? nothing}
                    color=${button.fields.color?.value ?? nothing}
                    disabled=${button.fields.disabled ?? nothing}
                    size=${button.fields.size ?? nothing}
                    submit=${button.fields.submit ?? nothing}
                    fixed=${button.fields.fixed ?? nothing}
                    icon-size=${button.fields.iconSize ?? nothing}
                    class=${button.fields.variation ? 'block-menu' : ''}
                    >${button.fields.text ? button.fields.text?.value : ''}
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
    customElement('proto-dynamic-hero')
], ProtoDynamicHero);
export { ProtoDynamicHero };
//# sourceMappingURL=proto-dynamic-hero.js.map