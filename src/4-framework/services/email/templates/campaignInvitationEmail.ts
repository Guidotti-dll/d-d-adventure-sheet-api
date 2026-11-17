function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, character => {
    const entities: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }
    return entities[character] ?? character
  })
}

export function campaignInvitationEmailTemplate(input: { campaignName: string; link: string }): string {
  return `
    <div style="font-family: Arial, sans-serif; color: #243445; line-height: 1.6; max-width: 560px; margin: 0 auto;">
      <h1 style="color: #f05a4a;">Você foi convidado para uma campanha</h1>
      <p>Você recebeu um convite para participar da campanha <strong>${escapeHtml(input.campaignName)}</strong>.</p>
      <p>Acesse o botão abaixo para entrar na campanha:</p>
      <p><a href="${
        input.link
      }" style="display: inline-block; background: #f05a4a; color: #fff; padding: 12px 20px; border-radius: 6px; text-decoration: none;">Entrar na campanha</a></p>
    </div>
  `
}
