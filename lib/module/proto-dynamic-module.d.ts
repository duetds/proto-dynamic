import { LitElement, nothing } from "lit";
import type { ProtoButtonHandler } from "../hero/proto-dynamic-hero";
interface ModuleProps {
    fields: HighlightFields;
}
interface HighlightFields {
    key: string;
    content?: ActionEntry[];
}
export interface ActionEntry {
    fields: {
        key: string;
        text?: string;
        url: string;
        icon?: string;
        heading?: string | undefined;
        items?: [] | undefined;
    };
    sys: {
        contentType: {
            sys: {
                id: string;
            };
        };
    };
}
export declare class ProtoDynamicModule extends LitElement {
    props?: ModuleProps[];
    protoButtonHandlers?: ProtoButtonHandler[];
    render(): import("lit-html").TemplateResult<1> | typeof nothing;
}
export {};
//# sourceMappingURL=proto-dynamic-module.d.ts.map