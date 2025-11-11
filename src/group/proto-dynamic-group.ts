import { css, html, LitElement, nothing } from "lit"
import { customElement, property } from "lit/decorators.js"
import type { ProtoButtonHandler } from "../hero/proto-dynamic-hero"
import type { ActionEntry, HighlightFields } from "../highlight/proto-dynamic-highlight"
import { getLinkUrl, handleLinkClick, isUrlExternal } from "../utils/helper-functions"

export interface GroupItem {
  fields: GroupItemFields
}

interface GroupItemFields extends HighlightFields {
  url?: string
  content?: ActionEntry[]
  linkVariation?: string
  linkIconColorVariation?: string
}

@customElement("proto-dynamic-group")
export class ProtoDynamicGroup extends LitElement {
  @property({ type: Object }) props?: GroupItem
  @property({ type: Array }) protoButtonHandlers?: ProtoButtonHandler[] // Button URLs are only for proto use

  // TODO: check if possible to remove horizontal padding without ::part
  static override styles = css`
      ul.link-list {
          list-style: none;
          margin: 0;
          padding: 0;
      }

      ul.link-list li .link-item {
          border-bottom: 1px solid var(--color-gray-light);
          border-radius: 0;
      }

      ul.link-list li:first-of-type .link-item {
          border-top: 1px solid var(--color-gray-light);
      }

      ul.link-list li .link-item::part(duet-link) {
          padding-left: 0;
          padding-right: 0;
      }
  `

  override render() {
    const fields = this.props?.fields
    const groupTitle = fields?.heading
    const content = fields?.content
    const linkVariation = fields?.linkVariation
    const iconBackground = fields?.linkIconColorVariation
    const iconColor = iconBackground ? "color-gray-lightest" : "primary"

    function getLinkVariation() {
      return linkVariation ? (linkVariation === "button" ? linkVariation : "block") : nothing
    }

    return html`
      <duet-heading level="h3">${groupTitle}</duet-heading>
      <ul class="link-list">
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
        </li>
      `
        })}
      </ul>
      <duet-spacer size="xx-large"></duet-spacer>
    `
  }
}
