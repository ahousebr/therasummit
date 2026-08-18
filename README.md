# Event Guide Deluxe

uma página elegante para mobile será como o guia do evento
Campos:
Boas vindas
Programação
Como chegar
Sobre o palestrante
Sobre a Biodiversité
Sobre a Therapeutica
Nosso instagram

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Deploy

Cada push para a branch `main` dispara o workflow de deploy em
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). O projeto é
publicado no GitHub Pages como um site estático.

Antes do primeiro deploy, no repositório, vá em **Settings → Pages** e escolha
**GitHub Actions** como fonte de publicação. Não são necessários secrets.
