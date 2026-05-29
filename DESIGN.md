---
name: Comunidade Movimentadores
description: Landing page institucional para comunidade de saúde do Dr. Bruno Machado
colors:
  primary: "#1a4fcc"
  primary-light: "#2563eb"
  accent: "#38bdf8"
  accent-glow: "rgba(56, 189, 248, 0.15)"
  background-deep: "#080c14"
  background-dark: "#0b1020"
  background-mid: "#0d1527"
  surface: "rgba(15, 21, 36, 0.7)"
  surface-border: "rgba(255, 255, 255, 0.08)"
  text-primary: "#f8fafc"
  text-secondary: "#e2e8f0"
  text-muted: "#94a3b8"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "clamp(52px, 5.5vw, 76px)"
    fontWeight: 500
    lineHeight: 1.06
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Geist, sans-serif"
    fontSize: "16px"
    fontWeight: 300
    lineHeight: 1.75
  label:
    fontFamily: "Geist, sans-serif"
    fontSize: "11px"
    fontWeight: 400
    letterSpacing: "4px"
    textTransform: "uppercase"
rounded:
  sm: "8px"
  md: "16px"
  lg: "24px"
  full: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "40px"
  section: "120px"
components:
  button-primary:
    backgroundColor: "#cffafe"
    textColor: "#020617"
    rounded: "{rounded.full}"
    padding: "14px 28px"
  button-secondary:
    backgroundColor: "rgba(255,255,255,0.04)"
    textColor: "#e2e8f0"
    rounded: "{rounded.full}"
    padding: "14px 28px"
  card:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.surface-border}"
    rounded: "{rounded.md}"
    padding: "24px 32px"
---

# Design System: Comunidade Movimentadores

## 1. Overview

**Creative North Star: "A Colina do Conhecimento"**

Um espaço digital que transmite a autoridade de um especialista em ortopedia, mas com a acolhida de quem entende a dor do paciente. O design equilibra profundidade técnica (fundo escuro, tipografia precisa) com calor humano (tom empático, linguagem acessível). A estética foge do "site médico genérico" com stock photos e do "SaaS frio" com dashboards.

**Key Characteristics:**
- Fundo escuro com gradientes sutis que transmitem profundidade e seriedade
- Acento ciano que traz vitalidade sem ser agressivo
- Tipografia hierárquica com contraste forte entre display e body
- Micro-interações que guiam o olhar sem distrair
- Cards e módulos organizados para consumo progressivo de informação

## 2. Colors

A paleta é dominada por azuis profundos com um acento ciano que traz energia vital. O fundo escuro não é "dark mode por moda", mas uma escolha que transmite seriedade médica e permite que os elementos de destaque brilhem.

### Primary
- **Azul Profundo** (#080c14): Fundo principal da página. Transmite profundidade e seriedade.
- **Azul Escuro** (#0b1020): Fundo secundário para seções alternadas.
- **Azul Marca** (#1a4fcc): Cor principal da marca. Usada em hover states e elementos interativos.
- **Azul Claro** (#2563eb): Variante mais clara para gradientes e destaques.

### Accent
- **Ciano Vitalidade** (#38bdf8): Cor de destaque. Usada em links, ícones, números de destaque e elementos de interação. Transmite energia e confiança.

### Neutral
- **Branco Gelo** (#f8fafc): Texto principal. Alta legibilidade em fundo escuro.
- **Branco Nevoeiro** (#e2e8f0): Texto secundário e elementos de apoio.
- **Cinza Nevoeiro** (#94a3b8): Texto muted, labels e elementos de baixa prioridade.

### Named Rules
**The Depth Rule.** A hierarquia de cores é construída por camadas de profundidade. Fundos mais escuros ficam "mais atrás"; elementos mais claros "ficam à frente". Isso cria uma sensação de profundidade sem usar sombras excessivas.

## 3. Typography

**Display Font:** Plus Jakarta Sans (com fallback para sans-serif)
**Body Font:** Geist (com fallback para sans-serif)

**Character:** A combinação transmite precisão técnica (Geist, geométrica e limpa) com personalidade (Plus Jakarta Sans, com personalidade mais forte). O contraste entre as duas cria hierarquia visual sem precisar de muitos pesos diferentes.

### Hierarchy
- **Display** (500, clamp(52px, 5.5vw, 76px), 1.06): Títulos hero. Aparece apenas no hero principal.
- **Headline** (500, clamp(38px, 4vw, 56px), 1.12): Títulos de seção. Hierarquia clara com o display.
- **Title** (600, 18px, 1.4): Títulos de módulos e cards. Mais peso para destaque.
- **Body** (300, 16px, 1.75): Texto corrido. Leveza para leitura confortável.
- **Label** (400, 11px, 4px, uppercase): Eyebrows e labels de categorias. Uso restrito.

### Named Rules
**The Weight Contrast Rule.** O contraste de peso entre display (500) e body (300) cria hierarquia sem precisar de muitas variações de tamanho. Isso mantém a paleta tipográfica enxuta e eficiente.

## 4. Elevation

O sistema usa **tonal layering** em vez de sombras pronunciadas. A profundidade é criada por:
- Camadas de fundo com opacidades diferentes
- Bordas sutis com baixa opacidade
- Gradientes radiais que criam pontos de luz
- Sombras apenas em estados interativos (hover, focus)

### Shadow Vocabulary
- **Card Hover** (`0 10px 40px rgba(0, 0, 0, 0.3)`): Aparece apenas no hover de cards. Indica interatividade.
- **Button Glow** (`0 10px 30px rgba(6, 182, 212, 0.12)`): Brilho sutil em botões primários. Indica ação principal.

### Named Rules
**The Flat-By-Default Rule.** Superfícies são planas em repouso. Sombras e elevação aparecem apenas como resposta a estados (hover, focus, active). Isso mantém a interface limpa e focada no conteúdo.

## 5. Components

### Buttons
- **Shape:** Completamente arredondado (border-radius: 9999px)
- **Primary:** Fundo ciano claro (#cffafe), texto escuro (#020617), padding 14px 28px
- **Hover / Focus:** Escala leve (1.03), sombra aumentada, transição suave (0.3s cubic-bezier)
- **Secondary:** Fundo translúcido (rgba(255,255,255,0.04)), borda sutil, texto claro

### Cards / Containers
- **Corner Style:** 16px border-radius
- **Background:** Superfície translúcida (rgba(15, 21, 36, 0.7))
- **Shadow Strategy:** Tonal layering com bordas sutis
- **Border:** 1px solid rgba(255, 255, 255, 0.08)
- **Internal Padding:** 24px 32px

### Accordion Modules
- **Style:** Cards empilhados com header clicável
- **State:** Expansão com animação suave (height auto + opacity)
- **Hover:** Borda ciano sutil, elevação leve

### Navigation
- **Style:** Fixa no topo, fundo translúcido com backdrop-filter blur
- **Typography:** Labels em 13px, uppercase, com hover underline
- **CTA Button:** Fundo ciano,完全 arredondado, contraste alto

## 6. Do's and Don'ts

### Do:
- **Do** usar o fundo escuro para criar profundidade e seriedade
- **Do** usar o ciano como acento vitalidade, não como cor dominante
- **Do** manter contraste alto entre texto e fundo (mínimo 4.5:1)
- **Do** usar animações sutis para guiar o olhar (scroll reveals, hover states)
- **Do** organizar conteúdo em módulos expansíveis para consumo progressivo
- **Do** usar tipografia hierárquica com contraste forte entre display e body

### Don't:
- **Don't** usar stock photos de médicos sorrindo (anti-referência de PRODUCT.md)
- **Don** usar fundo branco frio e clínico (anti-referência de PRODUCT.md)
- **Don't** criar gradientes de texto ou glassmorphism decorativo
- **Don't** usar mais de 3 famílias tipográficas
- **Don't** criar cards idênticos em grid sem variação
- **Don't** usar sombras excessivas que competem com o conteúdo
- **Don't** criar animações bounce ou elásticas (estilo datado)
- **Don't** usar texto cinza em fundo colorido (contraste insuficiente)