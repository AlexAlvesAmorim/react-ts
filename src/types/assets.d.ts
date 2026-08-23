// Declarações de tipos para imports de assets do electron-vite (main process).
// `import icon from './x.ico?asset'` resolve para o caminho do asset emitido.

declare module '*?asset' {
  const src: string
  export default src
}
