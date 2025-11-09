import { LitElement, nothing } from "lit";
import type { ButtonUrl } from "../hero/proto-dynamic-hero";
interface ModuleProps {
    fields: HighlightFields;
}
interface HighlightFields {
    key: string;
    content?: ActionEntry[];
}
interface ActionEntry {
    fields: {
        key: string;
        text?: string;
        url?: string;
        icon?: string;
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
    buttonUrls?: ButtonUrl[];
    render(): import("lit-html").TemplateResult<1> | typeof nothing;
}
export {};
//# sourceMappingURL=proto-dynamic-module.d.ts.map