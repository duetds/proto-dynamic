import { LitElement } from "lit";
interface SysContentType {
    sys: {
        id: string;
    };
}
interface Sys {
    sys: {
        contentType: SysContentType;
    };
}
export interface ButtonResource extends Sys {
    fields: {
        key: string;
        text?: string;
        icon?: string;
        iconColor?: string;
        url?: string;
        variation?: string;
    };
}
interface LinkContent {
    fields?: {
        icon?: string;
        key?: string;
        text?: string;
        url?: string;
    };
}
interface ContentResource extends Sys {
    fields: {
        key?: string;
        linkIconColorVariation?: string;
        linkVariation?: string;
        content?: LinkContent[];
    };
}
interface HeroFields {
    heading?: {
        value: string;
    };
    intro?: {
        content: {
            content: {
                value: string;
            }[];
        }[];
    };
    content?: ContentResource[];
    buttons?: ButtonResource[];
    icon?: string;
}
export interface HeroItem {
    fields?: HeroFields;
}
export interface ProtoButtonHandler {
    buttonId: string;
    url?: string;
    clickHandler?: () => void;
}
export declare class ProtoDynamicHero extends LitElement {
    props?: HeroItem[];
    protoButtonHandlers?: ProtoButtonHandler[];
    private isLargeScreen;
    private isParentLarge;
    private _mediaQuery?;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _onMediaChange;
    render(): import("lit-html").TemplateResult<1>;
}
export {};
//# sourceMappingURL=proto-dynamic-hero.d.ts.map