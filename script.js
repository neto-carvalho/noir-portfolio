/* ============================================
   ANIMAÇÕES NO SCROLL (AOS - Animate On Scroll)
   ============================================ */
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('[data-aos]');
        this.init();
    }
    
    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-delay') || 0;
                    setTimeout(() => {
                        entry.target.classList.add('aos-animate');
                    }, delay);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        this.elements.forEach(element => {
            observer.observe(element);
        });
    }
}

/* ============================================
   CONTADOR ANIMADO PARA ESTATÍSTICAS
   ============================================ */
class CounterAnimation {
    constructor(element, target, duration = 2000) {
        this.element = element;
        this.target = parseInt(target);
        this.duration = duration;
        this.start = 0;
        this.increment = this.target / (this.duration / 16);
        this.current = 0;
        this.animate();
    }
    
    animate() {
        const step = () => {
            this.current += this.increment;
            
            if (this.current < this.target) {
                this.element.textContent = Math.floor(this.current);
                requestAnimationFrame(step);
            } else {
                this.element.textContent = this.target;
            }
        };
        
        step();
    }
}

class StatsCounter {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.hasAnimated = false;
        this.init();
    }
    
    init() {
        const observerOptions = {
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.hasAnimated = true;
                    this.animateCounters();
                    observer.disconnect();
                }
            });
        }, observerOptions);
        
        const statsSection = document.querySelector('.stats');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }
    
    animateCounters() {
        this.counters.forEach(counter => {
            const target = counter.getAttribute('data-target');
            if (target) {
                new CounterAnimation(counter, target);
            }
        });
    }
}

/* ============================================
   EFEITOS DE PARALLAX E MOVIMENTO
   ============================================ */
class ParallaxEffects {
    constructor() {
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            this.updateParallax();
        });
        
        // Atualizar posição inicial
        this.updateParallax();
    }
    
    updateParallax() {
        const scrollY = window.pageYOffset;
        const heroVisual = document.querySelector('.hero-visual');
        
        if (heroVisual) {
            const speed = 0.5;
            heroVisual.style.transform = `translateY(${scrollY * speed}px)`;
        }
        
        // Efeito nos orbs de fundo
        const orbs = document.querySelectorAll('.gradient-orb');
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.1;
            orb.style.transform = `translate(${scrollY * speed * 0.1}px, ${scrollY * speed * 0.1}px)`;
        });
    }
}


/* ============================================
   EFEITOS DE GLOW E INTERATIVIDADE
   ============================================ */
class GlowEffects {
    constructor() {
        this.init();
    }
    
    init() {
        // Efeito de mouse tracking nos cards
        const cards = document.querySelectorAll('.feature-card, .portfolio-item, .stat-card, .pricing-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                this.handleCardGlow(e, card);
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.setProperty('--mouse-x', '50%');
                card.style.setProperty('--mouse-y', '50%');
            });
        });
    }
    
    handleCardGlow(e, card) {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
    }
}

/* ============================================
   SMOOTH SCROLL PARA LINKS INTERNOS
   ============================================ */
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#' || href === '#hero') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offsetTop = target.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

/* ============================================
   EFEITO DE CURSOR PERSONALIZADO (OPCIONAL)
   ============================================ */
class CustomCursor {
    constructor() {
        this.cursor = null;
        this.init();
    }
    
    init() {
        // Criar cursor personalizado apenas em desktop
        if (window.innerWidth > 768) {
            this.cursor = document.createElement('div');
            this.cursor.className = 'custom-cursor';
            document.body.appendChild(this.cursor);
            
            document.addEventListener('mousemove', (e) => {
                this.updateCursor(e);
            });
            
            // Efeito em elementos interativos
            const interactiveElements = document.querySelectorAll('a, button, .portfolio-item');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    this.cursor.classList.add('cursor-hover');
                });
                el.addEventListener('mouseleave', () => {
                    this.cursor.classList.remove('cursor-hover');
                });
            });
        }
    }
    
    updateCursor(e) {
        if (this.cursor) {
            this.cursor.style.left = `${e.clientX}px`;
            this.cursor.style.top = `${e.clientY}px`;
        }
    }
}

/* ============================================
   ANIMAÇÃO DE TEXTO GRADIENTE
   ============================================ */
class TextGradientAnimation {
    constructor() {
        this.init();
    }
    
    init() {
        const gradientTexts = document.querySelectorAll('.title-main, .logo-accent');
        
        gradientTexts.forEach(text => {
            // Criar animação de gradiente
            setInterval(() => {
                const hue = Math.random() * 60 + 240; // Entre roxo e azul
                text.style.filter = `hue-rotate(${hue}deg)`;
            }, 5000);
        });
    }
}

/* ============================================
   LAZY LOADING DE IMAGENS
   ============================================ */
class LazyLoading {
    constructor() {
        this.init();
    }
    
    init() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback para navegadores antigos
            images.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
            });
        }
    }
}

/* ============================================
   PERFORMANCE OPTIMIZATION
   ============================================ */
class PerformanceOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        // Debounce para eventos de scroll
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    // Atualizar efeitos de scroll aqui
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        // Preload de recursos críticos
        this.preloadResources();
    }
    
    preloadResources() {
        const criticalImages = document.querySelectorAll('.hero img, .portfolio img');
        criticalImages.forEach(img => {
            if (img.src) {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = img.src;
                document.head.appendChild(link);
            }
        });
    }
}

/* ============================================
   FAQ ACCORDION
   ============================================ */
class FAQAccordion {
    constructor() {
        this.faqItems = document.querySelectorAll('.faq-item');
        this.init();
    }
    
    init() {
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Fechar todos os outros itens
                this.faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherQuestion = otherItem.querySelector('.faq-question');
                        otherQuestion.setAttribute('aria-expanded', 'false');
                    }
                });
                
                // Toggle do item atual
                if (isActive) {
                    item.classList.remove('active');
                    question.setAttribute('aria-expanded', 'false');
                } else {
                    item.classList.add('active');
                    question.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }
}

/* ============================================
   TESTIMONIALS CAROUSEL
   ============================================ */
class TestimonialsCarousel {
    constructor() {
        this.track = document.querySelector('.testimonials-track');
        this.cards = document.querySelectorAll('.testimonial-card');
        if (this.track && this.cards.length > 0) {
            this.init();
        }
    }
    
    init() {
        // Calcular largura total do track
        const cardWidth = this.cards[0].offsetWidth;
        const gap = parseInt(getComputedStyle(this.track).gap) || 24;
        const totalWidth = (cardWidth + gap) * this.cards.length;
        
        // Ajustar velocidade da animação baseada no número de cards
        const duration = this.cards.length * 10; // 10 segundos por card
        this.track.style.animationDuration = `${duration}s`;
        
        // Resetar posição quando animação completar (usando evento de animação)
        this.track.addEventListener('animationiteration', () => {
            // A animação CSS já faz o loop, mas garantimos suavidade
            this.track.style.animationPlayState = 'running';
        });
    }
}

/* ============================================
   INICIALIZAÇÃO
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar todas as funcionalidades
    new ScrollAnimations();
    new ParallaxEffects();
    new GlowEffects();
    new SmoothScroll();
    new CustomCursor();
    new TextGradientAnimation();
    new LazyLoading();
    new PerformanceOptimizer();
    new FAQAccordion();
    new TestimonialsCarousel();
    
    // Adicionar classe loaded ao body
    document.body.classList.add('loaded');
    
    // Log de inicialização
    console.log('🚀 Noir Frontend - Landing Page carregada com sucesso!');
});

/* ============================================
   UTILITÁRIOS
   ============================================ */

// Prevenir comportamento padrão de arrastar imagens
document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

// Detectar redução de movimento (acessibilidade)
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
}

// Adicionar classe para dispositivos touch
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
}

