import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, ArrowUpRight, Menu, X, Globe, Zap, Box, Layers, Check, Palette, Code, Layout, Play, GitBranch, Sparkles } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

const heroBgImage = new URL('./assets/bg-hero.jpg', import.meta.url).href;
const uxUiShowcaseImage = new URL('./assets/Fintech Platform Website Design Concept!.jpeg', import.meta.url).href;
const webDevShowcaseImage = new URL('./assets/code aesthetic.jpeg', import.meta.url).href;
const redesignShowcaseImage = new URL('./assets/Website Design 🌐 Cryptocurrency Landing Page - Website Design in 2024 _ Website.jpeg', import.meta.url).href;
const systemDevShowcaseImage = new URL('./assets/Ananto Nugroho Putra.jpeg', import.meta.url).href;

// --- Helper Components ---

const Button = ({ children, variant = 'primary', className = '', onClick }: { children?: React.ReactNode, variant?: 'primary' | 'secondary', className?: string, onClick?: () => void }) => {
  return (
    <button
      onClick={onClick}
      className={`
        group relative px-8 py-4 overflow-hidden rounded-full transition-all duration-500 ease-out
        ${variant === 'primary' 
          ? 'bg-white text-black hover:text-white' 
          : 'bg-transparent text-white border border-white/20 hover:border-[#FF4D00]'}
        ${className}
      `}
    >
      <span className={`
        absolute inset-0 w-full h-full transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100
        ${variant === 'primary' ? 'bg-[#FF4D00]' : 'bg-[#FF4D00]/10'}
      `}></span>
      <span className={`
        absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 duration-delay-100
        ${variant === 'primary' ? 'shadow-[0_0_30px_rgba(255,77,0,0.6)]' : ''}
      `}></span>
      <span className="relative z-10 flex items-center gap-2 font-medium tracking-wide">
        {children}
      </span>
    </button>
  );
};

const SectionHeading = ({ children, number }: { children?: React.ReactNode, number: string }) => {
  return (
    <div className="flex flex-col mb-8 md:mb-12 lg:mb-16 opacity-0 reveal-on-scroll">
      <span className="text-[#FF4D00] font-mono text-xs md:text-sm tracking-widest mb-2 md:mb-4 opacity-80">{number}</span>
      <h2 className="text-2xl md:text-4xl lg:text-6xl font-light tracking-tight leading-tight">{children}</h2>
    </div>
  );
};

// --- Main Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = useMemo(
    () => [
      { to: '/', label: 'Home' },
      { to: '/about', label: 'About Us' },
      { to: '/services', label: 'Services' },
      { to: '/pricing', label: 'Price' },
      { to: '/contact', label: 'Contact Me' },
    ],
    []
  );

  return (
    <nav 
      className={`fixed top-4 md:top-6 left-0 right-0 z-50 transition-all duration-500 px-3 md:px-0`}
    >
      <div 
        className={`
          flex items-center justify-between px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl border mx-auto
          transition-[width,background-color,box-shadow,backdrop-filter] duration-700 ease-out
          ${isScrolled 
            ? 'bg-black/80 backdrop-blur-lg border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)]'
            : 'bg-transparent border-transparent'}
        `}
        style={{ width: isScrolled ? 'min(1100px, 92vw)' : '100%', maxWidth: '100%' }}
      >
        <Link to="/" className="text-xl font-bold tracking-widest z-50">
          6CAT<span className="text-[#FF4D00]">.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
                <Link 
                  key={link.to} 
                  to={link.to}
                  className="text-xs font-semibold tracking-[0.2em] uppercase transition-colors duration-300"
                >
                  <span className={isActive ? 'text-[#FF4D00]' : 'text-white/60 hover:text-white'}>
                    {link.label}
                  </span>
                </Link>
            );
          })}
        </div>

        <div className="hidden md:block">
           <Link to="/contact" className="text-sm font-semibold text-white border border-white/40 px-6 py-3 rounded-full hover:border-[#FF4D00] hover:text-[#FF4D00] transition-all duration-300">
             LET'S TALK
           </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav Overlay - Outside navbar container for proper fixed positioning */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-[#050505] z-40 flex flex-col items-center justify-center space-y-6 px-6">
          {navLinks.map((link) => (
            <Link 
              key={link.to} 
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-light hover:text-[#FF4D00] transition-colors py-2"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLImageElement>(null);
  const heroWordTimelineRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const codeLines = useMemo(
    () => [
      '<!doctype html>',
      '<section class="hero" data-brand="6CAT">',
      '  <h1>Make the new ways</h1>',
      '  <p>for website.</p>',
      '  <button>See our work</button>',
      '</section>',
    ],
    []
  );
  const [codeLineIndex, setCodeLineIndex] = useState(0);
  const [codeCharIndex, setCodeCharIndex] = useState(0);
  const [typedLines, setTypedLines] = useState<string[]>(['']);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Config
    let frame = 0;
    const particles: any[] = [];
    const particleCount = 40; // Reduced for minimal clean look
    const stars: { x: number; y: number; r: number; alpha: number; twinkle: number }[] = [];
    
    const createStars = () => {
      stars.length = 0;
      const count = Math.min(220, Math.max(120, Math.round((width * height) / 12000)));
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.2 + 0.2,
          alpha: Math.random() * 0.6 + 0.2,
          twinkle: Math.random() * Math.PI * 2,
        });
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      createStars();
    };
    window.addEventListener('resize', resize);
    resize();

    class Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      alpha: number;
      life: number;

      constructor() {
        this.x = width / 2 + (Math.random() - 0.5) * 4; // Start near center laser
        this.y = -Math.random() * height; // Start above view
        this.size = Math.random() * 2 + 0.6;
        this.speedY = Math.random() * 1.6 + 1.2;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.alpha = Math.random() * 0.5 + 0.4;
        this.life = height / this.speedY + Math.random() * 120;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.life--;

        // Reset if off screen or dead
        if (this.y > height + 20 || this.life < 0) {
          this.y = -Math.random() * height * 0.4 - 20;
          this.x = width / 2 + (Math.random() - 0.5) * 10;
          this.speedY = Math.random() * 1.6 + 1.2;
          this.life = height / this.speedY + Math.random() * 120;
        }
      }

      draw() {
        ctx!.fillStyle = `rgba(255, 77, 0, ${this.alpha})`;
        ctx!.shadowBlur = 26;
        ctx!.shadowColor = '#FF4D00';
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.shadowBlur = 0;
      }
    }

    // Init Particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const drawGalaxyBackground = (f: number) => {
      const gradient = ctx!.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#080503');
      gradient.addColorStop(0.45, '#0b0604');
      gradient.addColorStop(1, '#020202');
      ctx!.fillStyle = gradient;
      ctx!.fillRect(0, 0, width, height);

      ctx!.save();
      ctx!.globalCompositeOperation = 'screen';
      const nebula = ctx!.createRadialGradient(
        width * 0.5,
        height * 0.25,
        0,
        width * 0.5,
        height * 0.25,
        Math.max(width, height) * 0.85
      );
      nebula.addColorStop(0, 'rgba(255, 120, 60, 0.16)');
      nebula.addColorStop(0.45, 'rgba(180, 70, 25, 0.12)');
      nebula.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx!.fillStyle = nebula;
      ctx!.fillRect(0, 0, width, height);
      ctx!.restore();

      stars.forEach((s) => {
        const flicker = s.alpha + Math.sin(f * 0.02 + s.twinkle) * 0.12;
        ctx!.fillStyle = `rgba(255, 255, 255, ${Math.max(0, Math.min(1, flicker))})`;
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fill();
      });
    };

      const drawLaser = () => {
      // Main beam
      const centerX = width / 2;
      const flicker = Math.random() * 0.2 + 0.8;
      const widthFlicker = Math.random() * 2 + 1;

      // Core white-ish beam
      ctx!.beginPath();
      ctx!.moveTo(centerX, 0);
      ctx!.lineTo(centerX, height);
        ctx!.strokeStyle = `rgba(255, 255, 255, ${0.22 * flicker})`;
        ctx!.lineWidth = 2;
        ctx!.stroke();

      // Orange Glow beam
      ctx!.beginPath();
      ctx!.moveTo(centerX, 0);
      ctx!.lineTo(centerX, height);
        ctx!.strokeStyle = `rgba(255, 77, 0, ${0.14 * flicker})`;
        ctx!.lineWidth = widthFlicker + 16;
        ctx!.shadowBlur = 70;
        ctx!.shadowColor = '#FF4D00';
        ctx!.stroke();
        ctx!.shadowBlur = 0;
      };




    const animate = () => {
      drawGalaxyBackground(frame);
      drawLaser();

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      frame++;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    if (!window.gsap || !heroBgRef.current) return;
    const tween = window.gsap.fromTo(
      heroBgRef.current,
      { scale: 1.05 },
      {
        scale: 1.15,
        duration: 22,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        transformOrigin: 'center',
      }
    );

    return () => {
      tween.kill();
    };
  }, []);

  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    const maxOffset = 5;
    const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

    const handleMove = (event: MouseEvent) => {
      const rect = heroEl.getBoundingClientRect();
      const relX = event.clientX - rect.left - rect.width / 2;
      const relY = event.clientY - rect.top - rect.height / 2;
      const offsetX = clamp((relX / (rect.width / 2)) * maxOffset, -maxOffset, maxOffset);
      const offsetY = clamp((relY / (rect.height / 2)) * maxOffset, -maxOffset, maxOffset);
      heroEl.style.setProperty('--accent-x', `${offsetX.toFixed(2)}px`);
      heroEl.style.setProperty('--accent-y', `${offsetY.toFixed(2)}px`);
    };

    const handleLeave = () => {
      heroEl.style.setProperty('--accent-x', '0px');
      heroEl.style.setProperty('--accent-y', '0px');
    };

    heroEl.addEventListener('mousemove', handleMove);
    heroEl.addEventListener('mouseleave', handleLeave);

    return () => {
      heroEl.removeEventListener('mousemove', handleMove);
      heroEl.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  useEffect(() => {
    if (codeLineIndex >= codeLines.length) {
      const resetId = window.setTimeout(() => {
        setTypedLines(['']);
        setCodeLineIndex(0);
        setCodeCharIndex(0);
      }, 1600);
      return () => window.clearTimeout(resetId);
    }

    const currentLine = codeLines[codeLineIndex];

    if (codeCharIndex < currentLine.length) {
      const typeId = window.setTimeout(() => {
        setTypedLines((prev) => {
          const next = [...prev];
          next[codeLineIndex] = currentLine.slice(0, codeCharIndex + 1);
          return next;
        });
        setCodeCharIndex(codeCharIndex + 1);
      }, 40);
      return () => window.clearTimeout(typeId);
    }

    const nextLineId = window.setTimeout(() => {
      setTypedLines((prev) => {
        const next = [...prev];
        next[codeLineIndex] = currentLine;
        if (!next[codeLineIndex + 1]) next[codeLineIndex + 1] = '';
        return next;
      });
      setCodeLineIndex(codeLineIndex + 1);
      setCodeCharIndex(0);
    }, 220);

    return () => window.clearTimeout(nextLineId);
  }, [codeCharIndex, codeLineIndex, codeLines]);


  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (window.gsap) {
        const tl = window.gsap.timeline();
        
        const brandBgText = document.querySelector(".brand-bg-text");
        if (brandBgText) {
          window.gsap.to(brandBgText, {
              yPercent: 20,
              ease: "none",
              scrollTrigger: {
                  trigger: ".hero-section",
                  start: "top top",
                  end: "bottom top",
                  scrub: true
              }
          });
        }

        // Main Text Reveal
        tl.fromTo(".hero-line", 
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.5, stagger: 0.2, ease: "power4.out" }
        );

    }
  }, []);

  useEffect(() => {
    if (window.gsap) {
      const words = window.gsap.utils.toArray('.home-hero-word') as HTMLElement[];
      if (words.length) {
        window.gsap.set(words, { opacity: 0, y: 20 });
        window.gsap.to(words, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.08,
          delay: 0.2,
        });
        window.gsap.set(words, { color: '#ffffff' });
        const tl = window.gsap.timeline({ repeat: -1, repeatDelay: 0.2 });
        words.forEach((word: HTMLElement) => {
          tl.to(word, { color: '#FF4D00', duration: 0.6, ease: 'power2.out' })
            .to(word, { color: '#ffffff', duration: 0.6, ease: 'power2.inOut' }, '+=0.4');
        });
        heroWordTimelineRef.current = tl;
      }
    }

    return () => {
      if (heroWordTimelineRef.current) {
        heroWordTimelineRef.current.kill();
        heroWordTimelineRef.current = null;
      }
    };
  }, []);



  return (
    <section ref={heroRef} id="home" className={`hero-section relative w-full h-screen overflow-hidden flex items-center justify-center transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-0 z-0">
        <img 
          ref={heroBgRef} 
          src={heroBgImage} 
          alt="Hero background" 
          className={`w-full h-full object-contain transition-opacity duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-90" />
      <div className="absolute inset-x-0 bottom-0 z-[1] pointer-events-none flex justify-center px-4 md:px-0">
        <div className="hero-code-panel relative h-[18vh] md:h-[24vh] lg:h-[28vh] overflow-hidden rounded-t-2xl md:rounded-t-3xl bg-black/85 border border-white/10 shadow-[0_0_40px_rgba(255,77,0,0.25)] md:shadow-[0_0_60px_rgba(255,77,0,0.35)] w-full md:w-[70vw] lg:w-[60vw]">
          <div className="absolute top-0 left-0 right-0 h-8 md:h-10 border-b border-white/10 flex items-center px-3 md:px-4 gap-1.5 md:gap-2">
            <span className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-white/20"></span>
            <span className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-white/20"></span>
            <span className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-white/20"></span>
          </div>
          <div className="absolute top-10 md:top-12 left-0 right-0 bottom-0 px-3 md:px-5 pb-4 md:pb-6 font-mono text-[9px] md:text-[11px] lg:text-xs text-white/85">
            {typedLines.map((line, index) => (
              <div key={`${index}-${line}`} className="whitespace-pre leading-6">
                {line}
                {index === codeLineIndex && codeLineIndex < codeLines.length ? (
                  <span className="ml-0.5 text-[#FF4D00] animate-pulse">|</span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-black z-[2] pointer-events-none"></div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 md:px-6 max-w-[1330px] -mt-20 md:-mt-28 lg:-mt-36">
        <div className="overflow-visible pb-1">
              <div className="hero-line text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] text-white/60 mb-4 md:mb-6 text-center">
                6CAT AGENCY 2026
              </div>
          <h2 className="hero-line text-[clamp(1.9rem,7.2vw,4.25rem)] 2xl:text-[clamp(1.8rem,5.5vw,5.5rem)] font-semibold text-white tracking-tight leading-[1.15] md:leading-[1.2] mb-6 md:mb-10">
                <span className="home-hero-word">We</span>{' '}
                <span className="home-hero-word">think</span>{' '}
                <span className="home-hero-word">beyond</span>{' '}
                <span className="home-hero-word">design.</span>
                <br />
                <span className="home-hero-word">We</span>{' '}
                <span className="home-hero-word">build</span>{' '}
                <span className="home-hero-word">beyond</span>{' '}
                <span className="home-hero-word">development.</span>
              </h2>
        </div>
        
        <div className="hero-line mt-8 md:mt-12 flex justify-center">
             <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#FF4D00] to-orange-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                 <button data-cursor-expand className="relative px-6 md:px-8 py-3 md:py-4 bg-black rounded-full leading-none flex items-center divide-x divide-neutral-800 text-sm md:text-base">
                    <span className="flex items-center space-x-3 md:space-x-5">
                    <span className="pr-4 md:pr-6 text-gray-100">See our work</span>
                    </span>
                    <span className="pl-4 md:pl-6 text-[#FF4D00] group-hover:text-white transition duration-200">
                        <ArrowRight size={18} className="md:w-5 md:h-5" />
                    </span>
                </button>
             </div>
        </div>
      </div>

    </section>
  );
};

const About = () => {
    return (
        <section id="about" className="py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-12 max-w-[1330px] mx-auto min-h-[60vh] md:min-h-[80vh] flex items-center">
            <div className="space-y-8 md:space-y-12 w-full">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8">
                    <div className="space-y-3 md:space-y-4">
                        <div className="text-[10px] md:text-xs uppercase tracking-[0.25em] md:tracking-[0.3em] text-[#FF4D00]">01</div>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight">About 6CAT</h2>
                    </div>
                    <div className="max-w-2xl space-y-3 md:space-y-4 text-white/70 text-sm md:text-base">
                        <p>
                            We are a digital creative agency that exists to reshape the internet.
                            We don’t just build websites; we engineer digital experiences that command attention.
                        </p>
                        <p>
                            Merging high-end aesthetics with cutting-edge technology, 6CAT bridges the gap
                            between art and functionality.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    <div className="card-hover rounded-xl md:rounded-2xl border border-white/10 bg-white/5 p-4 md:p-6 space-y-4 md:space-y-6">
                        <div className="flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.25em] md:tracking-[0.3em] text-white/60">
                            Professional work mode
                        </div>
                        <p className="text-xs md:text-sm text-white/70 leading-relaxed">
                            Professional-grade execution with clear process, calm communication,
                            and reliable delivery in any session.
                        </p>
                        <div className="flex items-center gap-3 text-[10px] md:text-xs text-white/60">
                            <div className="h-4 md:h-5 w-8 md:w-10 rounded-full bg-white/10 flex items-center">
                                <span className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-white/60 ml-1"></span>
                            </div>
                            Game Mode
                        </div>
                    </div>

                    <div className="card-hover rounded-xl md:rounded-2xl border border-white/10 bg-white/5 p-4 md:p-6 flex items-center justify-center">
                        <div className="relative w-full h-[180px] md:h-[220px] rounded-xl md:rounded-2xl overflow-hidden">
                            <img
                                src={new URL('./assets/hero1.jpeg', import.meta.url).href}
                                alt="Team"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/15"></div>
                            <div className="absolute left-3 md:left-4 bottom-3 md:bottom-4 text-[10px] md:text-xs uppercase tracking-[0.25em] md:tracking-[0.3em] text-white/70">
                                Private & Group Sessions
                            </div>
                        </div>
                    </div>

                    <div className="card-hover rounded-xl md:rounded-2xl border border-white/10 bg-white/5 p-4 md:p-6 space-y-4 md:space-y-5 md:col-span-2 lg:col-span-1">
                        <div className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white">100+</div>
                        <p className="text-xs md:text-sm text-white/70">
                            Specialists ready to boost your growth
                            across design, systems, and technology.
                        </p>
                        <div className="space-y-2 md:space-y-3">
                            {[
                                { label: 'Beginner', value: 0.6 },
                                { label: 'Intermediate', value: 0.75 },
                                { label: 'Advanced', value: 0.9 },
                            ].map((item) => (
                                <div key={item.label} className="flex items-center gap-3 md:gap-4 text-[10px] md:text-xs text-white/60">
                                    <span className="w-20 md:w-24">{item.label}</span>
                                    <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
                                        <span className="block h-full bg-white/70" style={{ width: `${item.value * 100}%` }}></span>
                                    </div>
                                    <span className="w-5 md:w-6 text-right">{Math.round(item.value * 100)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
                    {[
                        { value: '12 000+', label: 'Hours delivered annually' },
                        { value: '89%', label: 'Client retention rate' },
                        { value: '1,200+', label: 'Active collaborations' },
                        { value: '125+', label: 'Experiments shipped' },
                    ].map((item) => (
                        <div key={item.label} className="space-y-1 md:space-y-2">
                            <div className="text-xl md:text-2xl lg:text-3xl font-semibold text-white">{item.value}</div>
                            <div className="text-[9px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/50">{item.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Services = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    return (
        <section id="services" className="py-16 md:py-24 lg:py-32 bg-neutral-900/20 min-h-[60vh] md:min-h-[80vh] flex items-center">
            <div className="max-w-[1330px] mx-auto px-4 md:px-6 lg:px-12 w-full">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6 mb-4 md:mb-6">
                  <SectionHeading number="02">Our Services</SectionHeading>
                  <Link
                    to="/services"
                    data-cursor-expand
                    className="group relative inline-flex items-center gap-2 md:gap-3 px-5 md:px-8 py-2.5 md:py-3 border border-white/20 rounded-full text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em]"
                  >
                    <span className="absolute inset-0 rounded-full bg-[#FF4D00]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                    <span className="relative text-white">View More</span>
                  </Link>
                </div>
                <p className="text-sm md:text-lg text-neutral-400 max-w-2xl -mt-2 md:-mt-4 mb-8 md:mb-12">
                  Clear problems. Clear thinking. Confident solutions.
                </p>

                <div className="space-y-3 md:space-y-5">
                        {[
                          {
                            title: 'UX / UI Design',
                            summary: 'Clarity, flow, and intention that keep users moving.',
                            detail:
                              'We map user journeys, build interface hierarchy, and design systems that stay consistent across every screen.',
                          },
                          {
                            title: 'Web Development',
                            summary: 'Fast, stable builds that last and scale.',
                            detail:
                              'Clean architecture, performance optimization, and SEO/accessibility foundations that keep your site reliable.',
                          },
                          {
                            title: 'Re-design',
                            summary: 'Fix what matters without losing what already works.',
                            detail:
                              'We audit, refine, and refresh with purpose while reducing risk and protecting existing value.',
                          },
                          {
                            title: 'System Development',
                            summary: 'Tools and workflows that remove bottlenecks.',
                            detail:
                              'We map systems, build dashboards, and design data flows that scale as your business grows.',
                          },
                        ].map((service, index) => {
                          const isActive = activeIndex === index;
                          return (
                            <button
                              key={service.title}
                              type="button"
                              onClick={() => setActiveIndex(isActive ? null : index)}
                              className="card-hover w-full text-left rounded-xl md:rounded-2xl border border-white/10 bg-white/5 p-4 md:p-6 transition-all duration-500"
                            >
                              <div className="flex items-center justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                  <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/50">Service</div>
                                  <h3 className="text-lg md:text-2xl lg:text-3xl font-semibold mt-2 md:mt-3">
                                    {service.title}
                                  </h3>
                                  <p className="text-xs md:text-sm text-white/70 mt-2 md:mt-3 max-w-xl">
                                    {service.summary}
                                  </p>
                                </div>
                                <div className="text-xl md:text-2xl text-white/40 flex-shrink-0">{isActive ? '−' : '+'}</div>
                              </div>
                              <div
                                className={`overflow-hidden transition-all duration-500 ${
                                  isActive ? 'max-h-40 opacity-100 mt-3 md:mt-4' : 'max-h-0 opacity-0'
                                }`}
                              >
                                <p className="text-xs md:text-sm text-white/70 leading-relaxed">
                                  {service.detail}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                </div>
            </div>
        </section>
    );
};

const WorkCard = ({ title, category, img, className = '' }: { title: string, category: string, img: string, className?: string }) => {
    return (
        <div className={`group card-hover relative w-full overflow-hidden rounded-xl md:rounded-2xl cursor-pointer reveal-on-scroll break-inside-avoid mb-4 md:mb-8 ${className}`}>
            <img src={img} alt={title} className="block w-full h-auto" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/70"></div>
            <div className="absolute inset-0 z-10 p-4 md:p-6 flex flex-col justify-between">
                <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-y-2 group-hover:translate-y-0">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#FF4D00] flex items-center justify-center text-white">
                        <ArrowUpRight size={16} className="md:w-[18px] md:h-[18px]" />
                    </div>
                </div>

                <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-[#FF4D00] text-[10px] md:text-xs font-mono uppercase tracking-widest mb-1 md:mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{category}</span>
                    <h3 className="text-lg md:text-2xl lg:text-3xl font-semibold text-white mb-1">{title}</h3>
                </div>
            </div>

            <div className="absolute inset-0 border-2 border-[#FF4D00] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl md:rounded-2xl"></div>
        </div>
    );
};

const SelectedWorks = () => {
    const works = [
        {
            title: "Neon Horizon",
            category: "Web Design / Development",
            img: "https://i.pinimg.com/1200x/1f/ef/a8/1fefa8e20a03577e3fe84b66f84a77bf.jpg",
        },
        {
            title: "Cyber Punk Inc.",
            category: "Brand Identity",
            img: "https://i.pinimg.com/736x/9c/4d/28/9c4d28df158e14c642449d3442820969.jpg",
        },
        {
            title: "Orbital Finance",
            category: "Fintech / UI UX",
            img: "https://i.pinimg.com/736x/bc/e1/c8/bce1c85e6938b3f5a387014273b353cf.jpg",
        },
        {
            title: "Echo Systems",
            category: "Motion Design",
            img: "https://i.pinimg.com/1200x/af/e0/48/afe048b7b98f905aab940a60a25a1253.jpg",
        },
        {
            title: "Spectral Grid",
            category: "Editorial / Layout",
            img: "https://i.pinimg.com/1200x/41/35/2d/41352d38d7e939a2da7a3878206c4569.jpg",
        },
        {
            title: "Citrus Form",
            category: "Product / Visual",
            img: "https://i.pinimg.com/1200x/91/c6/71/91c6711c92bc16571b44dd48e4542330.jpg",
        },
    ];

    return (
        <section id="work" className="py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-12 max-w-[1330px] mx-auto">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-6 mb-8 md:mb-12">
                <SectionHeading number="03">Selected Works</SectionHeading>
                <div className="mb-0">
                    <Link
                      to="/projects"
                      data-cursor-expand
                      className="group relative inline-flex items-center gap-2 md:gap-3 px-5 md:px-8 py-2.5 md:py-3 border border-white/20 rounded-full text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em]"
                    >
                      <span className="absolute inset-0 rounded-full bg-[#FF4D00]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                      <span className="relative text-white">View Project</span>
                    </Link>
                </div>
             </div>

            <div className="columns-1 md:columns-2 gap-4 md:gap-8 [column-fill:balance]">
                {works.map((work, index) => (
                    <WorkCard
                        key={work.title}
                        title={work.title}
                        category={work.category}
                        img={work.img}
                        className="inline-block align-top"
                    />
                ))}
            </div>
        </section>
    );
};

const PricingSection = () => {
    const packages = [
        {
            name: 'Landing Page',
            price: '฿4,500',
            highlight: true,
            details: [
                'Full custom design, one of a kind',
                'Ideal for launches or campaigns',
                'Fast delivery, ready to go',
            ],
        },
        {
            name: 'Full Website',
            price: '฿14,900',
            details: [
                'Best for multi-page business sites',
                'Scalable structure for growth',
                'Tailored to your brand',
            ],
        },
        {
            name: 'Full Website + CMS',
            price: '฿22,900',
            details: [
                'Easy content management',
                'Supports articles, news, products',
                'Basic training & guide included',
            ],
        },
        {
            name: 'CRM System',
            price: 'Call price',
            details: [
                'Flow tailored to your business',
                'Integrations with your data',
                'Built to scale with you',
            ],
        },
    ];

    return (
        <section className="py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-12 max-w-[1330px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-6 mb-10 md:mb-14">
                <div>
                    <SectionHeading number="04">Pricing</SectionHeading>
                    <div className="-mt-6 md:-mt-8 max-w-lg text-sm md:text-base text-white/70">
                        We design from scratch, so your site is truly unique.
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {packages.map((pkg) => (
                    <div
                        key={pkg.name}
                        className={`relative flex flex-col h-full min-h-[360px] md:min-h-[400px] rounded-2xl border p-6 md:p-7 transition-all duration-500 card-hover ${
                            pkg.highlight
                                ? 'border-[#FF4D00]/60 bg-gradient-to-br from-[#FF4D00]/20 via-white/5 to-transparent shadow-[0_0_40px_rgba(255,77,0,0.25)]'
                                : 'border-white/10 bg-white/5'
                        }`}
                    >
                        {pkg.highlight && (
                            <div className="absolute -top-3 right-4 text-[10px] uppercase tracking-[0.25em] px-3 py-1 rounded-full border border-[#FF4D00]/50 bg-[#FF4D00]/10 text-[#FF4D00]">
                                Recommended
                            </div>
                        )}
                        <div className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-white/60">Package</div>
                        <h3 className="mt-3 text-xl md:text-2xl font-semibold text-white">
                            {pkg.name}
                        </h3>
                        <div className="mt-4 text-2xl md:text-3xl font-semibold text-white">
                            {pkg.price}
                        </div>
                        <div className="mt-4 space-y-2 text-xs md:text-sm text-white/70">
                            {pkg.details.map((detail) => (
                                <div key={detail} className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#FF4D00]/70 flex-shrink-0"></span>
                                    <span>{detail}</span>
                                </div>
                            ))}
                        </div>
                        <Link
                            to="/contact"
                            className={`mt-auto inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                                pkg.highlight
                                    ? 'border-[#FF4D00] text-[#FF4D00] hover:bg-black hover:text-white'
                                    : 'border-white/20 text-white/70 hover:bg-black hover:text-white'
                            }`}
                        >
                            Contact us
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
};

const CTA = () => {
    return (
        <section id="contact" className="py-16 md:py-24 lg:py-32 px-4 md:px-6 bg-[#0a0a0a] relative overflow-hidden">
             {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#FF4D00] rounded-full filter blur-[100px] md:blur-[150px] opacity-10 pointer-events-none"></div>
            
            <div className="max-w-[1330px] mx-auto text-center relative z-10">
                <h2 className="text-[clamp(2rem,8vw,5rem)] font-bold tracking-tighter mb-6 md:mb-8 text-white leading-[1.1]">
                    Let's build something <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500 hover:to-[#FF4D00] transition-all duration-700 cursor-default">powerful.</span>
                </h2>
                <p className="text-base md:text-xl text-neutral-400 mb-8 md:mb-12 max-w-2xl mx-auto px-4">
                    Ready to elevate your digital presence? We are currently accepting new projects for Q4 2024.
                </p>
                <Link
                  to="/contact"
                  data-cursor-expand
                  className="group relative inline-flex items-center gap-2 md:gap-3 px-6 md:px-10 py-3 md:py-4 border border-white/20 rounded-full text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em]"
                >
                  <span className="absolute inset-0 rounded-full bg-[#FF4D00]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  <span className="relative text-white">Start a Project</span>
                </Link>
            </div>
        </section>
    );
};

const Footer = () => {
    const renderMarqueeText = (text: string) => (
        <span>
            {Array.from(text).map((char, index) => (
                <span key={`${char}-${index}`} className="marquee-letter">
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </span>
    );

    return (
        <>
        <div className="h-[20vh] w-full bg-[#FF4D00] flex items-center">
            <div className="marquee">
                <div className="marquee-track">
                    <div className="flex items-center gap-1 pr-2 text-white font-semibold uppercase tracking-[0.005em] text-[20vh] leading-none whitespace-nowrap h-full">
                        {renderMarqueeText('6CAT AGENCY IN YOUR DESIGN.')}
                        {renderMarqueeText('6CAT AGENCY IN YOUR DESIGN.')}
                        {renderMarqueeText('6CAT AGENCY IN YOUR DESIGN.')}
                        {renderMarqueeText('6CAT AGENCY IN YOUR DESIGN.')}
                    </div>
                    <div className="flex items-center gap-1 pr-2 text-white font-semibold uppercase tracking-[0.005em] text-[20vh] leading-none whitespace-nowrap h-full" aria-hidden="true">
                        {renderMarqueeText('6CAT AGENCY IN YOUR DESIGN.')}
                        {renderMarqueeText('6CAT AGENCY IN YOUR DESIGN.')}
                        {renderMarqueeText('6CAT AGENCY IN YOUR DESIGN.')}
                        {renderMarqueeText('6CAT AGENCY IN YOUR DESIGN.')}
                    </div>
                </div>
            </div>
        </div>
        <footer className="py-8 md:py-12 px-4 md:px-6 lg:px-12 border-t border-white/5 bg-black text-xs md:text-sm">
            <div className="max-w-[1330px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
                <div className="text-neutral-500 text-center md:text-left order-2 md:order-1">
                    &copy; 2024 6CAT AGENCY. All rights reserved.
                </div>
                <div className="flex gap-6 md:gap-8 order-1 md:order-2">
                    <a href="#" className="text-white hover:text-[#FF4D00] transition-colors py-2">Instagram</a>
                    <a href="#" className="text-white hover:text-[#FF4D00] transition-colors py-2">Twitter</a>
                    <a href="#" className="text-white hover:text-[#FF4D00] transition-colors py-2">LinkedIn</a>
                </div>
                <div className="text-neutral-600 order-3 hidden md:block">
                    Made with energy.
                </div>
            </div>
        </footer>
        </>
    );
};

const SectionIndicator = () => {
  const sections = useMemo(
    () => [
      { id: 'home', label: 'Home' },
      { id: 'about', label: 'About' },
      { id: 'services', label: 'Services' },
      { id: 'work', label: 'Work' },
      { id: 'contact', label: 'Contact' },
    ],
    []
  );

  const [activeId, setActiveId] = useState('home');
  const activeRef = useRef('home');

  useEffect(() => {
    const elements = sections
      .map((section) => ({
        id: section.id,
        el: document.getElementById(section.id),
      }))
      .filter((entry): entry is { id: string; el: HTMLElement } => Boolean(entry.el));

    if (!elements.length) return;

    let ticking = false;

    const updateActive = () => {
      ticking = false;
      const threshold = window.innerHeight * 0.35;
      let currentId = elements[0].id;

      elements.forEach(({ id, el }) => {
        const top = el.getBoundingClientRect().top;
        if (top <= threshold) {
          currentId = id;
        }
      });

      if (currentId !== activeRef.current) {
        activeRef.current = currentId;
        setActiveId(currentId);
      }
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [sections]);

  return (
    <div className="fixed bottom-6 left-4 md:left-6 z-50">
      <div className="px-1 py-1">
        <div className="flex flex-col gap-2 text-xs uppercase tracking-[0.2em]">
          {sections.map((section, index) => {
            const isActive = activeId === section.id;
            return (
              <div key={section.id} className="flex items-center gap-2">
                <div className="flex flex-col items-center">
                  <span className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${isActive ? 'bg-[#FF4D00]' : 'bg-white/30'}`}></span>
                  {index < sections.length - 1 && (
                    <span className="h-3 w-px bg-white/15"></span>
                  )}
                </div>
                <span className={`transition-colors duration-300 ${isActive ? 'text-[#FF4D00]' : 'text-white/60'}`}>
                  {section.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const size = useRef({ w: 18, h: 18 });
  const targetSize = useRef({ w: 18, h: 18 });
  const targetPoint = useRef({ x: 0, y: 0 });
  const targetRect = useRef<DOMRect | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    const updateEnabled = () => setEnabled(mediaQuery.matches);
    updateEnabled();
    mediaQuery.addEventListener('change', updateEnabled);
    return () => mediaQuery.removeEventListener('change', updateEnabled);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (event: MouseEvent) => {
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;
      if (!targetRect.current) {
        targetPoint.current.x = event.clientX;
        targetPoint.current.y = event.clientY;
      }
      if (!isVisible) setIsVisible(true);
    };

    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);
    const handleBlur = () => setIsVisible(false);
    const handleVisibility = () => {
      if (document.visibilityState !== 'visible') setIsVisible(false);
    };

    const handleEnterTarget = (event: MouseEvent) => {
      const el = event.target as HTMLElement | null;
      const target = el?.closest<HTMLElement>('[data-cursor-expand]');
      if (!target) return;
      targetRect.current = target.getBoundingClientRect();
      targetPoint.current.x = targetRect.current.left + targetRect.current.width / 2;
      targetPoint.current.y = targetRect.current.top + targetRect.current.height / 2;
      targetSize.current.w = targetRect.current.width + 16;
      targetSize.current.h = targetRect.current.height + 16;
    };

    const handleLeaveTarget = (event: MouseEvent) => {
      const el = event.target as HTMLElement | null;
      const target = el?.closest<HTMLElement>('[data-cursor-expand]');
      if (!target) return;
      targetRect.current = null;
      targetSize.current.w = 18;
      targetSize.current.h = 18;
    };

    const animate = () => {
      const tx = targetRect.current ? targetPoint.current.x : mouse.current.x;
      const ty = targetRect.current ? targetPoint.current.y : mouse.current.y;
      current.current.x += (tx - current.current.x) * 0.08;
      current.current.y += (ty - current.current.y) * 0.08;

      size.current.w += (targetSize.current.w - size.current.w) * 0.12;
      size.current.h += (targetSize.current.h - size.current.h) * 0.12;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`;
        cursorRef.current.style.width = `${size.current.w}px`;
        cursorRef.current.style.height = `${size.current.h}px`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);
    window.addEventListener('blur', handleBlur);
    document.addEventListener('visibilitychange', handleVisibility);
    document.addEventListener('mouseover', handleEnterTarget, true);
    document.addEventListener('mouseout', handleLeaveTarget, true);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('visibilitychange', handleVisibility);
      document.removeEventListener('mouseover', handleEnterTarget, true);
      document.removeEventListener('mouseout', handleLeaveTarget, true);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled, isVisible]);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed left-0 top-0 z-[999] pointer-events-none transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden
    >
      <div className="h-full w-full rounded-full border border-[#FF4D00]/60 bg-[#FF4D00]/10 shadow-[0_0_16px_rgba(255,77,0,0.35)]"></div>
    </div>
  );
};

const PageShell = ({
  title,
  eyebrow,
  subtitle,
  children,
}: {
  title: string;
  eyebrow: string;
  subtitle: string;
  children?: React.ReactNode;
}) => {
  return (
    <main className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-6 lg:px-12 max-w-[1330px] mx-auto">
      <div className="mb-8 md:mb-16">
        <span className="text-[#FF4D00] text-[10px] md:text-xs uppercase tracking-[0.25em] md:tracking-[0.3em]">{eyebrow}</span>
        <h1 className="text-[clamp(2.5rem,10vw,11rem)] font-semibold leading-[0.9] tracking-tight mt-3 md:mt-4 mb-4 md:mb-6">{title}</h1>
        <p className="text-[clamp(1rem,2.5vw,2.5rem)] leading-[1.25] text-white/90 max-w-5xl">{subtitle}</p>
      </div>
      {children}
    </main>
  );
};

const AboutPage = () => {
  const steps = useMemo(() => ['Discover', 'Design', 'Build', 'Refine', 'Launch'], []);
  const processRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const heroTimelineRef = useRef<any>(null);
  const collabRef = useRef<HTMLDivElement>(null);
  const collaborators = useMemo(
    () => ['Aom', 'Ken', 'Mira', 'Nate', 'Ploy'],
    []
  );

  useEffect(() => {
    if (window.gsap) {
      const words = window.gsap.utils.toArray('.about-hero-word') as HTMLElement[];
      if (words.length) {
        window.gsap.set(words, { color: '#ffffff' });
        const tl = window.gsap.timeline({ repeat: -1, repeatDelay: 0.2 });
        words.forEach((word: HTMLElement) => {
          tl.to(word, { color: '#FF4D00', duration: 0.6, ease: 'power2.out' })
            .to(word, { color: '#ffffff', duration: 0.6, ease: 'power2.inOut' }, '+=0.4');
        });
        heroTimelineRef.current = tl;
      }
    }

    return () => {
      if (heroTimelineRef.current) {
        heroTimelineRef.current.kill();
        heroTimelineRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!window.gsap || !collabRef.current) return;

    const cursors = Array.from(
      collabRef.current.querySelectorAll<HTMLElement>('.collab-cursor')
    );

    const getBounds = () => collabRef.current?.getBoundingClientRect();

    cursors.forEach((cursor, index) => {
      const randomX = () => {
        const bounds = getBounds();
        if (!bounds) return 0;
        return window.gsap.utils.random(0, Math.max(0, bounds.width - 140));
      };
      const randomY = () => {
        const bounds = getBounds();
        if (!bounds) return 0;
        return window.gsap.utils.random(0, Math.max(0, bounds.height - 60));
      };

      window.gsap.set(cursor, {
        x: randomX(),
        y: randomY(),
        opacity: 0,
      });

      window.gsap.to(cursor, {
        opacity: 1,
        duration: 0.8,
        delay: index * 0.15,
        ease: 'power2.out',
      });

      window.gsap.to(cursor, {
        x: () => randomX(),
        y: () => randomY(),
        duration: window.gsap.utils.random(3, 6),
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        repeatRefresh: true,
        delay: index * 0.2,
      });
    });

    if (window.ScrollTrigger) {
      window.gsap.to(collabRef.current, {
        y: 80,
        ease: 'none',
        scrollTrigger: {
          trigger: collabRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });
    }

    return () => {
      window.gsap.killTweensOf(cursors);
    };
  }, [collaborators.length]);

  useEffect(() => {
    const updateActiveStep = () => {
      if (!processRef.current) return;
      const rect = processRef.current.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const progressPoint = window.scrollY + window.innerHeight * 0.55;
      const progress = (progressPoint - sectionTop) / rect.height;
      const clamped = Math.min(Math.max(progress, 0), 0.999);
      const index = Math.min(steps.length - 1, Math.floor(clamped * steps.length));
      if (index !== activeStep) setActiveStep(index);
    };

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        ticking = false;
        updateActiveStep();
      });
    };

    updateActiveStep();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [activeStep, steps.length]);

  return (
    <main className="relative bg-[#050505]">
      <div className="absolute inset-0 pointer-events-none opacity-30 hidden md:block">
        <svg viewBox="0 0 1440 900" className="w-full h-full">
          <path d="M-50 240 C 220 140, 520 120, 840 220" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" />
          <path d="M-80 420 C 260 300, 660 280, 1180 400" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
          <path d="M-60 620 C 300 520, 760 520, 1320 620" stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" />
        </svg>
      </div>
      
      <div className="relative z-10 max-w-[1330px] mx-auto px-4 md:px-6 lg:px-12 pt-24 md:pt-32 pb-16 md:pb-28 space-y-16 md:space-y-28">
        <section className="space-y-4 md:space-y-6 pb-8 md:pb-16 relative">
          <div
            ref={collabRef}
            className="absolute inset-0 pointer-events-none hidden md:block"
          >
            {collaborators.map((name) => (
              <div
                key={name}
                className="collab-cursor absolute left-0 top-0 flex items-center gap-2"
              >
                <span className="h-2 w-2 rounded-full bg-white/80 shadow-[0_0_12px_rgba(255,77,0,0.35)]"></span>
                <span className="h-px w-6 bg-white/20"></span>
                <span className="px-2.5 py-1 rounded-full border border-white/15 bg-black/50 text-[10px] uppercase tracking-[0.25em] text-white/70">
                  {name}
                </span>
              </div>
            ))}
          </div>
          <div className="text-[10px] md:text-xs uppercase tracking-[0.25em] md:tracking-[0.3em] text-white/55">About</div>
          <h1 className="text-[clamp(2rem,8vw,10rem)] font-semibold leading-[0.95] tracking-tight transition-all duration-500 hover:[text-shadow:0_0_24px_rgba(255,77,0,0.35)]">
            <span className="about-hero-word">We</span>{' '}
            <span className="about-hero-word">design.</span>{' '}
            <span className="about-hero-word">We</span>{' '}
            <span className="about-hero-word">build.</span>{' '}
            <span className="about-hero-word">We</span>{' '}
            <span className="about-hero-word">make</span>{' '}
            <span className="about-hero-word">it</span>{' '}
            <span className="about-hero-word">real.</span>
          </h1>
          <p className="text-[clamp(1rem,2.4vw,2.25rem)] text-white/80 leading-[1.3] max-w-4xl">
            6CAT is a creative & technology agency focused on building meaningful digital experiences.
          </p>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 md:gap-12 items-center py-8 md:py-16">
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold">Who we are</h2>
            <div className="line-reveal h-px w-16 md:w-20 bg-white/15 opacity-0 scale-x-0 origin-left"></div>
            <p className="text-sm md:text-lg text-neutral-300 leading-relaxed">
              6CAT is born from UX & UI design, not from templates or shortcuts.
            </p>
            <p className="text-sm md:text-lg text-neutral-300 leading-relaxed">
              We believe great websites are not just beautiful, but intentional, functional, and scalable.
            </p>
          </div>
          <div className="group relative rounded-xl md:rounded-2xl border border-white/10 bg-white/5 p-4 md:p-8 transition-all duration-500 hover:border-[#FF4D00]/40 hover:shadow-[0_0_30px_rgba(255,77,0,0.25)]">
            <svg viewBox="0 0 280 200" className="w-full h-full">
              <rect x="18" y="18" width="120" height="80" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
              <rect x="160" y="32" width="90" height="60" stroke="rgba(255,255,255,0.25)" strokeWidth="1" fill="none" />
              <circle cx="70" cy="150" r="32" stroke="rgba(255,255,255,0.35)" strokeWidth="1" fill="none" />
              <line x1="70" y1="118" x2="200" y2="118" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <line x1="200" y1="118" x2="200" y2="60" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            </svg>
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
              <div className="absolute inset-6 border border-white/10"></div>
            </div>
          </div>
        </section>

        <section className="space-y-6 md:space-y-8 py-8 md:py-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold">Our Philosophy</h2>
          <div className="line-reveal h-px w-full bg-white/10 opacity-0 scale-x-0 origin-left"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                title: 'Design with purpose',
                body: 'Every pixel has a reason. No decoration without meaning.',
              },
              {
                title: 'Technology is a tool, not the goal',
                body: 'We choose tech that fits the problem, not trends that look good on slides.',
              },
              {
                title: 'Build for growth',
                body: 'We design systems that can evolve, not one-time visuals.',
              },
            ].map((item) => (
              <div key={item.title} className="group card-hover rounded-xl md:rounded-2xl border border-white/10 bg-white/5 p-4 md:p-6 transition-all duration-500 hover:border-[#FF4D00]/60 hover:shadow-[0_0_20px_rgba(255,77,0,0.25)]">
                <div className="h-8 w-8 md:h-10 md:w-10 rounded-md border border-white/20 flex items-center justify-center text-white/70 mb-3 md:mb-4 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                  <span className="text-xs md:text-sm">✦</span>
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{item.title}</h3>
                <p className="text-xs md:text-sm text-neutral-400 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-8 md:gap-12 items-start py-8 md:py-16">
          <div className="space-y-4 md:space-y-6 lg:sticky lg:top-28">
            <div className="text-[10px] md:text-xs uppercase tracking-[0.25em] md:tracking-[0.3em] text-white/60">Differentiation</div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold">What makes us different</h2>
            <div className="line-reveal h-px w-20 md:w-24 bg-white/10 opacity-0 scale-x-0 origin-left"></div>
            <p className="text-sm md:text-base text-white/60 max-w-md">
              We focus on clarity, systems, and performance that scale beyond a single project.
            </p>
          </div>
          <div className="space-y-4 md:space-y-6">
            {[
              "We don't stop at design mockups",
              'We understand frontend & backend logic',
              'We think in systems, not pages',
              'We care about performance, not just visuals',
              'We design with real-world constraints',
            ].map((item) => (
              <div key={item} className="group card-hover relative rounded-xl md:rounded-2xl border border-white/10 bg-white/5 px-4 md:px-6 py-4 md:py-5 transition-all duration-500 hover:border-[#FF4D00]/50 hover:shadow-[0_0_24px_rgba(255,77,0,0.18)]">
                <div className="absolute left-0 right-0 top-0 h-px bg-white/10"></div>
                <div className="flex items-start gap-3 md:gap-4">
                  <span className="mt-1.5 md:mt-2 h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-white/30 group-hover:bg-[#FF4D00] transition-colors duration-300 flex-shrink-0"></span>
                  <span className="text-sm md:text-lg text-white/70 group-hover:text-white transition-colors duration-300">
                    {item}
                  </span>
                </div>
                <span className="mt-3 md:mt-4 block h-px w-0 bg-[#FF4D00]/70 transition-all duration-500 group-hover:w-16 md:group-hover:w-20"></span>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6 md:space-y-8 py-8 md:py-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold">Our Capabilities</h2>
          <div className="line-reveal h-px w-full bg-white/10 opacity-0 scale-x-0 origin-left"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                title: 'UX/UI Design',
                icon: Palette,
                description: 'Crafting intuitive interfaces that users love. From wireframes to high-fidelity prototypes, we design experiences that convert.',
                features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems']
              },
              {
                title: 'Web Development',
                icon: Code,
                description: 'Building fast, scalable, and secure websites with modern technologies. Clean code that performs and lasts.',
                features: ['React/Next.js', 'Node.js', 'Database Design', 'API Integration']
              },
              {
                title: 'Creative Landing Pages',
                icon: Layout,
                description: 'High-converting landing pages that capture attention and drive action. Designed to turn visitors into customers.',
                features: ['Conversion Focused', 'A/B Testing', 'Mobile First', 'SEO Optimized']
              },
              {
                title: 'Motion & Animation',
                icon: Play,
                description: 'Bringing interfaces to life with purposeful animations. Micro-interactions that delight and enhance usability.',
                features: ['Micro-interactions', 'Page Transitions', 'Lottie Animation', 'GSAP']
              },
              {
                title: 'System Thinking',
                icon: GitBranch,
                description: 'Designing scalable design systems and architectures. Building foundations that grow with your business.',
                features: ['Design Systems', 'Component Libraries', 'Documentation', 'Scalability']
              },
              {
                title: 'Brand Experience',
                icon: Sparkles,
                description: 'Creating cohesive brand identities that resonate. From visual design to brand strategy, we make you memorable.',
                features: ['Visual Identity', 'Brand Strategy', 'Guidelines', 'Asset Creation']
              },
            ].map((item) => (
              <div key={item.title} className="group card-hover rounded-xl md:rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6 transition-all duration-500 hover:border-[#FF4D00]/50 hover:bg-gradient-to-br hover:from-[#FF4D00]/10 hover:to-transparent relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF4D00]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl border border-white/20 bg-white/5 flex items-center justify-center transition-all duration-500 group-hover:border-[#FF4D00]/60 group-hover:bg-[#FF4D00]/10 group-hover:scale-110 group-hover:rotate-3">
                        <item.icon className="w-5 h-5 md:w-6 md:h-6 text-white/60 transition-all duration-500 group-hover:text-[#FF4D00] group-hover:scale-110" />
                      </div>
                      <div className="absolute inset-0 rounded-xl bg-[#FF4D00]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base md:text-lg font-semibold text-white/90 group-hover:text-white transition-colors">{item.title}</h3>
                      <span className="mt-2 block h-px w-8 bg-white/20 transition-all duration-500 group-hover:w-12 group-hover:bg-[#FF4D00]"></span>
                    </div>
                  </div>
                  
                  <p className="mt-4 text-sm text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">
                    {item.description}
                  </p>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.features.map((feature, idx) => (
                      <span key={idx} className="text-[10px] md:text-xs text-white/40 px-2 py-1 rounded-full border border-white/10 bg-white/5 transition-all duration-300 group-hover:border-[#FF4D00]/30 group-hover:text-white/60">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  <ArrowUpRight className="w-5 h-5 text-[#FF4D00]" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section ref={processRef} className="space-y-6 md:space-y-8 py-8 md:py-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold">Our Process</h2>
          <div className="line-reveal h-px w-full bg-white/10 opacity-0 scale-x-0 origin-left"></div>
          <div className="relative">
            <div className="absolute left-0 right-0 top-5 h-px bg-white/10 hidden md:block"></div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              {steps.map((step, index) => {
                const isActive = index === activeStep;
                const isPast = index < activeStep;
                return (
                  <div key={step} className="flex items-center gap-3 md:gap-4 md:flex-col md:items-start md:flex-1">
                    <span className={`h-2 w-2 md:h-2.5 md:w-2.5 rounded-full transition-colors duration-300 flex-shrink-0 ${isActive || isPast ? 'bg-[#FF4D00]' : 'bg-white/25'}`}></span>
                    <div className={`text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.25em] transition-colors duration-300 ${isActive ? 'text-[#FF4D00]' : 'text-white/60'}`}>
                      {step}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <p className="text-sm md:text-lg text-neutral-400 max-w-3xl">
            We work closely with clients, from idea to launch and beyond.
          </p>
        </section>

        <section className="space-y-6 md:space-y-8 py-8 md:py-16">
          <p className="text-[clamp(1.25rem,4vw,3.5rem)] font-semibold leading-[1.1]">
            We are not here to decorate the web. We are here to redefine it.
          </p>
          <Link to="/projects" className="inline-block mt-2 md:mt-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#FF4D00] to-orange-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <button data-cursor-expand className="relative px-6 md:px-8 py-3 md:py-4 bg-black rounded-full leading-none flex items-center divide-x divide-neutral-800 text-sm md:text-base">
                <span className="flex items-center space-x-3 md:space-x-5">
                  <span className="pr-4 md:pr-6 text-gray-100">View Our Work</span>
                </span>
                <span className="pl-4 md:pl-6 text-[#FF4D00] group-hover:text-white transition duration-200">
                  <ArrowRight size={18} className="md:w-5 md:h-5" />
                </span>
              </button>
            </div>
          </Link>
        </section>
      </div>
    </main>
  );
};

const ServicesPage = () => {
  return (
    <main className="relative bg-[#050505]">
      <div className="relative z-10 max-w-[1330px] mx-auto px-4 md:px-6 lg:px-12 pt-24 md:pt-32 pb-16 md:pb-28 space-y-16 md:space-y-28">
        <section className="space-y-4 md:space-y-6 pb-8 md:pb-16">
          <div className="text-[10px] md:text-xs uppercase tracking-[0.25em] md:tracking-[0.3em] text-white/55">Services</div>
          <h1 className="text-[clamp(2rem,8vw,10rem)] font-semibold leading-[0.95] tracking-tight">
            Beyond design.
            <br />
            Beyond development.
          </h1>
          <p className="text-[clamp(1rem,2.4vw,2.25rem)] text-white/80 leading-[1.3] max-w-4xl">
            We solve real digital problems with design, technology,
            and systems that actually work.
          </p>
        </section>

        <section className="group grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 md:gap-12 py-8 md:py-16">
          <div className="space-y-3 md:space-y-4">
            <div className="text-[10px] md:text-xs uppercase tracking-[0.25em] md:tracking-[0.3em] text-[#FF4D00]/80">01</div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold">UX / UI Design</h2>
            <div className="line-reveal h-px w-16 md:w-20 bg-white/10 opacity-0 scale-x-0 origin-left"></div>
            <div className="pt-4 md:pt-6">
              <img
                src={uxUiShowcaseImage}
                alt="Fintech platform UI concept"
                className="w-full max-w-sm md:max-w-md rounded-xl border border-white/10 bg-white/5 object-cover max-h-56 md:max-h-64"
                loading="lazy"
              />
            </div>
          </div>
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-2 md:space-y-3">
              <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.25em] text-[#FF4D00]/80">Problem</div>
              <p className="text-sm md:text-lg text-white/75 leading-relaxed">
                Your product looks fine,
                but users don't stay, don't click, and don't convert.
                Most interfaces fail not because they are ugly,
                but because they are unclear, confusing, or inconsistent.
              </p>
            </div>
            <div className="space-y-2 md:space-y-3">
              <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.25em] text-[#FF4D00]/80">Thinking</div>
              <p className="text-sm md:text-lg text-white/75 leading-relaxed">
                Good UX is not decoration.
                It is clarity, flow, and intention.
              </p>
            </div>
            <div className="space-y-3 md:space-y-4">
              <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.25em] text-[#FF4D00]/80">Solutions</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 text-xs md:text-sm text-white/70">
                {[
                  'User flow and journey mapping',
                  'Interface hierarchy and interaction logic',
                  'Design systems for consistency',
                  'Conversion-focused layouts',
                  'Mobile-first experience',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 md:gap-3">
                    <span className="mt-1.5 md:mt-2 h-1 w-1 rounded-full bg-white/30 flex-shrink-0"></span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-hover rounded-xl md:rounded-2xl border border-white/10 bg-white/5 p-4 md:p-6">
              <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.25em] text-[#FF4D00]/80">Outcome</div>
              <p className="mt-2 md:mt-3 text-sm md:text-lg text-white/80 leading-relaxed">
                Interfaces that feel effortless to use,
                and intentional by design.
              </p>
            </div>
          </div>
        </section>

        <section className="group grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 md:gap-12 py-8 md:py-16">
          <div className="space-y-3 md:space-y-4">
            <div className="text-[10px] md:text-xs uppercase tracking-[0.25em] md:tracking-[0.3em] text-[#FF4D00]/80">02</div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold">Web Development</h2>
            <div className="line-reveal h-px w-16 md:w-20 bg-white/10 opacity-0 scale-x-0 origin-left"></div>
            <div className="pt-4 md:pt-6">
              <img
                src={webDevShowcaseImage}
                alt="Code aesthetic closeup"
                className="w-full max-w-sm md:max-w-md rounded-xl border border-white/10 bg-white/5 object-cover max-h-56 md:max-h-64"
                loading="lazy"
              />
            </div>
          </div>
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-2 md:space-y-3">
              <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.25em] text-[#FF4D00]/80">Problem</div>
              <p className="text-sm md:text-lg text-white/75 leading-relaxed">
                Many websites look impressive,
                but break easily, load slowly, or are hard to maintain.
                Visual design without solid engineering
                creates long-term problems.
              </p>
            </div>
            <div className="space-y-2 md:space-y-3">
              <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.25em] text-[#FF4D00]/80">Thinking</div>
              <p className="text-sm md:text-lg text-white/75 leading-relaxed">
                Development is not just about making things work.
                It is about making them last.
              </p>
            </div>
            <div className="space-y-3 md:space-y-4">
              <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.25em] text-[#FF4D00]/80">Solutions</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 text-xs md:text-sm text-white/70">
                {[
                  'Modern frontend architecture',
                  'Clean and scalable code structure',
                  'Performance optimization',
                  'SEO and accessibility foundations',
                  'CMS or system-ready setup',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 md:gap-3">
                    <span className="mt-1.5 md:mt-2 h-1 w-1 rounded-full bg-white/30 flex-shrink-0"></span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-hover rounded-xl md:rounded-2xl border border-white/10 bg-white/5 p-4 md:p-6">
              <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.25em] text-[#FF4D00]/80">Outcome</div>
              <p className="mt-2 md:mt-3 text-sm md:text-lg text-white/80 leading-relaxed">
                Fast, stable websites that scale with your business.
              </p>
            </div>
          </div>
        </section>

        <section className="group grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 md:gap-12 py-8 md:py-16">
          <div className="space-y-3 md:space-y-4">
            <div className="text-[10px] md:text-xs uppercase tracking-[0.25em] md:tracking-[0.3em] text-[#FF4D00]/80">03</div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold">Re-design</h2>
            <div className="line-reveal h-px w-16 md:w-20 bg-white/10 opacity-0 scale-x-0 origin-left"></div>
            <div className="pt-4 md:pt-6">
              <img
                src={redesignShowcaseImage}
                alt="Cryptocurrency landing page concept"
                className="w-full max-w-sm md:max-w-md rounded-xl border border-white/10 bg-white/5 object-cover max-h-56 md:max-h-64"
                loading="lazy"
              />
            </div>
          </div>
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-2 md:space-y-3">
              <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.25em] text-[#FF4D00]/80">Problem</div>
              <p className="text-sm md:text-lg text-white/75 leading-relaxed">
                Your website worked in the past,
                but now it feels outdated, slow, or ineffective.
                Design trends change,
                but user expectations change even faster.
              </p>
            </div>
            <div className="space-y-2 md:space-y-3">
              <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.25em] text-[#FF4D00]/80">Thinking</div>
              <p className="text-sm md:text-lg text-white/75 leading-relaxed">
                Redesign is not about starting over.
                It is about fixing what matters.
              </p>
            </div>
            <div className="space-y-3 md:space-y-4">
              <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.25em] text-[#FF4D00]/80">Solutions</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 text-xs md:text-sm text-white/70">
                {[
                  'UX audit and usability review',
                  'Content and structure refinement',
                  'Visual refresh with purpose',
                  'Performance and accessibility improvements',
                  'Gradual, low-risk transformation',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 md:gap-3">
                    <span className="mt-1.5 md:mt-2 h-1 w-1 rounded-full bg-white/30 flex-shrink-0"></span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-hover rounded-xl md:rounded-2xl border border-white/10 bg-white/5 p-4 md:p-6">
              <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.25em] text-[#FF4D00]/80">Outcome</div>
              <p className="mt-2 md:mt-3 text-sm md:text-lg text-white/80 leading-relaxed">
                A modern website that respects your existing value,
                while moving forward.
              </p>
            </div>
          </div>
        </section>

        <section className="group grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 md:gap-12 py-8 md:py-16">
          <div className="space-y-3 md:space-y-4">
            <div className="text-[10px] md:text-xs uppercase tracking-[0.25em] md:tracking-[0.3em] text-[#FF4D00]/80">04</div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold">System Development</h2>
            <div className="line-reveal h-px w-16 md:w-20 bg-white/10 opacity-0 scale-x-0 origin-left"></div>
            <div className="pt-4 md:pt-6">
              <img
                src={systemDevShowcaseImage}
                alt="Dashboard system interface concept"
                className="w-full max-w-sm md:max-w-md rounded-xl border border-white/10 bg-white/5 object-cover max-h-56 md:max-h-64"
                loading="lazy"
              />
            </div>
          </div>
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-2 md:space-y-3">
              <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.25em] text-[#FF4D00]/80">Problem</div>
              <p className="text-sm md:text-lg text-white/75 leading-relaxed">
                Many businesses rely on disconnected tools,
                manual processes, or systems that don't scale.
                What starts as a workaround
                often becomes a bottleneck.
              </p>
            </div>
            <div className="space-y-2 md:space-y-3">
              <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.25em] text-[#FF4D00]/80">Thinking</div>
              <p className="text-sm md:text-lg text-white/75 leading-relaxed">
                Systems should reduce complexity,
                not create more of it.
              </p>
            </div>
            <div className="space-y-3 md:space-y-4">
              <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.25em] text-[#FF4D00]/80">Solutions</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 text-xs md:text-sm text-white/70">
                {[
                  'Requirement analysis and system mapping',
                  'Custom dashboards and admin panels',
                  'CRM and internal tools',
                  'API and data flow design',
                  'Scalable and maintainable architecture',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 md:gap-3">
                    <span className="mt-1.5 md:mt-2 h-1 w-1 rounded-full bg-white/30 flex-shrink-0"></span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-hover rounded-xl md:rounded-2xl border border-white/10 bg-white/5 p-4 md:p-6">
              <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.25em] text-[#FF4D00]/80">Outcome</div>
              <p className="mt-2 md:mt-3 text-sm md:text-lg text-white/80 leading-relaxed">
                Systems that support growth,
                instead of slowing it down.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-6 md:space-y-8 py-8 md:py-16">
          <div className="text-[10px] md:text-xs uppercase tracking-[0.25em] md:tracking-[0.3em] text-white/50">How we work</div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold">How we work</h2>
          <div className="line-reveal h-px w-full bg-white/10 opacity-0 scale-x-0 origin-left"></div>
          <p className="text-sm md:text-lg text-white/70 leading-relaxed max-w-3xl">
            We don't jump straight into visuals or code.
            We listen, analyze, and design the right solution
            before building anything.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6">
            {[
              'Understand the problem',
              'Define the system',
              'Design the experience',
              'Build with precision',
              'Refine and launch',
            ].map((step, index) => (
              <div key={step} className="group card-hover rounded-xl md:rounded-2xl border border-white/10 bg-white/5 p-4 md:p-6 transition-all duration-500 hover:border-[#FF4D00]/40">
                <div className="text-[10px] md:text-xs uppercase tracking-[0.25em] md:tracking-[0.3em] text-[#FF4D00]/80">0{index + 1}</div>
                <div className="mt-2 md:mt-3 text-xs md:text-sm text-white/75 group-hover:text-white transition-colors">
                  {step}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6 md:space-y-8 py-8 md:py-16 text-center">
          <p className="text-[clamp(1.25rem,4vw,3.5rem)] font-semibold leading-[1.1]">
            Let's solve the right problem.
          </p>
          <button data-cursor-expand className="group relative inline-flex items-center gap-2 md:gap-3 px-6 md:px-10 py-3 md:py-4 border border-white/20 rounded-full text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em]">
            <span className="absolute inset-0 rounded-full bg-[#FF4D00]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            <span className="relative text-white">Start a conversation</span>
          </button>
        </section>

      </div>
    </main>
  );
};

const QuotationPage = () => {
  return (
    <PageShell
      title="Quotation"
      eyebrow="Quotation"
      subtitle="Placeholder content for pricing tiers, scope notes, and a quick request summary."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
        <div className="card-hover p-4 md:p-8 rounded-xl border border-white/10 bg-white/5">
          <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Project Snapshot</h3>
          <ul className="text-xs md:text-sm text-neutral-400 space-y-2">
            <li>Scope: Landing page / Website</li>
            <li>Timeline: 2-4 weeks</li>
            <li>Deliverables: Design + Build</li>
          </ul>
        </div>
        <div className="card-hover p-4 md:p-8 rounded-xl border border-white/10 bg-white/5">
          <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Estimate</h3>
          <p className="text-2xl md:text-4xl font-semibold text-white mb-3 md:mb-4">$X,XXX</p>
          <p className="text-xs md:text-sm text-neutral-400">Final pricing depends on scope and timeline.</p>
          <Button className="mt-4 md:mt-6">Request Full Quote</Button>
        </div>
      </div>
    </PageShell>
  );
};


const pricingPackages = [
  {
    id: 'landing',
    name: 'Landing Page',
    price: '฿4,500',
    shortDesc: 'Perfect for fast launches, campaigns, and first impressions.',
    recommended: true,
    features: [
      'Full custom UI/UX design (no templates)',
      'One-page structure (Hero, About, Services, CTA)',
      'Responsive for all devices',
      'SEO-ready structure',
      'Contact buttons (LINE, Email, WhatsApp)',
      'Deployed and ready to use',
    ],
  },
  {
    id: 'full',
    name: 'Full Website',
    price: '฿14,900',
    shortDesc: 'Ideal for growing businesses that need credibility and flexibility.',
    recommended: false,
    features: [
      'Custom-designed UX/UI for your brand',
      '3–5 pages (Home, About, Services, Contact, etc.)',
      'Scalable website structure',
      'Fully responsive design',
      'SEO-friendly architecture',
      'Contact form with email notification',
      'Deployment and maintenance guidance',
    ],
  },
  {
    id: 'cms',
    name: 'Full Website + CMS',
    price: '฿22,900',
    shortDesc: 'Take full control of your content without relying on developers.',
    recommended: false,
    features: [
      'Everything in Full Website',
      'CMS for managing content easily',
      'Create and edit articles, news, or products',
      'Per-page SEO management',
      'Basic training and usage guide included',
      'Built to expand with future features',
    ],
  },
  {
    id: 'crm',
    name: 'CRM System',
    price: 'Call price',
    shortDesc: 'A custom-built system designed around your real business workflow.',
    recommended: false,
    features: [
      'Business process and workflow analysis',
      'Custom system architecture',
      'Customer, task, and team management',
      'Dashboard and role-based permissions',
      'API and third-party integrations',
      'Built to scale with your business',
    ],
  },
];

const comparisonFeatures = [
  { name: 'Custom UI/UX Design', landing: true, full: true, cms: true, crm: true },
  { name: 'Template-based design', landing: false, full: false, cms: false, crm: false },
  { name: 'Number of pages', landing: '1', full: '3–5', cms: '3–5', crm: 'Custom' },
  { name: 'Responsive design', landing: true, full: true, cms: true, crm: true },
  { name: 'SEO-ready structure', landing: true, full: true, cms: true, crm: 'Custom' },
  { name: 'Contact form', landing: true, full: true, cms: true, crm: true },
  { name: 'Editable content', landing: false, full: false, cms: true, crm: true },
  { name: 'CMS included', landing: false, full: false, cms: true, crm: 'Custom' },
  { name: 'Blog / News / Products', landing: false, full: false, cms: true, crm: 'Custom' },
  { name: 'Training & guide', landing: false, full: false, cms: true, crm: true },
  { name: 'Admin dashboard', landing: false, full: false, cms: false, crm: true },
  { name: 'Business workflow design', landing: false, full: false, cms: false, crm: true },
  { name: 'API / Integrations', landing: false, full: false, cms: false, crm: true },
  { name: 'Scalable architecture', landing: 'Limited', full: true, cms: true, crm: true },
];

const faqItems = [
  {
    question: 'Do you use templates?',
    answer: 'No. Every design is built from scratch based on your brand, goals, and audience. No pre-made templates, no shortcuts.',
  },
  {
    question: 'What do I need to prepare before starting?',
    answer: 'Just your brand materials (logo, colors if you have them) and a rough idea of what you want to achieve. We\'ll guide you through the rest.',
  },
  {
    question: 'Can I add more pages/features later?',
    answer: 'Yes. All our websites are built to scale. You can add pages, features, or even upgrade to CMS later.',
  },
  {
    question: 'Do you provide hosting and domain?',
    answer: 'We can help you set up hosting and domain, but they are billed separately. We recommend reliable providers and can handle the technical setup for you.',
  },
];

const PricingCard = ({ pkg }: { pkg: typeof pricingPackages[0] }) => {
  return (
    <div
      className={`relative flex flex-col h-full rounded-2xl border p-6 md:p-7 transition-all duration-500 card-hover ${
        pkg.recommended
          ? 'border-[#FF4D00]/60 bg-gradient-to-br from-[#FF4D00]/20 via-white/5 to-transparent shadow-[0_0_40px_rgba(255,77,0,0.25)]'
          : 'border-white/10 bg-white/5'
      }`}
    >
      {pkg.recommended && (
        <div className="absolute -top-3 right-4 text-[10px] uppercase tracking-[0.25em] px-3 py-1 rounded-full border border-[#FF4D00]/50 bg-[#FF4D00]/10 text-[#FF4D00]">
          Recommended
        </div>
      )}
      <div className="flex-1">
        <div className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-white/60">Package</div>
        <h3 className="mt-3 text-xl md:text-2xl font-semibold text-white">{pkg.name}</h3>
        <div className="mt-4 text-2xl md:text-3xl font-semibold text-white">{pkg.price}</div>
        <p className="mt-2 text-xs md:text-sm text-white/60">{pkg.shortDesc}</p>
        <div className="mt-4 space-y-2 text-xs md:text-sm text-white/70">
          {pkg.features.map((feature) => (
            <div key={feature} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#FF4D00]/70 flex-shrink-0"></span>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
      <Link
        to="/contact"
        className={`mt-6 flex items-center justify-center w-full rounded-full border px-6 py-3 text-[10px] uppercase tracking-[0.15em] transition-all duration-300 ${
          pkg.recommended
            ? 'border-[#FF4D00] text-[#FF4D00] hover:bg-black hover:text-white hover:border-black'
            : 'border-white/20 text-white/70 hover:bg-black hover:text-white hover:border-black'
        }`}
        style={{ lineHeight: 1 }}
      >
        Contact us
      </Link>
    </div>
  );
};

const PricingHero = () => {
  return (
    <section className="relative">
      <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-[#FF4D00]/10 rounded-full blur-[80px] md:blur-[100px] pointer-events-none"></div>
      <div className="space-y-3 md:space-y-6">
        <div className="flex items-center gap-3 md:gap-4">
          <span className="text-[#FF4D00] text-[10px] md:text-xs uppercase tracking-[0.25em] md:tracking-[0.3em]">04</span>
          <div className="h-px w-10 md:w-12 bg-white/20"></div>
        </div>
        <h1 className="text-[clamp(2.5rem,12vw,11rem)] font-semibold leading-[0.9] tracking-tight">
          Pricing
        </h1>
        <p className="text-base md:text-[clamp(1rem,2.5vw,1.75rem)] leading-[1.5] md:leading-[1.4] text-white/70 max-w-4xl">
          We design from scratch — so your website is truly unique.
          <br className="hidden md:block" />
          Choose the solution that fits your business today and scales for tomorrow.
        </p>
      </div>
    </section>
  );
};

const PricingGrid = () => {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {pricingPackages.map((pkg) => (
          <PricingCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </section>
  );
};

const ComparisonTable = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const renderValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check size={18} className="text-[#FF4D00]" />
      ) : (
        <X size={18} className="text-white/30" />
      );
    }
    return <span className="text-white/80">{value}</span>;
  };

  if (isMobile) {
    return (
      <section className="space-y-6 md:space-y-8">
        <div className="space-y-2">
          <h2 className="text-xl md:text-3xl font-semibold">Compare plans</h2>
          <p className="text-sm text-white/60">All packages are custom-built. No templates. No shortcuts.</p>
        </div>
        <div className="space-y-4">
          {pricingPackages.map((pkg) => (
            <div key={pkg.id} className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
              <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white/[0.03] border-b border-white/10">
                <div>
                  <h3 className="font-semibold text-sm md:text-base">{pkg.name}</h3>
                  <span className="text-[#FF4D00] text-xs md:text-sm">{pkg.price}</span>
                </div>
                {pkg.recommended && (
                  <span className="text-[10px] uppercase tracking-[0.2em] px-2 py-1 rounded-full border border-[#FF4D00]/50 bg-[#FF4D00]/10 text-[#FF4D00]">
                    Recommended
                  </span>
                )}
              </div>
              <div className="p-4 space-y-3">
                {comparisonFeatures.map((feature) => (
                  <div key={feature.name} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <span className="text-white/60 text-sm pr-4">{feature.name}</span>
                    <span className="flex-shrink-0">
                      {renderValue(feature[pkg.id as keyof typeof feature] as boolean | string)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl md:text-3xl font-semibold">Compare plans</h2>
        <p className="text-sm md:text-base text-white/60">All packages are custom-built. No templates. No shortcuts.</p>
      </div>
      <div className="overflow-x-auto -mx-4 px-4">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-4 px-4 text-[10px] uppercase tracking-[0.2em] text-white/50 font-normal sticky left-0 bg-[#050505]">Feature</th>
              <th className="text-center py-4 px-4 text-xs uppercase tracking-[0.15em] text-white/70 font-normal">Landing Page</th>
              <th className="text-center py-4 px-4 text-xs uppercase tracking-[0.15em] text-white/70 font-normal">Full Website</th>
              <th className="text-center py-4 px-4 text-xs uppercase tracking-[0.15em] text-white/70 font-normal">Full Website + CMS</th>
              <th className="text-center py-4 px-4 text-xs uppercase tracking-[0.15em] text-white/70 font-normal">CRM System</th>
            </tr>
          </thead>
          <tbody>
            {comparisonFeatures.map((feature, index) => (
              <tr key={feature.name} className={index % 2 === 0 ? 'bg-white/[0.02]' : ''}>
                <td className="py-3 px-4 text-sm text-white/80 sticky left-0 bg-inherit">{feature.name}</td>
                <td className="py-3 px-4 text-center">{renderValue(feature.landing)}</td>
                <td className="py-3 px-4 text-center">{renderValue(feature.full)}</td>
                <td className="py-3 px-4 text-center">{renderValue(feature.cms)}</td>
                <td className="py-3 px-4 text-center">{renderValue(feature.crm)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

const PricingFaq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="max-w-3xl">
      <div className="space-y-2 mb-6 md:mb-8">
        <h2 className="text-xl md:text-3xl font-semibold">Frequently asked questions</h2>
        <p className="text-sm text-white/60">Everything you need to know about our pricing and process.</p>
      </div>
      <div className="space-y-2 md:space-y-3">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/10 bg-white/5 overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-4 md:p-5 text-left min-h-[56px] touch-manipulation"
            >
              <span className="font-medium text-sm md:text-base pr-4 leading-snug">{item.question}</span>
              <span className={`text-[#FF4D00] text-xl transition-transform duration-300 flex-shrink-0 ml-2 ${openIndex === index ? 'rotate-45' : ''}`}>
                +
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-out ${
                openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="px-4 md:px-5 pb-4 md:pb-5 text-sm text-white/70 leading-relaxed">
                {item.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const PricingContactCta = () => {
  return (
    <section className="relative py-6 md:py-12">
      <div className="absolute inset-0 bg-gradient-to-r from-[#FF4D00]/10 via-transparent to-[#FF4D00]/10 rounded-2xl"></div>
      <div className="relative rounded-2xl border border-white/10 bg-white/5 p-5 md:p-10 text-center space-y-3 md:space-y-6">
        <h2 className="text-xl md:text-3xl lg:text-4xl font-semibold">Not sure which plan fits?</h2>
        <p className="text-sm md:text-base text-white/70 max-w-xl mx-auto px-2">
          Tell us your goal — we'll recommend the best approach.
        </p>
        <div className="flex flex-col items-center gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 rounded-full border border-[#FF4D00] text-[#FF4D00] text-xs uppercase tracking-[0.2em] hover:bg-[#FF4D00] hover:text-white transition-all duration-300"
          >
            Talk to us
          </Link>
          <span className="text-[10px] text-white/40 text-center">Response within 24–48 hours on business days.</span>
        </div>
      </div>
    </section>
  );
};

const PricingPage = () => {
  return (
    <main className="relative bg-[#050505]">
      <div className="relative z-10 max-w-[1330px] mx-auto px-4 sm:px-6 lg:px-12 pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-28 space-y-12 sm:space-y-16 md:space-y-24">
        <PricingHero />
        <PricingGrid />
        <ComparisonTable />
        <PricingFaq />
        <PricingContactCta />
      </div>
    </main>
  );
};

const ProjectsPage = () => {
  return (
    <PageShell
      title="Projects"
      eyebrow="Projects"
      subtitle="Placeholder content for project highlights and case studies."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div className="card-hover p-4 md:p-8 rounded-xl border border-white/10 bg-white/5">
          <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">Featured Project</h3>
          <p className="text-sm md:text-base text-neutral-400 leading-relaxed">Short summary placeholder for a standout project.</p>
        </div>
        <div className="card-hover p-4 md:p-8 rounded-xl border border-white/10 bg-white/5">
          <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">Project Archive</h3>
          <p className="text-sm md:text-base text-neutral-400 leading-relaxed">Placeholder grid/list for additional work.</p>
        </div>
      </div>
    </PageShell>
  );
};

const ContactPage = () => {
  return (
    <main className="relative bg-[#050505]">
      <div className="relative z-10 max-w-[1330px] mx-auto px-4 md:px-6 lg:px-12 pt-24 md:pt-32 pb-16 md:pb-28 space-y-16 md:space-y-28">
        {/* Hero Section */}
        <section className="space-y-4 md:space-y-6 pb-8 md:pb-16">
          <div className="text-[10px] md:text-xs uppercase tracking-[0.25em] md:tracking-[0.3em] text-white/55">Contact</div>
          <h1 className="text-[clamp(2rem,8vw,10rem)] font-semibold leading-[0.95] tracking-tight">
            Let's create
            <br />
            something great.
          </h1>
          <p className="text-[clamp(1rem,2.4vw,2.25rem)] text-white/80 leading-[1.3] max-w-4xl">
            Ready to start your next project? We'd love to hear from you.
          </p>
        </section>

        {/* Contact Content */}
        <section className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 md:gap-16">
          {/* Contact Info */}
          <div className="space-y-8 md:space-y-12">
            <div className="space-y-6">
              <div className="text-[10px] md:text-xs uppercase tracking-[0.25em] md:tracking-[0.3em] text-white/50">Get in touch</div>
              <div className="space-y-4">
                <a href="mailto:hello@6cat.agency" className="group flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-[#FF4D00]/50 hover:bg-[#FF4D00]/5">
                  <div className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 group-hover:border-[#FF4D00]/60 group-hover:text-[#FF4D00] transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">Email</div>
                    <div className="text-sm md:text-base text-white/80 group-hover:text-white transition-colors">hello@6cat.agency</div>
                  </div>
                </a>
                <a href="tel:+66000000000" className="group flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-[#FF4D00]/50 hover:bg-[#FF4D00]/5">
                  <div className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 group-hover:border-[#FF4D00]/60 group-hover:text-[#FF4D00] transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">Phone</div>
                    <div className="text-sm md:text-base text-white/80 group-hover:text-white transition-colors">+66 000 000 000</div>
                  </div>
                </a>
                <div className="group flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5">
                  <div className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center text-white/60">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">Location</div>
                    <div className="text-sm md:text-base text-white/80">Bangkok, Thailand</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <div className="text-[10px] md:text-xs uppercase tracking-[0.25em] md:tracking-[0.3em] text-white/50">Follow us</div>
              <div className="flex gap-3">
                {['Instagram', 'Twitter', 'LinkedIn'].map((social) => (
                  <a key={social} href="#" className="h-11 px-5 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-xs uppercase tracking-[0.15em] text-white/60 hover:border-[#FF4D00]/50 hover:text-[#FF4D00] transition-all duration-300">
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-6">
            <div className="text-[10px] md:text-xs uppercase tracking-[0.25em] md:tracking-[0.3em] text-white/50">Send a message</div>
            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-white/40">Name</label>
                  <input 
                    type="text" 
                    placeholder="Your name"
                    className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#FF4D00]/50 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-white/40">Email</label>
                  <input 
                    type="email" 
                    placeholder="your@email.com"
                    className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#FF4D00]/50 transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-white/40">Subject</label>
                <input 
                  type="text" 
                  placeholder="Project inquiry"
                  className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#FF4D00]/50 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-white/40">Message</label>
                <textarea 
                  rows={5}
                  placeholder="Tell us about your project, goals, and timeline..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#FF4D00]/50 transition-colors resize-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-white/40">Budget range</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['< $5k', '$5k - $15k', '$15k - $50k', '$50k+'].map((budget) => (
                    <button 
                      key={budget}
                      type="button"
                      className="h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-xs text-white/60 hover:border-[#FF4D00]/50 hover:text-[#FF4D00] transition-all duration-300 focus:border-[#FF4D00] focus:text-[#FF4D00]"
                    >
                      {budget}
                    </button>
                  ))}
                </div>
              </div>
              <button 
                type="submit"
                className="group relative w-full h-14 mt-4 rounded-xl bg-[#FF4D00] text-white font-semibold text-sm uppercase tracking-[0.15em] overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,77,0,0.4)]"
              >
                <span className="relative z-10">Send Message</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF4D00] to-[#FF6B35] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </form>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center space-y-6 py-16 md:py-24">
          <p className="text-[clamp(1.25rem,4vw,3rem)] font-semibold leading-[1.1] max-w-3xl mx-auto">
            We typically respond within 24 hours.
          </p>
          <p className="text-sm md:text-base text-white/50 max-w-xl mx-auto">
            Currently accepting new projects for Q1 2025.
          </p>
        </section>
      </div>
    </main>
  );
};

const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <SelectedWorks />
      <PricingSection />
      <CTA />
    </>
  );
};

// --- App Root ---

const AppContent = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, [location.pathname]);

    useEffect(() => {
        // Initialize GSAP ScrollTrigger
        if (window.gsap && window.ScrollTrigger) {
            window.gsap.registerPlugin(window.ScrollTrigger);

            window.ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());

            const elements = document.querySelectorAll('.reveal-on-scroll');
            elements.forEach((el) => {
                window.gsap.fromTo(el, 
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 85%",
                        }
                    }
                );
            });

            const lineElements = document.querySelectorAll<HTMLElement>('.line-reveal');
            lineElements.forEach((line) => {
                if (line.dataset.lineAnimated === 'true') return;
                window.gsap.fromTo(
                    line,
                    { scaleX: 0, opacity: 0, transformOrigin: 'left center' },
                    {
                        scaleX: 1,
                        opacity: 1,
                        duration: 1.1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: line,
                            start: "top 85%",
                        },
                        onComplete: () => {
                            line.dataset.lineAnimated = 'true';
                        },
                    }
                );
            });

            const counters = document.querySelectorAll<HTMLElement>('[data-count]');
            counters.forEach((counter) => {
                if (counter.dataset.animated === 'true') return;
                const target = Number(counter.dataset.count ?? '0');
                const suffix = counter.dataset.suffix ?? '';
                const decimals = Number(counter.dataset.decimals ?? '0');
                const valueObj = { value: 0 };

                window.gsap.to(valueObj, {
                    value: target,
                    duration: 2.6,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: counter,
                        start: "top 85%",
                        once: true,
                    },
                    onUpdate: () => {
                        const value = decimals ? valueObj.value.toFixed(decimals) : Math.round(valueObj.value).toString();
                        counter.textContent = `${value}${suffix}`;
                    },
                    onComplete: () => {
                        counter.dataset.animated = 'true';
                    },
                });
            });

            if (location.pathname === '/') {
                const codePanel = document.querySelector<HTMLElement>('.hero-code-panel');
                if (codePanel) {
                    window.gsap.fromTo(
                        codePanel,
                        { scale: 1, transformOrigin: 'center bottom' },
                        {
                            scale: 1.15,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: codePanel,
                                start: "top 90%",
                                end: "bottom 10%",
                                scrub: 0.7,
                                invalidateOnRefresh: true,
                            }
                        }
                    );
                }
            }
        }
    }, [location.pathname]);

    const showSectionIndicator = false;

    return (
        <div className="bg-[#050505] min-h-screen text-white selection:bg-[#FF4D00] selection:text-white">
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/quotation" element={<QuotationPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/contact" element={<ContactPage />} />
            </Routes>
            <Footer />
            {showSectionIndicator && <SectionIndicator />}
            <CustomCursor />
        </div>
    );
};

const App = () => {
    return (
        <Router>
            <AppContent />
        </Router>
    );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
