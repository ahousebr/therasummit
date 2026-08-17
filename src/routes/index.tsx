import { createFileRoute } from "@tanstack/react-router";
import logoAsset from "@/assets/thera-summit.png.asset.json";

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
  { time: "08h30", title: "Credenciamento & Welcome Coffee", detail: "Recepção e entrega dos materiais." },
  { time: "09h30", title: "Abertura oficial", detail: "Boas-vindas e apresentação do Summit." },
  { time: "10h00", title: "Palestra principal", detail: "Ciência, pele e biodiversidade." },
  { time: "12h30", title: "Almoço", detail: "Menu sazonal servido no salão principal." },
  { time: "14h00", title: "Workshop prático", detail: "Protocolos aplicados em grupos." },
  { time: "16h30", title: "Roda de conversa", detail: "Perguntas abertas com os especialistas." },
  { time: "18h00", title: "Encerramento & networking", detail: "Brinde de encerramento." },
];

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <header className="mb-6 text-center">
      <p className="font-sans text-[0.65rem] uppercase tracking-wider text-accent">{kicker}</p>
      <h2 className="mt-2 font-display text-3xl font-light text-primary">{title}</h2>
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
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <div className="mx-auto max-w-md">
        <section className="relative">
          <img
            src={logoAsset.url}
            alt="Thera Summit"
            className="w-full"
            loading="eager"
          />
        </section>

        <nav className="sticky top-0 z-10 border-y border-border bg-background/95 backdrop-blur">
          <ul className="flex gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
        </nav>

        <main className="space-y-14 px-5 py-12">
          <section id="boas-vindas" className="scroll-mt-20">
            <SectionTitle kicker="Guia do evento" title="Boas-vindas" />
            <p className="font-display text-xl leading-relaxed text-primary/90">
              É uma alegria receber você no Thera Summit.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Preparamos um dia dedicado ao encontro entre ciência, natureza e cuidado. Este guia
              reúne tudo o que você precisa: horários, localização e as histórias por trás das marcas
              que tornam este encontro possível. Sinta-se em casa.
            </p>
          </section>

          <section id="programacao" className="scroll-mt-20">
            <SectionTitle kicker="Agenda" title="Programação" />
            <ol className="space-y-3">
              {agenda.map((slot) => (
                <li key={slot.time}>
                  <Card>
                    <div className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-4">
                      <span className="shrink-0 font-display text-lg text-accent">{slot.time}</span>
                      <div className="min-w-0">
                        <h3 className="text-sm font-medium text-primary">{slot.title}</h3>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                          {slot.detail}
                        </p>
                      </div>
                    </div>
                  </Card>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-center text-[0.7rem] uppercase tracking-wider text-muted-foreground">
              Programação sujeita a ajustes
            </p>
          </section>

          <section id="como-chegar" className="scroll-mt-20">
            <SectionTitle kicker="Localização" title="Como chegar" />
            <Card>
              <p className="font-display text-xl text-primary">[NOME DO LOCAL — substituir]</p>
              <p className="mt-2 text-sm text-muted-foreground">
                [Endereço completo, bairro, cidade — substituir]
              </p>
              <div className="mt-5 space-y-3 text-xs leading-relaxed text-muted-foreground">
                <p>
                  <span className="text-accent">Carro ·</span> estacionamento com serviço de valet na
                  entrada principal.
                </p>
                <p>
                  <span className="text-accent">Transporte por app ·</span> peça o desembarque na
                  portaria.
                </p>
                <p>
                  <span className="text-accent">Metrô ·</span> [estação mais próxima — substituir].
                </p>
              </div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="mt-6 block rounded-full bg-primary py-3 text-center text-xs font-medium uppercase tracking-wider text-primary-foreground"
              >
                Abrir no mapa
              </a>
            </Card>
          </section>

          <section id="palestrante" className="scroll-mt-20">
            <SectionTitle kicker="Convidado" title="Sobre o palestrante" />
            <Card>
              <p className="font-display text-2xl text-primary">[Nome do palestrante]</p>
              <p className="mt-1 text-[0.7rem] uppercase tracking-wider text-accent">
                [Titulação / especialidade]
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                [Mini biografia do palestrante: formação, trajetória e principais contribuições —
                substituir por texto oficial.]
              </p>
            </Card>
          </section>

          <section id="biodiversite" className="scroll-mt-20">
            <SectionTitle kicker="Marca parceira" title="Sobre a Biodiversité" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              [Descrição institucional da Biodiversité — propósito, origem dos ativos e filosofia de
              formulação. Substituir por texto oficial.]
            </p>
          </section>

          <section id="therapeutica" className="scroll-mt-20">
            <SectionTitle kicker="Marca parceira" title="Sobre a Therapeutica" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              [Descrição institucional da Therapeutica — atuação, portfólio e diferenciais clínicos.
              Substituir por texto oficial.]
            </p>
          </section>

          <section id="instagram" className="scroll-mt-20">
            <SectionTitle kicker="Continue conosco" title="Nosso Instagram" />
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Acompanhe os bastidores e conteúdos do Summit.
              </p>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-block rounded-full border border-accent px-8 py-3 font-display text-lg text-primary"
              >
                @[perfil]
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
