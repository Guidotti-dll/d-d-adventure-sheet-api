export function passwordRecoveryEmailTemplate(input: { link: string }): string {
  return `
    <div style="font-family: Arial, sans-serif; color: #243445; line-height: 1.6; max-width: 560px; margin: 0 auto;">
      <h1 style="color: #f05a4a;">Redefinição de senha</h1>
      <p>Recebemos uma solicitação para redefinir a senha da sua conta.</p>
      <p>Use o botão abaixo para escolher uma nova senha:</p>
      <p><a href="${input.link}" style="display: inline-block; background: #f05a4a; color: #fff; padding: 12px 20px; border-radius: 6px; text-decoration: none;">Redefinir senha</a></p>
      <p>Se você não solicitou essa alteração, ignore este e-mail.</p>
    </div>
  `
}
