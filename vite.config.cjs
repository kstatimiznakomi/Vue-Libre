import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from 'tailwindcss';
import svgLoader from 'vite-svg-loader'
import autoprefixer from 'autoprefixer';

// https://vite.dev/config/
export default defineConfig({
    server: {
        hmr: {
            overlay: true,
        },
    },
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    comments: false,
                }
            }
        }),
        vueDevTools(),
        svgLoader({
            svgoConfig: {
                multipass: true,
                defaultImport: 'raw'
            }
        })
    ],
    css: {
        postcss: {
            plugins: [
                tailwindcss(),
                autoprefixer(),
            ],
        },
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },
})
