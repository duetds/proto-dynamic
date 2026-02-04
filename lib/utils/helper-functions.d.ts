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
export {};
//# sourceMappingURL=helper-functions.d.ts.map