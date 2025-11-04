export function checkExternal(url: string | undefined): boolean {
  return !!url?.includes("https://")
}
