import { LitElement } from "lit";
import type { ButtonUrl } from "../hero/proto-dynamic-hero";
import type { ActionEntry, HighlightFields } from "../highlight/proto-dynamic-highlight";
interface GroupItem {
    fields: GroupItemFields;
}
interface GroupItemFields extends HighlightFields {
    content?: ActionEntry[];
    linkVariation?: string;
    linkIconColorVariation?: string;
}
export declare class ProtoDynamicGroup extends LitElement {
    props?: GroupItem;
    buttonUrls?: ButtonUrl[];
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
}
export {};
//# sourceMappingURL=proto-dynamic-group.d.ts.map