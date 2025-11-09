import { css, html, LitElement, nothing } from "lit"
import { customElement, property } from "lit/decorators.js"
import { isUrlExternal } from "../utils/helper-functions"

interface Sys {
  sys: {
    contentType: {
      sys: {
        id: string
      }
    }
  }
}

interface ButtonResource extends Sys {
  fields: {
    key?: string
    text?: { value: string }
    icon?: { value: string }
    iconColor?: string
    url?: string
    variation?: string
  }
}

interface ContentResource extends Sys {
  fields: {
    key?: string
    linkIconColorVariation?: string
    linkVariation?: string
    content?: {
      fields?: {
        icon?: string
        key?: string
        text?: string
        url?: string
      }
    }[]
  }
}

interface HeroFields {
  heading?: { value: string }
  intro?: { content: { content: { value: string }[] }[] }
  content?: ContentResource[]
  buttons?: ButtonResource[]
  icon?: string
}

interface HeroItem {
  fields?: HeroFields
}

export interface ProtoButton {
  buttonId: string
  buttonUrl?: string
  onClick?: () => void
}

@customElement("proto-dynamic-hero")
export class ProtoDynamicHero extends LitElement {
  @property({ type: Array }) props?: HeroItem[]
  @property({ type: Array }) protoButtons?: ProtoButton[] // Button URLs are only for proto use

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
      <duet-page-heading
        icon=${fields?.icon ?? nothing}
        id="dynamichero_page-heading"
        layout="auto"
      >
        <!-- Title -->
        ${
          headingObject
            ? html`
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
            : null
        }
      </duet-page-heading>

<!--TODO: When parent has wider grid-template, we need to set grid-template="sidebar-right" for this duet-grid-->
      <duet-grid>
      <!-- Render if intro exists -->
      ${
        intoText
          ? html`
            <div>
              ${intoText}
              <duet-spacer size="large"></duet-spacer>
            </div>
          `
          : null
      }

      <!--  TODO: Check if this main is required. LLA might've forgotten it   -->
      <div slot="main">
        <!-- Custom content -->
        <slot></slot>
      </div>

      <!-- Dynamic Group -->
      ${
        content?.length && content.length > 0
          ? html`
            <div
              class="grid"
              data-testid="dynamichero_content"
              id="dynamichero_content"
            >
              ${content.map(content => {
                return html`
                    <duet-link
                      id=${content.fields.key ?? nothing}
                      icon=${content.fields.content?.[0]?.fields?.icon ?? nothing}
                      icon-color=${content.fields.linkIconColorVariation ?? nothing}
                      variation=${content.fields.linkVariation ?? nothing}
                      url=${content.fields.content?.[0]?.fields?.url ?? nothing}
                    >
                      ${content.fields.content?.[0]?.fields?.text ?? ""}
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
            <div
              class="grid"
              id="dynamichero_buttons"
            >
              ${buttons.map(button => {
                return html`
                    <duet-link
                      id=${button.fields.key ?? nothing}
                      icon=${button.fields.icon ?? nothing}
                      url=${
                        this.protoButtons?.find(b => b.buttonId === button.fields.key)?.buttonUrl || button.fields.url
                      }
                      variation="button"
                      external=${isUrlExternal(button.fields.url)}
                    >
                      ${button.fields.text ?? ""}
                    </duet-link>
                  `
              })}
            </div>
          `
          : nothing
      }

      <duet-spacer size="x-large"></duet-spacer>
    `
  }
}
