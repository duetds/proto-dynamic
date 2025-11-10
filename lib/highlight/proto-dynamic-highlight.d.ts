import { LitElement, nothing } from "lit";
import type { ProtoButtonHandler } from "../hero/proto-dynamic-hero";
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
interface RichTextDocument {
    content: RichTextNode[];
}
interface RichTextNode {
    content?: RichTextNode[];
    value?: string;
}
export interface ActionEntry {
    fields: {
        key: string;
        text?: string;
        url?: string;
        icon?: string;
    };
}
export declare class ProtoDynamicHighlight extends LitElement {
    props?: HighlightItem;
    protoButtonHandlers?: ProtoButtonHandler[];
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1> | typeof nothing;
}
export {};
//# sourceMappingURL=proto-dynamic-highlight.d.ts.map