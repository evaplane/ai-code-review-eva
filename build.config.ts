import { globSync } from 'fast-glob'
import { defineBuildConfig } from 'unbuild'

// 自动匹配 src 下所有入口文件（如 .ts、.vue 等）
// fast-glob 是用于文件模式匹配和批量查找的库
// globSync同步查找
const entries = globSync(['src/**/*.{ts,js,vue}'], {
  ignore: ['**/*.d.ts', '**/*.test.*'], // 忽略类型文件和测试文件
}).map(file => ({
  input: file.slice(0, -3), // 去掉 .ts/.js 后缀
  outDir: 'dist', // 输出到 dist，保持 src 的目录结构
}))
console.log('entries',entries)
// 支持多入口打包 每个入口会生成独立的输出文件
export default defineBuildConfig({
  entries, // 动态生成的入口
  declaration: true, // 启用后，每个入口都会生成对应的 .d.ts文件
  rollup: {
    emitCJS: false, // 只生成 ESM 格式，如果是true，同时生成esm和cjs格式
  },
  failOnWarn: false, // 警告不会导致构建失败
})
