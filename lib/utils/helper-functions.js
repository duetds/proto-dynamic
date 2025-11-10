import { nothing } from "lit";
export function isUrlExternal(url) {
    return !!url?.includes("https://");
}
export function getProtoButtonHandler(item, protoButtonHandlers) {
    return protoButtonHandlers?.find(b => b.buttonId === item.fields.key);
}
export function getLinkUrl(item, protoButtonHandlers) {
    const button = getProtoButtonHandler(item, protoButtonHandlers);
    return button?.buttonUrl || item.fields.url || nothing;
}
export function handleLinkClick(item, protoButtonHandlers) {
    const button = getProtoButtonHandler(item, protoButtonHandlers);
    button?.clickHandler?.();
}
//# sourceMappingURL=helper-functions.js.map