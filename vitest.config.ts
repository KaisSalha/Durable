import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
	plugins: [react()],
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: ["./vitest.setup.ts"],
		include: ["__tests__/**/*.{test,spec}.{js,jsx,ts,tsx}"],
		exclude: ["e2e/**/*", "node_modules/**/*"],
		coverage: {
			provider: "v8",
			reporter: ["text", "html", "json-summary"],
			exclude: ["node_modules/", "test-setup.ts", "e2e/**/*"],
		},
	},
	resolve: {
		alias: {
			"@": resolve(__dirname, "./"),
		},
	},
});
