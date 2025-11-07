import { css, html, LitElement, nothing } from "lit"
import { customElement, property } from "lit/decorators.js"
import type { ActionEntry, HighlightFields } from "../highlight/proto-dynamic-highlight"
import { isUrlExternal } from "../utils/helper-functions"

interface GroupItem {
  fields: GroupItemFields
}

interface GroupItemFields extends HighlightFields {
  content?: ActionEntry[]
  linkVariation?: string
  linkIconColorVariation?: string
}

@customElement("proto-dynamic-group")
export class ProtoDynamicGroup extends LitElement {
  @property({ type: Object }) props?: GroupItem

  static override styles = css`
      .content {
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
    const groupTitle = fields?.heading
    const content = fields?.content

    // TODO: block-divider and block-menu variant functionality missing
    const linkVariation = fields?.linkVariation ?? undefined
    const linkColorVariation = fields?.linkIconColorVariation ?? undefined
    const iconColor = linkColorVariation ? "color-gray-lightest" : nothing

    return html`
        <duet-grid-item fill>
          <duet-grid
            breakpoint="medium"
            class="grid-demo"
            mobile="left"
            responsive
          >
            <duet-grid-item fill>
              <duet-heading level="h3">${groupTitle}</duet-heading>

              <duet-grid class="content" direction="horizontal">
                <!-- Links -->
                ${
                  content?.length
                    ? html`
                      <duet-grid-item fill class="grid">
                        ${content?.map(
                          item => html`
                            <duet-link
                              id=${item.fields.key}
                              icon=${item.fields?.icon ?? nothing}
                              icon-right
                              icon-background=${linkColorVariation}
                              icon-color=${iconColor}
                              variation=${linkVariation}
                              external=${isUrlExternal(item.fields.url)}
                              url=${item.fields.url ?? nothing}
                            >${item.fields.text ?? ""}
                            </duet-link>
                          `
                        )}
                      </duet-grid-item>
                    `
                    : nothing
                }
              </duet-grid>
            </duet-grid-item>
          </duet-grid>
        </duet-grid-item>
      `
  }
}
