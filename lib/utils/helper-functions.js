import { nothing } from "lit";
export function isUrlExternal(url) {
    return !!url?.includes("https://");
}
export function getProtoButtonHandler(item, protoButtonHandlers) {
    return protoButtonHandlers?.find(b => b.buttonId === item.fields.key);
}
export function getLinkUrl(item, protoButtonHandlers) {
    const button = getProtoButtonHandler(item, protoButtonHandlers);
    console.log("BUTTON", button);
    return button?.url || item.fields.url || nothing;
}
export function handleLinkClick(item, protoButtonHandlers) {
    const button = getProtoButtonHandler(item, protoButtonHandlers);
    button?.clickHandler?.();
}
//# sourceMappingURL=helper-functions.js.map