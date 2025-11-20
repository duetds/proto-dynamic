import { html, LitElement, nothing } from "lit"
import { customElement, property } from "lit/decorators.js"
import { unsafeHTML } from "lit/directives/unsafe-html.js"
import { getLinkUrl, isUrlExternal, renderRichText } from "../utils/helper-functions"

export interface RichTextNode {
  nodeType?: string
  value?: string
  data?: object
  content?: RichTextNode[]
}

export interface EntryFields {
  heading?: string
  icon?: string
  body?: { content: RichTextNode[] }
}

export interface DynamicModal extends CustomEvent {
  detail: {
    entryId: string
    fields: EntryFields
  }
}

export interface DuetModal extends HTMLElement {
  show: () => void
  hide: () => void
}

export interface ProtoButtonHandler {
  buttonId: string
  url?: string
  clickHandler?: () => void
}

export interface ButtonResource {
  fields: {
    key: string
    text?: string
    icon?: string
    url?: string
  }
}

export interface HeroFields {
  heading?: { value: string }
  intro?: { content: { content: RichTextNode[] }[] }
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

    this.addEventListener("open-dynamic-modal", async (e: Event) => {
      await this.openDynamicModal(e as DynamicModal)
    })

    const parentGrid = this.closest("duet-grid")
    const gridTemplate = parentGrid?.getAttribute("grid-template")

    if (gridTemplate === "large") {
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

  openDynamicModal = async (event: DynamicModal) => {
    this.currentModalEntryId = event.detail.entryId
    this.entryFields = event.detail.fields

    await this.updateComplete

    const dynamicModal = document.getElementById(this.currentModalEntryId) as DuetModal
    dynamicModal?.show()
  }

  override render() {
    const fields = this.props?.[0]?.fields
    const { heading, intro, buttons, icon } = fields ?? {}
    const introNodes = intro?.content?.[0]?.content ?? []

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
              >${heading}
              </duet-heading
              >`
            : nothing
        }
      </duet-page-heading>

      <!-- Custom content -->
      <slot name="main"></slot>

      <!-- RichText -->
      ${introNodes.map(node => {
        if (node.nodeType === "text") {
          return html`
            <duet-grid grid-template=${this.isParentLarge && this.isLargeScreen ? "sidebar-right" : nothing}>
              <duet-paragraph>${renderRichText(node)}</duet-paragraph>
            </duet-grid>
          `
        }

        return html`
          <div>
            ${unsafeHTML(renderRichText(node))}
            <duet-spacer size="medium"></duet-spacer>
          </div>
        `
      })}

      <!-- Buttons -->
      ${
        buttons?.length
          ? html`
            <duet-grid grid-template="button-grid" id="dynamichero_buttons">
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
