import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({ rollupTypes: true })],
  build: {
    emptyOutDir: true,
    lib: {
      entry: {
        core: resolve(__dirname, "src/core/main/index.ts"),
        render: resolve(__dirname, "src/render/index.ts"),
        ui: resolve(__dirname, "src/ui/index.ts"),
        "web-blocks": resolve(__dirname, "src/web-blocks/index.ts"),
        tailwind: resolve(__dirname, "src/tailwind/index.ts"),
        runtime: resolve(__dirname, "src/runtime.ts"),
      },
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      treeshake: true,
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        "@chaibuilder/runtime",
        "@floating-ui/dom",
        "@floating-ui/react-dom",
        "@mhsdesign/jit-browser-tailwindcss",
        "@radix-ui/react-accordion",
        "@radix-ui/react-alert-dialog",
        "@radix-ui/react-context-menu",
        "@radix-ui/react-dialog",
        "@radix-ui/react-dropdown-menu",
        "@radix-ui/react-hover-card",
        "@radix-ui/react-icons",
        "@radix-ui/react-label",
        "@radix-ui/react-menubar",
        "@radix-ui/react-navigation-menu",
        "@radix-ui/react-popover",
        "@radix-ui/react-scroll-area",
        "@radix-ui/react-select",
        "@radix-ui/react-separator",
        "@radix-ui/react-slot",
        "@radix-ui/react-switch",
        "@radix-ui/react-tabs",
        "@radix-ui/react-toast",
        "@radix-ui/react-toggle",
        "@radix-ui/react-tooltip",
        "@react-hookz/web",
        "react-arborist",
        "@react-email/render",
        "react-error-boundary",
        "@react-email/components",
        "@rjsf/core",
        "@rjsf/utils",
        "@rjsf/validator-ajv8",
        "@tailwindcss/aspect-ratio",
        "@tailwindcss/forms",
        "@tailwindcss/line-clamp",
        "@tailwindcss/typography",
        "class-variance-authority",
        "@bobthered/tailwindcssPaletteGenerator",
        "clsx",
        "cmdk",
        "framer-motion",
        "date-fns",
        "flagged",
        "fuse.js",
        "himalaya",
        "tree-model",
        "i18next",
        "jotai",
        "prop-types",
        "@monaco-editor/react",
        "re-resizable",
        "lodash",
        "lodash-es",
        "lucide-react",
        "react",
        "react-autosuggest",
        "react-colorful",
        "react-dom",
        "react-frame-component",
        "react-hotkeys-hook",
        "react-i18next",
        "react-icons",
        "react-icons-picker",
        "react-json-view",
        "react-quill",
        "react-wrap-balancer",
        "@react-email/components",
        "@react-email/render",
        "react-email",
        "tailwind-merge",
        "tailwindcss-animate",
        "unsplash-js",
      ],
    },
  },
});
