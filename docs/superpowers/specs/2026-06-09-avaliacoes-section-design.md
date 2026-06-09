# Design Spec: Seção de Avaliações

## Visão Geral
Adicionar uma nova seção "Avaliações" ao site da Comunidade Movimentadores, exibindo 3 imagens e 2 vídeos de avaliações de pacientes em um layout grid de 2 colunas.

## Contexto
- **Projeto:** Landing page da Comunidade Movimentadores (Dr. Bruno Machado)
- **Arquivo principal:** `index.html`
- **Localização:** Após seção "Relatos de Pacientes" e antes do CTA final
- **Idioma:** Português (pt-BR)

## Assets
### Imagens (Coluna Esquerda)
- `1.jpeg` — Avaliação de paciente
- `2.jpeg` — Avaliação de paciente
- `3.jpeg` — Avaliação de paciente

### Vídeos (Coluna Direita)
- `04.mp4` — Vídeo de avaliação
- `05.mp4` — Vídeo de avaliação

## Layout

### Estrutura HTML
```
<section class="sec sec-alt" id="avaliacoes">
  <div class="sec-label">Avaliações</div>
  <h2>Avaliações de <em>quem</em> <strong>se recuperou.</strong></h2>
  <p class="sec-body">Resultados reais de pacientes que passaram pelo tratamento.</p>
  
  <div class="avaliacoes-grid">
    <!-- Coluna Esquerda: Imagens -->
    <div class="avaliacoes-col">
      <div class="avaliacao-card avaliacao-img">
        <img src="1.jpeg" alt="Avaliação 1">
        <span class="avaliacao-badge">Imagem</span>
      </div>
      <div class="avaliacao-card avaliacao-img">
        <img src="2.jpeg" alt="Avaliação 2">
        <span class="avaliacao-badge">Imagem</span>
      </div>
      <div class="avaliacao-card avaliacao-img">
        <img src="3.jpeg" alt="Avaliação 3">
        <span class="avaliacao-badge">Imagem</span>
      </div>
    </div>
    
    <!-- Coluna Direita: Vídeos -->
    <div class="avaliacoes-col">
      <div class="avaliacao-card avaliacao-video">
        <video playsinline>
          <source src="04.mp4" type="video/mp4">
        </video>
        <div class="avaliacao-play-overlay">
          <div class="avaliacao-play-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          </div>
        </div>
        <span class="avaliacao-badge avaliacao-badge-video">Vídeo</span>
      </div>
      <div class="avaliacao-card avaliacao-video">
        <video playsinline>
          <source src="05.mp4" type="video/mp4">
        </video>
        <div class="avaliacao-play-overlay">
          <div class="avaliacao-play-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          </div>
        </div>
        <span class="avaliacao-badge avaliacao-badge-video">Vídeo</span>
      </div>
    </div>
  </div>
</section>
```

### CSS
```css
/* AVALIAÇÕES */
.avaliacoes-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
}

.avaliacoes-col {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.avaliacao-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  background: rgba(15, 21, 36, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.avaliacao-card:hover {
  border-color: rgba(56, 189, 248, 0.28);
  transform: translateY(-4px);
  box-shadow: 0 0 0 1px rgba(56, 189, 248, 0.14),
              0 0 30px rgba(56, 189, 248, 0.08),
              0 12px 40px rgba(0, 0, 0, 0.28);
}

.avaliacao-card img,
.avaliacao-card video {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  display: block;
}

.avaliacao-badge {
  position: absolute;
  bottom: 12px;
  left: 12px;
  padding: 6px 14px;
  background: rgba(56, 189, 248, 0.15);
  border: 1px solid rgba(56, 189, 248, 0.25);
  border-radius: 20px;
  font-family: 'Geist', sans-serif;
  font-size: 11px;
  font-weight: 500;
  color: #38bdf8;
  letter-spacing: 1px;
  text-transform: uppercase;
  backdrop-filter: blur(8px);
}

.avaliacao-badge-video {
  background: rgba(0, 0, 0, 0.6);
  border-color: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.avaliacao-play-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: background 0.3s;
}

.avaliacao-play-overlay:hover {
  background: rgba(0, 0, 0, 0.2);
}

.avaliacao-play-btn {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(56, 189, 248, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}

.avaliacao-play-overlay:hover .avaliacao-play-btn {
  transform: scale(1.08);
}

/* Responsivo */
@media (max-width: 768px) {
  .avaliacoes-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
```

## Comportamento
1. **Vídeos:** Ao clicar no overlay de play, o vídeo inicia e o overlay desaparece
2. **Hover:** Cards têm efeito de elevação e brilho sutil
3. **Responsivo:** Em telas < 768px, as colunas viram linha única
4. **Scroll-reveal:** A seção herda a animação de entrada das outras seções

## Integração
- A seção será inserida após o closing `</section>` da seção "Relatos de Pacientes" (linha ~1288)
- Os estilos serão adicionados ao bloco `<style>` existente
- Os scripts de vídeo (play/pause) serão adicionados ao bloco `<script>` existente

## Verificação
- [ ] Imagens 1.jpeg, 2.jpeg, 3.jpeg aparecem na coluna esquerda
- [ ] Vídeos 04.mp4, 05.mp4 aparecem na coluna direita
- [ ] Layout grid 2 colunas funciona corretamente
- [ ] Responsivo funciona em mobile (768px)
- [ ] Hover effects funcionam
- [ ] Vídeos podem ser reproduzidos
- [ ] Scroll-reveal funciona
