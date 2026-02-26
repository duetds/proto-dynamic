import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { html, nothing } from "lit";
/* -------------------------------------------------------
 * Proto button handlers & URL helpers
 * ----------------------------------------------------- */
export function isUrlExternal(url) {
    return !!url?.includes("https://");
}
export function getProtoButtonHandler(item, protoButtonHandlers) {
    return protoButtonHandlers?.find(b => b.buttonId === item.fields.key);
}
export function getLinkUrl(item, protoButtonHandlers) {
    const button = getProtoButtonHandler(item, protoButtonHandlers);
    return button?.url || item.fields.url || nothing;
}
export function handleLinkClick(item, protoButtonHandlers) {
    getProtoButtonHandler(item, protoButtonHandlers)?.clickHandler?.();
}
/* -------------------------------------------------------
 * RichText content helpers
 * ----------------------------------------------------- */
const transformVariation = (resourceType) => {
    switch (resourceType) {
        case "button-primary":
            return "primary";
        case "button-default":
            return "default";
        case "button-plain":
            return "plain";
        case "link-plain":
            return "default";
        case "link-button":
            return "button";
        default:
            return "default";
    }
};
export const getEmbeddedEntryData = (node) => {
    const target = node.data?.target;
    if (!target?.fields)
        return null;
    return {
        target,
        typeId: target.sys?.contentType?.sys?.id,
        key: target.fields.key,
        entry: target.fields.entry,
        fields: target.fields,
    };
};
export const renderRichText = (input, data) => {
    if (!input)
        return "";
    let document;
    if (Array.isArray(input)) {
        document = { nodeType: "document", data: {}, content: input };
    }
    else if (input.nodeType === "document") {
        document = input;
    }
    else {
        document = { nodeType: "document", data: {}, content: [input] };
    }
    return documentToHtmlString(document, {
        renderNode: {
            [BLOCKS.PARAGRAPH]: (node, next) => `<duet-paragraph>${next(node.content)}</duet-paragraph>`,
            [BLOCKS.HEADING_1]: (node, next) => `<duet-heading level="h1">${next(node.content)}</duet-heading>`,
            [BLOCKS.HEADING_2]: (node, next) => `<duet-heading level="h2">${next(node.content)}</duet-heading>`,
            [BLOCKS.HEADING_3]: (node, next) => `<duet-heading level="h3">${next(node.content)}</duet-heading>`,
            [BLOCKS.HEADING_4]: (node, next) => `<duet-heading level="h4">${next(node.content)}</duet-heading>`,
            [BLOCKS.HEADING_5]: (node, next) => `<duet-heading level="h5">${next(node.content)}</duet-heading>`,
            [BLOCKS.HEADING_6]: (node, next) => `<duet-heading level="h6">${next(node.content)}</duet-heading>`,
            [BLOCKS.EMBEDDED_ENTRY]: node => {
                const embedded = getEmbeddedEntryData(node);
                if (!embedded)
                    return "";
                const inlineRT = renderComponent({ embedded, target: embedded.target, fields: embedded.fields });
                return inlineRT === "default" ? renderRichText(embedded.fields.body?.content ?? []) : inlineRT;
            },
            [INLINES.EMBEDDED_ENTRY]: node => {
                const embedded = getEmbeddedEntryData(node);
                if (!embedded)
                    return "";
                const inlineRT = renderComponent({
                    embedded,
                    target: embedded.target,
                    fields: embedded.fields,
                    key: embedded.key,
                    data,
                });
                return inlineRT === "default" ? `${embedded.typeId}: {{${embedded.key}}}` : inlineRT;
            },
            [BLOCKS.HR]: () => "<duet-divider></duet-divider>",
        },
    });
};
/* -------------------------------------------------------
 * Resource renderers
 * ----------------------------------------------------- */
const renderButtonResource = (embedded) => {
    const { target, entry } = embedded;
    if (!entry || entry.sys.contentType.sys.id !== "dynamicModal")
        return "";
    const icon = target.fields.icon ?? "";
    const text = target.fields.text ?? "";
    const variation = transformVariation(target.fields.richTextAppearance ?? "default");
    return `<duet-button
    icon="${icon}"
    variation="${variation}"
    margin="none"
    onclick='this.dispatchEvent(new CustomEvent("open-dynamic-modal", {
      detail: { entryId: "${entry.sys.id}", fields: ${JSON.stringify(entry.fields)} },
      bubbles: true,
      composed: true
    }))'>
      ${text}
  </duet-button>`;
};
const renderCollapsibleElement = (item) => `<li>
  <duet-collapsible heading="${item.fields.heading ?? ""}">
    ${renderRichText(item.fields.body?.content ?? [])}
  </duet-collapsible>
  <duet-divider margin="small"></duet-divider>
</li>`;
const renderCollapsibleGroup = (heading, collapsibleElements) => `<style>
ul.collapsible-list { list-style: none; margin: 0; padding: 0; }
</style>
 ${heading &&
    `<duet-heading level="h3" visual-level="h4">${heading}</duet-heading>
    <duet-spacer size="small"></duet-spacer>
    <duet-divider margin="small"></duet-divider>`}
<ul class="collapsible-list">${collapsibleElements}</ul>`;
/* -------------------------------------------------------
 * Rich Text formatter
 * ----------------------------------------------------- */
/**
 * @param html
 * @param options object, supported keys: "margin" with value "none", "stylePreset" with value one of "small", "intro", "caption", "smallCaption"
 * @returns HTML text
 */
export function formatRichText(html, options) {
    if (!options)
        return html;
    const container = document.createElement("div");
    container.innerHTML = html;
    if (options.margin === "none") {
        container.querySelector("duet-paragraph:last-of-type")?.setAttribute("margin", "none");
    }
    if (options.stylePreset) {
        if (options.stylePreset.startsWith("caption")) {
            container.querySelectorAll("duet-paragraph").forEach(el => {
                const caption = document.createElement("duet-caption");
                if (options.stylePreset === "captionSmall") {
                    caption.setAttribute("size", "small");
                }
                caption.innerHTML = el.innerHTML;
                el.replaceWith(caption);
            });
        }
        if (options.stylePreset === "small") {
            container.querySelectorAll("duet-paragraph").forEach(el => el.setAttribute("size", "small"));
        }
        if (options.stylePreset === "intro") {
            container.querySelectorAll("duet-paragraph").forEach(el => el.setAttribute("variation", "intro"));
        }
    }
    return container.innerHTML;
}
/* -------------------------------------------------------
 * Component renderer
 * ----------------------------------------------------- */
export function renderComponent(props) {
    const { embedded, target, fields, protoButtonHandlers, key, data } = props;
    const typeId = target?.sys?.contentType?.sys?.id;
    switch (typeId) {
        case "componentRichTextVariable":
            return key ? String(data?.[key] ?? `{{${key}}}`) : "";
        case "highlight":
            return html `<proto-dynamic-highlight
        .protoButtonHandlers=${protoButtonHandlers}
        props='${JSON.stringify(target)}'>
      </proto-dynamic-highlight>`;
        case "dynamicGroup":
            return html `<proto-dynamic-group
        .protoButtonHandlers=${protoButtonHandlers}
        props='${JSON.stringify(target)}'>
      </proto-dynamic-group>`;
        case "collapsibleGroup": {
            const heading = target?.fields?.heading ?? "";
            const collapsibleElements = (target?.fields?.items ?? []).map(renderCollapsibleElement).join("");
            return renderCollapsibleGroup(heading, collapsibleElements);
        }
        case "componentShowMore":
            return `<duet-show-more>${renderRichText(fields?.body?.content ?? [])}</duet-show-more>`;
        case "buttonResource":
            if (!embedded)
                return "default";
            return renderButtonResource(embedded);
        case "alert":
            return `<proto-dynamic-notice props='${JSON.stringify(target)}'></proto-dynamic-notice>`;
        default:
            return "default";
    }
}
//# sourceMappingURL=helper-functions.js.map