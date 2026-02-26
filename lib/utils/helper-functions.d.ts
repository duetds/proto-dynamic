import { type Inline } from "@contentful/rich-text-types";
import { nothing } from "lit";
import type { GroupItem } from "../group/proto-dynamic-group";
import type { ProtoButtonHandler, RichTextNode } from "../hero/proto-dynamic-hero";
import type { HighlightItem } from "../highlight/proto-dynamic-highlight";
type ButtonLinkedItem = GroupItem | HighlightItem;
interface ComponentProps {
    embedded?: EmbeddedEntryData;
    fields?: EmbeddedTargetFields;
    target?: EmbeddedTarget;
    protoButtonHandlers?: ProtoButtonHandler[];
    key?: string;
    data?: Record<string, unknown>;
}
interface EmbeddedEntry {
    sys: {
        id: string;
        contentType: {
            sys: {
                id: string;
            };
        };
    };
    fields: Record<string, unknown>;
}
interface EmbeddedTargetFields {
    key?: string;
    entry?: EmbeddedEntry;
    icon?: string;
    text?: string;
    richTextAppearance?: string;
    heading?: string;
    body?: {
        content: RichTextNode[];
    };
    items?: EmbeddedEntryData[];
}
export interface EmbeddedTarget {
    sys: {
        contentType?: {
            sys?: {
                id?: string;
            };
        };
    };
    fields: EmbeddedTargetFields;
}
interface EmbeddedEntryData {
    target: EmbeddedTarget;
    key?: string;
    typeId?: string;
    entry?: EmbeddedEntry;
    fields: EmbeddedTargetFields;
}
export declare function isUrlExternal(url: string): boolean;
export declare function getProtoButtonHandler(item: ButtonLinkedItem, protoButtonHandlers?: ProtoButtonHandler[]): ProtoButtonHandler | undefined;
export declare function getLinkUrl(item: ButtonLinkedItem, protoButtonHandlers?: ProtoButtonHandler[]): string | typeof nothing;
export declare function handleLinkClick(item: ButtonLinkedItem, protoButtonHandlers?: ProtoButtonHandler[]): void;
export declare const getEmbeddedEntryData: (node: RichTextNode | Inline) => EmbeddedEntryData | null;
export declare const renderRichText: (input: RichTextNode | RichTextNode[], data?: Record<string, unknown>) => string;
/**
 * @param html
 * @param options object, supported keys: "margin" with value "none", "stylePreset" with value one of "small", "intro", "caption", "smallCaption"
 * @returns HTML text
 */
export declare function formatRichText(html: string, options?: {
    margin?: string;
    stylePreset?: string;
}): string;
export declare function renderComponent(props: ComponentProps): string | import("lit-html").TemplateResult<1>;
export {};
//# sourceMappingURL=helper-functions.d.ts.map