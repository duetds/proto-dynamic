import { css, html, LitElement, nothing } from "lit"
import { customElement, property } from "lit/decorators.js"
import { isUrlExternal } from "../utils/helper-functions"

interface HighlightItem {
  fields: HighlightFields
}

interface HighlightFields {
  key: string
  icon?: string
  heading?: string
  description?: RichTextDocument
  actions?: ActionEntry[]
  style?: string
}

interface RichTextDocument {
  content: RichTextNode[]
}

interface RichTextNode {
  content?: RichTextNode[]
  value?: string
}

interface ActionEntry {
  fields: {
    key: string
    text?: string
    url?: string
    icon?: string
  }
}

@customElement("proto-dynamic-highlight")
export class ProtoDynamicHighlight extends LitElement {
  @property({ type: Array }) props?: HighlightItem

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
                              icon-right="true"
                              variation="plain"
                              external=${isUrlExternal(action.fields.url)}
                              url=${action.fields.url ?? nothing}
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
