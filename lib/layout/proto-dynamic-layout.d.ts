import { LitElement, nothing } from "lit";
import type { ProtoButtonHandler } from "../hero/proto-dynamic-hero";
interface DynamicLayoutItem {
    key: string;
}
interface DynamicComponentContainer {
    __dynamicComponent: unknown[];
}
export interface DynamicLayoutProps {
    __dynamicLayout: DynamicLayoutItem[];
    [key: string]: DynamicComponentContainer | DynamicLayoutItem[] | undefined;
}
export declare class ProtoDynamicLayout extends LitElement {
    props?: DynamicLayoutProps;
    protoButtonHandlers?: ProtoButtonHandler[];
    render(): import("lit-html").TemplateResult<1> | typeof nothing;
}
export {};
//# sourceMappingURL=proto-dynamic-layout.d.ts.map