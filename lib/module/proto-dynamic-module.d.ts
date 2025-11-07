import { LitElement, nothing } from "lit";
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
    render(): typeof nothing | import("lit-html").TemplateResult<1>;
}
export {};
//# sourceMappingURL=proto-dynamic-module.d.ts.map