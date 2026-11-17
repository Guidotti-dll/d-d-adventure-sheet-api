function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, character => {
    const entities: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }
    return entities[character] ?? character
  })
}

export function accountConfirmationEmailTemplate(input: { name: string; link: string }): string {
  return `
    <div style="font-family: Arial, sans-serif; color: #243445; line-height: 1.6; max-width: 560px; margin: 0 auto;">
      <h1 style="color: #f05a4a;">Confirme sua conta</h1>
      <p>Olá, <strong>${escapeHtml(input.name)}</strong>!</p>
      <p>Para concluir seu cadastro no D&amp;D Adventure Sheet, confirme seu endereço de e-mail:</p>
      <p><a href="${
        input.link
      }" style="display: inline-block; background: #f05a4a; color: #fff; padding: 12px 20px; border-radius: 6px; text-decoration: none;">Confirmar conta</a></p>
    </div>
  `
}
