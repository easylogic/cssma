import { defineConfig } from 'tsup';
import fs from 'fs';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import dotenv from 'dotenv';

// 환경 변수 로드
dotenv.config();

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const postcssProcessor = postcss([
  tailwindcss,
  autoprefixer,
]);

export default defineConfig([
  {
    entry: ['src/ui.tsx'],
    outDir: 'dist',
    format: ['iife'],
    platform: 'browser',
    target: 'es6',
    minify: true,
    treeshake: true,
    splitting: false,
    clean: false,
    env: {
      NODE_ENV: 'production',
      ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY!,
    },
    esbuildOptions(options) {
      options.define = {
        'process.env.NODE_ENV': '"production"',
        'process.env.ANTHROPIC_API_KEY': `"${process.env.ANTHROPIC_API_KEY}"`,
        global: 'window',
      };
      options.loader = {
        ...options.loader,
        '.css': 'css',
      };
      options.minifyIdentifiers = true;
      options.minifySyntax = true;
      options.minifyWhitespace = true;
      options.treeShaking = true;
      options.ignoreAnnotations = true;
      options.bundle = true;
      options.metafile = true;
      
      // 외부 모듈 문제 해결
      options.external = [
        'src/utils/figma-variable',
        'src/config/tokens',
        'src/utils/converters',
        'src/utils/colors'
      ];
    },
    async onSuccess() {
      // CSS 처리
      const css = readFileSync(resolve(__dirname, 'src/styles/global.css'), 'utf8');
      const result = await postcssProcessor.process(css, { from: undefined });
      
      // JS 읽기
      const js = readFileSync(resolve(__dirname, 'dist/ui.global.js'), 'utf8');

      // HTML 템플릿 생성
      const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>CSS-to-Figma Converter</title>
    <style>${result.css}</style>
  </head>
  <body>
    <div id="root"></div>
    <script>${js}</script>
  </body>
</html>`;

      fs.writeFileSync(resolve(__dirname, 'dist/index.html'), html);
      fs.writeFileSync(
        resolve(__dirname, 'dist/manifest.json'),
        readFileSync(resolve(__dirname, 'manifest.json'))
      );
    },
  },
  {
    entry: ['src/code.ts'],
    outDir: 'dist',
    format: ['iife'],
    platform: 'node',
    target: 'es6',
    minify: true,
    clean: false,
    external: [
      'src/utils/figma-variable',
      'src/config/tokens',
      'src/utils/converters',
      'src/utils/colors'
    ]
  },
]); 