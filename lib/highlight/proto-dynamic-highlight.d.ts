import { LitElement, nothing } from "lit";
import type { ProtoButtonHandler } from "../hero/proto-dynamic-hero";
import type { ActionEntry } from "../module/proto-dynamic-module";
export interface HighlightItem {
    fields: HighlightFields;
}
export interface HighlightFields {
    key: string;
    icon?: string;
    heading?: string;
    description?: RichTextDocument;
    actions?: ActionEntry[];
    style?: string;
    url?: string;
}
export interface RichTextDocument {
    content: RichTextNode[];
}
export interface RichTextNode {
    value?: string;
    content?: RichTextNode[];
}
export declare class ProtoDynamicHighlight extends LitElement {
    props?: HighlightItem;
    protoButtonHandlers?: ProtoButtonHandler[];
    render(): typeof nothing | import("lit-html").TemplateResult<1>;
}
//# sourceMappingURL=proto-dynamic-highlight.d.ts.map