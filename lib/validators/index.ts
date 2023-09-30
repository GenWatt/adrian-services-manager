export function isAllowedExtension(
  allowedExtensions: string[],
  filename: string
) {
  return allowedExtensions.some((ext) => filename.endsWith(ext))
}
