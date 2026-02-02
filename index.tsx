import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, ArrowUpRight, Menu, X, Circle, Globe, Zap, Box, Layers } from 'lucide-react';

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

// --- Constants & Config ---
const COLORS = {
  bg: '#050505',
  text: '#ffffff',
  muted: '#333333',
  accent: '#FF4D00', // Neon Orange
};

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
    <div className="flex flex-col mb-16 opacity-0 reveal-on-scroll">
      <span className="text-[#FF4D00] font-mono text-sm tracking-widest mb-4 opacity-80">{number}</span>
      <h2 className="text-4xl md:text-6xl font-light tracking-tight leading-tight">{children}</h2>
    </div>
  );
};

// --- Main Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['About', 'Services', 'Work', 'Contact'];

  return (
    <nav 
      className={`fixed top-6 left-0 right-0 z-50 transition-all duration-500 flex justify-center px-4`}
    >
      <div 
        className={`
          flex items-center justify-between w-full max-w-6xl px-8 py-4 rounded-2xl border transition-all duration-500
          ${isScrolled 
            ? 'bg-black/60 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]' 
            : 'bg-transparent border-transparent'}
        `}
      >
        <div className="text-xl font-bold tracking-widest z-50">
          6CAT<span className="text-[#FF4D00]">.</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase()}`} 
              className="text-sm font-medium text-white/70 hover:text-[#FF4D00] transition-colors duration-300 tracking-wide uppercase"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
           <a href="#contact" className="text-sm font-bold bg-white text-black px-5 py-2 rounded-full hover:bg-[#FF4D00] hover:text-white transition-all duration-300">
             LET'S TALK
           </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Nav Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-40 flex flex-col items-center justify-center space-y-8">
            {navLinks.map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-3xl font-light hover:text-[#FF4D00] transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
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
        this.y = Math.random() * height; // Start anywhere along vertical axis
        this.size = Math.random() * 1.5;
        this.speedY = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.alpha = Math.random() * 0.5 + 0.2;
        this.life = Math.random() * 100;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.life--;
        
        // Reset if off screen or dead
        if (this.y > height || this.life < 0) {
          this.y = -10;
          this.x = width / 2 + (Math.random() - 0.5) * 10;
          this.life = 100 + Math.random() * 50;
          this.speedY = Math.random() * 2 + 1;
        }
      }

      draw() {
        ctx!.fillStyle = `rgba(255, 77, 0, ${this.alpha})`;
        ctx!.shadowBlur = 10;
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

    const drawLaser = () => {
      // Main beam
      const centerX = width / 2;
      const flicker = Math.random() * 0.2 + 0.8;
      const widthFlicker = Math.random() * 2 + 1;

      // Core white-ish beam
      ctx!.beginPath();
      ctx!.moveTo(centerX, 0);
      ctx!.lineTo(centerX, height);
      ctx!.strokeStyle = `rgba(255, 255, 255, ${0.1 * flicker})`;
      ctx!.lineWidth = 1;
      ctx!.stroke();

      // Orange Glow beam
      ctx!.beginPath();
      ctx!.moveTo(centerX, 0);
      ctx!.lineTo(centerX, height);
      ctx!.strokeStyle = `rgba(255, 77, 0, ${0.05 * flicker})`;
      ctx!.lineWidth = widthFlicker + 10;
      ctx!.shadowBlur = 30;
      ctx!.shadowColor = '#FF4D00';
      ctx!.stroke();
      ctx!.shadowBlur = 0;
    };

    const drawCosmicCurves = (f: number) => {
      ctx!.save();
      ctx!.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx!.lineWidth = 1;

      // Draw 3 gentle curves
      for (let i = 0; i < 3; i++) {
        ctx!.beginPath();
        const offset = i * 200;
        for (let x = 0; x <= width; x += 10) {
            // Sine wave calculation
            const y = height/2 + Math.sin((x + f * 2 + offset) * 0.002) * (200 + i * 50) * Math.sin(f*0.005);
            if (x === 0) ctx!.moveTo(x, y);
            else ctx!.lineTo(x, y);
        }
        ctx!.stroke();
      }
      ctx!.restore();
    };

    const animate = () => {
      ctx!.fillStyle = '#050505'; // Clear with bg color
      ctx!.fillRect(0, 0, width, height);

      drawCosmicCurves(frame);
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
    if (window.gsap) {
        const tl = window.gsap.timeline();
        
        // Brand Name Parallax (Very subtle)
        window.gsap.to(".brand-bg-text", {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero-section",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        // Main Text Reveal
        tl.fromTo(".hero-line", 
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.5, stagger: 0.2, ease: "power4.out" }
        );
    }
  }, []);

  return (
    <section className="hero-section relative w-full h-screen overflow-hidden flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-80" />
      
      {/* Huge Background Brand Text */}
      <div className="brand-bg-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-0 pointer-events-none select-none">
        <h1 className="text-[12vw] font-bold text-[#1a1a1a] tracking-tighter leading-none whitespace-nowrap opacity-60">
          6CAT AGENCY
        </h1>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <div className="overflow-hidden">
             <h2 className="hero-line text-5xl md:text-7xl lg:text-8xl font-medium text-white tracking-tight leading-[1.1] mb-8">
                Make the new ways <br />
                <span className="text-white/90">for website.</span>
             </h2>
        </div>
        
        <div className="hero-line mt-12 flex justify-center">
             <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#FF4D00] to-orange-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <button className="relative px-8 py-4 bg-black rounded-full leading-none flex items-center divide-x divide-neutral-800">
                    <span className="flex items-center space-x-5">
                    <span className="pr-6 text-gray-100">See our work</span>
                    </span>
                    <span className="pl-6 text-[#FF4D00] group-hover:text-white transition duration-200">
                        <ArrowRight size={20} />
                    </span>
                </button>
             </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-50 animate-bounce">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </section>
  );
};

const About = () => {
    return (
        <section id="about" className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                    <SectionHeading number="01">About 6CAT</SectionHeading>
                </div>
                <div className="space-y-8 reveal-on-scroll">
                    <p className="text-2xl md:text-3xl font-light text-neutral-300 leading-relaxed">
                        We are a digital creative agency that exists to reshape the internet. We don't just build websites; we engineer <span className="text-white font-normal hover:text-[#FF4D00] transition-colors cursor-default">digital experiences</span> that command attention.
                    </p>
                    <p className="text-lg text-neutral-500 max-w-md">
                        Merging high-end aesthetics with cutting-edge technology, 6CAT bridges the gap between art and functionality.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10 mt-12">
                         <div>
                            <h4 className="text-4xl font-bold text-white mb-2">50+</h4>
                            <p className="text-sm text-neutral-500 uppercase tracking-wider">Projects Delivered</p>
                         </div>
                         <div>
                            <h4 className="text-4xl font-bold text-white mb-2">100%</h4>
                            <p className="text-sm text-neutral-500 uppercase tracking-wider">Client Satisfaction</p>
                         </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Services = () => {
    const services = [
        { title: "UI/UX Design", desc: "User-centric interfaces that feel intuitive and look stunning.", icon: <Box /> },
        { title: "Web Development", desc: "High-performance code built on Next.js and modern frameworks.", icon: <Globe /> },
        { title: "Motion & Animation", desc: "Fluid interactions using GSAP and WebGL for immersive feel.", icon: <Zap /> },
        { title: "Brand Identity", desc: "Crafting the visual soul of your business for the digital age.", icon: <Layers /> },
    ];

    return (
        <section id="services" className="py-32 px-6 md:px-12 bg-neutral-900/20">
            <div className="max-w-7xl mx-auto">
                <SectionHeading number="02">Our Services</SectionHeading>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((s, i) => (
                        <div key={i} className="group p-8 border border-white/5 bg-white/5 hover:bg-white/10 hover:border-[#FF4D00]/30 transition-all duration-500 rounded-xl reveal-on-scroll">
                            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-white mb-8 group-hover:text-[#FF4D00] group-hover:scale-110 transition-all duration-500">
                                {s.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-4 group-hover:text-white transition-colors">{s.title}</h3>
                            <p className="text-sm text-neutral-400 leading-relaxed group-hover:text-neutral-300">
                                {s.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const WorkCard = ({ title, category, img }: { title: string, category: string, img: string }) => {
    return (
        <div className="group relative w-full aspect-[4/3] overflow-hidden rounded-lg cursor-pointer reveal-on-scroll">
            <div className="absolute inset-0 bg-neutral-900 z-0">
                 {/* Placeholder for Image */}
                 <div className={`w-full h-full bg-cover bg-center opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 ease-out`} style={{ backgroundImage: `url(${img})` }}></div>
            </div>
            
            <div className="absolute inset-0 z-10 p-8 flex flex-col justify-between">
                <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-y-2 group-hover:translate-y-0">
                    <div className="w-12 h-12 rounded-full bg-[#FF4D00] flex items-center justify-center text-white">
                        <ArrowUpRight size={20} />
                    </div>
                </div>
                
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-[#FF4D00] text-xs font-mono uppercase tracking-widest mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{category}</span>
                    <h3 className="text-3xl font-bold text-white mb-1">{title}</h3>
                </div>
            </div>
            
            {/* Hover Glow Border */}
            <div className="absolute inset-0 border-2 border-[#FF4D00] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg"></div>
        </div>
    );
};

const SelectedWorks = () => {
    return (
        <section id="work" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
             <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                <SectionHeading number="03">Selected Works</SectionHeading>
                <div className="mb-16 md:mb-20">
                    <a href="#" className="text-sm border-b border-neutral-600 hover:border-[#FF4D00] hover:text-[#FF4D00] pb-1 transition-all">VIEW ALL CASES</a>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <WorkCard 
                    title="Neon Horizon" 
                    category="Web Design / Development" 
                    img="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
                />
                <WorkCard 
                    title="Cyber Punk Inc." 
                    category="Brand Identity" 
                    img="https://images.unsplash.com/photo-1635322966219-b75ed372eb01?q=80&w=2564&auto=format&fit=crop"
                />
                <WorkCard 
                    title="Orbital Finance" 
                    category="Fintech / UI UX" 
                    img="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop"
                />
                <WorkCard 
                    title="Echo Systems" 
                    category="Motion Design" 
                    img="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"
                />
             </div>
        </section>
    );
};

const CTA = () => {
    return (
        <section id="contact" className="py-32 px-6 bg-[#0a0a0a] relative overflow-hidden">
             {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF4D00] rounded-full filter blur-[150px] opacity-10 pointer-events-none"></div>
            
            <div className="max-w-4xl mx-auto text-center relative z-10">
                <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 text-white">
                    Let's build something <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500 hover:to-[#FF4D00] transition-all duration-700 cursor-default">powerful.</span>
                </h2>
                <p className="text-xl text-neutral-400 mb-12 max-w-2xl mx-auto">
                    Ready to elevate your digital presence? We are currently accepting new projects for Q4 2024.
                </p>
                <Button className="mx-auto text-lg px-12 py-6">Start a Project</Button>
            </div>
        </section>
    );
};

const Footer = () => {
    return (
        <footer className="py-12 px-6 md:px-12 border-t border-white/5 bg-black text-sm">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-neutral-500">
                    &copy; 2024 6CAT AGENCY. All rights reserved.
                </div>
                <div className="flex gap-8">
                    <a href="#" className="text-white hover:text-[#FF4D00] transition-colors">Instagram</a>
                    <a href="#" className="text-white hover:text-[#FF4D00] transition-colors">Twitter</a>
                    <a href="#" className="text-white hover:text-[#FF4D00] transition-colors">LinkedIn</a>
                </div>
                <div className="text-neutral-600">
                    Made with energy.
                </div>
            </div>
        </footer>
    );
};

// --- App Root ---

const App = () => {
    useEffect(() => {
        // Initialize GSAP ScrollTrigger
        if (window.gsap && window.ScrollTrigger) {
            window.gsap.registerPlugin(window.ScrollTrigger);
            
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
        }
    }, []);

    return (
        <div className="bg-[#050505] min-h-screen text-white selection:bg-[#FF4D00] selection:text-white">
            <Navbar />
            <Hero />
            <About />
            <Services />
            <SelectedWorks />
            <CTA />
            <Footer />
        </div>
    );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);