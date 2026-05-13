/** Structural copy for the About section; strings live in `about-messages`. */
export const about = {
  metrics: [
    {
      value: 5,
      suffix: '+',
      icon: 'clock' as const,
    },
    {
      value: 20,
      suffix: '+',
      icon: 'folder' as const,
    },
    {
      value: 3,
      suffix: '',
      icon: 'layers' as const,
    },
  ],
  education: [
    { icon: 'graduation' as const },
    { icon: 'graduation' as const },
    { icon: 'globe' as const },
  ],
} as const
