import { nothing } from "lit";
import type { GroupItem } from "../group/proto-dynamic-group";
import type { ButtonResource, ProtoButtonHandler } from '../hero/proto-dynamic-hero';
import type { HighlightItem } from "../highlight/proto-dynamic-highlight";
export declare function isUrlExternal(url: string | undefined): boolean;
export declare function getProtoButtonHandler(item: GroupItem | HighlightItem | ButtonResource, protoButtonHandlers?: ProtoButtonHandler[]): ProtoButtonHandler | undefined;
export declare function getLinkUrl(item: GroupItem | HighlightItem | ButtonResource, protoButtonHandlers?: ProtoButtonHandler[]): string | typeof nothing;
export declare function handleLinkClick(item: GroupItem | HighlightItem | ButtonResource, protoButtonHandlers?: ProtoButtonHandler[]): void;
//# sourceMappingURL=helper-functions.d.ts.map