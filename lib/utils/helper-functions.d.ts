import { nothing } from "lit";
import type { GroupItem } from "../group/proto-dynamic-group";
import type { ProtoButtonHandler } from "../hero/proto-dynamic-hero";
import type { HighlightItem } from "../highlight/proto-dynamic-highlight";
export declare function isUrlExternal(url: string | undefined): boolean;
export declare function getButton(item: GroupItem | HighlightItem, protoButtonHandlers?: ProtoButtonHandler[]): ProtoButtonHandler | undefined;
export declare function getLinkUrl(item: GroupItem | HighlightItem, protoButtonHandlers?: ProtoButtonHandler[]): string | typeof nothing;
export declare function handleLinkClick(item: GroupItem | HighlightItem, protoButtonHandlers?: ProtoButtonHandler[]): void;
//# sourceMappingURL=helper-functions.d.ts.map