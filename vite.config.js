// vits.config.ts
import * as path from 'path';
import {
	defineConfig
} from "vite"
import uni from "@dcloudio/vite-plugin-uni"

export default defineConfig({
	// resolve: {
	// 	alias: {
	// 		'@': `${path.resolve(__dirname, 'pages')}/`,
	// 		'~@': `${path.resolve(__dirname, 'static')}/`,
	// 	},
	// 	extensions: ['.mjs', '.js', '.jsx', '.json', '.vue'],
	// },
	plugins: [
		uni(),
	],
})