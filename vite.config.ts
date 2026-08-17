// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Outside Lovable's own sandbox (e.g. running `npm run dev` locally), the
// assets proxy plugin only forwards `/__l5e/assets-v1/*` (images uploaded via
// the Lovable editor) when LOVABLE_PREVIEW_HOST is set — otherwise those
// images 404. Default it to this project's preview host so local dev works.
if (!process.env.LOVABLE_PREVIEW_HOST) {
  process.env.LOVABLE_PREVIEW_HOST = "id-preview--b50bc973-b13d-4011-a451-b0fc8cb57b9d.lovable.app";
}

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
