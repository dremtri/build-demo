import { rollup } from 'rollup';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import VueMacros from 'unplugin-vue-macros/rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild';
import { resolve } from 'path';

// 生成适合模块环境的文件 es cjs
export const buildModules = async () => {
  const path = resolve('./components/index.ts');
  const bundle = await rollup({
    input: [path],
    plugins: [
      // ElementPlusAlias(),
      // 扩展 vue 的宏 大概意思就是扩展vue的语法糖 详情请参考 https://github.com/sxzz/unplugin-vue-macros/blob/main/README-zh-CN.md
      VueMacros({
        version: 3,
        plugins: {
          vue: vue(),
          vueJsx: vueJsx(),
        },
      }),
      nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts'],
      }),
      commonjs(),
      esbuild({
        sourceMap: false,
        target: 'es2018',
        loaders: {
          '.vue': 'ts',
        },
      }),
    ],
    // external: await generateExternal({ full: false }),
    treeshake: false, // 是否应用 tree-shake 并微调 tree-shake 过程
  });
  console.log(bundle);
};
