# ALFA MATCH — Função de Análise Vaga + Currículo

> **Produto:** Alfa Match (linha Alfa: AlfaPDF Reader · Alfa Curriculum Maker · Alfa Match)
> **Repo:** https://github.com/AlexAlvesAmorim/alfa-cv-maker
> **Arquivo principal:** `src/utils/atsAnalyzer.ts`
> **Última atualização:** 2026-08-24

---

## 1. O que é

Função que mede o **encaixe entre um currículo e uma vaga**: cola-se a descrição da vaga,
o sistema extrai as palavras-chave, verifica quais existem no currículo e devolve um
**score ponderado (0-100%)**, um **veredito acionável** e a lista do que falta — separado
por prioridade da vaga.

Pode ser usada de dois jeitos:
1. **Standalone** — botão "Alfa Match" no header (não precisa criar currículo; há um
   mini-formulário pré-preenchido editável).
2. **Dentro do fluxo** — no resumo final do assistente, seção "Analisador de vaga".

---

## 2. Como o algoritmo funciona (pipeline)

```
descrição da vaga
   │
   ▼
[1] splitZones() ────── divide a vaga em zonas por linha (regex):
   │                     • Requisitos  → linhas com "requisit|obrigat|necess|imprescind"
   │                     • Diferenciais → "diferencia|desejável|plus"
   │                     • Geral        → todo o resto
   ▼
[2] extractKeywords() ─ por zona: unigramas (sem stopwords, >2 letras)
   │                     + BIGRAMAS (termos compostos: "power bi", "pacote office")
   ▼
[3] strengthOf() ────── onde a palavra existe no currículo define a FORÇA:
   │                     • forte  → skills, experiências, idiomas
   │                     • média  → resumo, objetivo
   │                     • fraca  → nome, formação, contato
   ▼
[4] Score ponderado ─── peso por zona: Requisitos ×3 · Geral ×2 · Diferenciais ×1.5
   │                     score = Σ(pesos dos matches) / Σ(todos os pesos) × 100
   ▼
[5] verdictFor() ────── ≥75 "Candidatura forte" · ≥45 "Quase lá" · <45 "Alinhamento baixo"
                         (cada faixa com mensagem acionável)
```

### Filtros anti-ruído
- **Bigramas órfãos descartados:** se "react typescript" não existe no currículo mas
  "react" e "typescript" casam individualmente, o bigram é só ruído de vírgula → fora.
- **Stopwords PT/EN** (~60 palavras) + números puros + pontas de ponta ("css." → "css").
- **Stem de zona:** usar `diferencia` e não `diferencial` — o plural "diferenciais"
  NÃO contém "diferencial" (o L vira IS).

---

## 3. API

```ts
import { analyzeForJob, type AtsResult } from './src/utils/atsAnalyzer';

const result = analyzeForJob(resume: ResumeData, jobDescription: string): AtsResult;
```

**AtsResult:**
| Campo | Tipo | Conteúdo |
|---|---|---|
| `score` | number | 0-100, ponderado por zona |
| `verdict` | `{label, tone, message}` | faixa + mensagem acionável (`tone`: high/mid/low) |
| `required` | `{matched[], missing[]}` | palavras da zona de requisitos |
| `differentials` | `{matched[], missing[]}` | zona de diferenciais |
| `general` | `{matched[], missing[]}` | resto da descrição |
| `strongMatches` | `string[]` | matches "fortes" (skills/experiências) |
| `totalKeywords` | number | termos únicos extraídos da vaga |

---

## 4. Arquivos envolvidos

| Arquivo | Papel |
|---|---|
| `src/utils/atsAnalyzer.ts` | motor completo (zonas, pesos, bigramas, veredito) |
| `src/components/AtsReport.tsx` | renderização do resultado (veredito colorido + grupos de chips) |
| `src/components/AlfaMatch.tsx` | página standalone (vaga + mini-formulário + relatório) |
| `src/components/Header.tsx` | botão de alternância chat ↔ Alfa Match |
| `src/components/SummaryCard.tsx` | seção analisadora dentro do fluxo do currículo |
| `src/atsAnalyzer.test.ts` | 5 testes (score, zonas, pesos, veredito, vaga vazia) |

---

## 5. Como usar (usuário final)

1. No topo, clicar **"Alfa Match"**.
2. Colar a descrição completa da vaga (com requisitos e diferenciais — quanto mais
   estruturada, melhor a separação de zonas).
3. Conferir/ajustar o mini-formulário do currículo (já vem preenchido se houver rascunho).
4. Clicar **"Analisar compatibilidade"** → veredito + palavras-chave em verde (casadas)
   e tracejadas com "+" (ausentes).
5. Adicionar os termos ausentes **somente se forem verdade** — o relatório avisa que
   inventar experiência derruba o candidato na entrevista.

---

## 6. Testes

```bash
npm test   # 22 testes no total; 5 do analisador:
```
- Score ≥80 e tom "high" quando o currículo cobre a vaga
- Ausentes corretos (kubernetes, docker)
- Separação Requisitos × Diferenciais pela descrição (inclui bigram "power bi")
- Requisito (peso 3) vale mais que termo geral (peso 2)
- Descrição vazia → score 0

---

## 7. Melhorias futuras planejadas

- Peso extra para termos repetidos na vaga (frequência = importância).
- Suporte a PDF da vaga (upload + pdf.js).
- Histórico de análises por vaga (exige backend).
- Sinônimos/relacionados (ex.: "js" ↔ "javascript") via dicionário local.
- Score separado por seção do currículo ("sua área de habilidades cobre 90% dos requisitos").
