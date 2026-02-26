import { css, html, LitElement, nothing } from "lit"
import { customElement, property } from "lit/decorators.js"
import type { ProtoButtonHandler } from "../hero/proto-dynamic-hero"
import type { HighlightFields } from "../highlight/proto-dynamic-highlight"
import type { ActionEntry } from "../module/proto-dynamic-module"
import { getLinkUrl, handleLinkClick, isUrlExternal } from "../utils/helper-functions"

export interface GroupItem {
  fields: GroupItemFields
}

interface GroupItemFields extends HighlightFields {
  url?: string
  content?: ActionEntry[]
  linkVariation?: string
  linkIconColorVariation?: string
  headingVisualLevel?: string
  accessibilityHeading?: string
}

@customElement("proto-dynamic-group")
export class ProtoDynamicGroup extends LitElement {
  @property({ type: Object }) props?: GroupItem
  @property({ type: Array }) protoButtonHandlers?: ProtoButtonHandler[] // Overrides button behavior for prototype use

  // TODO: check if possible to remove horizontal padding without ::part
  static override styles = css`
      ul.link-list {
          list-style: none;
          margin: 0;
          padding: 0;
      }

      ul.link-list li .link-item {
          border-radius: 0;
      }

      ul.link-list li .link-item::part(duet-link) {
          padding-left: 0;
          padding-right: 0;
      }
  `

  override render() {
    const fields = this.props?.fields
    const headingVisualLevel = this.props?.fields?.headingVisualLevel || "h4"
    const accessibilityHeading = this.props?.fields?.accessibilityHeading
    const groupTitle = fields?.heading
    const content = fields?.content
    const linkVariation = fields?.linkVariation
    const iconBackground = fields?.linkIconColorVariation
    const iconColor = iconBackground ? "color-gray-lightest" : "primary"

    function getLinkVariation() {
      return linkVariation ? (linkVariation === "button" ? linkVariation : "block") : nothing
    }

    return html`
      ${groupTitle && html`<duet-heading level="h2" visual-level=${headingVisualLevel}>${groupTitle}</duet-heading>`}
      <nav aria-label=${accessibilityHeading || nothing}>
        <ul class="link-list">
          <duet-divider margin="none"></duet-divider>
          
          ${content?.map(item => {
            const { fields } = item
            const variation = getLinkVariation()

            return html`
              <li>
                <duet-link
                  id=${fields.key}
                  class=${variation === "block" ? "link-item" : nothing}
                  url=${getLinkUrl(item, this.protoButtonHandlers)}
                  icon=${fields.icon ?? nothing}
                  icon-responsive
                  icon-color=${iconColor}
                  icon-background=${iconBackground}
                  external=${isUrlExternal(fields.url)}
                  variation=${variation}
                  @click=${() => handleLinkClick(item, this.protoButtonHandlers)}
                >
                  ${fields.text ?? ""}
                </duet-link>
                <duet-divider margin="none"/>
              </li>
            `
          })}
        </ul>
      </nav>
      <duet-spacer size="xx-large"></duet-spacer>
    `
  }
}
