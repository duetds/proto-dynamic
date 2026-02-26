import { LitElement } from "lit";
import type { RichTextNode } from "../hero/proto-dynamic-hero";
export interface ProtoDynamicRichTextProps {
    data: RichTextNode[];
    options?: {
        margin?: "none" | "small" | "medium" | "large";
        stylePreset?: "small" | "intro";
        [key: string]: unknown;
    };
}
export declare class ProtoDynamicRichText extends LitElement {
    props: ProtoDynamicRichTextProps;
    currentModalEntryId?: string;
    render(): import("lit-html").TemplateResult<1>;
}
//# sourceMappingURL=proto-dynamic-rich-text.d.ts.map