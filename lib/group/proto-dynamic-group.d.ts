import { LitElement } from "lit";
import type { ProtoButtonHandler } from "../hero/proto-dynamic-hero";
import type { HighlightFields } from "../highlight/proto-dynamic-highlight";
import type { ActionEntry } from "../module/proto-dynamic-module";
export interface GroupItem {
    fields: GroupItemFields;
}
interface GroupItemFields extends HighlightFields {
    url?: string;
    content?: ActionEntry[];
    linkVariation?: string;
    linkIconColorVariation?: string;
    headingVisualLevel?: string;
    accessibilityHeading?: string;
}
export declare class ProtoDynamicGroup extends LitElement {
    props?: GroupItem;
    protoButtonHandlers?: ProtoButtonHandler[];
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
}
export {};
//# sourceMappingURL=proto-dynamic-group.d.ts.map