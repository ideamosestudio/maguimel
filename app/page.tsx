"use client";

const phoneDisplay = "011 4464-4647";
const phoneHref = "tel:+541144644647";
const mapsHref =
  "https://www.google.com/maps/search/?api=1&query=Textil+Maguimel%2C+French+150%2C+Ramos+Mej%C3%ADa%2C+Buenos+Aires";

function Brand({ dark = false }: { dark?: boolean }) {
  return (
    <a className={`brand ${dark ? "brand--dark" : ""}`} href="#home" aria-label="Textil Maguimel, inicio">
      <img src="/images/logo-maguimel.png" alt="Textil Maguimel" />
    </a>
  );
}

const Arrow = () => <span className="arrow" aria-hidden="true">↗</span>;

export default function Home() {
  const moveHero = (event: React.PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    event.currentTarget.style.setProperty("--hero-x", x.toFixed(3));
    event.currentTarget.style.setProperty("--hero-y", y.toFixed(3));
  };

  const resetHero = (event: React.PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--hero-x", "0");
    event.currentTarget.style.setProperty("--hero-y", "0");
  };

  return (
    <main>
      <section className="hero" id="home" onPointerMove={moveHero} onPointerLeave={resetHero}>
        <div className="hero-bg-wrap" aria-hidden="true"><div className="hero-bg" /></div>
        <div className="hero-person-wrap" aria-hidden="true">
          <img className="hero-person" src="/images/slider-personaje.png" alt="" />
        </div>
        <header className="site-header">
          <Brand />
          <nav className="desktop-nav" aria-label="Navegación principal">
            <a href="#quienes-somos">Quiénes somos</a>
            <a href="#colegio">Colegio</a>
            <a href="#publicidad">Publicidad</a>
            <a href="#trabajo">Trabajo</a>
          </nav>
          <a className="header-cta" href="#contacto">Contactanos</a>
          <details className="mobile-nav">
            <summary aria-label="Abrir menú"><span /><span /></summary>
            <nav>
              <a href="#quienes-somos">Quiénes somos</a>
              <a href="#colegio">Colegio</a>
              <a href="#publicidad">Publicidad</a>
              <a href="#trabajo">Trabajo</a>
              <a href="#contacto">Contacto</a>
            </nav>
          </details>
        </header>

        <div className="hero-content">
          <p className="eyebrow light">Uniformes · Producción propia · Ramos Mejía</p>
          <h1>Indumentaria para<br />colegios y empresas</h1>
          <div className="hero-rule" />
          <p className="hero-copy">
            Producción propia, atención personalizada y pedidos a medida para vestir equipos que hacen la diferencia.
          </p>
          <div className="hero-actions">
            <a className="button button--light" href={phoneHref}>Contactanos hoy</a>
            <a className="button button--outline" href="#contacto">Quiero un presupuesto</a>
          </div>
        </div>
        <a className="scroll-cue" href="#quienes-somos" aria-label="Descubrir más">
          <span>Descubrí más</span><b>↓</b>
        </a>
      </section>

      <section className="intro section" id="quienes-somos">
        <div className="section-label"><span>01</span> Quiénes somos</div>
        <div className="intro-grid">
          <div>
            <p className="eyebrow">Textil Maguimel</p>
            <h2>Vestimos identidad.<br />Construimos confianza.</h2>
            <div className="intro-actions">
              <a className="button button--dark" href="#colegio">Uniformes escolares</a>
              <a className="button button--paper" href="#trabajo">Indumentaria de trabajo</a>
            </div>
          </div>
          <div className="intro-body">
            <p className="lead">Somos fabricantes de uniformes escolares, indumentaria de trabajo y prendas publicitarias.</p>
            <p>Desde Ramos Mejía acompañamos a instituciones y empresas con atención cercana, confección cuidada y soluciones pensadas para cada necesidad.</p>
            <div className="stats">
              <div><strong>3</strong><span>líneas de<br />especialidad</span></div>
              <div><strong>1:1</strong><span>atención<br />personalizada</span></div>
              <div><strong>100%</strong><span>hecho a<br />medida</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="services section-dark" aria-label="Nuestras líneas">
        <div className="service-card service-card--school" id="colegio">
          <div className="service-number">01</div>
          <div className="service-content">
            <p className="eyebrow light">Uniformes escolares</p>
            <h3>Colegio</h3>
            <p>Prendas cómodas, resistentes y fieles a la identidad de cada institución: chombas, buzos, remeras, equipos deportivos y más.</p>
            <a className="service-cta" href="#contacto">Consultar por mi colegio</a>
          </div>
          <div className="service-tags"><span>Calidad</span><span>Comodidad</span><span>Identidad</span></div>
        </div>

        <div className="service-card service-card--publicity" id="publicidad">
          <div className="service-number">02</div>
          <div className="service-content">
            <p className="eyebrow light">Prendas que comunican</p>
            <h3>Publicidad</h3>
            <p>Convertimos tu marca en indumentaria que se ve y se recuerda. Producciones para eventos, promociones, equipos y campañas.</p>
            <a className="service-cta" href="#contacto">Potenciar mi marca</a>
          </div>
          <div className="service-tags"><span>Estampado</span><span>Bordado</span><span>Producción</span></div>
        </div>

        <div className="service-card service-card--image" id="trabajo">
          <div className="service-number">03</div>
          <div className="service-content">
            <p className="eyebrow light">Indumentaria profesional</p>
            <h3>Trabajo</h3>
            <p>Uniformes funcionales para el día a día, creados para representar a tu empresa y acompañar a tu equipo.</p>
            <a className="service-cta" href="#contacto">Vestir a mi equipo</a>
          </div>
          <div className="service-tags"><span>Resistencia</span><span>Funcionalidad</span><span>Imagen</span></div>
        </div>
      </section>

      <section className="process section">
        <div className="section-label"><span>02</span> Cómo trabajamos</div>
        <div className="process-heading">
          <h2>De la idea a la prenda,<br />sin vueltas.</h2>
          <p>Un proceso claro, acompañado de principio a fin.</p>
          <div className="process-actions">
            <a className="button button--dark" href="#colegio">Ver nuestras líneas</a>
            <a className="button button--paper" href="#contacto">Solicitar presupuesto</a>
          </div>
        </div>
        <div className="steps">
          <article><div className="step-marker"><span>01</span></div><p className="step-kicker">Primera etapa</p><h3>Nos contás</h3><p>Conocemos tu necesidad, cantidades, talles y tiempos.</p></article>
          <article><div className="step-marker"><span>02</span></div><p className="step-kicker">Segunda etapa</p><h3>Proponemos</h3><p>Definimos materiales, colores y terminaciones.</p></article>
          <article><div className="step-marker"><span>03</span></div><p className="step-kicker">Tercera etapa</p><h3>Producimos</h3><p>Confeccionamos cada pedido con seguimiento cercano.</p></article>
          <article><div className="step-marker"><span>04</span></div><p className="step-kicker">Cuarta etapa</p><h3>Entregamos</h3><p>Coordinamos la entrega para que llegue como esperás.</p></article>
        </div>
      </section>

      <section className="contact section-dark" id="contacto">
        <div className="contact-top">
          <div>
            <p className="eyebrow light">Hablemos de tu próximo proyecto</p>
            <h2>¿Qué necesitás<br />vestir hoy?</h2>
          </div>
          <a className="round-cta" href={phoneHref} aria-label={`Llamar al ${phoneDisplay}`}>Llamanos <Arrow /></a>
        </div>
        <div className="contact-grid">
          <div><span>Teléfono</span><a href={phoneHref}>{phoneDisplay}</a></div>
          <div><span>Dirección</span><a href={mapsHref} target="_blank" rel="noreferrer">French 150<br />Ramos Mejía</a></div>
          <div><span>Horarios</span><p>Lun a vie · 10–13 y 16–18<br />Sáb · 10–13</p></div>
          <div><span>Cómo llegar</span><a href={mapsHref} target="_blank" rel="noreferrer">Abrir en Google Maps <Arrow /></a></div>
        </div>
        <div className="map-wrap">
          <iframe
            title="Ubicación de Textil Maguimel en Google Maps"
            src="https://www.google.com/maps?q=French+150,+Ramos+Mejia,+Buenos+Aires&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <footer>
        <Brand dark />
        <p>Uniformes escolares, laborales y publicitarios.</p>
        <a href="#home">Volver arriba ↑</a>
        <small>
          <span>© {new Date().getFullYear()} Textil Maguimel</span>
          <a href="https://www.ideamos.com.ar" target="_blank" rel="noreferrer">Hecho por Estudio Ideamos</a>
        </small>
      </footer>
    </main>
  );
}
