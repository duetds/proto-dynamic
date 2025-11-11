import { css, html, LitElement, nothing } from "lit"
import { customElement, property } from "lit/decorators.js"
import { getLinkUrl, isUrlExternal } from "../utils/helper-functions"

interface SysContentType {
  sys: { id: string }
}

interface Sys {
  sys: { contentType: SysContentType }
}

export interface ButtonResource extends Sys {
  fields: {
    key: string
    text?: string
    icon?: string
    iconColor?: string
    url?: string
    variation?: string
  }
}

interface LinkContent {
  fields?: {
    icon?: string
    key?: string
    text?: string
    url?: string
  }
}

interface ContentResource extends Sys {
  fields: {
    key?: string
    linkIconColorVariation?: string
    linkVariation?: string
    content?: LinkContent[]
  }
}

interface HeroFields {
  heading?: { value: string }
  intro?: { content: { content: { value: string }[] }[] }
  content?: ContentResource[]
  buttons?: ButtonResource[]
  icon?: string
}

export interface HeroItem {
  fields?: HeroFields
}

export interface ProtoButtonHandler {
  buttonId: string
  url?: string
  clickHandler?: () => void
}

@customElement("proto-dynamic-hero")
export class ProtoDynamicHero extends LitElement {
  @property({ type: Array }) props?: HeroItem[]
  @property({ type: Array }) protoButtonHandlers?: ProtoButtonHandler[] // Button URLs are only for proto use

  // TODO: fix these custom styles with duet props
  static override styles = css`
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
  `

  override render() {
    const fields = this.props?.[0]?.fields
    const headingObject = fields?.heading
    const intoText = fields?.intro?.content[0].content[0]?.value
    const content = fields?.content
    const buttons = fields?.buttons

    return html`
      <duet-page-heading icon=${fields?.icon ?? nothing} layout="auto">
        ${
          headingObject &&
          html`
          <duet-heading level="h1" slot="heading" margin="none">${headingObject}</duet-heading>`
        }
      </duet-page-heading>


      <!--TODO: When parent has wider grid-template, we need to set grid-template="sidebar-right" for this duet-grid-->
      <duet-grid>
        ${
          intoText &&
          html`
            <div>
              ${intoText}
              <duet-spacer size="large"></duet-spacer>
            </div>`
        }

        <!--  TODO: Check if this main is required. LLA might've forgotten it   -->
        <div slot="main">
          <!-- Custom content -->
          <slot></slot>
        </div>

        <!-- Dynamic Group -->
        ${
          content?.length
            ? html`
              <div class="grid" id="dynamichero_content">
                ${content.map(item => {
                  const fields = item.fields.content?.[0]?.fields ?? {}
                  return html`
                    <duet-link
                      id=${item.fields.key ?? nothing}
                      icon=${fields.icon ?? nothing}
                      icon-color=${item.fields.linkIconColorVariation ?? nothing}
                      variation=${item.fields.linkVariation ?? nothing}
                      url=${fields.url ?? nothing}
                    >
                      ${fields.text ?? ""}
                    </duet-link>
                  `
                })}
              </div>
            `
            : nothing
        }
      </duet-grid>

      <!-- Buttons -->
      ${
        buttons?.length
          ? html`
          <div class="grid" id="dynamichero_buttons">
            ${buttons.map(
              ({ fields }) => html`
              <duet-link
                id=${fields.key ?? nothing}
                icon=${fields.icon ?? nothing}
                url=${getLinkUrl({ fields }, this.protoButtonHandlers)}
                variation="button"
                external=${isUrlExternal(fields.url)}
              >
                ${fields.text ?? ""}
              </duet-link>
            `
            )}
          </div>
        `
          : nothing
      }

      <duet-spacer size="x-large"></duet-spacer>
    `
  }
}
