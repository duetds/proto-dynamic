import { LitElement } from 'lit';
interface ButtonResource {
    sys: {
        contentType: {
            sys: {
                id: 'linkResource' | 'buttonResource';
            };
        };
    };
    fields: {
        key?: string;
        text?: {
            value: string;
        };
        name?: string;
        external?: boolean;
        expand?: boolean;
        icon?: {
            value: string;
        };
        iconBackground?: string;
        iconColor?: string;
        margin?: string;
        padding?: string;
        url?: {
            value: string;
        };
        variation?: string;
        centerText?: boolean;
        color?: {
            value: string;
        };
        disabled?: boolean;
        size?: string;
        submit?: boolean;
        fixed?: boolean;
        iconSize?: string;
        negative?: boolean;
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
    buttons?: ButtonResource[];
    icon?: string;
}
interface HeroItem {
    fields?: HeroFields;
}
export declare class ProtoDynamicHero extends LitElement {
    props?: HeroItem[];
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'proto-dynamic-hero': ProtoDynamicHero;
    }
}
export {};
//# sourceMappingURL=proto-dynamic-hero.d.ts.map