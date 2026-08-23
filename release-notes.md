# ALFA PDF Reader 2.1.6 - Release

## 📦 Sobre

**ALFA PDF Reader 2.1.6** é um visualizador PDF profissional desenvolvido para Electron + React + TypeScript com foco em performance, segurança e experiência do usuário.

### 🛠️ Correções em 2.1.6 (patch silencioso)

- **Ícone do atalho sempre no tamanho correto** — após instalar/atualizar, o instalador atualiza automaticamente o cache de ícones do Windows (silencioso), resolvendo o ícone pequeno/antigo na Área de Trabalho e Menu Iniciar
- **Impressão mais robusta** — o pipeline de impressão agora funciona por eventos determinísticos: falhas de renderização são detectadas e reportadas ao usuário, em vez de imprimir páginas em branco silenciosamente; o diálogo de impressão acompanha o envio real do documento
- **Qualidade interna** — verificação de tipos e lint 100% verdes, remoção de código morto e padronização de estilo (sem mudança de comportamento para o usuário)

### 🛠️ Correções incluídas da 2.1.5

- **Correção do crash da atualização** — a verificação automática de updates agora acontece apenas no app instalado (em modo de desenvolvimento o electron-updater disparava erro ao iniciar, abrindo o painel de atualização com falha a cada abertura). Na versão instalada, o app verifica novas versões silenciosamente ao iniciar e só avisa quando há novidade
- **Ícone do aplicativo corrigido** — o build anterior não incluía o ícone na janela/taskbar (aparecia o ícone padrão do Electron). Ícone multi-resolução (16–256px, 32bpp) recriado a partir do logo oficial e embutido no executável, na janela, nos atalhos e na associação de arquivos .pdf
- **Sino de atualizações com layout corrigido** — painel de notificações movido para o canto inferior direito do app, com as variáveis de tema corrigidas (fundo, bordas e barra de progresso renderizavam transparentes/quebrados) e auto-abertura ao detectar nova versão, com progresso de download e botão "Instalar agora"
- **Instalação estritamente como administrador** — removida a opção de instalação "somente para o usuário atual"; o instalador agora exige administrador e instala sempre em `C:\Program Files\ALFA PDF Reader\`, evitando instalações híbridas e problemas de compatibilidade nas atualizações

### ✨ Novidades (desde 2.0.0)

- **Correção: abertura de PDF por duplo clique no sistema** — o arquivo agora sempre abre junto com o programa
- **Persistência das configurações de impressão** — cor/P&B, cópias, páginas, qualidade e impressora são memorizados
- **Impressão 100% offline** — pdf.js carregado localmente, janela de impressão endurecida
- **Arquivos recentes** — lista dos últimos 10 documentos + integração com a Jump List do Windows
- **Electron 43.4.1** — runtime atualizado com Node 24

### 🚀 Recursos Principais

- **Performance**: Carregamento rápido e renderização otimizada com PDF.js
- **Segurança**: Suporte total a PDFs protegidos por senha
- **Auto Update**: Verificação automática e silenciosa de atualizações ao iniciar
- **Múltiplas abas**: Trabalhe com vários documentos simultaneamente
- **Zoom inteligente**: Ajuste de 50% a 300%
- **Impressão profissional**: Controle avançado de páginas, cores, cópias e qualidade
- **Associação de arquivos .pdf**: Abra PDFs diretamente pelo clique

### 📁 Arquivos do Release

- `ALFA-PDF-Reader-2.1.6-Setup-x64.exe` - Instalador Inno Setup
- `latest.yml` - Manifesto de atualização automática (electron-updater)

### 🛠️ Tecnologias

- Electron 43.4.1 | React 18 | TypeScript 5.2 | Vite 5
- PDF.js para renderização
- pdf-lib para manipulação de arquivos
- MUI 7 para componentes
- electron-updater para auto-update

### 🔧 Instalação

1. Execute `ALFA-PDF-Reader-2.1.6-Setup-x64.exe` como administrador
2. Siga o assistente de instalação
3. O aplicativo instalará em `C:\Program Files\ALFA PDF Reader\`
4. Criará atalhos na Área de Trabalho e Menu Iniciar
5. Associará arquivos .pdf ao ALFA PDF Reader

### 📋 Requisitos

- Windows 10 ou superior (64-bit)
- Conexão internet opcional (para auto-update)

### 🔐 Segurança

- O aplicativo processa PDFs localmente - nenhum dado é enviado a servidores externos
- Atualizações são verificadas apenas no repositório oficial do GitHub
- Suporte a PDFs protegidos por senha com criptografia

---

Desenvolvido por **Alex Alves Amorim** — [GitHub](https://github.com/AlexAlvesAmorim)

© 2026 Alex Alves Amorim. Todos os direitos reservados.
