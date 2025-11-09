import { nothing } from "lit";
export function isUrlExternal(url) {
    return !!url?.includes("https://");
}
export function getButton(item, protoButtons) {
    return protoButtons?.find(b => b.buttonId === item.fields.key);
}
export function getLinkUrl(item, protoButtons) {
    const button = getButton(item, protoButtons);
    return button?.buttonUrl || item.fields.url || nothing;
}
export function handleLinkClick(item, protoButtons) {
    const button = getButton(item, protoButtons);
    button?.onClick?.();
}
//# sourceMappingURL=helper-functions.js.map