import { nothing } from "lit";
import type { GroupItem } from "../group/proto-dynamic-group";
import type { ProtoButton } from "../hero/proto-dynamic-hero";
import type { HighlightItem } from "../highlight/proto-dynamic-highlight";
export declare function isUrlExternal(url: string | undefined): boolean;
export declare function getButton(item: GroupItem | HighlightItem, protoButtons?: ProtoButton[]): ProtoButton | undefined;
export declare function getLinkUrl(item: GroupItem | HighlightItem, protoButtons?: ProtoButton[]): string | typeof nothing;
export declare function handleLinkClick(item: GroupItem | HighlightItem, protoButtons?: ProtoButton[]): void;
//# sourceMappingURL=helper-functions.d.ts.map