import { html, LitElement, nothing } from "lit"
import { customElement, property } from "lit/decorators.js"
import { unsafeHTML } from "lit/directives/unsafe-html.js"
import { attributeIntro, getLinkUrl, isUrlExternal, renderRichText } from "../utils/helper-functions"

export interface RichTextNode {
  nodeType?: string
  value?: string
  content?: RichTextNode[]
  data?: {
    uri?: string
    target?: { fields?: Record<string, unknown> }
  }
}

export interface EntryFields {
  heading?: string
  icon?: string
  body?: { content: RichTextNode[] }
}

export interface DynamicModalEvent extends CustomEvent {
  detail: { entryId: string; fields: EntryFields }
}

export interface ProtoButtonHandler {
  buttonId: string
  url?: string
  clickHandler?: () => void
}

export interface ButtonResource {
  fields: { key: string; text?: string; icon?: string; url: string }
}

export interface HeroFields {
  heading?: string
  intro?: { content: RichTextNode[] }
  buttons?: ButtonResource[]
  icon?: string
}

export interface HeroItem {
  fields?: HeroFields
}

@customElement("proto-dynamic-hero")
export class ProtoDynamicHero extends LitElement {
  @property({ type: Array }) props?: HeroItem[]
  @property({ type: Array }) protoButtonHandlers?: ProtoButtonHandler[] // Overrides button behavior for prototype use
  @property({ type: String }) currentModalEntryId?: string
  @property({ type: Object }) entryFields?: EntryFields
  @property({ type: Boolean }) private isLargeScreen = false

  private isParentLarge = false // Parent grids with wider grid-template settings require narrower text fields.
  private _mediaQuery?: MediaQueryList

  override connectedCallback() {
    super.connectedCallback()

    this.addEventListener("open-dynamic-modal", async (event: Event) => {
      await this.openDynamicModal(event as DynamicModalEvent)
    })

    const parentGrid = this.closest("duet-grid")
    if (parentGrid?.getAttribute("grid-template") === "large") {
      this.isParentLarge = true
      this._mediaQuery = window.matchMedia("(min-width: 1220px)") // Duet media-query-xx-large
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

  openDynamicModal = async (event: DynamicModalEvent) => {
    this.currentModalEntryId = event.detail.entryId
    this.entryFields = event.detail.fields

    await this.updateComplete

    const dynamicModal = document.getElementById(this.currentModalEntryId) as HTMLDuetModalElement

    dynamicModal?.show()
  }

  override render() {
    const fields = this.props?.[0]?.fields
    const { heading, intro, buttons, icon } = fields ?? {}
    const richText = intro?.content ?? [] // intro is always RichText

    return html`
      <duet-page-heading icon=${icon ?? nothing} layout="auto">
        ${
          heading
            ? html`
              <duet-heading
                level="h1"
                visual-level=${this.isParentLarge ? "h1" : "h2"}
                slot="heading"
                margin="none"
              >
                ${heading}
              </duet-heading>
            `
            : nothing
        }
      </duet-page-heading>

      <!-- Custom content -->
      <slot name="main"></slot>

      <!-- Nodes -->
      <duet-grid
        direction="vertical"
        grid-template=${this.isParentLarge && this.isLargeScreen ? "sidebar-right" : nothing}
      >
        ${unsafeHTML(attributeIntro(renderRichText(richText)))}
      </duet-grid>

      <!-- Buttons -->
      ${
        buttons?.length
          ? html`
            <duet-grid
              grid-template="button-grid"
              id="dynamichero_buttons"
            >
              ${buttons.map(
                b => html`
                  <duet-link
                    id=${b.fields.key ?? nothing}
                    icon=${b.fields.icon ?? nothing}
                    url=${getLinkUrl(b, this.protoButtonHandlers)}
                    variation="button"
                    external=${isUrlExternal(b.fields.url)}
                  >
                    ${b.fields.text ?? ""}
                  </duet-link>
                `
              )}
            </duet-grid>

            <duet-spacer size="x-large"></duet-spacer>
          `
          : nothing
      }

      <proto-dynamic-modal
        .entryFields=${this.entryFields}
        .currentModalEntryId=${this.currentModalEntryId}
      ></proto-dynamic-modal>
    `
  }
}
