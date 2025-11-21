import { LitElement } from "lit";
export interface RichTextNode {
    nodeType?: string;
    value?: string;
    data?: object;
    content?: RichTextNode[];
}
export interface EntryFields {
    heading?: string;
    icon?: string;
    body?: {
        content: RichTextNode[];
    };
}
export interface DynamicModalEvent extends CustomEvent {
    detail: {
        entryId: string;
        fields: EntryFields;
    };
}
export interface ProtoButtonHandler {
    buttonId: string;
    url?: string;
    clickHandler?: () => void;
}
export interface ButtonResource {
    fields: {
        key: string;
        text?: string;
        icon?: string;
        url?: string;
    };
}
export interface HeroFields {
    heading?: {
        value: string;
    };
    intro?: {
        content: {
            content: RichTextNode[];
        }[];
    };
    buttons?: ButtonResource[];
    icon?: string;
}
export interface HeroItem {
    fields?: HeroFields;
}
export declare class ProtoDynamicHero extends LitElement {
    props?: HeroItem[];
    protoButtonHandlers?: ProtoButtonHandler[];
    currentModalEntryId?: string;
    entryFields?: EntryFields;
    private isLargeScreen;
    private isParentLarge;
    private _mediaQuery?;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _onMediaChange;
    openDynamicModal: (event: DynamicModalEvent) => Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
}
//# sourceMappingURL=proto-dynamic-hero.d.ts.map