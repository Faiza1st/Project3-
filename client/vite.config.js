import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const port = process.env.PORT || 4050 
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 4000,
		
		proxy: {
			"/api": {
				target: `http://localhost:${port}/`,
				changeOrigin: true,
			},
		},
	},
});