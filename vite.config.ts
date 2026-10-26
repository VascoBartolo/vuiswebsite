// vite.config.ts
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tanstackStart(),
    // Only read by the azure-swa preset; Nitro otherwise falls back to node:18
    nitro({
      azure: { config: { platform: { apiRuntime: "node:22" } } },
      ...(process.env.NITRO_PRESET === "azure-swa" && {
        entry: "./azure/swa-entry.ts",
      }),
    }),
    viteReact(),
    tailwindcss(),
  ],
});