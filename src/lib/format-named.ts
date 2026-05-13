/** Replaces `{key}` tokens in a template with `vars[key]`. */
export function formatNamed(
  template: string,
  vars: Record<string, string>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => vars[key] ?? '')
}
