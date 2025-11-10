import { LitElement } from "lit";
interface Sys {
    sys: {
        contentType: {
            sys: {
                id: string;
            };
        };
    };
}
interface ButtonResource extends Sys {
    fields: {
        key?: string;
        text?: {
            value: string;
        };
        icon?: {
            value: string;
        };
        iconColor?: string;
        url?: string;
        variation?: string;
    };
}
interface ContentResource extends Sys {
    fields: {
        key?: string;
        linkIconColorVariation?: string;
        linkVariation?: string;
        content?: {
            fields?: {
                icon?: string;
                key?: string;
                text?: string;
                url?: string;
            };
        }[];
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
interface HeroItem {
    fields?: HeroFields;
}
export interface ProtoButtonHandler {
    buttonId: string;
    buttonUrl?: string;
    onClick?: () => void;
}
export declare class ProtoDynamicHero extends LitElement {
    props?: HeroItem[];
    protoButtonHandlers?: ProtoButtonHandler[];
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
}
export {};
//# sourceMappingURL=proto-dynamic-hero.d.ts.map