import { nothing } from "lit";
export function isUrlExternal(url) {
    return !!url?.includes("https://");
}
export function getButton(item, protoButtonHandlers) {
    return protoButtonHandlers?.find(b => b.buttonId === item.fields.key);
}
export function getLinkUrl(item, protoButtonHandlers) {
    const button = getButton(item, protoButtonHandlers);
    return button?.buttonUrl || item.fields.url || nothing;
}
export function handleLinkClick(item, protoButtonHandlers) {
    const button = getButton(item, protoButtonHandlers);
    button?.onClick?.();
}
//# sourceMappingURL=helper-functions.js.map