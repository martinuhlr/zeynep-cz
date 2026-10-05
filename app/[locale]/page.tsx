import Image from "next/image";
import { notFound } from "next/navigation";
import {
  contact,
  dictionaries,
  heroPile,
  isLocale,
  kosikMedia,
  penzionRoom,
  projects,
} from "@/lib/i18n";
import Nav from "@/components/Nav";

const ArrowDown = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
    <path d="M12 5v14M5 12l7 7 7-7" />
  </svg>
);

const ArrowUpRight = ({ strokeWidth = 2.4 }: { strokeWidth?: number }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" aria-hidden="true">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

const serviceIcons = [
  <svg key="web" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M8 4v5" /></svg>,
  <svg key="brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 3a9 9 0 0 0 0 18" /><circle cx="12" cy="12" r="3" /></svg>,
  <svg key="social" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="18" rx="3" /><path d="M4 15l4-4 4 4 3-3 5 5" /><circle cx="15" cy="8" r="1.5" /></svg>,
  <svg key="marketing" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h4l3-8 4 16 3-8h2" /></svg>,
];

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = dictionaries[locale];
  const { hero, work, services, about, contactSection } = dict;

  const [line1, line2, line3] = hero.titleLines;
  const [line2Before, line2After] = line2.split(hero.titleAccent);

  return (
    <>
      <Nav
        locale={locale}
        langSwitchLabel={dict.langSwitchLabel}
        cta={dict.nav.cta}
        links={[
          { href: "#work", label: dict.nav.work },
          { href: "#services", label: dict.nav.services },
          { href: "#about", label: dict.nav.about },
          { href: "#contact", label: dict.nav.contact },
        ]}
      />

      <main id="main">
        {/* ================= HERO ================= */}
        <header className="hero" id="top">
          <div className="wrap">
            <div className="avail reveal">
              <i aria-hidden="true" /> {hero.availability}
            </div>
            <h1 className="reveal">
              {line1}
              <br />
              {line2Before}
              <span className="accent">{hero.titleAccent}</span>
              {line2After}
              <br />
              {line3}
            </h1>
            <div className="hero-foot">
              <p className="reveal">
                {hero.introBefore} <strong>{contact.name}</strong>
                {hero.introAfter}
              </p>
              <div className="hero-cta reveal">
                <a href="#work" className="btn">
                  {hero.seeWork} <ArrowDown />
                </a>
                <a href={contact.linkedin} target="_blank" rel="noopener" className="btn ghost">
                  LinkedIn
                </a>
              </div>
            </div>
            <div className="pile-wrap">
              <a href="#work" className="pile" aria-label={hero.pileLabel}>
                {heroPile.map((img) => (
                  <figure
                    key={img.src}
                    style={{ "--r": img.rotate, "--y": img.y } as React.CSSProperties}
                  >
                    <Image
                      src={img.src}
                      width={img.width}
                      height={img.height}
                      alt=""
                      sizes="(max-width: 720px) 28vw, 15vw"
                      loading="eager"
                      style={img.position ? { objectPosition: img.position } : undefined}
                    />
                  </figure>
                ))}
              </a>
              <div className="sticker" aria-hidden="true">
                <svg viewBox="0 0 200 200">
                  <defs>
                    <path id="ring" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
                  </defs>
                  <text>
                    <textPath href="#ring" textLength="458" lengthAdjust="spacing">{hero.stickerRing}</textPath>
                  </text>
                </svg>
                <span className={hero.stickerHi.length > 3 ? "long" : undefined}>{hero.stickerHi}</span>
              </div>
            </div>
          </div>
        </header>

        {/* ================= WORK ================= */}
        <section id="work" className="section">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <h2>
                  {work.titleTop}
                  <br />
                  <span className="accent">{work.titleAccent}</span>
                </h2>
              </div>
              <p>{work.intro}</p>
            </div>

            {projects.map((project) => {
              const text = work.projects[project.id];
              return (
                <article key={project.id} className="project">
                  <div className="p-info">
                    <h3>{project.name}</h3>
                    <div className="p-type">{text.type}</div>
                    <p>{text.description}</p>
                    <dl className="p-meta">
                      {text.meta.map(([label, value]) => (
                        <div key={label}>
                          <dt>{label}</dt>
                          <dd>{value}</dd>
                        </div>
                      ))}
                    </dl>
                    {project.href && (
                      <a href={project.href} target="_blank" rel="noopener" className="p-link">
                        {work.visit} {project.domain} <ArrowUpRight />
                      </a>
                    )}
                  </div>

                  <div>
                    {project.screenshot && (
                      <div className="browser">
                        <div className="browser-bar">
                          <i />
                          <i />
                          <i />
                          <span>{project.domain}</span>
                        </div>
                        <div className="screen">
                          <Image
                            src={project.screenshot.src}
                            width={project.screenshot.width}
                            height={project.screenshot.height}
                            alt={text.screenshotAlt ?? ""}
                            sizes="(max-width: 1000px) 100vw, 760px"
                          />
                          <div className="screen-hint" aria-hidden="true">
                            {work.hoverHint}
                          </div>
                        </div>
                      </div>
                    )}

                    {project.id === "kosik" && (
                      <>
                        <div className="reels">
                          <a className="reel" href={kosikMedia.reelLeft.href} target="_blank" rel="noopener">
                            <Image
                              src={kosikMedia.reelLeft.img.src}
                              width={kosikMedia.reelLeft.img.width}
                              height={kosikMedia.reelLeft.img.height}
                              alt={work.kosikReelLeftAlt}
                              sizes="(max-width: 1000px) 33vw, 250px"
                            />
                          </a>
                          <figure className="reel">
                            <video
                              src={kosikMedia.video.src}
                              poster={kosikMedia.video.poster}
                              autoPlay
                              muted
                              loop
                              playsInline
                              preload="none"
                              aria-label={work.kosikVideoLabel}
                            />
                            <span className="badge">
                              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M8 5v14l11-7z" />
                              </svg>{" "}
                              {work.reelBadge}
                            </span>
                          </figure>
                          <a className="reel" href={kosikMedia.reelRight.href} target="_blank" rel="noopener">
                            <Image
                              src={kosikMedia.reelRight.img.src}
                              width={kosikMedia.reelRight.img.width}
                              height={kosikMedia.reelRight.img.height}
                              alt={work.kosikReelRightAlt}
                              sizes="(max-width: 1000px) 33vw, 250px"
                              style={{ objectPosition: kosikMedia.reelRight.img.position }}
                            />
                          </a>
                        </div>
                        <div className="social">
                          {kosikMedia.social.map((img, i) => (
                            <figure key={img.src}>
                              <Image
                                src={img.src}
                                width={img.width}
                                height={img.height}
                                alt={work.kosikSocialAlt[i]}
                                sizes="(max-width: 1000px) 33vw, 250px"
                              />
                            </figure>
                          ))}
                        </div>
                      </>
                    )}

                    {project.id === "penzion" && (
                      <div className="pair">
                        <figure>
                          <Image
                            src={penzionRoom.src}
                            width={penzionRoom.width}
                            height={penzionRoom.height}
                            alt={work.penzionRoomAlt}
                            sizes="(max-width: 720px) 100vw, (max-width: 1000px) 50vw, 380px"
                          />
                        </figure>
                        <div className="stat-card">
                          <strong>
                            {work.penzionStatLines[0]}
                            <br />
                            {work.penzionStatLines[1]}
                          </strong>
                          <p>{work.penzionStatText}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ================= SERVICES ================= */}
        <section id="services" className="section services">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <h2>
                  {services.titleLines[0]}
                  <br />
                  {services.titleLines[1]}
                </h2>
              </div>
              <p>{services.intro}</p>
            </div>
            <div className="svc-grid">
              {services.items.map((item, i) => (
                <div key={item.title} className="svc">
                  <div className="svc-ico" aria-hidden="true">
                    {serviceIcons[i]}
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <ul>
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= ABOUT ================= */}
        <section id="about" className="section">
          <div className="wrap">
            <h2 className="about-h">{about.title}</h2>
            <div className="about-grid">
              <div className="about-copy">
                <p className="about-lead">
                  {about.leadBefore}
                  <em>{about.leadAccent}</em>
                  {about.leadAfter}
                </p>
                {about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <div className="label sub-label">{about.languagesLabel}</div>
                <ul className="langs">
                  {about.languages.map((lang) => (
                    <li key={lang.name}>
                      <b>{lang.name}</b>
                      <span>{lang.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <ol className="timeline">
                  {about.jobs.map((job) => (
                    <li key={job.title}>
                      <h3>{job.title}</h3>
                      <span className="when">{job.when}</span>
                      <span className="where">{job.where}</span>
                      <p>{job.text}</p>
                    </li>
                  ))}
                </ol>
                <div className="label sub-label">{about.toolsLabel}</div>
                <ul className="chips">
                  {about.tools.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CONTACT ================= */}
        <section id="contact" className="section contact">
          <div className="wrap">
            <a href={`mailto:${contact.email}`} className="contact-big">
              {contactSection.bigLines[0]}
              <br />
              {contactSection.bigLines[1]} <span aria-hidden="true">→</span>
            </a>
            <div className="contact-row">
              <a href={`mailto:${contact.email}`} className="c-card">
                <div>
                  <small>{contactSection.email}</small>
                  <b>{contact.email}</b>
                </div>
                <ArrowUpRight strokeWidth={2.2} />
              </a>
              <a href={contact.phoneHref} className="c-card">
                <div>
                  <small>{contactSection.phone}</small>
                  <b>{contact.phoneDisplay}</b>
                </div>
                <ArrowUpRight strokeWidth={2.2} />
              </a>
              <a href={contact.linkedin} target="_blank" rel="noopener" className="c-card">
                <div>
                  <small>{contactSection.linkedin}</small>
                  <b>{contact.linkedinDisplay}</b>
                </div>
                <ArrowUpRight strokeWidth={2.2} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap">
          <span>
            © {new Date().getFullYear()} {contact.name}
          </span>
          <span>{dict.footerPlace}</span>
        </div>
      </footer>
    </>
  );
}
