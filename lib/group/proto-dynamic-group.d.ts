import { LitElement } from "lit";
import type { ProtoButtonHandler } from "../hero/proto-dynamic-hero";
import type { ActionEntry, HighlightFields } from "../highlight/proto-dynamic-highlight";
export interface GroupItem {
    fields: GroupItemFields;
}
interface GroupItemFields extends HighlightFields {
    url?: string;
    content?: ActionEntry[];
    linkVariation?: string;
    linkIconColorVariation?: string;
}
export declare class ProtoDynamicGroup extends LitElement {
    props?: GroupItem;
    protoButtonHandlers?: ProtoButtonHandler[];
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
}
export {};
//# sourceMappingURL=proto-dynamic-group.d.ts.map