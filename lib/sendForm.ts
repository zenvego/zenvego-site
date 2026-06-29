/**
 * Tiny client-side helper that delivers any form submission to the studio inbox
 * via Web3Forms (https://web3forms.com). One access key, set as
 * NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY, routes everything to srinath.builds@gmail.com.
 *
 * The key is safe to expose client-side: it can ONLY send to the email the key
 * was registered with, so there's nothing to leak by shipping it in the bundle.
 */

const ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";

export type FormPayload = {
  /** Subject line of the email that lands in the inbox. */
  subject: string;
  /** Submitter's email — Web3Forms sets this as reply-to. */
  email: string;
  /** Any additional fields to include in the email body. */
  fields?: Record<string, string | undefined>;
};

/**
 * Sends the payload to the studio inbox. Resolves `true` on success, `false`
 * on any failure (network error, bad key, server error) so callers can branch
 * without try/catch.
 */
export async function sendForm({ subject, email, fields = {} }: FormPayload): Promise<boolean> {
  if (!ACCESS_KEY) {
    // Misconfiguration — surface it in dev so the missing env var is obvious.
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[sendForm] NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is not set — submission was not sent."
      );
    }
    return false;
  }

  // Drop empty optional fields, then normalise undefineds to an em-dash so the
  // email never shows blank lines.
  const body: Record<string, string> = {
    access_key: ACCESS_KEY,
    subject,
    from_name: "devisine site",
    email: email.trim(),
  };
  for (const [k, v] of Object.entries(fields)) {
    body[k] = v && v.trim() ? v.trim() : "—";
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({ success: false }));
    return res.ok && Boolean(data.success);
  } catch {
    return false;
  }
}
