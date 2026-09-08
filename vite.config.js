import path from "node:path"
import { defineConfig } from "vite"

const prod = process.env.NODE_ENV === "production"
const folderName = path.basename(process.cwd())

export default defineConfig({
	root: "src",
	// base: "/bootcamp/",
	base: prod ? `/${folderName}/` : "/",
	mode: prod ? "production" : "development",
	publicDir: "../public",
	server: {
		port: 4321,
	},
	build: {
		outDir: "../dist",
	},
	plugins: [""],
	preview: {
		port: 4321, // Define aquí el puerto que quieras para el modo preview
	},
})
