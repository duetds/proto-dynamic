import { LitElement } from "lit";
import type { RichTextDocument } from "../highlight/proto-dynamic-highlight";
export interface AlertNotice {
    fields: {
        variation: string;
        message: RichTextDocument;
    };
}
export declare class ProtoDynamicNotice extends LitElement {
    props?: AlertNotice;
    render(): import("lit-html").TemplateResult<1>;
}
//# sourceMappingURL=proto-dynamic-notice.d.ts.map