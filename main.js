// === MÓDULOS - Toggle Accordion ===
function toggle(el) {
  const isOpen = el.classList.contains('open');
  document.querySelectorAll('.mod.open').forEach(m => {
    m.classList.remove('open');
    m.setAttribute('aria-expanded', 'false');
  });
  if (!isOpen) {
    el.classList.add('open');
    el.setAttribute('aria-expanded', 'true');
    setTimeout(() => {
      const firstVideo = el.querySelector('.video-item');
      if (firstVideo) {
        const headerHeight = document.querySelector('nav').offsetHeight;
        const elementPosition = firstVideo.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerHeight - 20;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }, 100);
  }
}

// === MOBILE MENU ===
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const hamburger = document.querySelector('.nav-hamburger');
  menu.classList.toggle('active');
  hamburger.classList.toggle('active');
  document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
}
function closeMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const hamburger = document.querySelector('.nav-hamburger');
  menu.classList.remove('active');
  hamburger.classList.remove('active');
  document.body.style.overflow = '';
}

// === NAV - Scroll class ===
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    document.body.classList.add('scrolled');
  } else {
    document.body.classList.remove('scrolled');
  }
});

// === HERO VIDEO ===
document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('hero-video');
  const container = document.querySelector('.hero-video-bg');
  const playBtn = document.querySelector('.play-btn');
  if (!video || !container) return;

  video.muted = true;

  video.addEventListener('ended', () => {
    container.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    container.style.opacity = '0';
    container.style.transform = 'scale(0.95) translateY(-50px)';
    container.style.pointerEvents = 'none';
    if (playBtn) playBtn.classList.remove('hidden');
  });

  video.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      video.muted = false;
      if (playBtn) playBtn.classList.add('hidden');
    } else {
      video.pause();
      if (playBtn) playBtn.classList.remove('hidden');
    }
  });
});

function openVideoOverlay() {
  const overlay = document.getElementById('videoFullscreenOverlay');
  const video = document.getElementById('hero-video-fullscreen');
  if (overlay && video) {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    video.currentTime = 0;
    video.play().catch(() => {
      video.muted = true;
      video.play();
    });
    video.onended = function() {
      closeVideoOverlay();
    };
  }
}

function closeVideoOverlay() {
  const overlay = document.getElementById('videoFullscreenOverlay');
  const video = document.getElementById('hero-video-fullscreen');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  if (video) {
    video.pause();
    video.currentTime = 0;
    video.onended = null;
  }
}

// === MODAL - Lead Form ===
function openForm() {
  const modal = document.getElementById('formModal');
  const leadForm = document.getElementById('leadForm');
  const formSuccess = document.getElementById('formSuccess');

  if (leadForm && formSuccess) {
    leadForm.style.display = 'block';
    formSuccess.style.display = 'none';
  }

  modal.style.display = 'flex';
  setTimeout(() => modal.classList.add('active'), 10);
  document.body.style.overflow = 'hidden';
}

function closeForm() {
  const modal = document.getElementById('formModal');
  modal.classList.remove('active');
  setTimeout(() => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }, 300);
}

function getWhatsappDigits(value) {
  return (value || '').replace(/\D/g, '').slice(0, 11);
}

function formatWhatsappValue(value) {
  const digits = getWhatsappDigits(value);

  if (!digits) return '';
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function updateWhatsappValidation(options = {}) {
  const { showError = false } = options;
  const whatsappInput = document.getElementById('whatsapp');
  const whatsappError = document.getElementById('whatsappError');
  const whatsappCounter = document.getElementById('whatsappCounter');

  if (!whatsappInput) return true;

  const rawValue = whatsappInput.value;
  const hasLetters = /[A-Za-zÀ-ÿ]/.test(rawValue);
  const digits = getWhatsappDigits(rawValue);
  whatsappInput.value = formatWhatsappValue(digits);

  if (whatsappCounter) {
    whatsappCounter.textContent = `${digits.length}/11 dígitos`;
    whatsappCounter.style.color = (showError && digits.length !== 11) || hasLetters ? '#f87171' : 'var(--dim)';
  }

  let message = '';
  if (hasLetters) {
    message = 'Não use letras. Digite apenas DDD + 9 dígitos, por exemplo (11) 91234-5678.';
  } else if (showError && digits.length !== 11) {
    message = 'Digite 11 números: DDD + 9 dígitos, como (11) 91234-5678.';
  }

  if (typeof whatsappInput.setCustomValidity === 'function') {
    whatsappInput.setCustomValidity(message);
  }
  whatsappInput.setAttribute('aria-invalid', message ? 'true' : 'false');

  if (whatsappError) {
    whatsappError.textContent = message;
    whatsappError.style.display = message ? 'block' : 'none';
  }

  return message === '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeForm();
});

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('formModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) closeForm();
    });
  }

  const whatsappInput = document.getElementById('whatsapp');
  if (whatsappInput) {
    whatsappInput.addEventListener('input', () => updateWhatsappValidation({ showError: false }));
    whatsappInput.addEventListener('blur', () => updateWhatsappValidation({ showError: true }));
    whatsappInput.addEventListener('paste', () => setTimeout(() => updateWhatsappValidation({ showError: false }), 0));
  }
});

// === FORM SUBMIT ===
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzSTuD2KkGDpFep7Wgw_A6TtmByH9owq1VDTB3Y6d1W6fxjdGtmXeNnfdk3pKOA4QrI/exec';

function submitForm(e) {
  e.preventDefault();
  const whatsappInput = document.getElementById('whatsapp');
  if (!updateWhatsappValidation({ showError: true })) {
    whatsappInput?.focus();
    whatsappInput?.reportValidity?.();
    return;
  }

  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  
  // Loading state
  submitBtn.classList.add('btn-loading');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span>Enviando...</span>';

  const nome = document.getElementById('nome').value;
  const cidade = document.getElementById('cidade').value;
  const whatsapp = whatsappInput.value;

  const leads = JSON.parse(localStorage.getItem('leads') || '[]');
  leads.push({ nome, cidade, whatsapp, data: new Date().toLocaleString('pt-BR') });
  localStorage.setItem('leads', JSON.stringify(leads));

  const form = document.createElement('form');
  form.method = 'GET';
  form.action = SCRIPT_URL;
  form.target = 'hidden_iframe';
  const p1 = document.createElement('input');
  p1.type = 'hidden'; p1.name = 'nome'; p1.value = nome;
  const p2 = document.createElement('input');
  p2.type = 'hidden'; p2.name = 'cidade'; p2.value = cidade;
  const p3 = document.createElement('input');
  p3.type = 'hidden'; p3.name = 'whatsapp'; p3.value = whatsapp;
  form.appendChild(p1);
  form.appendChild(p2);
  form.appendChild(p3);
  document.body.appendChild(form);
  form.submit();
  form.remove();

  // Success state after short delay
  setTimeout(() => {
    submitBtn.classList.remove('btn-loading');
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
    document.getElementById('leadForm').style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';
  }, 800);

  setTimeout(() => {
    const nome = document.getElementById('nome').value;
    const msg = encodeURIComponent(`Olá, vim pelo site. Meu nome é ${nome}. Gostaria de agendar uma consulta.`);
    window.open(`https://wa.me/+558694262812?text=${msg}`, '_blank');
  }, 1500);
}

// === SCROLL-REVEAL (Premium) ===
(function() {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return; // Skip animations

  const reveals = document.querySelectorAll(".sec, .video-item, .avaliacao-card");
  const textNodes = document.querySelectorAll(
    "main section :is(h2, h3, h4, p, .sec-label, .eyebrow), footer :is(h2, p)"
  );
  const all = [...new Set([...reveals, ...textNodes])];

  all.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = "opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), transform 700ms cubic-bezier(0.16, 1, 0.3, 1)";
    el.style.willChange = "opacity, transform";
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const i = all.indexOf(entry.target);
        const delay = Math.min((i % 6), 5) * 80;
        entry.target.style.transitionDelay = `${delay}ms`;
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        entry.target.style.willChange = "auto";
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  all.forEach(el => obs.observe(el));

  // Stacking cards animation
  const stackItems = document.querySelectorAll('.video-item');
  const stackObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const idx = Array.from(stackItems).indexOf(entry.target);
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'scale(1)';
      } else {
        const rect = entry.boundingClientRect;
        if (rect.top < 0) {
          entry.target.style.opacity = '0';
          entry.target.style.transform = 'scale(0.95)';
        } else {
          entry.target.style.opacity = '0';
          entry.target.style.transform = 'translateY(30px)';
        }
      }
    });
  }, { threshold: [0, 0.2, 0.5, 0.8, 1] });

  stackItems.forEach((item, i) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 60}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 60}ms`;
    stackObserver.observe(item);
  });
})();

// === DEPOIMENTOS - Video Player ===
const depVideos = [
  {
    src: "https://drbrunomachado.vercel.app/lv_0_20250717133315.mp4",
    tag: "DEPOIMENTO EM DESTAQUE",
    quote: '"Há 3 anos sentia dor no joelho que me impedia de subir escadas. Após 4 meses com o Dr. Bruno, voltei a caminhar sem dor. O Protocolo 5R mudou minha vida."',
    name: "Maria Clara S., 58 anos",
    trat: "Tratamento: Protocolo 5R para artrose de joelho",
    dur: "4:02"
  },
  {
    src: "https://drbrunomachado.vercel.app/VIDEO-2026-02-25-14-36-37.mp4",
    tag: "DEPOIMENTO",
    quote: '"Diagnosticada com artrose no quadril, achava que precisaria de cirurgia. Com o tratamento conservador do Dr. Bruno, estou há 1 ano sem dores intensas."',
    name: "Rosa Helena M., 63 anos",
    trat: "Tratamento: Artrose de quadril",
    dur: "5:20"
  },
  {
    src: "781f02a0-8c7d-4adc-b103-9b1557a94fe1.MP4",
    tag: "AVALIAÇÃO",
    quote: '"Resultado incrível! Em poucos meses senti uma melhora enorme na qualidade de vida."',
    name: "Antônio Alves",
    trat: "Tratamento: Protocolo 5R",
    dur: "0:30"
  },
  {
    src: "04.mp4",
    tag: "DEPOIMENTO",
    quote: '"Não acreditei que seria possível voltar a me movimentar sem dor. O Dr. Bruno mudou minha vida."',
    name: "Dona Zanaide",
    trat: "Tratamento: Protocolo 5R",
    dur: "1:15"
  },
  {
    src: "05.mp4",
    tag: "DEPOIMENTO",
    quote: '"Depois de anos sofrendo, finalmente encontrei uma solução que funciona de verdade."',
    name: "Dona Zanaide",
    trat: "Tratamento: Protocolo 5R",
    dur: "1:30"
  }
];

let depIndex = 0;
let depMainVideo, depOverlay, depVTag, depVQuote, depVCite, depVTrat, depCounter, depThumbs;

document.addEventListener('DOMContentLoaded', () => {
  depMainVideo = document.getElementById('mainVideo');
  depOverlay = document.getElementById('playOverlay');
  depVTag = document.getElementById('vTag');
  depVQuote = document.getElementById('vQuote');
  depVCite = document.getElementById('vCite');
  depVTrat = document.getElementById('vTrat');
  depCounter = document.getElementById('videoCounter');
  depThumbs = document.getElementById('thumbsGrid');

  if (depThumbs) {
    depVideos.forEach((v, i) => {
      const card = document.createElement('div');
      card.className = 'thumb-card-dep' + (i === 0 ? ' active' : '');
      card.onclick = () => selectDepVideo(i);
      card.innerHTML = `
        <div class="thumb-video-dep">
          <div class="thumb-play-dep">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </div>
          <div class="thumb-duration-dep">${v.dur}</div>
        </div>
        <div class="thumb-info-dep">
          <h3>${v.name.split(',')[0]}</h3>
          <p>${v.trat}</p>
        </div>
      `;
      depThumbs.appendChild(card);
    });
  }

  // Swipe/Drag
  const videoPlayer = document.querySelector('.video-player');
  if (videoPlayer) {
    let startX = 0;
    let isDragging = false;

    videoPlayer.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      videoPlayer.style.cursor = 'grabbing';
    });
    videoPlayer.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
    });
    videoPlayer.addEventListener('mouseup', (e) => {
      if (!isDragging) return;
      isDragging = false;
      videoPlayer.style.cursor = 'grab';
      const diff = startX - e.clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextVideo();
        else prevVideo();
      }
    });
    videoPlayer.addEventListener('mouseleave', () => {
      isDragging = false;
      videoPlayer.style.cursor = 'grab';
    });
    videoPlayer.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });
    videoPlayer.addEventListener('touchend', (e) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextVideo();
        else prevVideo();
      }
    });
  }
});

function selectDepVideo(i) {
  depIndex = i;
  const v = depVideos[i];
  depMainVideo.src = v.src;
  depMainVideo.load();
  depVTag.textContent = v.tag;
  depVQuote.textContent = v.quote;
  depVCite.textContent = v.name;
  depVTrat.textContent = v.trat;
  depCounter.textContent = (i + 1) + ' / ' + depVideos.length;
  depOverlay.style.display = 'flex';
  document.querySelectorAll('.thumb-card-dep').forEach((card, j) => {
    card.classList.toggle('active', j === i);
  });
}

function togglePlay() {
  if (depMainVideo.paused) {
    depMainVideo.play();
    depOverlay.style.display = 'none';
  } else {
    depMainVideo.pause();
    depOverlay.style.display = 'flex';
  }
}

function nextVideo() { selectDepVideo((depIndex + 1) % depVideos.length); }
function prevVideo() { selectDepVideo((depIndex - 1 + depVideos.length) % depVideos.length); }

// === AVALIAÇÕES - Video Toggle ===
function toggleAvaliacaoVideo(overlay) {
  const card = overlay.closest('.avaliacao-card');
  const video = card.querySelector('video');
  if (video.paused) {
    video.play();
    overlay.style.display = 'none';
  } else {
    video.pause();
    overlay.style.display = 'flex';
  }
}

// === AVALIAÇÕES - Horizontal Carousel ===
let avIndex = 0;
const avTotal = 12;

function avCarouselUpdate() {
  const track = document.getElementById('avCarouselTrack');
  const counter = document.getElementById('avCounter');
  if (!track || !counter) return;
  const card = track.querySelector('.av-carousel-card');
  if (!card) return;
  const cardWidth = card.offsetWidth + 20; // card + gap
  track.scrollTo({ left: avIndex * cardWidth, behavior: 'smooth' });
  counter.textContent = (avIndex + 1) + ' / ' + avTotal;
}

function avCarouselNext() {
  avIndex = Math.min(avIndex + 1, avTotal - 1);
  avCarouselUpdate();
}

function avCarouselPrev() {
  avIndex = Math.max(avIndex - 1, 0);
  avCarouselUpdate();
}

document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('avCarouselTrack');
  if (!track) return;

  // Sync counter on manual scroll
  track.addEventListener('scroll', () => {
    const card = track.querySelector('.av-carousel-card');
    if (!card) return;
    const cardWidth = card.offsetWidth + 20;
    avIndex = Math.round(track.scrollLeft / cardWidth);
    const counter = document.getElementById('avCounter');
    if (counter) counter.textContent = (avIndex + 1) + ' / ' + avTotal;
  });

  // Touch swipe (mobile) — native scroll-snap handles this,
  // but we also add mouse drag for desktop
  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;

  track.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
    track.style.cursor = 'grabbing';
  });
  track.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    track.scrollLeft = scrollLeft - (x - startX);
  });
  track.addEventListener('mouseup', () => {
    isDragging = false;
    track.style.cursor = 'grab';
  });
  track.addEventListener('mouseleave', () => {
    isDragging = false;
    track.style.cursor = 'grab';
  });
  track.style.cursor = 'grab';
});

// === LOCAIS — Scroll Reveal on Mobile ===
(function() {
  const cards = document.querySelectorAll('.local-card');
  if (!cards.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, i * 120);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  cards.forEach(card => observer.observe(card));
})();
