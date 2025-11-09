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

  // TODO: check if possible to remove horizontal padding without ::part
  static override styles = css`
      ul.dynamic-group-claims-list {
          list-style: none;
          margin: 0;
          padding: 0;
      }
      

      ul.dynamic-group-claims-list li .link-item {
          border-bottom: 1px solid var(--color-gray-light);
          border-radius: 0;
      }
      
      ul.dynamic-group-claims-list li:first-of-type .link-item {
          border-top: 1px solid var(--color-gray-light);
      }
      
      ul.dynamic-group-claims-list li .link-item::part(duet-link) {
          padding-left: 0;
          padding-right: 0;
      }
  `

  override render() {
    const fields = this.props?.fields
    const groupTitle = fields?.heading
    const content = fields?.content

    // TODO: and block-menu variant functionality missing
    const linkVariation = fields?.linkVariation
    const iconBackground = fields?.linkIconColorVariation
    console.log("ICON BG: ", iconBackground)
    const iconColor = iconBackground ? "color-gray-lightest" : "primary"

    function getLinkVariation() {
      console.log("LINK VARIATION: ", linkVariation)
      return linkVariation ? (linkVariation === "button" ? linkVariation : "block") : nothing
    }

    return html`
      <duet-heading level="h3">${groupTitle}</duet-heading>

      <duet-grid>
        <duet-grid-item fill margin="none">
          <ul class="dynamic-group-claims-list">
            ${content?.map(
              item => html`
                <li>
                  <duet-link
                    class="link-item"
                    url=${item.fields.url ?? nothing}
                    icon=${item.fields?.icon ?? nothing}
                    icon-responsive
                    icon-color=${iconColor}
                    icon-background=${iconBackground}
                    external=${isUrlExternal(item.fields.url)}
                    variation=${getLinkVariation()}
                  >
                    ${item.fields.text ?? ""}
                  </duet-link>
                </li>
              `
            )}
          </ul>
          <duet-spacer size="xx-large"></duet-spacer>
        </duet-grid-item>
      </duet-grid>
    `
  }
}
