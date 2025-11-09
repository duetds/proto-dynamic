import { LitElement, nothing } from "lit";
import type { ProtoButton } from "../hero/proto-dynamic-hero";
interface DynamicLayoutItem {
    key: string;
}
interface DynamicComponentContainer {
    __dynamicComponent: unknown[];
}
interface DynamicLayoutProps {
    __dynamicLayout: DynamicLayoutItem[];
    [key: string]: DynamicComponentContainer | DynamicLayoutItem[] | undefined;
}
export declare class ProtoDynamicLayout extends LitElement {
    props?: DynamicLayoutProps;
    protoButtons?: ProtoButton[];
    render(): import("lit-html").TemplateResult<1> | typeof nothing;
}
export {};
//# sourceMappingURL=proto-dynamic-layout.d.ts.map