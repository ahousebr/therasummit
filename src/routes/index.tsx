import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Thera Summit — Guia do Evento" },
      {
        name: "description",
        content:
          "Guia oficial do Thera Summit: boas-vindas, programação, como chegar, palestrante, Biodiversité, Therapeutica e Instagram.",
      },
      { property: "og:title", content: "Thera Summit — Guia do Evento" },
      {
        property: "og:description",
        content: "Tudo sobre o Thera Summit em um só lugar: programação, local e conteúdos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Guide,
});

const nav = [
  { id: "boas-vindas", label: "Boas-vindas" },
  { id: "programacao", label: "Programação" },
  { id: "como-chegar", label: "Como chegar" },
  { id: "palestrante", label: "Palestrante" },
  { id: "biodiversite", label: "Biodiversité" },
  { id: "therapeutica", label: "Therapeutica" },
  { id: "instagram", label: "Instagram" },
];

const agenda = [
  { time: "19h00", title: "Welcome Drinks" },
  { time: "19h45", title: "Abertura oficial" },
  { time: "20h00", title: "Palestra com Dr. Fabrício Brito" },
  { time: "21h30", title: "Jantar" },
  { time: "22h30", title: "Encerramento" },
];

function SectionTitle({ kicker, title }: { kicker?: string; title: string }) {
  return (
    <header className="mb-6 text-center">
      {kicker && <p className="font-sans text-[0.65rem] uppercase tracking-wider text-accent">{kicker}</p>}
      <h2 className="font-display text-3xl font-light text-primary">{title}</h2>
      <div className="divider-ornament mt-4">
        <span className="text-accent">✦</span>
      </div>
    </header>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-card/70 p-5 shadow-[var(--shadow-soft)]">
      {children}
    </div>
  );
}

function Guide() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const idx = nav.findIndex((n) => n.id === id);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    nav.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(nav.length - 1, index));
    const el = document.getElementById(nav[clamped].id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveIndex(clamped);
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <div className="mx-auto max-w-md">
        <header className="relative px-8 pb-5 pt-14">
          <img
            src={`${import.meta.env.BASE_URL}thera-logo.png`}
            alt="Thera Summit"
            className="mx-auto w-full max-w-xs"
            loading="eager"
          />
        </header>

        <nav
          className="sticky top-0 z-10 w-screen border-y border-border bg-background/95 backdrop-blur"
          style={{ marginLeft: "calc(50% - 50vw)" }}
        >
          <button type="button" onClick={() => goTo(activeIndex - 1)} disabled={activeIndex === 0} aria-label="Seção anterior" className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/95 text-accent transition-opacity hover:border-accent disabled:opacity-25">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <ul className="flex w-full justify-center gap-2 overflow-x-auto px-14 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {nav.map((item) => (
              <li key={item.id} className="shrink-0">
                <a
                  href={`#${item.id}`}
                  className="block rounded-full border border-border px-3 py-1.5 text-[0.7rem] uppercase tracking-wider text-muted-foreground transition-colors hover:border-accent hover:text-primary"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <button type="button" onClick={() => goTo(activeIndex + 1)} disabled={activeIndex === nav.length - 1} aria-label="Próxima seção" className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/95 text-accent transition-opacity hover:border-accent disabled:opacity-25">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </nav>

        <main className="space-y-14 px-5 py-12">
          <section id="boas-vindas" className="scroll-mt-20 text-justify [text-align-last:center]">
            <SectionTitle kicker="Guia do evento" title="Boas-vindas" />
            <p className="font-display text-xl leading-relaxed text-primary/90">
              Grandes ideias ganham força quando conhecimento, experiência e diferentes perspectivas se encontram.
            </p>
            <div className="mt-5 space-y-5 text-sm leading-relaxed text-muted-foreground">
              <p>
                É com essa essência que nasce o Thera Summit, inspirado no conceito de summit: uma reunião de alto nível que reúne especialistas e profissionais em torno de temas relevantes, favorecendo a troca de conhecimento, o diálogo e novas conexões.
              </p>
              <p>
                Em sua primeira edição, o Thera Summit reúne médicos de diferentes especialidades em um ambiente pensado para compartilhar experiências, ampliar perspectivas e aproximar ciência, inovação e cuidado.
              </p>
              <p>
                O 1º Thera Summit marca o início de um projeto da Therapeutica Pharmacia, criado com o propósito de transformar conhecimento em novas possibilidades de cuidado. Um encontro que fortalece conexões, estimula novas perspectivas e, a cada edição, constrói caminhos para uma saúde cada vez mais individualizada, integrada e centrada nas necessidades de cada paciente.
              </p>
            </div>
          </section>

          <section id="programacao" className="scroll-mt-20">
            <SectionTitle title="Programação" />
            <ol className="space-y-3">
              {agenda.map((slot) => (
                <li key={slot.time}>
                  <Card>
                    <div className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-4">
                      <span className="shrink-0 font-display text-lg text-accent">{slot.time}</span>
                      <div className="min-w-0">
                        <h3 className="text-sm font-medium text-primary">{slot.title}</h3>
                      </div>
                    </div>
                  </Card>
                </li>
              ))}
            </ol>
          </section>

          <section id="como-chegar" className="scroll-mt-20">
            <SectionTitle kicker="Localização" title="Como chegar" />
            <div className="space-y-3">
            <Card>
              <p className="font-display text-xl text-primary">Todeschini Sorriso</p>
              <p className="mt-2 text-sm text-muted-foreground">18/08</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Av. Blumenau Sul, 3534 — Bom Jesus, Sorriso — MT,
                <br />
                78896-147
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Todeschini+Sorriso+Av.+Blumenau+Sul+3534+Bom+Jesus+Sorriso+MT"
                target="_blank"
                rel="noreferrer"
                className="mt-6 block rounded-full bg-primary py-3 text-center text-xs font-medium uppercase tracking-wider text-primary-foreground"
              >
                Abrir no mapa
              </a>
            </Card>
            <Card>
              <p className="font-display text-xl text-primary">Todeschini Sinop</p>
              <p className="mt-2 text-sm text-muted-foreground">19/08</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Av. das Embaúbas, 2724 - Jardim Maringá, Sinop - MT, 78556-271
              </p>
              <a
                href="https://maps.app.goo.gl/bXJ8QL7PdyyHsoEM8"
                target="_blank"
                rel="noreferrer"
                className="mt-6 block rounded-full bg-primary py-3 text-center text-xs font-medium uppercase tracking-wider text-primary-foreground"
              >
                Abrir no mapa
              </a>
            </Card>
            </div>
          </section>

          <section id="palestrante" className="scroll-mt-20 text-justify [text-align-last:center]">
            <SectionTitle kicker="Convidado" title="Sobre o palestrante" />
            <Card>
              <p className="font-display text-2xl text-primary">Dr. Fabrício Macedo Brito</p>
              <p className="mt-1 text-[0.7rem] uppercase tracking-wider text-accent">
                CRM-SP 178057
              </p>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                <p>
                  Médico, enfermeiro e palestrante com atuação em Medicina Estética Integrativa,
                  performance e tecnologias avançadas. Integra conhecimentos em emagrecimento,
                  hipertrofia, reposição hormonal, peptídeos e healthspan, conectando saúde,
                  longevidade e estética.
                </p>
                <p>
                  Na estética avançada, desenvolve tratamentos faciais, capilares e corporais, com
                  terapias autólogas e sintéticas e tecnologias como ultrassom, laser e endolaser.
                </p>
                <p>
                  Com experiência em eventos nacionais e internacionais, já palestrou em congressos
                  como AMWC, CIOSP e ABRAN.
                </p>
              </div>
            </Card>
          </section>

          <section id="biodiversite" className="scroll-mt-20 text-justify [text-align-last:center]">
            <SectionTitle kicker="Marca parceira" title="Sobre a Biodiversité" />
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                A Biodiversité nasceu com a grande missão de trazer ao mercado cosmético mundial
                ativos premium para formulações manipuladas pautadas em inovação científica,
                tecnologia e respeito ao meio ambiente. Nossos valores são a ética, a ciência e a
                responsabilidade social e ambiental.
              </p>
              <p>
                Fundada em 2009, a Biodiversité começou exportando insumos farmacêuticos naturais
                para o exterior e, através de sua consolidação no mercado internacional, passou a ter
                acesso a tecnologias inovadoras na Europa e Ásia. Desde então se tornou referência em
                inovação tecnológica e sustentabilidade de princípios ativos e matérias primas
                premium, naturais, hipoalergênicas e de alta eficácia.
              </p>
              <p>
                Há mais de dez anos o nosso propósito é pautado em entregar as melhores soluções
                médicas e nutricionais para todos os pacientes. Levamos saúde, autoestima e bem-estar
                através do estudo, desenvolvimento, fabricação e distribuição de ativos premium.
              </p>
            </div>
          </section>

          <section id="therapeutica" className="scroll-mt-20 text-justify [text-align-last:center]">
            <SectionTitle kicker="Marca parceira" title="Sobre a Therapeutica" />
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                Há quase três décadas, a Therapeutica Pharmaria nasceu em Sorriso a partir do
                propósito da farmacêutica Andrea Andreolla de Borges, ao lado de seu esposo, Silvio
                Borges, de construir uma farmácia onde o cuidado individualizado estivesse no centro
                de cada escolha.
              </p>
              <p>
                Desde 1997, crescemos junto com o Mato Grosso, ampliamos nossa presença e, hoje,
                estamos em Sorriso, Sinop e Lucas do Rio Verde, mantendo a essência que deu origem à
                Therapeutica: entender que cada pessoa é única e que o cuidado também deve ser.
              </p>
              <p>
                Ao longo dessa trajetória, construímos uma atuação pautada pela qualidade,
                conhecimento e personalização, aproximando a ciência magistral das necessidades
                individuais de cada paciente.
              </p>
              <p className="font-display text-xl leading-relaxed text-primary/90">
                Personalizamos cuidados para transformar vidas.
              </p>
              <p>
                Um propósito sustentado por valores que fazem parte da nossa forma de cuidar e de
                construir relações: responsabilidade e comprometimento, gratidão, transparência,
                cuidado e servir, respeito e empatia e sustentabilidade.
              </p>
              <p>
                Mais do que manipular fórmulas, acreditamos na construção de relações. Por isso,
                buscamos estar próximos dos profissionais de saúde, promovendo troca de conhecimento,
                atualização e parceria, para que prescritor e farmácia possam caminhar juntos na
                busca pelas melhores possibilidades de cuidado.
              </p>
              <p>
                É dessa vontade de evoluir, compartilhar conhecimento e estar cada vez mais próximos
                que também nasce o Thera Summit.
              </p>
              <p>
                Seguimos olhando para o futuro com o propósito que nos acompanha desde o início e com
                a visão de ser referência nacional em manipulação personalizada, sem perder aquilo
                que faz parte da nossa essência: cuidar de cada pessoa de forma única.
              </p>
            </div>
          </section>

          <section id="instagram" className="scroll-mt-20 text-justify [text-align-last:center]">
            <SectionTitle kicker="Continue conosco" title="Nosso Instagram" />
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Acompanhe os bastidores e conteúdos do Summit.
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Você é parte da nossa história! Tire uma foto e marque a gente na sua publicação.
              </p>
              <a
                href="https://www.instagram.com/therapeuticamt/"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-block rounded-full border border-accent px-8 py-3 font-display text-lg text-primary"
              >
                @therapeuticamt
              </a>
            </div>
          </section>
        </main>

        <footer className="border-t border-border px-5 py-10 text-center">
          <p className="font-display text-2xl tracking-wider text-primary">THERA SUMMIT</p>
          <p className="mt-2 text-[0.65rem] uppercase tracking-wider text-muted-foreground">
            Guia oficial do evento
          </p>
        </footer>
      </div>
    </div>
  );
}
