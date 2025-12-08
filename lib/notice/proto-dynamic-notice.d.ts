import { LitElement } from "lit";
import type { RichTextNode } from "../hero/proto-dynamic-hero";
export interface AlertNotice {
    fields: {
        variation: string;
        message?: {
            content: {
                content: RichTextNode[];
            }[];
        };
    };
}
export declare class ProtoDynamicNotice extends LitElement {
    props?: AlertNotice;
    render(): import("lit-html").TemplateResult<1>;
}
//# sourceMappingURL=proto-dynamic-notice.d.ts.map