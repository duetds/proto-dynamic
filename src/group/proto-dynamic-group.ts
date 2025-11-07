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
      .claims-list {
          dt:first-of-type {
              border-top: 1px solid var(--color-gray-light);
          }
      }

      duet-link::part(duet-link) {
          padding: 0;
          border: none;
          border-bottom: 1px solid var(--color-gray-light);
          border-radius: 0;
      }
  `

  override render() {
    const fields = this.props?.fields
    const groupTitle = fields?.heading
    const content = fields?.content

    // TODO: and block-menu variant functionality missing
    const linkVariation = fields?.linkVariation
    const iconBackground = fields?.linkIconColorVariation
    const iconColor = iconBackground ? "color-gray-lightest" : nothing

    function getLinkVariation() {
      return linkVariation !== "block-divider" ? linkVariation : "button"
    }

    return html`
        <duet-grid-item fill>
            <duet-grid-item fill>
              <duet-heading level="h3">${groupTitle}</duet-heading>

              <duet-grid>
                <duet-grid-item margin="none" fill>
                  <duet-list margin="none">
                    ${content?.map(
                      item => html`
                        <dt>
                        <duet-link
                              margin="none"
                              id=${item.fields.key}
                              icon=${item.fields?.icon ?? nothing}
                              icon-right
                              icon-background=${iconBackground}
                              icon-color=${iconColor}
                              variation=${getLinkVariation()}
                              external=${isUrlExternal(item.fields.url)}
                              url=${item.fields.url ?? nothing}
                            >${item.fields.text ?? ""}
                            </duet-link>
                        </dt>
                          `
                    )}
                  </duet-list>
                  <duet-spacer size="xx-large"></duet-spacer>
                </duet-grid-item>
                
              </duet-grid>
            </duet-grid-item>
        </duet-grid-item>
      `
  }
}
