export function isUrlExternal(url: string | undefined): boolean {
  const test = !!url?.includes("https://")

  console.log("TEST: ", test)
  return test
}
