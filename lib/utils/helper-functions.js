import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { nothing } from "lit";
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
    const button = getProtoButtonHandler(item, protoButtonHandlers);
    button?.clickHandler?.();
}
/* -------------------------------------------------------
 * RichText content handler
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
export const renderRichText = (input, data) => {
    if (!input)
        return "";
    const document = Array.isArray(input)
        ? { nodeType: "document", data: {}, content: input }
        : input?.nodeType === "document"
            ? input
            : { nodeType: "document", data: {}, content: [input] };
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
                const fields = node.data?.target?.fields;
                if (!fields)
                    return "";
                const typeId = node.data.target.sys.contentType.sys.id;
                switch (typeId) {
                    case "componentCollapsible":
                        return `<duet-collapsible heading="${fields.heading || ""}">${renderRichText(fields.body)}</duet-collapsible>`;
                    case "componentShowMore":
                        return `<duet-show-more>${renderRichText(fields.body)}</duet-show-more>`;
                    default:
                        return fields.body ? renderRichText(fields.body) : "";
                }
            },
            [INLINES.EMBEDDED_ENTRY]: (node) => {
                const target = node.data?.target;
                if (!target)
                    return "";
                const typeId = target.sys.contentType.sys.id;
                const key = target.fields.key;
                const entry = target.fields.entry;
                switch (typeId) {
                    case "componentRichTextVariable":
                        return String(data?.[key] ?? `{{${key}}}`);
                    case "buttonResource":
                        if (entry?.sys.contentType.sys.id === "dynamicModal") {
                            return `<duet-button
              icon=${target.fields.icon} 
              variation=${transformVariation(target.fields.richTextAppearance)}
              margin="none"
              onclick='this.dispatchEvent(new CustomEvent("open-dynamic-modal", {
                detail: { entryId: "${entry.sys.id}", fields: ${JSON.stringify(entry.fields)} },
                bubbles: true,
                composed: true
              }))'>
                ${target.fields.text}
            </duet-button>`;
                        }
                        return "";
                    default:
                        return `${typeId}: {{${key}}}`;
                }
            },
            [BLOCKS.HR]: () => "<duet-divider></duet-divider>",
        },
    });
};
//# sourceMappingURL=helper-functions.js.map