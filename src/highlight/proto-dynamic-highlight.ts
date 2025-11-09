import { css, html, LitElement, nothing } from "lit"
import { customElement, property } from "lit/decorators.js"
import type { ProtoButton } from "../hero/proto-dynamic-hero"
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

interface RichTextDocument {
  content: RichTextNode[]
}

interface RichTextNode {
  content?: RichTextNode[]
  value?: string
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
  @property({ type: Array }) protoButtons?: ProtoButton[] // Button URLs are only for proto use

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
        <duet-grid-item fill>
          <duet-grid
            alignment="stretch"
            breakpoint="medium"
            class="grid-demo"
            mobile="left"
            responsive
          >
            <duet-grid-item
              fill
            >
              ${
                iconName
                  ? html`
                    <duet-icon
                      shape="brand"
                      size="x-large"
                      background="primary-lighter"
                      color="primary"
                      name="${iconName}"
                    ></duet-icon>
                  `
                  : null
              }
              <duet-heading level="h3">${highlightTitle}</duet-heading>
              ${
                description ??
                html`
                <duet-paragraph>${description}</duet-paragraph>`
              }

              <duet-grid class="actions" direction="horizontal">
                <!-- Buttons -->
                ${
                  actions?.length
                    ? html`
                      <div class="grid">
                        ${actions?.map(
                          action => html`
                            <duet-button
                              id=${action.fields.key}
                              icon=${action.fields?.icon ?? nothing}
                              icon-right
                              variation="plain"
                              external=${isUrlExternal(action.fields.url)}
                              url=${getLinkUrl(action, this.protoButtons)}
                              @click=${() => handleLinkClick(action, this.protoButtons)}
                            >${action.fields.text ?? ""}
                            </duet-button>
                          `
                        )}
                      </div>
                    `
                    : nothing
                }
              </duet-grid>
            </duet-grid-item>
          </duet-grid>
        </duet-grid-item>
      `
      : nothing
  }
}
