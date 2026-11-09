"use client";

import { useRef, useState } from "react";
import {
  MapPin,
  Mail,
  Clock,
  ArrowRight,
  Check,
  AlertCircle,
  Loader2,
  Navigation,
} from "lucide-react";
import { sendForm } from "../lib/sendForm";

/**
 * Studio contact details. The address drives both the printed card and the
 * keyless Google Maps embed.
 *
 * TODO(zenvego): replace `address` with the real studio address. The map needs
 * no API key — it geocodes this string. `email` mirrors the footer.
 */
const STUDIO = {
  addressLines: ["Indiranagar, Gachibowli", "Hyderabad 500032, India"],
  // What the keyless Google map geocodes + centers on. Kept separate from the
  // printed address so the pin lands on Gachibowli, Hyderabad.
  mapLabel: "Gachibowli, Hyderabad, India",
  email: "studio@zenvego.works",
  hours: "Mon–Fri, 9:30–18:30 IST",
  responds: "Replies within one business day",
};

const fullAddress = STUDIO.addressLines.join(", ");
const mapQuery = encodeURIComponent(STUDIO.mapLabel);
const MAP_EMBED = `https://www.google.com/maps?q=${mapQuery}&z=15&output=embed`;
const MAP_DIRECTIONS = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

type Field = "name" | "email" | "company" | "phone" | "message";
type Status = "idle" | "sending" | "done" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [values, setValues] = useState<Record<Field, string>>({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const set =
    (k: Field) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const v = e.target.value;
      setValues((prev) => ({ ...prev, [k]: v }));
      // Clear a field's error the moment the user starts fixing it.
      setErrors((prev) => {
        if (!prev[k]) return prev;
        const next = { ...prev };
        delete next[k];
        return next;
      });
    };

  const validate = (): Partial<Record<Field, string>> => {
    const er: Partial<Record<Field, string>> = {};
    if (!values.name.trim()) er.name = "Tell us your name.";
    if (!values.email.trim()) er.email = "We need an email to reply to.";
    else if (!EMAIL_RE.test(values.email.trim()))
      er.email = "That email address doesn't look right.";
    return er;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) {
      const first = Object.keys(er)[0] as Field;
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${first}"]`)
        ?.focus();
      return;
    }
    setStatus("sending");
    const ok = await sendForm({
      subject: `New project brief from ${values.name.trim() || "the site"}`,
      email: values.email,
      fields: {
        name: values.name,
        company: values.company,
        phone: values.phone,
        message: values.message || "(no project details provided)",
      },
    });
    setStatus(ok ? "done" : "error");
  };

  const reset = () => {
    setValues({
      name: "",
      email: "",
      company: "",
      phone: "",
      message: "",
    });
    setErrors({});
    setStatus("idle");
  };

  return (
    <section className="block contact-sec" id="contact">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow" style={{ justifyContent: "center" }}>
            Reach the studio
          </span>
          <h2>
            Tell us what you&apos;re building, <br className="ct-br" />
            <span className="grnk">we&apos;ll take it from there.</span>
          </h2>
          <p>
            Share a few details and a senior lead reads it the same day. No
            account, no sales sequence, just a real reply.
          </p>
        </div>

        <div className="contact-grid">
          {/* LEFT — the form / application flow */}
          <div className="contact-form-card reveal">
            {status === "done" ? (
              <div className="cf-done" role="status" aria-live="polite">
                <span className="cf-done-ic">
                  <Check size={28} strokeWidth={3} />
                </span>
                <h3 className="cf-done-title">Brief received.</h3>
                <p className="cf-done-tx">
                  Thanks, {values.name.split(" ")[0] || "there"}. We&apos;ll
                  reply to <b>{values.email}</b> within one business day with
                  next steps.
                </p>
                <button type="button" className="btn btn-dark cf-again" onClick={reset}>
                  Send another brief
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                className="cf-form"
                onSubmit={submit}
                noValidate
              >
                <div className="cf-row">
                  <Text
                    field="name"
                    label="Your name"
                    required
                    placeholder="Jane Cooper"
                    autoComplete="name"
                    value={values.name}
                    error={errors.name}
                    onChange={set("name")}
                  />
                  <Text
                    field="email"
                    type="email"
                    label="Work email"
                    required
                    placeholder="jane@company.com"
                    autoComplete="email"
                    value={values.email}
                    error={errors.email}
                    onChange={set("email")}
                  />
                </div>

                <div className="cf-row">
                  <Text
                    field="company"
                    label="Company"
                    optional
                    placeholder="Acme Inc."
                    autoComplete="organization"
                    value={values.company}
                    error={errors.company}
                    onChange={set("company")}
                  />
                  <Text
                    field="phone"
                    type="tel"
                    label="Phone"
                    optional
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                    value={values.phone}
                    error={errors.phone}
                    onChange={set("phone")}
                  />
                </div>

                <div className="cf-field">
                  <label htmlFor="cf-message">
                    About your project <span className="cf-opt">optional</span>
                  </label>
                  <div className="cf-ctrl">
                    <textarea
                      id="cf-message"
                      name="message"
                      rows={4}
                      placeholder="What are you building, who's it for, and what's the goal?"
                      value={values.message}
                      onChange={set("message")}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-green cf-submit"
                  disabled={status === "sending"}
                  aria-busy={status === "sending"}
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 size={18} strokeWidth={2.4} className="cf-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send project brief
                      <ArrowRight size={18} strokeWidth={2.4} />
                    </>
                  )}
                </button>
                {status === "error" ? (
                  <p className="cf-error cf-error--send" role="alert">
                    <AlertCircle size={14} strokeWidth={2.4} />
                    Something went wrong sending your brief. Please try again, or
                    email us directly at{" "}
                    <a href={`mailto:${STUDIO.email}`}>{STUDIO.email}</a>.
                  </p>
                ) : (
                  <p className="cf-note">
                    We reply within one business day. No spam, ever.
                  </p>
                )}
              </form>
            )}
          </div>

          {/* RIGHT — map + address */}
          <div className="contact-info reveal">
            <figure className="contact-map">
              <iframe
                title={`Map showing Zenvego studio at ${fullAddress}`}
                src={MAP_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <a
                className="contact-map-cta"
                href={MAP_DIRECTIONS}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Navigation size={15} strokeWidth={2.4} />
                Get directions
              </a>
            </figure>

            <ul className="contact-details">
              <li className="ci-row">
                <span className="ci-ic">
                  <MapPin size={18} strokeWidth={2} />
                </span>
                <span className="ci-body">
                  <span className="ci-k">Studio</span>
                  <span className="ci-v">
                    {STUDIO.addressLines.map((line, i) => (
                      <span key={i}>{line}</span>
                    ))}
                  </span>
                </span>
              </li>
              <li className="ci-row">
                <span className="ci-ic">
                  <Mail size={18} strokeWidth={2} />
                </span>
                <span className="ci-body">
                  <span className="ci-k">Email</span>
                  <span className="ci-v">
                    <a href={`mailto:${STUDIO.email}`}>{STUDIO.email}</a>
                  </span>
                </span>
              </li>
              <li className="ci-row">
                <span className="ci-ic">
                  <Clock size={18} strokeWidth={2} />
                </span>
                <span className="ci-body">
                  <span className="ci-k">Hours</span>
                  <span className="ci-v">
                    {STUDIO.hours}
                    <em className="ci-note">{STUDIO.responds}</em>
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- field primitives (kept local; they only serve this form) ---- */

function FieldLabel({
  field,
  label,
  required,
  optional,
}: {
  field: Field;
  label: string;
  required?: boolean;
  optional?: boolean;
}) {
  return (
    <label htmlFor={`cf-${field}`}>
      {label}{" "}
      {required && (
        <span className="cf-req" aria-hidden>
          *
        </span>
      )}
      {optional && <span className="cf-opt">optional</span>}
    </label>
  );
}

function Text({
  field,
  label,
  type = "text",
  required,
  optional,
  placeholder,
  autoComplete,
  value,
  error,
  onChange,
}: {
  field: Field;
  label: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
  placeholder?: string;
  autoComplete?: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="cf-field" data-invalid={!!error}>
      <FieldLabel field={field} label={label} required={required} optional={optional} />
      <div className="cf-ctrl">
        <input
          id={`cf-${field}`}
          name={field}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          aria-required={required || undefined}
          aria-invalid={!!error}
          aria-describedby={error ? `cf-${field}-err` : undefined}
        />
      </div>
      {error && (
        <p className="cf-error" id={`cf-${field}-err`}>
          <AlertCircle size={14} strokeWidth={2.4} />
          {error}
        </p>
      )}
    </div>
  );
}
