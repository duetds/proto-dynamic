import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { nothing } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
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
const getEmbeddedEntryData = (node) => {
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
export const renderNodes = (nodes) => {
    const htmlString = nodes
        .map(node => {
        if (node.nodeType === "paragraph") {
            // concatenate the text/child nodes
            return node.content?.map(n => (n.nodeType === "text" ? n.value : renderRichText(n))).join("") ?? "";
        }
        if (node.nodeType === "embedded-entry-block" && node.data?.target?.fields) {
            return renderRichText(node);
        }
        return "";
    })
        .join(""); // join all nodes into a single string
    return unsafeHTML(htmlString); // return wrapped in unsafeHTML
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
                const { typeId, fields } = embedded;
                if (!fields)
                    return "";
                switch (typeId) {
                    case "collapsibleGroup": {
                        const heading = node.data.target.fields.heading || "";
                        const collapsibleElements = (node.data.target.fields.items || []).map(renderCollapsibleElement).join(""); // join array into string
                        return renderCollapsibleGroup(heading, collapsibleElements);
                    }
                    case "componentShowMore":
                        return `<duet-show-more>${renderRichText(fields.body?.content ?? [])}</duet-show-more>`;
                    case "buttonResource":
                        return renderButtonResource(embedded);
                    default:
                        return fields.body ? renderRichText(fields.body.content ?? []) : "";
                }
            },
            [INLINES.EMBEDDED_ENTRY]: node => {
                const embedded = getEmbeddedEntryData(node);
                if (!embedded)
                    return "";
                const { typeId, key } = embedded;
                switch (typeId) {
                    case "componentRichTextVariable":
                        return key ? String(data?.[key] ?? `{{${key}}}`) : "";
                    case "buttonResource":
                        return renderButtonResource(embedded);
                    default:
                        return `${typeId}: {{${key}}}`;
                }
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
};
const renderCollapsibleElement = (item) => {
    return `<li><duet-collapsible 
    heading="${item.fields.heading || ""}"
    >${renderRichText(item.fields.body?.content ?? [])}
    </duet-collapsible>
    <duet-divider margin="small"></duet-divider>
  </li>`;
};
const renderCollapsibleGroup = (heading, collapsibleElements) => {
    return `<style>
    ul.collapsible-list {
    list-style: none;
    margin: 0;
    padding: 0;
    }
    </style>
    ${heading &&
        `<duet-heading level="h3" visual-level="h4">${heading}</duet-heading>
    <duet-spacer size="small"></duet-spacer>
    <duet-divider margin="small"></duet-divider>`}
     <ul class="collapsible-list">
     ${collapsibleElements}
     </ul>`;
};
//# sourceMappingURL=helper-functions.js.map