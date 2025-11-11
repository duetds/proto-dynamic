import { css, html, LitElement, nothing } from "lit"
import { customElement, property } from "lit/decorators.js"
import type { ProtoButtonHandler } from "../hero/proto-dynamic-hero"
import { getLinkUrl, handleLinkClick, isUrlExternal } from "../utils/helper-functions"

export interface HighlightItem {
  fields: HighlightFields
}

export interface HighlightFields {
  key: string
  icon?: string
  heading?: string
  description?: RichTextDocument
  actions?: ActionEntry[]
  style?: string
  url?: string
}

export interface RichTextDocument {
  content: RichTextNode[]
}

export interface RichTextNode {
  value?: string
  content?: RichTextNode[]
}

export interface ActionEntry {
  fields: {
    key: string
    text?: string
    url?: string
    icon?: string
  }
}

@customElement("proto-dynamic-highlight")
export class ProtoDynamicHighlight extends LitElement {
  @property({ type: Object }) props?: HighlightItem
  @property({ type: Array }) protoButtonHandlers?: ProtoButtonHandler[] // Button URLs are only for proto use

  static override styles = css`
      .actions {
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
  `

  override render() {
    const fields = this.props?.fields
    const highlightTitle = fields?.heading
    const iconName = fields?.icon
    const description = fields?.description?.content?.[0]?.content?.[0]?.value
    const actions = fields?.actions
    const highlightVariation = fields?.style

    // Default variant of highlight component$
    return highlightVariation === "default"
      ? html`
          <duet-grid
            alignment="stretch"
            breakpoint="medium"
            mobile="left"
            responsive
          >
            <duet-grid-item fill>
              ${
                iconName
                  ? html`
                  <duet-icon
                    shape="brand"
                    size="x-large"
                    background="primary-lighter"
                    color="primary"
                    name=${iconName}
                  ></duet-icon>
                `
                  : nothing
              }

              <duet-heading level="h3">${highlightTitle}</duet-heading>

              ${description ? html`<duet-paragraph>${description}</duet-paragraph>` : nothing}

              <!-- Buttons -->
              ${
                actions?.length
                  ? html`
                  <div>
                    ${actions.map(action => {
                      const { fields } = action
                      return html`
                        <duet-button
                          id=${fields.key}
                          icon=${fields.icon ?? nothing}
                          icon-right
                          variation="plain"
                          external=${isUrlExternal(fields.url)}
                          url=${getLinkUrl(action, this.protoButtonHandlers)}
                          @click=${() => handleLinkClick(action, this.protoButtonHandlers)}
                        >
                          ${fields.text ?? ""}
                        </duet-button>
                      `
                    })}
                  </div>
                `
                  : nothing
              }

            </duet-grid-item>
          </duet-grid>
      `
      : nothing
  }
}
