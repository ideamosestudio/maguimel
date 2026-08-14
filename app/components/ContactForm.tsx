"use client";

import { useState, type FormEvent } from "react";

const FORM_ENDPOINT = "https://api.textilmaguimel.com.ar/contact.php";

export function SocialNetworks() {
  return (
    <div className="contact-socials">
      <span>Redes sociales</span>
      <p>
        <a
          className="social-entry"
          href="https://www.instagram.com/textilmaguimel/"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram de Textil Maguimel"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4.25" />
            <circle className="social-icon-dot" cx="17.4" cy="6.7" r="1" />
          </svg>
        </a>
        <a
          className="social-entry"
          href="https://www.facebook.com/textilmaguimel.uniformes/"
          target="_blank"
          rel="noreferrer"
          aria-label="Facebook de Textil Maguimel"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M14.2 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H8V13h2.8v8h3.4Z" />
          </svg>
        </a>
      </p>
    </div>
  );
}

export default function ContactForm() {
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    setSubmitState("sending");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });

      if (!response.ok) {
        throw new Error("No se pudo enviar la consulta");
      }

      form.reset();
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <div className="contact-form-shell">
      <div className="contact-form-intro">
        <p className="eyebrow light">Contacto directo</p>
        <h3>Contanos qu&eacute;<br />necesit&aacute;s.</h3>
        <p>Dejanos tus datos y una breve descripci&oacute;n. El equipo de Textil Maguimel se pondr&aacute; en contacto con vos.</p>
      </div>
      <div>
        <form
          className="contact-form"
          action={FORM_ENDPOINT}
          method="POST"
          onSubmit={handleSubmit}
          aria-busy={submitState === "sending"}
        >
          <input className="form-honey" type="text" name="website" tabIndex={-1} autoComplete="off" aria-label="No completar este campo" />

          <label>
            <span>Nombre y apellido *</span>
            <input type="text" name="name" autoComplete="name" maxLength={120} required />
          </label>
          <label>
            <span>Email *</span>
            <input type="email" name="email" autoComplete="email" maxLength={190} required />
          </label>
          <label>
            <span>Tel&eacute;fono</span>
            <input type="tel" name="phone" autoComplete="tel" maxLength={60} />
          </label>
          <label>
            <span>Localidad</span>
            <input type="text" name="location" autoComplete="address-level2" maxLength={120} />
          </label>
          <label>
            <span>Tipo de consulta</span>
            <select name="inquiry_type" defaultValue="">
              <option value="" disabled>Seleccion&aacute; una opci&oacute;n</option>
              <option>Uniformes escolares</option>
              <option>Indumentaria publicitaria</option>
              <option>Indumentaria de trabajo</option>
              <option>Otra consulta</option>
            </select>
          </label>
          <label className="contact-form-message">
            <span>Mensaje *</span>
            <textarea name="message" rows={5} maxLength={4000} required />
          </label>
          <div className="contact-form-submit">
            <p>Al enviar, acept&aacute;s que te contactemos para responder tu consulta.</p>
            <button type="submit" disabled={submitState === "sending"}>
              {submitState === "sending" ? "Enviando..." : "Enviar consulta"}
              <span aria-hidden="true">&#8599;</span>
            </button>
          </div>
          {submitState === "success" && (
            <p className="contact-form-status contact-form-status--success" role="status">
              Gracias. Recibimos tu consulta y te responderemos a la brevedad.
            </p>
          )}
          {submitState === "error" && (
            <p className="contact-form-status contact-form-status--error" role="alert">
              No pudimos enviar la consulta. Intent&aacute; nuevamente o escribinos a info@textilmaguimel.com.ar.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
