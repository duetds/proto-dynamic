import { html, LitElement, nothing } from "lit"
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
  @property({ type: Boolean }) isParentLarge = false
  @property({ type: Boolean }) isLargeScreen = false

  private _mediaQuery?: MediaQueryList

  override connectedCallback() {
    super.connectedCallback()

    const parentGrid = this.closest("duet-grid")
    const gridTemplate = parentGrid?.getAttribute("grid-template")

    if (gridTemplate === "large") {
      this.isParentLarge = true
      this._mediaQuery = window.matchMedia("(min-width: 1220px)")
      this.isLargeScreen = this._mediaQuery.matches
      this._mediaQuery.addEventListener("change", this._onMediaChange)
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback()
    this._mediaQuery?.removeEventListener("change", this._onMediaChange)
  }

  private _onMediaChange = (event: MediaQueryListEvent) => {
    this.isLargeScreen = event.matches
  }

  override render() {
    const fields = this.props?.[0]?.fields
    const { heading, intro, buttons, icon } = fields ?? {}
    const subTitleText = intro?.content?.[0]?.content?.[0]?.value ?? ""

    return html`
      <duet-page-heading icon=${icon ?? nothing} layout="auto">
        ${
          heading &&
          html`
          <duet-heading level="h1" slot="heading" margin="none">${heading}</duet-heading>`
        }
      </duet-page-heading>

      <duet-grid grid-template=${this.isParentLarge && this.isLargeScreen ? "sidebar-right" : nothing}>
        ${
          subTitleText &&
          html`
            <duet-paragraph>
              ${subTitleText}
              <duet-spacer size="large"></duet-spacer>
            </duet-paragraph>`
        }

        <div slot="main">
          <!-- Custom content -->
          <slot></slot>
        </div>
      </duet-grid>

      <!-- Buttons -->
      ${
        buttons?.length
          ? html`
          <duet-grid grid-template="button-grid"  id="dynamichero_buttons">
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
          </duet-grid>
        `
          : nothing
      }

      <duet-spacer size="x-large"></duet-spacer>
    `
  }
}
