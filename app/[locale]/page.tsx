import Image from "next/image";
import { notFound } from "next/navigation";
import {
  contact,
  dictionaries,
  isLocale,
  projects,
} from "@/lib/i18n";
import LangSwitch from "@/components/LangSwitch";
import Sparkle from "@/components/Sparkle";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = dictionaries[locale];

  return (
    <main
      id="main"
      className="relative flex min-h-screen w-full flex-col items-center justify-center gap-10 px-4 py-14 sm:gap-12 sm:px-8 sm:py-16"
    >
      <LangSwitch locale={locale} label={dict.langSwitchLabel} />

      <section
        aria-label={contact.name}
        className="relative flex w-full max-w-[1100px] flex-col items-center gap-8 rounded-3xl border-[1.5px] border-[oklch(0.6_0.14_35)] bg-[oklch(0.965_0.015_70)] px-6 py-12 sm:flex-row sm:items-center sm:justify-center sm:px-20 sm:py-12"
      >
        <div className="flex flex-col items-center gap-5 text-center sm:items-start sm:text-left">
          <h1 className="font-caveat text-[56px] leading-none font-bold text-[oklch(0.5_0.16_35)] sm:text-[72px] md:text-[88px]">
            {contact.name}
          </h1>
          <p className="sr-only">{dict.role}</p>
          <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[oklch(0.5_0.16_35)] px-5 py-2.5 text-[15px] font-semibold text-white no-underline transition-colors hover:bg-[oklch(0.4_0.17_35)] hover:text-white sm:text-base"
            >
              LinkedIn
            </a>
            <a
              href={contact.phoneHref}
              className="rounded-full bg-[oklch(0.5_0.16_35)] px-5 py-2.5 text-[15px] font-semibold text-white no-underline transition-colors hover:bg-[oklch(0.4_0.17_35)] hover:text-white sm:text-base"
            >
              {contact.phoneDisplay}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="rounded-full bg-[oklch(0.5_0.16_35)] px-5 py-2.5 text-[15px] font-semibold text-white no-underline transition-colors hover:bg-[oklch(0.4_0.17_35)] hover:text-white sm:text-base"
            >
              {contact.email}
            </a>
          </div>
        </div>

        <Sparkle className="absolute top-9 right-14 hidden h-[26px] w-[26px] sm:block sm:right-[90px]" />
        <Sparkle className="absolute top-[70px] right-6 hidden h-4 w-4 sm:block sm:right-10" />
        <Sparkle className="absolute bottom-12 right-20 hidden h-[18px] w-[18px] sm:block sm:right-[130px]" />
      </section>

      <section className="flex w-full max-w-[1100px] flex-col gap-6">
        <h2 className="text-[26px] font-semibold text-[oklch(0.3_0.01_60)] sm:text-[28px]">
          {dict.projectsLabel}
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} — ${dict.visitSite}`}
              className="group overflow-hidden rounded-2xl border-[1.5px] border-[oklch(0.85_0.02_60)] bg-white no-underline transition-shadow hover:shadow-md hover:no-underline"
            >
              <div className="relative h-40 w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={dict.projectAlt[project.id]}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority={project.id === "kosik"}
                />
              </div>
              <div className="p-6">
                <div className="mb-1.5 text-lg font-semibold text-[oklch(0.3_0.01_60)]">
                  {project.name}
                </div>
                <div className="text-[15px] text-[oklch(0.45_0.01_60)]">
                  {dict.projectDesc[project.id]}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
