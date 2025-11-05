export function isUrlExternal(url: string | undefined): boolean {
  return !!url?.includes("https://")
}
