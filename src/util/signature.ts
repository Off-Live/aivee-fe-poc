export function createAiveeSignature(email: string) {
  const href = `https://sign.aivee.xyz/?utm_source=signature&utm_medium=event&utm_campaign=opening&utm_content=${email}`;
  return `📅 <a href=\"${href}\">Scheduled via Aivee </a>`;
}
