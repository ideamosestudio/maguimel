"use client";

import { useEffect, useState } from "react";
import catalog from "../catalog-manifest.json";

type CategoryKey = keyof typeof catalog;
type GalleryItem = { src: string; title: string };

const phoneDisplay = "011 4464-4647";
const phoneHref = "tel:+541144644647";
const whatsappHref = "https://wa.me/541121701747?text=Hola%20Textil%20Maguimel%2C%20quiero%20hacer%20una%20consulta.";
const mapsHref =
  "https://www.google.com/maps/search/?api=1&query=Textil+Maguimel%2C+French+150%2C+Ramos+Mej%C3%ADa%2C+Buenos+Aires";

const content: Record<CategoryKey, {
  index: string;
  eyebrow: string;
  title: string;
  heroCopy: string;
  introTitle: string;
  introLead: string;
  introCopy: string;
  features: Array<{ number: string; title: string; copy: string }>;
  modelsTitle: string;
  modelsCopy: string;
  modelLabels: string[];
  galleryTitle: string;
  galleryCopy: string;
}> = {
  colegio: {
    index: "01",
    eyebrow: "Uniformes escolares",
    title: "Uniformes que acompa\u00f1an cada etapa.",
    heroCopy: "Dise\u00f1amos y confeccionamos prendas c\u00f3modas, resistentes y fieles a la identidad de cada instituci\u00f3n.",
    introTitle: "La identidad del colegio, todos los d\u00edas.",
    introLead: "Un uniforme tiene que representar a la instituci\u00f3n y responder al ritmo real de quienes lo usan.",
    introCopy: "Desarrollamos propuestas para nivel inicial, primario y secundario, con prendas de uso diario, abrigo y deporte. Definimos colores, combinaciones, talles y terminaciones para construir una l\u00ednea coherente y duradera.",
    features: [
      { number: "01", title: "Identidad institucional", copy: "Colores, escudos y detalles que hacen reconocible a cada comunidad educativa." },
      { number: "02", title: "Comodidad cotidiana", copy: "Calces y textiles elegidos para acompa\u00f1ar movimiento, juego y jornadas intensas." },
      { number: "03", title: "Colecci\u00f3n integral", copy: "Chombas, buzos, camperas, conjuntos, pantalones y prendas para cada nivel." },
    ],
    modelsTitle: "Pensados para moverse. Dise\u00f1ados para pertenecer.",
    modelsCopy: "Tres miradas sobre una misma idea: prendas que combinan identidad, comodidad y presencia.",
    modelLabels: ["Uso diario", "Abrigo institucional", "Identidad escolar"],
    galleryTitle: "Prendas para cada momento del ciclo lectivo.",
    galleryCopy: "Explor\u00e1 modelos, tipolog\u00edas y combinaciones desarrolladas para distintas instituciones.",
  },
  publicidad: {
    index: "02",
    eyebrow: "Indumentaria publicitaria",
    title: "Tu marca, puesta en movimiento.",
    heroCopy: "Convertimos una identidad visual en prendas que se ven, se usan y mantienen presente a tu marca.",
    introTitle: "Prendas que hacen visible a tu marca.",
    introLead: "La indumentaria promocional funciona cuando la marca y la prenda se sienten parte de una misma idea.",
    introCopy: "Producimos remeras, buzos, camperas, chalecos y accesorios para acciones, eventos, equipos comerciales y campa\u00f1as. Adaptamos colores, ubicaci\u00f3n de marca y terminaciones a cada contexto de uso.",
    features: [
      { number: "01", title: "Personalizaci\u00f3n", copy: "Bordado y estampado aplicados con criterio para respetar la identidad visual." },
      { number: "02", title: "Presencia de marca", copy: "Prendas pensadas para comunicar de manera clara, consistente y memorable." },
      { number: "03", title: "Producci\u00f3n a medida", copy: "Acompa\u00f1amiento cercano para definir modelos, cantidades y terminaciones." },
    ],
    modelsTitle: "Una marca que se viste tambi\u00e9n se recuerda.",
    modelsCopy: "Soluciones para puntos de venta, activaciones, servicios, promociones y equipos que representan una identidad.",
    modelLabels: ["Punto de venta", "Bienestar y servicios", "Equipos de marca"],
    galleryTitle: "Producciones que comunican.",
    galleryCopy: "Una selecci\u00f3n de prendas personalizadas para empresas, medios, eventos y proyectos.",
  },
  trabajo: {
    index: "03",
    eyebrow: "Indumentaria de trabajo",
    title: "Indumentaria que trabaja con tu equipo.",
    heroCopy: "Prendas funcionales, c\u00f3modas y coherentes con la imagen profesional de cada empresa.",
    introTitle: "Funcionalidad para el trabajo real.",
    introLead: "El uniforme profesional tiene que acompa\u00f1ar la tarea, ordenar la imagen y hacer sentir parte al equipo.",
    introCopy: "Desarrollamos prendas para industria, log\u00edstica, salud, comercio y servicios. Combinamos tipolog\u00edas, textiles, recortes, bolsillos y elementos de visibilidad seg\u00fan las necesidades de cada actividad.",
    features: [
      { number: "01", title: "Dise\u00f1o funcional", copy: "Detalles y recursos definidos seg\u00fan el movimiento y las exigencias de cada puesto." },
      { number: "02", title: "Imagen profesional", copy: "Una l\u00ednea visual consistente que identifica al equipo frente a clientes y comunidad." },
      { number: "03", title: "Soluci\u00f3n adaptable", copy: "Prendas y combinaciones para distintos sectores, temporadas y niveles de uso." },
    ],
    modelsTitle: "La imagen del equipo empieza por lo que usa.",
    modelsCopy: "Desde salud y log\u00edstica hasta industria y atenci\u00f3n al p\u00fablico: cada entorno pide una respuesta diferente.",
    modelLabels: ["Salud", "Log\u00edstica", "Industria y servicios"],
    galleryTitle: "Soluciones para distintos entornos de trabajo.",
    galleryCopy: "Prendas laborales y corporativas dise\u00f1adas para combinar presencia, comodidad y desempe\u00f1o.",
  },
};

const asset = (path: string) => ".." + path;
const Arrow = () => <span className="arrow" aria-hidden="true">&#8599;</span>;
const closeMobileMenu = (event: React.MouseEvent<HTMLAnchorElement>) => {
  event.currentTarget.closest("details")?.removeAttribute("open");
};

function productLabel(value: string) {
  const title = value.toLowerCase();
  const labels: Array<[string, string]> = [
    ["pollera pantalon", "Pollera pantal\u00f3n"],
    ["campera polar", "Campera polar"],
    ["campera abrigo", "Campera de abrigo"],
    ["buzo medio cierre", "Buzo medio cierre"],
    ["chomba ml", "Chomba manga larga"],
    ["remera ml", "Remera manga larga"],
    ["chaleco con bolsillos", "Chaleco de trabajo reflectivo"],
    ["campera con reflex", "Campera de trabajo reflectiva"],
    ["pintor", "Pintor escolar"],
    ["pechera", "Pechera escolar"],
    ["conjunto", "Conjunto deportivo"],
    ["bermuda", "Bermuda"],
    ["pantalon", "Pantal\u00f3n"],
    ["campera", "Campera"],
    ["chomba", "Chomba"],
    ["remera", "Remera personalizada"],
    ["chaleco", "Chaleco"],
    ["cuello", "Cuello polar"],
    ["cofia", "Cofia"],
    ["jumper", "Jumper escolar"],
    ["short", "Short"],
    ["ambo", "Ambo"],
    ["camisa", "Camisa de trabajo"],
    ["buzo", "Buzo"],
  ];
  return labels.find(([token]) => title.includes(token))?.[1] ?? "Prenda personalizada";
}

function InternalBrand({ dark = false }: { dark?: boolean }) {
  return (
    <a className={"brand " + (dark ? "brand--dark" : "")} href="../" aria-label="Textil Maguimel, inicio">
      <img src="../images/logo-maguimel.png" alt="Textil Maguimel" />
    </a>
  );
}

function InternalHeader() {
  return (
    <header className="site-header internal-header">
      <InternalBrand />
      <nav className="desktop-nav" aria-label="Navegaci&oacute;n principal">
        <a href="../#quienes-somos">Qui&eacute;nes somos</a>
        <a href="../colegio/">Colegio</a>
        <a href="../publicidad/">Publicidad</a>
        <a href="../trabajo/">Trabajo</a>
      </nav>
      <a className="header-cta" href="#contacto">Contactanos</a>
      <details className="mobile-nav">
        <summary aria-label="Abrir men&uacute;"><span /><span /></summary>
        <nav>
          <a href="../" onClick={closeMobileMenu}>Inicio</a>
          <a href="../colegio/" onClick={closeMobileMenu}>Colegio</a>
          <a href="../publicidad/" onClick={closeMobileMenu}>Publicidad</a>
          <a href="../trabajo/" onClick={closeMobileMenu}>Trabajo</a>
          <a href="#contacto" onClick={closeMobileMenu}>Contacto</a>
        </nav>
      </details>
    </header>
  );
}

function ContactAndFooter() {
  return (
    <>
      <section className="contact section-dark" id="contacto">
        <div className="contact-top">
          <div>
            <p className="eyebrow light">Hablemos de tu pr&oacute;ximo proyecto</p>
            <h2>&iquest;Qu&eacute; necesit&aacute;s<br />vestir hoy?</h2>
          </div>
          <a className="round-cta" href={whatsappHref} target="_blank" rel="noreferrer" aria-label="Escribir por WhatsApp">Escribinos <Arrow /></a>
        </div>
        <div className="contact-grid">
          <div><span>Tel&eacute;fono</span><a href={phoneHref}>{phoneDisplay}</a></div>
          <div><span>Direcci&oacute;n</span><a href={mapsHref} target="_blank" rel="noreferrer">French 150<br />Ramos Mej&iacute;a</a></div>
          <div><span>Horarios</span><p>Lun a vie &middot; 10&ndash;13 y 16&ndash;18<br />S&aacute;b &middot; 10&ndash;13</p></div>
          <div><span>C&oacute;mo llegar</span><a href={mapsHref} target="_blank" rel="noreferrer">Abrir en Google Maps <Arrow /></a></div>
        </div>
        <div className="map-wrap">
          <iframe
            title="Ubicaci&oacute;n de Textil Maguimel en Google Maps"
            src="https://www.google.com/maps?q=French+150,+Ramos+Mejia,+Buenos+Aires&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
      <footer>
        <InternalBrand dark />
        <p>Uniformes escolares, laborales y publicitarios.</p>
        <a href="#internal-home">Volver arriba &uarr;</a>
        <small>
          <span>&copy; {new Date().getFullYear()} Textil Maguimel</span>
          <a href="https://www.ideamos.com.ar" target="_blank" rel="noreferrer">Hecho por Estudio Ideamos</a>
        </small>
      </footer>
    </>
  );
}

export default function InternalPage({ category }: { category: CategoryKey }) {
  const page = content[category];
  const media = catalog[category];
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!selected) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setSelected(null);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", close);
    };
  }, [selected]);

  const moveHero = (event: React.PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    event.currentTarget.style.setProperty("--hero-x", x.toFixed(3));
    event.currentTarget.style.setProperty("--hero-y", y.toFixed(3));
  };

  return (
    <main className={"internal-page internal-page--" + category}>
      <section className="internal-hero" id="internal-home" onPointerMove={moveHero}>
        <div className="internal-hero-bg-wrap" aria-hidden="true">
          <div className="internal-hero-bg" style={{ backgroundImage: "url(" + asset(media.hero.background) + ")" }} />
        </div>
        <div className="internal-hero-person-wrap" aria-hidden="true">
          <img src={asset(media.hero.person)} alt="" />
        </div>
        <InternalHeader />
        <div className="internal-hero-content">
          <h1>{page.title}</h1>
          <div className="hero-rule" />
          <p>{page.heroCopy}</p>
          <div className="hero-actions">
            <a className="button button--light" href="#galeria">Ver modelos</a>
            <a className="button button--outline" href={whatsappHref} target="_blank" rel="noreferrer">Solicitar presupuesto</a>
          </div>
        </div>
      </section>

      <section className="internal-intro section">
        <div className="section-label"><span>{page.index}</span> {page.eyebrow}</div>
        <div className="internal-intro-grid reveal">
          <h2>{page.introTitle}</h2>
          <div>
            <p className="internal-lead">{page.introLead}</p>
            <p>{page.introCopy}</p>
          </div>
        </div>
        <div className="internal-features">
          {page.features.map((feature) => (
            <article className="reveal" key={feature.number}>
              <span>{feature.number}</span>
              <h3>{feature.title}</h3>
              <p>{feature.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="internal-models section-dark">
        <div className="internal-models-heading reveal">
          <p className="eyebrow light">En contexto</p>
          <h2>{page.modelsTitle}</h2>
          <p>{page.modelsCopy}</p>
        </div>
        <div className="model-grid">
          {media.models.map((src, index) => (
            <figure className="reveal" key={src}>
              <div><img src={asset(src)} alt={page.modelLabels[index]} loading="lazy" /></div>
              <figcaption><span>0{index + 1}</span>{page.modelLabels[index]}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="internal-gallery section" id="galeria">
        <div className="gallery-heading reveal">
          <div>
            <p className="eyebrow">Selecci&oacute;n de prendas</p>
            <h2>{page.galleryTitle}</h2>
          </div>
          <p>{page.galleryCopy}</p>
        </div>
        <div className="gallery-grid">
          {media.gallery.map((item, index) => {
            const label = productLabel(item.title);
            return <button
              className="gallery-card"
              key={item.src}
              onClick={() => setSelected({ src: item.src, title: label })}
              style={{ "--gallery-delay": String((index % 8) * 45) + "ms" } as React.CSSProperties}
              aria-label={"Ampliar " + label}
            >
              <img
                src={asset(item.src)}
                alt={label}
                loading={category === "publicidad" ? "eager" : "lazy"}
                decoding="async"
              />
              <span><b>{String(index + 1).padStart(2, "0")}</b>{label}</span>
            </button>;
          })}
        </div>
      </section>

      <nav className="category-navigation" aria-label="Otras l&iacute;neas">
        {(["colegio", "publicidad", "trabajo"] as CategoryKey[]).map((key) => (
          <a className={key === category ? "is-current" : ""} href={"../" + key + "/"} key={key}>
            <span>{content[key].index}</span>{content[key].eyebrow}
          </a>
        ))}
      </nav>

      <ContactAndFooter />
      <a className="whatsapp-float" href={whatsappHref} target="_blank" rel="noreferrer" aria-label="Escribir a Textil Maguimel por WhatsApp">
        <img src="../images/whatsapp.svg" alt="" />
        <span>WhatsApp</span>
      </a>

      {selected && (
        <div className="gallery-modal" role="dialog" aria-modal="true" aria-label={selected.title}>
          <button className="gallery-modal-close" onClick={() => setSelected(null)} aria-label="Cerrar imagen">Cerrar &times;</button>
          <figure>
            <img src={asset(selected.src)} alt={selected.title} />
            <figcaption>{selected.title}</figcaption>
          </figure>
        </div>
      )}
    </main>
  );
}
