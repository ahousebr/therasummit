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
  { id: "todeschini", label: "Todeschini" },
  { id: "instagram", label: "Instagram" },
];

const agenda = [
  { time: "19h00", title: "Welcome Drinks" },
  { title: "Abertura oficial" },
  { title: "Palestra com Dr. Fabrício Brito" },
  { title: "Jantar" },
  { title: "Encerramento" },
];

const savedLocations = [
  {
    name: "Todeschini Sinop",
    date: "19/08",
    address: "Av. das Embaúbas, 2724 - Jardim Maringá, Sinop - MT, 78556-271",
    mapUrl: "https://maps.app.goo.gl/bXJ8QL7PdyyHsoEM8",
  },
];

function SectionTitle({
  kicker,
  title,
  inverted = false,
  titleImageSrc,
}: {
  kicker?: string;
  title: string;
  inverted?: boolean;
  titleImageSrc?: string;
}) {
  return (
    <header className="mb-6 text-center">
      {kicker && (
        <p
          className={`font-sans text-[0.65rem] uppercase tracking-wider ${
            inverted ? "text-primary-foreground" : "text-accent"
          }`}
        >
          {kicker}
        </p>
      )}
      {titleImageSrc ? (
        <img src={titleImageSrc} alt={title} className="block mx-auto mt-1 w-full max-w-72" />
      ) : (
        <h2 className={`font-display text-3xl font-light ${inverted ? "text-primary-foreground" : "text-primary"}`}>
          {title}
        </h2>
      )}
      <div
        className={`divider-ornament mt-4 ${
          inverted ? "[--accent:var(--primary-foreground)]" : ""
        }`}
      >
        <span className="text-accent">✦</span>
      </div>
    </header>
  );
}

function Card({ children, inverted = false }: { children: React.ReactNode; inverted?: boolean }) {
  return (
    <div
      className={`rounded-lg border border-border p-5 shadow-[var(--shadow-soft)] ${
        inverted ? "bg-background" : "bg-card/70"
      }`}
    >
      {children}
    </div>
  );
}

function Guide() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const navScrollRef = React.useRef<HTMLUListElement>(null);
  const navDragRef = React.useRef<{ pointerId: number; startX: number; scrollLeft: number } | null>(
    null,
  );
  const navWasDraggedRef = React.useRef(false);

  React.useEffect(() => {
    navScrollRef.current?.scrollTo({ left: 0 });
  }, []);

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

  const startNavDrag = (event: React.PointerEvent<HTMLUListElement>) => {
    navDragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      scrollLeft: event.currentTarget.scrollLeft,
    };
    navWasDraggedRef.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const dragNavigation = (event: React.PointerEvent<HTMLUListElement>) => {
    const drag = navDragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const distance = event.clientX - drag.startX;
    if (Math.abs(distance) > 4) navWasDraggedRef.current = true;
    event.currentTarget.scrollLeft = drag.scrollLeft - distance;
  };

  const stopNavDrag = (event: React.PointerEvent<HTMLUListElement>) => {
    if (navDragRef.current?.pointerId === event.pointerId) {
      navDragRef.current = null;
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-background font-sans text-foreground">
      <div className="mx-auto max-w-md">
        <header
          className="relative w-screen px-8 pb-5 pt-14"
          style={{ marginLeft: "calc(50% - 50vw)" }}
        >
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
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Seção anterior"
            className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/95 text-accent transition-opacity hover:border-accent disabled:opacity-25"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <ul
            ref={navScrollRef}
            onPointerDown={startNavDrag}
            onPointerMove={dragNavigation}
            onPointerUp={stopNavDrag}
            onPointerCancel={stopNavDrag}
            onClickCapture={(event) => {
              if (navWasDraggedRef.current) {
                event.preventDefault();
                navWasDraggedRef.current = false;
              }
            }}
            className="flex w-full max-w-full cursor-grab snap-x snap-mandatory justify-start gap-2 overflow-x-auto overscroll-x-contain px-14 py-3 touch-pan-x select-none active:cursor-grabbing [scrollbar-width:none] [-webkit-overflow-scrolling:touch] md:justify-center [&::-webkit-scrollbar]:hidden"
          >
            {nav.map((item) => (
              <li key={item.id} className="shrink-0 snap-start">
                <a
                  href={`#${item.id}`}
                  className="block rounded-full border border-border px-3 py-1.5 text-[0.7rem] uppercase tracking-wider text-muted-foreground transition-colors hover:border-accent hover:text-primary"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            disabled={activeIndex === nav.length - 1}
            aria-label="Próxima seção"
            className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/95 text-accent transition-opacity hover:border-accent disabled:opacity-25"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </nav>

        <main className="space-y-14 px-5 pb-0 pt-12">
          <section id="boas-vindas" className="scroll-mt-20 text-justify [text-align-last:center]">
            <SectionTitle kicker="Guia do evento" title="Boas-vindas" />
            <p className="font-display text-xl leading-relaxed text-primary/90">
              Grandes ideias ganham força quando conhecimento, experiência e diferentes perspectivas
              se encontram.
            </p>
            <div className="mt-5 space-y-5 text-sm leading-relaxed text-muted-foreground">
              <p>
                É com essa essência que nasce o Thera Summit, inspirado no conceito de summit: uma
                reunião de alto nível que reúne especialistas e profissionais em torno de temas
                relevantes, favorecendo a troca de conhecimento, o diálogo e novas conexões.
              </p>
              <p>
                Em sua primeira edição, o Thera Summit reúne médicos de diferentes especialidades em
                um ambiente pensado para compartilhar experiências, ampliar perspectivas e aproximar
                ciência, inovação e cuidado.
              </p>
              <p>
                O 1º Thera Summit marca o início de um projeto da Therapeutica Pharmacia, criado com
                o propósito de transformar conhecimento em novas possibilidades de cuidado. Um
                encontro que fortalece conexões, estimula novas perspectivas e, a cada edição,
                constrói caminhos para uma saúde cada vez mais individualizada, integrada e centrada
                nas necessidades de cada paciente.
              </p>
            </div>
          </section>

          <section id="programacao" className="scroll-mt-20">
            <SectionTitle title="Programação" />
            <ol className="space-y-3">
              {agenda.map((slot) => (
                <li key={slot.title}>
                  <Card>
                    <div className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-4">
                      <span
                        aria-hidden={!slot.time}
                        className={`font-display text-lg text-accent ${slot.time ? "" : "invisible"}`}
                      >
                        {slot.time ?? "19h00"}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-sm font-medium text-primary">{slot.title}</h3>
                      </div>
                    </div>
                  </Card>
                </li>
              ))}
            </ol>
          </section>

          <section
            id="como-chegar"
            className="w-screen scroll-mt-20 bg-card"
            style={{ marginLeft: "calc(50% - 50vw)" }}
          >
            <div className="mx-auto max-w-md px-5 py-10">
            <SectionTitle kicker="Localização" title="Como chegar" />
              <div className="space-y-3">
                {savedLocations.map((location) => (
                  <Card key={location.name} inverted>
                    <p className="font-display text-xl text-primary">{location.name}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{location.date}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{location.address}</p>
                    <a
                      href={location.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 block rounded-full bg-primary py-3 text-center text-xs font-medium uppercase tracking-wider text-primary-foreground"
                    >
                      Abrir no mapa
                    </a>
                  </Card>
                ))}
              </div>
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

          <section
            id="biodiversite"
            className="w-screen scroll-mt-20 bg-primary text-justify text-primary-foreground [text-align-last:center]"
            style={{ marginLeft: "calc(50% - 50vw)" }}
          >
            <div className="mx-auto max-w-md px-5 py-10">
            <SectionTitle
              kicker="Marca parceira"
              title="Sobre a Biodiversité"
              titleImageSrc={`${import.meta.env.BASE_URL}biodiversite.png`}
              inverted
            />
            <div className="space-y-4 text-sm leading-relaxed text-primary-foreground">
              <p>
                Nesta primeira edição do Thera Summit, a Therapeutica conta com a parceria da
                Biodiversité, empresa brasileira que, desde 2009, constrói sua trajetória pautada em
                ciência, inovação e tecnologia.
              </p>
              <p>
                Com atuação no desenvolvimento e fornecimento de matérias-primas premium para o
                mercado magistral, a Biodiversité conecta pesquisa, tecnologia e conhecimento
                científico na busca por soluções que acompanhem a evolução do cuidado em saúde.
              </p>
              <p>
                A parceria com a Therapeutica nasce da afinidade entre propósitos: valorizar a
                ciência, incentivar a atualização profissional e ampliar, por meio do conhecimento e
                da inovação, as possibilidades de um cuidado cada vez mais personalizado.
              </p>
            </div>
            </div>
          </section>

          <section id="therapeutica" className="scroll-mt-20 text-justify [text-align-last:center]">
            <SectionTitle
              title="Sobre a Therapeutica"
              titleImageSrc={`${import.meta.env.BASE_URL}therapeutica.png`}
            />
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
                Um propósito sustentado por valores que fazem parte da nossa forma de cuidar e construir relações: 
                responsabilidade e comprometimento, gratidão, transparência, cuidado e disposição 
                para servir, respeito e empatia, além de sustentabilidade.
              </p>
              <p>
                Mais do que manipular fórmulas, acreditamos na construção de relações. Por isso,
                buscamos estar próximos dos profissionais de saúde, promovendo troca de
                conhecimento, atualização e parceria, para que prescritor e farmácia possam caminhar
                juntos na busca pelas melhores possibilidades de cuidado.
              </p>
              <p>
                É dessa vontade de evoluir, compartilhar conhecimento e estar cada vez mais próximos
                que também nasce o Thera Summit.
              </p>
              <p>
                Seguimos olhando para o futuro com o propósito que nos acompanha desde o início e
                com a visão de ser referência nacional em manipulação personalizada, sem perder
                aquilo que faz parte da nossa essência: cuidar de cada pessoa de forma única.
              </p>
            </div>
          </section>

          <section
            id="todeschini"
            className="![margin-block-end:0] w-screen scroll-mt-20 bg-primary text-justify text-primary-foreground [text-align-last:center]"
            style={{ marginLeft: "calc(50% - 50vw)" }}
          >
            <div className="mx-auto max-w-md px-5 py-10">
              <SectionTitle
                kicker="Parceira do Thera Summit"
                title="Todeschini"
                titleImageSrc={`${import.meta.env.BASE_URL}todeschini.png`}
                inverted
              />
              <div className="space-y-4 text-sm leading-relaxed text-primary-foreground">
              <p>
                Nesta primeira edição do Thera Summit, a Therapeutica conta com a parceria da
                Todeschini, uma das mais tradicionais marcas brasileiras de móveis planejados, que há
                décadas constrói sua trajetória unindo design, tecnologia, inovação e excelência.
              </p>
              <p>
                Com soluções desenvolvidas para diferentes formas de viver e trabalhar, a Todeschini
                transforma espaços por meio de projetos personalizados, nos quais estética,
                funcionalidade e cuidado com cada detalhe caminham juntos.
              </p>
              <p>
                A parceria com a Therapeutica nasce da conexão entre propósitos: acreditar que
                ambientes também fazem parte da experiência de cuidado, contribuindo para espaços mais
                acolhedores, funcionais e alinhados às necessidades de cada pessoa.
              </p>
              <p>
                Uma união entre design, conhecimento e cuidado, que encontra no Thera Summit um espaço
                para novas experiências, conexões e possibilidades.
              </p>
              </div>
            </div>
          </section>

          <section
            id="instagram"
            className="w-screen scroll-mt-20 bg-primary text-justify text-primary-foreground [text-align-last:center]"
            style={{ marginLeft: "calc(50% - 50vw)" }}
          >
            <div className="mx-auto max-w-md px-5 py-10">
            <SectionTitle kicker="Continue conosco" title="Nosso Instagram" inverted />
            <div className="text-center">
              <p className="text-sm text-primary-foreground">
                Acompanhe os bastidores e conteúdos do Summit.
              </p>
              <p className="mt-3 text-sm text-primary-foreground">
                Você é parte da nossa história! Tire uma foto e marque a gente na sua publicação.
              </p>
              <a
                href="https://www.instagram.com/therapeuticamt/"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-block rounded-full border border-primary-foreground px-8 py-3 font-display text-lg text-primary-foreground"
              >
                @therapeuticamt
              </a>
            </div>
            </div>
          </section>
        </main>

        <footer
          className="w-screen border-t border-primary-foreground/30 bg-primary text-center"
          style={{ marginLeft: "calc(50% - 50vw)" }}
        >
          <div className="mx-auto max-w-md px-5 py-10">
            <p className="font-display text-2xl tracking-wider text-primary-foreground">THERA SUMMIT</p>
            <p className="mt-2 text-[0.65rem] uppercase tracking-wider text-primary-foreground">
              Guia oficial do evento
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
