import { nothing } from "lit";
import type { GroupItem } from "../group/proto-dynamic-group";
import type { ProtoButtonHandler, RichTextNode } from "../hero/proto-dynamic-hero";
import type { HighlightItem } from "../highlight/proto-dynamic-highlight";
type ButtonLinkedItem = GroupItem | HighlightItem;
export declare function isUrlExternal(url: string): boolean;
export declare function getProtoButtonHandler(item: ButtonLinkedItem, protoButtonHandlers?: ProtoButtonHandler[]): ProtoButtonHandler | undefined;
export declare function getLinkUrl(item: ButtonLinkedItem, protoButtonHandlers?: ProtoButtonHandler[]): string | typeof nothing;
export declare function handleLinkClick(item: ButtonLinkedItem, protoButtonHandlers?: ProtoButtonHandler[]): void;
export declare const renderRichText: (input: RichTextNode | RichTextNode[], data?: Record<string, unknown>) => string;
/**
 * @param html
 * @param options object, supported keys: "margin" with value "none", "stylePreset" with value one of "small", "intro", "caption", "smallCaption"
 * @returns HTML text
 */
export declare function formatRichText(html: string, options: {
    margin?: string;
    stylePreset?: string;
}): string;
export {};
//# sourceMappingURL=helper-functions.d.ts.map