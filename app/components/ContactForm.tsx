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
  return (
    <div className="contact-form-shell">
      <div className="contact-form-intro">
        <p className="eyebrow light">Contacto directo</p>
        <h3>Contanos qu&eacute;<br />necesit&aacute;s.</h3>
        <p>Dejanos tus datos y una breve descripci&oacute;n. El equipo de Textil Maguimel se pondr&aacute; en contacto con vos.</p>
      </div>
      <div>
        <p className="contact-form-success" id="mensaje-enviado" role="status">
          Gracias. Recibimos tu consulta y te responderemos a la brevedad.
        </p>
        <form
          className="contact-form"
          action="https://formsubmit.co/info@textilmaguimel.com.ar"
          method="POST"
        >
        <input type="hidden" name="_subject" value="Nueva consulta desde la web de Textil Maguimel" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_next" value="https://ideamosestudio.github.io/maguimel/#mensaje-enviado" />
        <input className="form-honey" type="text" name="_honey" tabIndex={-1} autoComplete="off" />

        <label>
          <span>Nombre y apellido *</span>
          <input type="text" name="Nombre" autoComplete="name" required />
        </label>
        <label>
          <span>Email *</span>
          <input type="email" name="Email" autoComplete="email" required />
        </label>
        <label>
          <span>Tel&eacute;fono</span>
          <input type="tel" name="Telefono" autoComplete="tel" />
        </label>
        <label>
          <span>Localidad</span>
          <input type="text" name="Localidad" autoComplete="address-level2" />
        </label>
        <label>
          <span>Tipo de consulta</span>
          <select name="Tipo de consulta" defaultValue="">
            <option value="" disabled>Seleccion&aacute; una opci&oacute;n</option>
            <option>Uniformes escolares</option>
            <option>Indumentaria publicitaria</option>
            <option>Indumentaria de trabajo</option>
            <option>Otra consulta</option>
          </select>
        </label>
        <label className="contact-form-message">
          <span>Mensaje *</span>
          <textarea name="Mensaje" rows={5} required />
        </label>
          <div className="contact-form-submit">
            <p>Al enviar, acept&aacute;s que te contactemos para responder tu consulta.</p>
            <button type="submit">Enviar consulta <span aria-hidden="true">&#8599;</span></button>
          </div>
        </form>
      </div>
    </div>
  );
}
