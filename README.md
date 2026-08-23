<div align="center">

<img src="installer/assets/logo.png" alt="ALFA PDF Reader" width="180" />

# ALFA PDF Reader

**O visualizador PDF profissional — rápido, elegante e brasileiro.**

[![Versão](https://img.shields.io/badge/versão-2.1.6-e4002b?style=for-the-badge)](https://github.com/AlexAlvesAmorim/AlfaPDF/releases/latest)
[![Plataforma](https://img.shields.io/badge/plataforma-Windows%2010%2B-0078d4?style=for-the-badge&logo=windows&logoColor=white)](https://github.com/AlexAlvesAmorim/AlfaPDF)
[![Electron](https://img.shields.io/badge/Electron-43-47848f?style=for-the-badge&logo=electron&logoColor=white)](https://www.electronjs.org/)
[![Licença](https://img.shields.io/badge/licença-MIT-green?style=for-the-badge)](LICENSE.md)

[⬇️ **Baixar última versão**](https://github.com/AlexAlvesAmorim/AlfaPDF/releases/latest) · [📋 Notas de release](release-notes.md) · [🐛 Reportar bug](https://github.com/AlexAlvesAmorim/AlfaPDF/issues)

</div>

---

## 📖 Sobre

O **ALFA PDF Reader** é um software desktop profissional desenvolvido com Electron + React + TypeScript, com foco no que importa: abrir rápido, ler confortavelmente e imprimir com controle total — sem anúncios, sem telemetria, sem complicação.

- ⚡ **Performance**: abertura instantânea e renderização otimizada com PDF.js
- 🔒 **Segurança**: suporte total a PDFs protegidos por senha, tudo processado localmente
- 🖨️ **Impressão profissional**: impressora, cópias, cores, intervalo de páginas e qualidade — com memória das suas preferências
- 🔄 **Auto-update silencioso**: novas versões chegam sozinhas pelo sino de notificações

---

## 🆚 Comparativo

### com leitores populares

| Recurso | **ALFA PDF Reader** | Edge / Chrome | Acrobat Reader | Sumatra PDF |
|---|:-:|:-:|:-:|:-:|
| Múltiplas abas | ✅ | ✅ | ✅ | ✅ |
| Leve e rápido de abrir | ✅ | ⚠️ | ❌ | ✅ |
| Impressão avançada (intervalo, qualidade, cópias) | ✅ | ⚠️ básico | ✅ | ❌ |
| Memória das configurações de impressão | ✅ | ❌ | ❌ | ❌ |
| Auto-update automático em background | ✅ | — | ✅ | ❌ |
| PDFs protegidos por senha | ✅ | ✅ | ✅ | ⚠️ |
| Interface moderna dark/light | ✅ | ⚠️ | ⚠️ | ❌ |
| 100% offline, sem telemetria/ads | ✅ | ❌ | ❌ | ✅ |

### evolução do projeto

| Versão | Destaques |
|---|---|
| **v1.2** | Primeira versão estável: leitura, zoom e impressão básica |
| **v2.0** | Repaginação completa: nova identidade dark/vermelha, múltiplas abas, pipeline de impressão com `pdf-lib`, modal de senha dedicado |
| **v2.1.1 – 2.1.3** | Auto-update via GitHub Releases, sino de notificações, impressão 100% offline, arquivos recentes + Jump List, Electron 43 |
| **v2.1.5** | Correção do auto-update, ícone multi-resolução refeito, sino no canto inferior, instalação administrador-only |
| **v2.1.6** ← atual | Patch silencioso: cache de ícones corrigido nos atalhos, impressão por eventos determinísticos, lint + typecheck 100% verdes |

---

## ✨ Recursos principais

| | |
|---|---|
| 📑 **Múltiplas abas** | Trabalhe com vários documentos ao mesmo tempo |
| 🔍 **Zoom inteligente** | De 50% a 300%, com atalhos de teclado |
| ⌨️ **Navegação por teclado** | Setas, PageUp/PageDown, `Ctrl+P` imprimir, `Ctrl+W` fechar aba |
| 🕘 **Arquivos recentes** | Últimos 10 documentos + integração com a Jump List do Windows |
| 📝 **Salvar como PDF** | Reorganize e selecione páginas para exportar um novo PDF |
| 🖨️ **Impressão avançada** | Silenciosa (direto na impressora) ou nativa (diálogo do Windows) |
| 🔐 **PDFs com senha** | Modal dedicada, senha propagada com segurança em todo o fluxo |
| 🎨 **Temas** | Dark (padrão), Light e Midnight |
| 🔔 **Atualizações** | Sino no canto inferior com progresso de download e instalação em 1 clique |
| 🔗 **Associação .pdf** | Duplo clique abre direto no ALFA |

---

## 🚀 Instalação

1. Baixe `ALFA-PDF-Reader-2.1.6-Setup-x64.exe` na [página de releases](https://github.com/AlexAlvesAmorim/AlfaPDF/releases/latest)
2. Execute **como administrador** (instalação por máquina em `C:\Program Files\ALFA PDF Reader`)
3. Pronto — atalhos na Área de Trabalho e Menu Iniciar, `.pdf` associado

> **Requisitos**: Windows 10 ou superior (64-bit)

---

## 🛠️ Desenvolvimento

```bash
npm install          # instalar dependências
npm run dev          # rodar em modo desenvolvimento (hot reload)
npm run build        # build de produção (out/)
npm run dist         # build + instalador Inno Setup + latest.yml
npm test             # testes (vitest)
npm run lint         # ESLint (0 warnings)
npm run typecheck    # TypeScript (main + renderer)
npm run format       # Prettier
```

### Stack

| Camada | Tecnologia |
|---|---|
| Runtime | Electron 43 (Node 24) |
| UI | React 18 + MUI 7 + Emotion |
| Build | electron-vite + Vite 5 |
| PDF | pdfjs-dist 5.4 (render) + pdf-lib (edição) |
| Update | electron-updater → GitHub Releases |
| Instalador | Inno Setup 6 (tema customizado PT-BR/EN) |

### Estrutura

```
src/
├── main/       # processo principal: janelas, IPC, impressão, auto-update
├── preload/    # contextBridge seguro (contextIsolation)
├── renderer/   # app React (páginas, módulos, estilos)
├── shared/     # componentes, hooks, tipos e utils compartilhados
│   └── tests/  # vitest + testing-library
scripts/        # build do instalador, geração/aplicação de ícone
installer/      # Inno Setup (.iss) + assets visuais
```

---

## 📝 Licença

[MIT](LICENSE.md) © 2026 Alex Alves Amorim

<div align="center">

**Dev de Favela** — software profissional brasileiro 🇧🇷

</div>
