export const CODE_SCRAMBLE =
  `={}[]()<>;:.,_|&!?#@$%^+*~'"\`\\/0123456789-`

export function randomGlyph() {
  return (
    CODE_SCRAMBLE[Math.floor(Math.random() * CODE_SCRAMBLE.length)] ?? '/'
  )
}
