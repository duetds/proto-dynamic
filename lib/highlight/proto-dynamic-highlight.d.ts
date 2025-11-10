import { LitElement, nothing } from "lit";
interface HighlightItem {
    fields: HighlightFields;
}
export interface HighlightFields {
    key: string;
    icon?: string;
    heading?: string;
    description?: RichTextDocument;
    actions?: ActionEntry[];
    style?: string;
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
    static styles: import("lit").CSSResult;
    render(): typeof nothing | import("lit-html").TemplateResult<1>;
}
export {};
//# sourceMappingURL=proto-dynamic-highlight.d.ts.map