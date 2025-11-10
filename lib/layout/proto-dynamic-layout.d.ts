import { LitElement, nothing } from "lit";
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
    render(): import("lit-html").TemplateResult<1> | typeof nothing;
}
export {};
//# sourceMappingURL=proto-dynamic-layout.d.ts.map