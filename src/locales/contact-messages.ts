export type ContactMessages = {
  label: string
  title: string
  subtitle: string
  badge: string
  formTitle: string
  formHint: string
  fieldName: string
  fieldEmail: string
  fieldMessage: string
  placeholderName: string
  placeholderEmail: string
  placeholderMessage: string
  submit: string
  submitting: string
  success: string
  successBanner: string
  errorSend: string
  errorConfig: string
  errorName: string
  errorEmail: string
  errorMessage: string
  ariaLattes: string
}

export const contactMessagesPtBR: ContactMessages = {
  label: 'CONTATO',
  title: 'Vamos conversar?',
  subtitle:
    'Tô aberto a novas oportunidades, freelas e conversas sobre tech. Me manda uma mensagem, respondo rápido.',
  badge: 'Disponível para freelas e oportunidades',
  formTitle: 'Enviar mensagem',
  formHint:
    'Resposta típica em poucas horas. Campos marcados são validados antes do envio.',
  fieldName: 'Nome',
  fieldEmail: 'E-mail',
  fieldMessage: 'Mensagem',
  placeholderName: 'Como posso te chamar?',
  placeholderEmail: 'seu@email.com',
  placeholderMessage: 'Conta um pouco do projeto, prazo ou o que buscas…',
  submit: 'Enviar mensagem',
  submitting: 'Enviando…',
  success: 'Mensagem enviada!',
  successBanner: 'Obrigado! Recebi a tua mensagem e respondo em breve.',
  errorSend:
    'Não foi possível enviar agora. Tenta de novo daqui a pouco ou envia um e-mail direto.',
  errorConfig:
    'Formulário ainda não configurado: defina VITE_EMAILJS_* no ficheiro .env (vê .env.example).',
  errorName: 'Informe seu nome (mín. 2 caracteres).',
  errorEmail: 'Informe um e-mail válido.',
  errorMessage:
    'Escreva uma mensagem um pouco mais completa (mín. 12 caracteres).',
  ariaLattes: 'Currículo Lattes',
}

export const contactMessagesEnUS: ContactMessages = {
  label: 'CONTACT',
  title: "Let's talk?",
  subtitle:
    "I'm open to new roles, freelance work, and tech conversations. Drop me a message — I reply quickly.",
  badge: 'Available for freelance and opportunities',
  formTitle: 'Send a message',
  formHint:
    'I usually reply within a few hours. Fields are validated before sending.',
  fieldName: 'Name',
  fieldEmail: 'Email',
  fieldMessage: 'Message',
  placeholderName: 'What should I call you?',
  placeholderEmail: 'you@email.com',
  placeholderMessage:
    'Tell me about the project, timeline, or what you are looking for…',
  submit: 'Send message',
  submitting: 'Sending…',
  success: 'Message sent!',
  successBanner: 'Thanks! I got your message and will reply soon.',
  errorSend:
    "Couldn't send right now. Try again in a moment or email me directly.",
  errorConfig:
    'Form not configured yet: set VITE_EMAILJS_* in your .env file (see .env.example).',
  errorName: 'Please enter your name (at least 2 characters).',
  errorEmail: 'Please enter a valid email address.',
  errorMessage: 'Please write a slightly longer message (at least 12 characters).',
  ariaLattes: 'Lattes CV',
}
