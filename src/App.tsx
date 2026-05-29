import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { 
  Cpu, 
  Terminal, 
  Layers, 
  ShoppingBag, 
  Paintbrush, 
  RefreshCw, 
  ArrowRight, 
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Activity,
  Fingerprint,
  Zap,
  Check,
  AlertTriangle,
  X,
  ChevronDown,
  Menu
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

// Portfolio Slide Types
interface PortfolioSlide {
  num: string;
  label: string;
  tag: string;
  url?: string;
  theme: "green" | "orange" | "purple" | "indigo" | "rose";
  badge: string;
  title: string;
  sub: string;
  visitText?: string;
  avail?: boolean;
  stats?: { value: string; label: string }[];
  products?: { icon: string; name: string; price: string }[];
  chart?: boolean;
  skills?: string[];
  mockupType: "campus" | "business" | "ecommerce" | "saas" | "portfolio";
}

interface Toast {
  id: string;
  title: string;
  message: string;
  type: "success" | "error" | "info";
  duration: number;
}

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How long does it take to build a custom website?",
    answer: "On average, a landing page is built and deployed in 48 hours. Multi-page applications or advanced custom web portals typically take 1 to 2 weeks, depending on the complexity of interactive elements and desired bespoke animations."
  },
  {
    question: "What does '100% handcoded with no templates' mean?",
    answer: "Most traditional agencies build on heavy frameworks (WordPress, Elementor, Webflow) that introduce slow load times and bloated style sheets. We write custom React/Vite code from the ground up, guaranteeing lightning-fast sub-100ms load speeds, pristine performance scores, and unique interactive animations that can't be replicated on page-builders."
  },
  {
    question: "How does your pricing model work?",
    answer: "We operate with clear, transparent flat rates. Single-page landing pages and conversion-focused startup pages have fixed prices with zero hidden costs, defined from day one. Complex system dashboards or bespoke custom integrations are calculated based on a mutually agreed scope."
  },
  {
    question: "Who will I be working with directly?",
    answer: "You will collaborate direct-to-designer with Sreenath Kummara. By bypassing project managers and communication silos, we eliminate feedback lag. You will have a secure direct communication line for immediate adjustments and collaborative feedback sessions."
  },
  {
    question: "Do you offer ongoing support and updates?",
    answer: "Absolutely. We offer flexible on-demand support and maintenance retainers. Whether you need rapid content adjustments, design refinements, or continuous server health checks, we are on hand to support your digital evolution."
  }
];

export default function App() {
  const [email, setEmail] = useState("");
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const addToast = (title: string, message: string, type: "success" | "error" | "info" = "info", duration = 4000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type, duration }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };
  
  // 2035 Spatial States
  const [dimensionMode, setDimensionMode] = useState<"aether" | "synapse" | "quantum" | "neural">("aether");
  const [systemSync, setSystemSync] = useState(98.4);
  const [latency, setLatency] = useState(1.2);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [optimizedStatus, setOptimizedStatus] = useState(true);
  const [currentUtcTime, setCurrentUtcTime] = useState("");

  // Refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  // Mouse tracking for Three.js repulsion
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const mouseVelocity = useRef(0);
  const lastMousePos = useRef({ x: 0, y: 0, time: Date.now() });

  const totalSlides = 5;

  // Touch gesture state and handlers for mobile swipe-to-scroll
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50; // swipe left, go next
    const isRightSwipe = distance < -50; // swipe right, go prev

    if (isLeftSwipe) {
      setActiveSlide((prev) => (prev + 1) % totalSlides);
    } else if (isRightSwipe) {
      setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Auto-scroll Selected Work section elements every 2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % totalSlides);
    }, 2000);
    return () => clearInterval(timer);
  }, [activeSlide, totalSlides]);

  // Custom 2035 Portfolio Data
  const slides: PortfolioSlide[] = [
    {
      num: "01",
      label: "CampusPrime",
      tag: "India's Smartest Campus Management Ecosystem",
      url: "https://campusprime.in",
      theme: "green",
      badge: "✦ Real-time Academic Hub Powered by 18spar Nodes",
      title: "The Smartest Way to Manage Your School",
      sub: "Automating classrooms, grade records, fee collecting ledger systems, and student telemetry structures seamlessly for institutions of any scale.",
      visitText: "Visit Site ↗",
      stats: [
        { value: "5+", label: "Academic Hubs" },
        { value: "20K+", label: "Active Minds" },
        { value: "₹12L", label: "Yearly Run Saved" },
        { value: "100%", label: "Custom Handcrafted" }
      ],
      mockupType: "campus"
    },
    {
      num: "02",
      label: "Local Business Website",
      tag: "Blazing-Fast Custom Brand Portals",
      theme: "orange",
      badge: "🔥 +240% Lead Generation Verified",
      title: "Crafted With Concrete Business Purpose",
      sub: "Translating target local audience search behavior into lightweight visual content pages. Zero boilerplate, maximum local brand presence.",
      avail: true,
      stats: [
        { value: "100%", label: "SEO Structured" },
        { value: "3.2x", label: "Average Retention" }
      ],
      mockupType: "business"
    },
    {
      num: "03",
      label: "Modern E-Commerce Store",
      tag: "Blazing-Fast Interactive Storefronts",
      theme: "rose",
      badge: "✦ Blazing-fast Instant Checkout Nodes",
      title: "Shop the New Premium Curated Collection",
      sub: "High-performance storefront components with frictionless transaction processes, optimized images, and fluid cart animations.",
      avail: true,
      products: [
        { icon: "🕶️", name: "Premium Frames", price: "₹2,499" },
        { icon: "👟", name: "Urban Sneakers", price: "₹6,999" },
        { icon: "🪐", name: "Minimal Core Bead", price: "₹899" }
      ],
      mockupType: "ecommerce"
    },
    {
      num: "04",
      label: "Custom SaaS Dashboard",
      tag: "Telemetry Analytics and Business Intelligence",
      theme: "indigo",
      badge: "● LIVE OPERATIONAL GRID: ACTIVE",
      title: "Weekly Activity and System Performance Metrics",
      sub: "Beautifully organized administrative displays, real-time feedback meters, and interactive visual data projections to control workloads.",
      avail: true,
      chart: true,
      mockupType: "saas"
    },
    {
      num: "05",
      label: "Modern Personal Portfolio",
      tag: "Creative Identity for Developers & Designers",
      theme: "purple",
      badge: "✦ Handcrafted to Stand Out in the Noise",
      title: "Creative Designer & Standout Developer Profile",
      sub: "Spacious typography layouts, fluid hover states, and premium animations engineered to state your authority.",
      avail: true,
      skills: ["Premium UI/UX", "Smooth Canvas", "Tailwind 4.x", "React Core UI"],
      mockupType: "portfolio"
    }
  ];

  // Particle Cursor, Noise & Clock Speed handlers
  useEffect(() => {
    // Generate real-time dynamic clock
    const updateTime = () => {
      const d = new Date();
      setCurrentUtcTime(d.toISOString().replace("T", "  ").substr(0, 20) + " UTC");
    };
    updateTime();
    const clockInterval = setInterval(updateTime, 1000);

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const dt = now - lastMousePos.current.time;
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      
      if (dt > 0) {
        const speed = Math.sqrt(dx * dx + dy * dy) / dt;
        mouseVelocity.current = Math.min(speed * 0.15, 1.5);
      }

      setMousePos({ x: e.clientX, y: e.clientY });

      lastMousePos.current = { x: e.clientX, y: e.clientY, time: now };

      // Map mouse cursor to standard screen viewport ratio [-1, 1]
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;

      // Animate Cursor element smoothly
      if (cursorRingRef.current && cursorDotRef.current) {
        gsap.to(cursorRingRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.25,
          ease: "power2.out"
        });
        gsap.to(cursorDotRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.05,
          ease: "power1.out"
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Scroll handler for nav glassmorphic bloom
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);

    // Dynamic latency fluctuates around baseline
    const latencyInterval = setInterval(() => {
      setLatency(prev => {
        const delta = (Math.random() - 0.5) * 0.15;
        return parseFloat(Math.max(0.7, Math.min(1.8, prev + delta)).toFixed(2));
      });
      setSystemSync(prev => {
        const delta = (Math.random() - 0.5) * 0.2;
        return parseFloat(Math.max(97.5, Math.min(99.9, prev + delta)).toFixed(1));
      });
    }, 2000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      clearInterval(clockInterval);
      clearInterval(latencyInterval);
    };
  }, []);

  // 3D WebGL Neural Mesh & Quantum Particles Ambiance Setup
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    });

    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.z = 24;

    // Define colors linked to states
    const getColorForMode = () => {
      switch (dimensionMode) {
        case "synapse": return { primary: "#bc13fe", secondary: "#ff2a5f" };
        case "quantum": return { primary: "#00ffaa", secondary: "#00f2fe" };
        case "neural": return { primary: "#ffaa00", secondary: "#ff2a5f" };
        default: return { primary: "#00f2fe", secondary: "#bc13fe" };
      }
    };

    let colorsObj = getColorForMode();
    let currentPrimaryColor = new THREE.Color(colorsObj.primary);
    let currentSecondaryColor = new THREE.Color(colorsObj.secondary);

    // Glow fields setup
    const particlesCount = 750;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const originalPositions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      const rx = (Math.random() - 0.5) * 44;
      const ry = (Math.random() - 0.5) * 44;
      const rz = (Math.random() - 0.5) * 44;

      positions[i * 3] = rx;
      positions[i * 3 + 1] = ry;
      positions[i * 3 + 2] = rz;

      originalPositions[i * 3] = rx;
      originalPositions[i * 3 + 1] = ry;
      originalPositions[i * 3 + 2] = rz;

      const val = Math.random();
      const mixed = new THREE.Color().lerpColors(currentPrimaryColor, currentSecondaryColor, val);
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Glow circles canvas texture
    const createGlowingCircle = () => {
      const c = document.createElement("canvas");
      c.width = 32;
      c.height = 32;
      const ctx = c.getContext("2d");
      if (ctx) {
        const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        grad.addColorStop(0, "rgba(255, 255, 255, 1)");
        grad.addColorStop(0.3, "rgba(255, 255, 255, 0.7)");
        grad.addColorStop(0.8, "rgba(255, 255, 255, 0.15)");
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 32, 32);
      }
      return new THREE.CanvasTexture(c);
    };

    const pointsMaterial = new THREE.PointsMaterial({
      size: 0.44,
      vertexColors: true,
      map: createGlowingCircle(),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particlePoints = new THREE.Points(geometry, pointsMaterial);
    scene.add(particlePoints);

    // Micro wireframe structural field
    const wireGeom = new THREE.IcosahedronGeometry(13, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(colorsObj.primary),
      wireframe: true,
      transparent: true,
      opacity: 0.05
    });
    const structuralGlobe = new THREE.Mesh(wireGeom, wireMat);
    scene.add(structuralGlobe);

    // Glow Orb
    const orbGeom = new THREE.SphereGeometry(2.5, 32, 32);
    const orbMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(colorsObj.primary),
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending
    });
    const centerOrb = new THREE.Mesh(orbGeom, orbMat);
    scene.add(centerOrb);

    // Handle dimension changes with animations
    const handleDimensionModeChange = () => {
      colorsObj = getColorForMode();
      const nextPrimary = new THREE.Color(colorsObj.primary);
      const nextSecondary = new THREE.Color(colorsObj.secondary);

      gsap.to(currentPrimaryColor, {
        r: nextPrimary.r,
        g: nextPrimary.g,
        b: nextPrimary.b,
        duration: 2,
        ease: "power2.out"
      });

      gsap.to(currentSecondaryColor, {
        r: nextSecondary.r,
        g: nextSecondary.g,
        b: nextSecondary.b,
        duration: 2,
        ease: "power2.out",
        onUpdate: () => {
          const colorAttr = geometry.getAttribute("color") as THREE.BufferAttribute;
          const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
          for (let i = 0; i < particlesCount; i++) {
            const mixRatio = (Math.abs(posAttr.getX(i)) % 5) / 5;
            const updated = new THREE.Color().lerpColors(currentPrimaryColor, currentSecondaryColor, mixRatio);
            colorAttr.setXYZ(i, updated.r, updated.g, updated.b);
          }
          colorAttr.needsUpdate = true;
          wireMat.color.copy(currentPrimaryColor);
          orbMat.color.copy(currentSecondaryColor);
        }
      });
    };

    // Listen to changes in dimensionMode state
    handleDimensionModeChange();

    // Resize Handler
    const handleResize = () => {
      if (!canvasRef.current) return;
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    const clock = new THREE.Clock();
    let frameId = 0;

    const draw = () => {
      const elapsed = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      // Rotate grids
      structuralGlobe.rotation.y = elapsed * 0.035;
      structuralGlobe.rotation.x = elapsed * 0.015;

      particlePoints.rotation.y = elapsed * 0.01;
      particlePoints.rotation.x = elapsed * 0.006;

      centerOrb.scale.setScalar(1 + Math.sin(elapsed * 2.5) * 0.12);

      // Repulsion force simulation
      const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
      const positionsArr = posAttr.array as Float32Array;

      // Project mouse coordinates into virtual viewport boundaries
      const mx = mouseRef.current.x * 23;
      const my = mouseRef.current.y * 14;

      for (let i = 0; i < particlesCount; i++) {
        const px = originalPositions[i * 3];
        const py = originalPositions[i * 3 + 1];
        const pz = originalPositions[i * 3 + 2];

        // Push particles subtly on hover
        const dx = px - mx;
        const dy = py - my;
        const distSq = dx * dx + dy * dy;

        if (distSq < 110) {
          const force = (110 - distSq) / 110;
          positionsArr[i * 3] = px + (dx / Math.sqrt(distSq)) * force * 3.5;
          positionsArr[i * 3 + 1] = py + (dy / Math.sqrt(distSq)) * force * 3.5;
        } else {
          // Spring back smoothly
          positionsArr[i * 3] += (px - positionsArr[i * 3]) * 0.05;
          positionsArr[i * 3 + 1] += (py - positionsArr[i * 3 + 1]) * 0.05;
        }

        // Add ambient liquid wave motion
        positionsArr[i * 3 + 2] = pz + Math.cos(elapsed * 1.5 + px * 0.1) * 1.2;
      }
      posAttr.needsUpdate = true;

      // Synchronize wireframe with UI optimized control
      structuralGlobe.visible = optimizedStatus;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, [dimensionMode, optimizedStatus]);

  // Cinematic headline load effect
  useEffect(() => {
    // Animate the text spans
    gsap.fromTo(".reveal-2035", 
      {
        opacity: 0,
        y: 45
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.95,
        ease: "power3.out",
        delay: 0.35,
        clearProps: "transform" // Fixed: keep transparency 1 (visible) after animation finishes!
      }
    );

    // Animate Sreenath's premium photo card to emerge after the headline completes!
    gsap.fromTo(".reveal-founder-card",
      {
        opacity: 0,
        y: 50,
        scale: 0.96
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.1,
        ease: "power2.out",
        delay: 1.35 // Slide up and fade in seamlessly
      }
    );
  }, []);

  // WhatsApp transmission waitlist portal (preserving actual credentials)
  const handleJoinWaitlist = () => {
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) {
      addToast(
        "ACCESS_DENIED", 
        "SECURITY CRITICAL: Unrecognized network address input. Handshake failed.", 
        "error", 
        4500
      );
      return;
    }

    addToast(
      "HANDSHAKE_INITIATED", 
      "✓ Synaptic credentials accepted. Initiating quantum handshake transmission pathway...", 
      "success", 
      5000
    );

    const phone = "919491219300";
    const msgString = `Hi Sreenath Kummara! [TRANS_YEAR_2035_WAITLIST] 🚀\n\nRegistered Synaptic Address: ${trimmed}\n\nI am eager to deploy custom quantum websites and elevate user interfaces. Secure our alliance!`;
    const whatsappURL = `https://wa.me/${phone}?text=${encodeURIComponent(msgString)}`;

    setTimeout(() => {
      window.open(whatsappURL, "_blank");
      setEmail("");
    }, 1500);
  };

  const ringHoverEnter = () => {
    if (cursorRingRef.current) {
      cursorRingRef.current.classList.add("scale-[2.2]", "border-cyber-blue", "bg-cyber-blue/5");
    }
  };

  const ringHoverLeave = () => {
    if (cursorRingRef.current) {
      cursorRingRef.current.classList.remove("scale-[2.2]", "border-cyber-blue", "bg-cyber-blue/5");
    }
  };

  return (
    <div className="relative min-h-screen text-[#f3f4f6] font-sans selection:bg-cyber-blue selection:text-black overflow-x-hidden bg-[#030308]">
      
      {/* ── SCI-FI THEMED TOAST NOTIFICATION CONTAINER ── */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 max-w-[380px] w-full px-4 sm:px-0 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => {
            const isSuccess = toast.type === "success";
            const isError = toast.type === "error";
            const accentColor = isSuccess 
              ? "border-[#00ffaa]/30 text-[#00ffaa] shadow-[0_0_15px_rgba(0,255,170,0.15)] bg-[#030308]/90" 
              : isError 
              ? "border-[#ff2a5f]/30 text-[#ff2a5f] shadow-[0_0_15px_rgba(255,42,95,0.15)] bg-[#030308]/90" 
              : "border-[#00f2fe]/30 text-[#00f2fe] shadow-[0_0_15px_rgba(0,242,254,0.15)] bg-[#030308]/90";

            const progressBg = isSuccess 
              ? "bg-[#00ffaa]" 
              : isError 
              ? "bg-[#ff2a5f]" 
              : "bg-[#00f2fe]";

            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.15 } }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className={`pointer-events-auto relative w-full rounded-xl border p-4 backdrop-blur-xl flex flex-col gap-2 overflow-hidden ${accentColor}`}
              >
                {/* Micro tech scanner grid */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:12px_12px] opacity-40 pointer-events-none" />
                
                {/* Mini scanner line */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent filter blur-[0.5px] animate-[sweep_2.8s_ease-in-out_infinite]" />
                
                {/* Tech corner accents */}
                <div className={`absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 ${isSuccess ? "border-[#00ffaa]" : isError ? "border-[#ff2a5f]" : "border-[#00f2fe]"}`} />
                <div className={`absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 ${isSuccess ? "border-[#00ffaa]" : isError ? "border-[#ff2a5f]" : "border-[#00f2fe]"}`} />
                <div className={`absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 ${isSuccess ? "border-[#00ffaa]" : isError ? "border-[#ff2a5f]" : "border-[#00f2fe]"}`} />
                <div className={`absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 ${isSuccess ? "border-[#00ffaa]" : isError ? "border-[#ff2a5f]" : "border-[#00f2fe]"}`} />

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    {isSuccess ? (
                      <Check size={16} className="text-[#00ffaa]" />
                    ) : isError ? (
                      <AlertTriangle size={16} className="text-[#ff2a5f]" />
                    ) : (
                      <Terminal size={16} className="text-[#00f2fe]" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="block font-orbitron font-extrabold text-[10px] tracking-wider uppercase">
                      [{toast.title}]
                    </span>
                    <p className="text-[10px] text-gray-300 font-mono mt-1 leading-relaxed">
                      {toast.message}
                    </p>
                  </div>

                  <button
                    onClick={() => removeToast(toast.id)}
                    className="shrink-0 text-gray-500 hover:text-white transition-colors cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </div>

                {/* Animated progress cooldown bar */}
                <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ duration: toast.duration / 1000, ease: "linear" }}
                    className={`h-full ${progressBg}`}
                  />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      
      {/* ── 2035 DOCKABLE TELEMETRY HEAVY CURSOR ── */}
      <div 
        ref={cursorRingRef} 
        id="cursor-2035-ring" 
        className="hidden md:block fixed top-0 left-0 w-10 h-10 rounded-full border border-cyber-blue/20 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
      >
        <span className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-cyber-blue/60 rounded-full animate-ping" />
      </div>
      <div 
        ref={cursorDotRef} 
        id="cursor-2035-dot" 
        className="hidden md:block fixed top-0 left-0 w-2 h-2 rounded-full bg-cyber-blue pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
      />

      {/* ── SPATIAL BACKGROUND & LIGHT FIELDS ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block opacity-95" />
        
        {/* Shifting Cyber Aura Radial Light */}
        <div className="absolute inset-0 bg-radial-at-t from-transparent via-[#030308]/60 to-[#030308]" />

        {/* Ambient Hologram Neon Blur Streaks */}
        <div className="absolute top-1/4 right-0 w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-cyber-blue/5 to-cyber-purple/5 blur-[140px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 left-0 w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-cyber-rose/5 to-cyber-amber/5 blur-[140px]" />
      </div>

      {/* ── HOLOGRAPHIC SCANLINE SCREEN GLASS ── */}
      <div className="fixed inset-0 pointer-events-none z-[998] opacity-[0.03] animate-[grain_1.5s_steps(4)_infinite]" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
           }} 
      />

      {/* ── BIOMIMETIC FLOATING CONTROL BOX ── */}
      <div className="fixed top-24 right-5 md:right-8 z-40 hidden xl:flex flex-col gap-3 font-mono text-[10px]">
        <div className="p-4 rounded-xl border border-white/5 bg-[#030308]/60 backdrop-blur-xl shadow-2xl flex flex-col gap-3 w-48 text-gray-400">
          <div className="flex justify-between items-center text-white border-b border-white/5 pb-2">
            <span className="font-bold flex items-center gap-1">
              <Activity size={10} className="text-cyber-green" /> REGISTRY UTILS
            </span>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <span className="text-[9px] tracking-wider text-gray-400 uppercase">AMBIENCE MATRIX</span>
            <div className="grid grid-cols-2 gap-1.5">
              <button 
                onClick={() => setDimensionMode("aether")}
                className={`px-2 py-1 rounded text-center border capitalize transition-all ${dimensionMode === "aether" ? "bg-cyber-blue/10 border-cyber-blue text-cyber-blue" : "bg-white/5 border-white/5 hover:border-white/20 text-gray-400"}`}
              >
                Aether
              </button>
              <button 
                onClick={() => setDimensionMode("synapse")}
                className={`px-2 py-1 rounded text-center border capitalize transition-all ${dimensionMode === "synapse" ? "bg-cyber-purple/10 border-cyber-purple text-cyber-purple" : "bg-white/5 border-white/5 hover:border-white/20 text-gray-400"}`}
              >
                Synapse
              </button>
              <button 
                onClick={() => setDimensionMode("quantum")}
                className={`px-2 py-1 rounded text-center border capitalize transition-all ${dimensionMode === "quantum" ? "bg-cyber-green/10 border-cyber-green text-cyber-green" : "bg-white/5 border-white/5 hover:border-white/20 text-gray-400"}`}
              >
                Quantum
              </button>
              <button 
                onClick={() => setDimensionMode("neural")}
                className={`px-2 py-1 rounded text-center border capitalize transition-all ${dimensionMode === "neural" ? "bg-cyber-amber/10 border-cyber-amber text-cyber-amber" : "bg-white/5 border-white/5 hover:border-white/20 text-gray-400"}`}
              >
                Neural
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/5 pt-2">
            <span>MESH OPTIMIZER</span>
            <button 
              onClick={() => setOptimizedStatus(!optimizedStatus)}
              className={`w-8 h-4 rounded-full p-0.5 transition-colors ${optimizedStatus ? "bg-cyber-green" : "bg-gray-700"}`}
            >
              <div className={`w-3 h-3 rounded-full bg-black transition-transform ${optimizedStatus ? "translate-x-4" : "translate-x-0"}`} />
            </button>
          </div>

          <div className="flex flex-col gap-1.5 border-t border-white/5 pt-2 text-[9px] text-gray-500">
            <div className="flex justify-between items-center">
              <span>SYSTEM SYNC:</span>
              <span className="text-white font-bold">{systemSync}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>LATENCY:</span>
              <span className="text-white font-bold">{latency}ms</span>
            </div>
            <div className="flex justify-between items-center">
              <span>COORDINATES:</span>
              <span className="text-white font-bold">{mousePos.x}, {mousePos.y}</span>
            </div>
            <div className="flex flex-col gap-0.5 mt-0.5">
              <span>SYSTEM TIMESTAMP:</span>
              <span className="text-cyber-blue font-bold text-[8px] whitespace-nowrap">{currentUtcTime}</span>
            </div>
          </div>
        </div>
      </div>
      <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-4.5 border-b border-white/5 backdrop-blur-xl transition-all duration-300 ${scrolled ? 'bg-[#030308]/70 border-b-cyber-blue/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)]' : 'bg-transparent'}`}>
        <div className="flex items-center gap-3">
          {/* Brand Mark with glowing liquid effect */}
          <div className="relative w-9 h-9 rounded bg-[#e85d04]/10 border border-[#e85d04]/30 flex items-center justify-center font-bold text-[#e85d04] overflow-hidden group">
            <span className="z-10 text-xs font-orbitron tracking-tighter">18</span>
            <div className="absolute inset-0 bg-gradient-to-tr from-cyber-purple to-cyber-blue translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="absolute inset-0 border border-white/20 rounded scale-90" />
          </div>
          
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-widest font-orbitron bg-gradient-to-r from-white via-white/80 to-cyber-blue bg-clip-text text-transparent">
              18spar
            </span>
            <span className="text-[8px] tracking-[0.25em] text-cyan-400/80 font-mono uppercase">Precision Engineered Web</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <ul className="hidden md:flex items-center gap-8 text-[11px] tracking-widest font-mono text-gray-400">
            <li>
              <a href="#services" onMouseEnter={ringHoverEnter} onMouseLeave={ringHoverLeave} className="hover:text-cyber-blue transition-colors flex items-center gap-1.5 group">
                <span className="text-cyber-blue/60 group-hover:animate-ping opacity-80">_</span> SERVICES
              </a>
            </li>
            <li>
              <a href="#process" onMouseEnter={ringHoverEnter} onMouseLeave={ringHoverLeave} className="hover:text-cyber-purple transition-colors flex items-center gap-1.5 group">
                <span className="text-cyber-purple/60 group-hover:animate-pulse">✦</span> HOW IT WORKS
              </a>
            </li>
            <li>
              <a href="#work" onMouseEnter={ringHoverEnter} onMouseLeave={ringHoverLeave} className="hover:text-cyber-green transition-colors flex items-center gap-1.5">
                <Layers size={11} className="text-cyber-green/80" /> SELECTED WORK
              </a>
            </li>
            <li>
              <a href="#waitlist" onMouseEnter={ringHoverEnter} onMouseLeave={ringHoverLeave} className="relative block px-4 py-2 rounded bg-white text-black font-extrabold border-0 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all">
                SECURE WAITLIST
              </a>
            </li>
          </ul>

          <button
            onClick={() => setIsSideMenuOpen(true)}
            onMouseEnter={ringHoverEnter}
            onMouseLeave={ringHoverLeave}
            className="w-10 h-10 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-cyber-blue/40 flex items-center justify-center text-white transition-all cursor-pointer relative group shadow-[0_0_15px_rgba(255,255,255,0.02)] z-10"
            title="Open Control Drawer"
          >
            <Menu size={16} className="text-gray-300 group-hover:text-cyber-blue group-hover:scale-110 transition-all duration-300" />
            <div className="absolute inset-0 border border-cyber-blue/0 group-hover:border-cyber-blue/30 rounded-xl transition-all duration-500 scale-95" />
          </button>
        </div>
      </nav>

      {/* ── HIGH-TECH SIDE DRAWER MENU (HUD CONTROL CENTER) ── */}
      <AnimatePresence>
        {isSideMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSideMenuOpen(false)}
              className="fixed inset-0 z-50 bg-[#020204]/80 backdrop-blur-md cursor-pointer"
            />

            {/* Sidebar drawer panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] z-50 bg-[#03030c] border-l border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.85)] flex flex-col justify-between overflow-y-auto"
            >
              <div className="p-8 flex flex-col gap-8">
                {/* Drawer Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] text-cyber-blue font-mono tracking-[0.2em] uppercase">✦ CONTROL INTERFACE</span>
                    <h3 className="font-orbitron font-extrabold text-white text-base tracking-widest">NAV_MENU_HUD</h3>
                  </div>
                  <button
                    onClick={() => setIsSideMenuOpen(false)}
                    onMouseEnter={ringHoverEnter}
                    onMouseLeave={ringHoverLeave}
                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 hover:border-cyber-rose/50 text-gray-400 hover:text-cyber-rose flex items-center justify-center transition-all cursor-pointer"
                  >
                    <X size={15} />
                  </button>
                </div>

                {/* Main Navigation Links */}
                <div className="flex flex-col gap-3 font-mono">
                  <span className="text-[8px] text-gray-500 tracking-widest font-mono uppercase mb-2">DIRECTORY VECTOR LINKS</span>
                  {[
                    { label: "Home", href: "#" },
                    { label: "Services", href: "#services" },
                    { label: "How It Works", href: "#process" },
                    { label: "Selected Work", href: "#work" },
                    { label: "Faq", href: "#faq" }
                  ].map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href}
                      onClick={() => setIsSideMenuOpen(false)}
                      onMouseEnter={ringHoverEnter}
                      onMouseLeave={ringHoverLeave}
                      className="group flex items-center justify-between p-4 rounded-xl border border-white/[0.02] bg-white/[0.01] hover:bg-white/[0.03] hover:border-cyber-blue/30 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-orbitron text-[9px] text-gray-500 group-hover:text-cyber-blue transition-colors">
                          [0{idx + 1}]
                        </span>
                        <span className="text-xs uppercase font-extrabold tracking-widest text-gray-300 group-hover:text-white transition-colors">
                          {item.label}
                        </span>
                      </div>
                      <ChevronRight size={14} className="text-gray-600 group-hover:text-cyber-blue transition-all group-hover:translate-x-1" />
                    </a>
                  ))}
                </div>

                {/* System Status Readouts */}
                <div className="p-5 rounded-2xl bg-[#030308]/60 border border-white/5 flex flex-col gap-4 font-mono">
                  <span className="text-[8px] text-gray-500 tracking-widest uppercase">System HUD Telemetry</span>
                  <div className="grid grid-cols-2 gap-4 text-[9px]">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-gray-500 uppercase">SYS_LATENCY:</span>
                      <span className="text-cyber-green font-bold flex items-center gap-1 text-[10px]">
                        <Activity size={10} /> {latency} ms
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-gray-500 uppercase">SYNC_STATUS:</span>
                      <span className="text-cyber-purple font-bold flex items-center gap-1 text-[10px]">
                        <Cpu size={10} /> {systemSync}%
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5 col-span-2 border-t border-white/5 pt-2">
                      <span className="text-gray-500 uppercase">TIMESTAMP_UTC:</span>
                      <span className="text-cyber-blue font-bold tracking-tight text-[10px]">{currentUtcTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Drawer Footer CTA */}
              <div className="p-8 border-t border-white/5 bg-[#010103] flex flex-col gap-4">
                <a
                  href="#waitlist"
                  onClick={() => setIsSideMenuOpen(false)}
                  onMouseEnter={ringHoverEnter}
                  onMouseLeave={ringHoverLeave}
                  className="w-full text-center py-3.5 rounded-xl bg-gradient-to-r from-cyber-blue to-cyber-purple text-black font-extrabold font-mono text-[10px] tracking-widest uppercase hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,170,255,0.2)]"
                >
                  <Fingerprint size={12} /> ACCESS WAITLIST
                </a>
                <div className="text-center text-[8px] text-gray-500 tracking-widest uppercase leading-normal">
                  DIRECT CONTACT: <br />
                  <a href="mailto:content2u.sj@gmail.com" className="text-white hover:underline transition-all">
                    content2u.sj@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── SPATIAL PORTAL SCENE WRAPPER ── */}
      <main className="relative z-10 w-full">
        
        {/* ── HERO DOCK ── */}
        <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 py-24 select-none">
          <div className="max-w-6xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heading, intro, waitlist inputs & stats */}
            <div className="lg:col-span-6 flex flex-col gap-8">
              {/* SQA Hologram Badge */}
              <div className="inline-flex self-start items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-[10px] text-cyber-blue font-mono backdrop-blur-xl shadow-[0_0_15px_rgba(0,170,255,0.1)]">
                <span className="w-2 h-2 rounded-full bg-cyber-blue animate-pulse" />
                <span className="tracking-[0.2em] uppercase">Now Accepting New Clients — Limited Spots Left</span>
              </div>

              {/* 2035 Dimensional Typography Heading */}
              <h1 ref={headlineRef} className="text-5xl md:text-8xl font-black tracking-tight leading-none text-white font-display">
                <div className="overflow-hidden block">
                  <span className="reveal-2035 inline-block opacity-0 mr-4">Ideas</span>
                  <span className="reveal-2035 inline-block opacity-0">That</span>
                </div>
                <div className="overflow-hidden block mt-1 pb-1">
                  <span className="reveal-2035 inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-rose font-normal italic pr-2 font-serif opacity-0 select-text">
                    Actually
                  </span>
                </div>
                <div className="overflow-hidden block">
                  <span className="reveal-2035 inline-block opacity-0">Convert.</span>
                </div>
              </h1>

              {/* Futuristic descriptive intro */}
              <p className="max-w-xl text-xs md:text-sm leading-relaxed text-gray-400 font-mono">
                <strong className="text-white font-semibold">18spar</strong> builds precision-crafted web experiences for startups, agencies, and founders who are done settling for average. Fast delivery. Stunning modern design. Real results.
              </p>

              {/* Synaptic Waitlist Input Pod */}
              <div id="waitlist" className="flex flex-col sm:flex-row gap-4 mt-3 max-w-lg">
                <div className="relative flex-1 group">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-cyber-blue">
                    <Fingerprint size={14} className="group-hover:text-cyber-purple transition-colors" />
                  </div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..." 
                    className="w-full bg-[#030308]/60 border border-white/10 rounded-xl py-3.5 pl-10 pr-16 text-xs text-white placeholder-white/30 outline-none backdrop-blur-xl focus:border-cyber-blue focus:shadow-[0_0_20px_rgba(0,242,254,0.15)] transition-all font-mono"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] text-gray-600 font-mono tracking-widest pointer-events-none">_SECURE</span>
                </div>
                <button 
                  onClick={handleJoinWaitlist}
                  onMouseEnter={ringHoverEnter}
                  onMouseLeave={ringHoverLeave}
                  className="relative py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyber-blue to-cyber-purple text-black font-extrabold text-xs font-mono tracking-widest uppercase hover:opacity-90 transition-opacity border-none cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,242,254,0.3)]"
                >
                  GET A FREE AUDIT <ArrowRight size={13} />
                </button>
              </div>



              {/* Real-time sensory stats node */}
              <div className="grid grid-cols-3 gap-3 md:gap-5 max-w-xl mt-6 pt-6 border-t border-white/5 font-mono">
                <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 backdrop-blur-xl flex flex-col justify-center hover:border-cyber-blue/20 hover:bg-white/[0.02] transition-all">
                  <span className="block text-lg md:text-xl font-extrabold text-white font-orbitron tracking-tight">48H</span>
                  <span className="text-[9px] text-gray-500 tracking-wider uppercase mt-1">AVG. DELIVERY TIME</span>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 backdrop-blur-xl flex flex-col justify-center hover:border-cyber-purple/20 hover:bg-white/[0.02] transition-all">
                  <span className="block text-lg md:text-xl font-extrabold text-cyber-purple font-orbitron tracking-tight">100%</span>
                  <span className="text-[9px] text-gray-500 tracking-wider uppercase mt-1">CUSTOM HAND-CODED</span>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 backdrop-blur-xl flex flex-col justify-center hover:border-cyber-green/20 hover:bg-white/[0.02] transition-all">
                  <span className="block text-lg md:text-xl font-extrabold text-cyber-green font-orbitron tracking-tight">∞</span>
                  <span className="text-[9px] text-gray-500 tracking-wider uppercase mt-1">UNLIMITED REVISIONS</span>
                </div>
              </div>
            </div>

            {/* Right Column: Founder & Designer Premium Portrait, separate on desktop */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end w-full">
              <div className="reveal-founder-card opacity-0 relative w-full lg:max-w-xl rounded-2xl overflow-hidden border border-[#00f2fe]/20 p-4 bg-[#030308]/75 shadow-[0_0_50px_rgba(0,170,255,0.12)] group backdrop-blur-2xl">
                {/* Laser scan accent bar */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyber-blue to-transparent filter shadow-[0_0_12px_#00f2fe] animate-[sweep_3.2s_ease-in-out_infinite]" />
                
                {/* Visual spotlight glow */}
                <div className="absolute inset-y-8 top-8 bottom-32 bg-[#bc13fe]/5 rounded-full filter blur-3xl pointer-events-none opacity-50 group-hover:opacity-85 transition-opacity duration-1000" />

                {/* Sub-grid/Flex layout: separate image and info/matter */}
                <div className="flex flex-col sm:flex-row gap-4 items-stretch h-full">
                  
                  {/* Info / Matter on the Left side inside the card */}
                  <div className="flex-1 p-2 font-mono flex flex-col justify-between gap-4 order-2 sm:order-1">
                    <div className="flex flex-col gap-2">
                      <span className="block text-[8px] text-cyber-rose uppercase font-bold tracking-widest">// LEAD WEB DESIGNER</span>
                      <h3 className="text-base font-extrabold text-white tracking-wider font-display uppercase mt-0.5">Sreenath Kummara</h3>
                      <div className="inline-block self-start px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[8px] text-[#a5b4fc] tracking-widest uppercase font-bold">18SPAR_DIR</div>
                    </div>
                    
                    <p className="text-[10px] leading-relaxed text-gray-400">
                      "Websites are your best salesperson. I build them from scratch with speed, aesthetic elegance, and conversion-focused architectures. Your brand merits actual craftsmanship."
                    </p>
                    
                    <div className="flex flex-col gap-2.5 text-[9px] text-[#a5b4fc] pt-3 border-t border-white/5 font-bold">
                      <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyber-blue" /> 48h avg delivery</span>
                      <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyber-purple" /> 100% handcoded</span>
                    </div>
                  </div>

                  {/* Founder Image on the Right side inside the card */}
                  <div className="w-full sm:w-[220px] shrink-0 order-1 sm:order-2">
                    <div className="relative aspect-[3/4] h-full rounded-xl overflow-hidden border border-white/5 bg-[#010103] shadow-inner font-sans">
                      {/* Founder Photo */}
                      <img 
                        src="https://lh3.googleusercontent.com/d/1gmPwRB_wniE2EwT2NMKr8Ou48NwqRds1" 
                        alt="Sreenath Kummara - Founder of 18spar" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover select-text transition-all duration-700 ease-out brightness-[0.9] saturate-[0.85] group-[#reveal-founder-card]:scale-[1.03]"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.src.includes("docs.google.com")) {
                            target.src = "https://docs.google.com/uc?export=view&id=1gmPwRB_wniE2EwT2NMKr8Ou48NwqRds1";
                          }
                        }}
                      />
                      
                      {/* Tech Grid Mesh Overlay with subtle opacity */}
                      <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[radial-gradient(var(--color-cyber-blue)_1.5px,transparent_1.5px)] bg-[size:10px_10px]" />
                      
                      {/* Vignette fade */}
                      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
                      
                      {/* Verification Active Status Badge */}
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#030308]/90 border border-cyber-green/30 shadow-[0_0_15px_rgba(0,255,170,0.15)] font-mono text-[7px] text-cyber-green uppercase tracking-widest font-bold">
                        <span className="w-1 h-1 rounded-full bg-cyber-green animate-pulse" />
                        Base: India
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── MULTI-HUB CONTINUOUS RUNTIME REGISTER TICKER ── */}
        <div className="w-full overflow-hidden border-y border-white/5 py-4.5 bg-gradient-to-r from-[#030308]/90 via-white/[0.01] to-[#030308]/90 z-20 relative backdrop-blur-md">
          <div className="whitespace-nowrap flex animate-[marquee_32s_linear_infinite] gap-12 text-[10px] md:text-xs font-mono tracking-[0.22em] uppercase text-gray-500">
            <div className="flex items-center gap-10 shrink-0">
              <span>Landing Pages <span className="text-cyber-blue">✦</span></span>
              <span>SaaS Dashboards <span className="text-cyber-purple">✦</span></span>
              <span>E-Commerce Storefronts <span className="text-cyber-rose">✦</span></span>
              <span>Brand Websites <span className="text-cyber-green">✦</span></span>
              <span>UI/UX Redesigns <span className="text-cyber-blue">✦</span></span>
              <span>Performance Optimization <span className="text-cyber-amber">✦</span></span>
            </div>
            <div className="flex items-center gap-10 shrink-0">
              <span>Landing Pages <span className="text-cyber-blue">✦</span></span>
              <span>SaaS Dashboards <span className="text-cyber-purple">✦</span></span>
              <span>E-Commerce Storefronts <span className="text-cyber-rose">✦</span></span>
              <span>Brand Websites <span className="text-cyber-green">✦</span></span>
              <span>UI/UX Redesigns <span className="text-cyber-blue">✦</span></span>
              <span>Performance Optimization <span className="text-cyber-amber">✦</span></span>
            </div>
          </div>
        </div>

        {/* ── CORE CAPABILITIES / GRAPHICS SUITE ── */}
        <section id="services" className="px-6 md:px-12 py-16 md:py-20 relative">
          <div className="max-w-6xl mx-auto flex flex-col gap-14 relative z-10">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 border-b border-white/5 pb-12">
              <div>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight font-display text-white" style={{ lineHeight: "1.1" }}>
                  Every pixel is intentional.
                </h2>
              </div>
              <p className="max-w-md text-xs leading-relaxed text-gray-400 font-mono">
                We don't do templates. Every project is built from scratch, engineered to perform and designed to impress.
              </p>
            </div>

            {/* Glowing Frosted Bento Cards grid with multi-hue boundaries */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono">
              
              {/* Card 1 */}
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="group relative rounded-2xl p-8 bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 hover:border-cyber-blue/40 transition-all duration-500 backdrop-blur-xl overflow-hidden flex flex-col gap-4"
              >
                <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-cyber-blue/10 to-transparent pointer-events-none transition-all group-hover:opacity-80" />
                <div className="absolute bg-gradient-to-r from-transparent via-cyber-blue/30 to-transparent w-full h-[2px] -top-[1px] left-0 group-hover:animate-[sweep_1.8s_ease_infinite]" />
                <div className="w-10 h-10 rounded-xl bg-cyber-blue/10 border border-cyber-blue/30 flex items-center justify-center text-cyber-blue mb-1 shadow-[0_0_15px_rgba(0,170,255,0.15)] animate-mesh-float">
                  <Terminal size={16} />
                </div>
                <h3 className="text-base font-bold text-white tracking-wider font-display">Landing Pages</h3>
                <p className="text-[11px] leading-relaxed text-gray-400 flex-1">
                  High-converting, single-page sites built specifically to capture leads, validate your product, or launch a new feature.
                </p>
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-cyber-blue font-bold tracking-widest">
                  <span>FLAT RATE</span>
                  <span>Starting at ₹5,000 / $500</span>
                </div>
              </motion.div>

              {/* Card 2 */}
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                className="group relative rounded-2xl p-8 bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 hover:border-cyber-purple/40 transition-all duration-500 backdrop-blur-xl overflow-hidden flex flex-col gap-4"
              >
                <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-cyber-purple/10 to-transparent pointer-events-none transition-all group-hover:opacity-80" />
                <div className="absolute bg-gradient-to-r from-transparent via-cyber-purple/30 to-transparent w-full h-[2px] -top-[1px] left-0 group-hover:animate-[sweep_1.8s_ease_infinite]" />
                <div className="w-10 h-10 rounded-xl bg-cyber-purple/10 border border-cyber-purple/30 flex items-center justify-center text-cyber-purple mb-1 shadow-[0_0_15px_rgba(188,19,254,0.15)]">
                  <Layers size={16} />
                </div>
                <h3 className="text-base font-bold text-white tracking-wider font-display">Full Brand Websites</h3>
                <p className="text-[11px] leading-relaxed text-gray-400 flex-1">
                  Complete multi-page digital presence that establishes your authority, tells your story, and builds deep customer trust.
                </p>
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-cyber-purple font-bold tracking-widest">
                  <span>FLAT RATE</span>
                  <span>Starting at ₹12,000 / $1,200</span>
                </div>
              </motion.div>

              {/* Card 3 */}
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                className="group relative rounded-2xl p-8 bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 hover:border-cyber-rose/40 transition-all duration-500 backdrop-blur-xl overflow-hidden flex flex-col gap-4"
              >
                <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-cyber-rose/10 to-transparent pointer-events-none transition-all group-hover:opacity-80" />
                <div className="absolute bg-gradient-to-r from-transparent via-cyber-rose/30 to-transparent w-full h-[2px] -top-[1px] left-0 group-hover:animate-[sweep_1.8s_ease_infinite]" />
                <div className="w-10 h-10 rounded-xl bg-cyber-rose/10 border border-cyber-rose/30 flex items-center justify-center text-cyber-rose mb-1 shadow-[0_0_15px_rgba(255,42,95,0.15)] animate-mesh-float">
                  <Cpu size={16} />
                </div>
                <h3 className="text-base font-bold text-white tracking-wider font-display">SaaS & Web Apps</h3>
                <p className="text-[11px] leading-relaxed text-gray-400 flex-1">
                  Fully responsive dashboards, custom backoffice software, and feature-rich user client interfaces.
                </p>
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-cyber-rose font-bold tracking-widest">
                  <span>FLAT RATE</span>
                  <span>Starting at ₹20,000 / $2,000</span>
                </div>
              </motion.div>

              {/* Card 4 */}
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="group relative rounded-2xl p-8 bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 hover:border-cyber-green/40 transition-all duration-500 backdrop-blur-xl overflow-hidden flex flex-col gap-4"
              >
                <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-cyber-green/10 to-transparent pointer-events-none transition-all group-hover:opacity-80" />
                <div className="absolute bg-gradient-to-r from-transparent via-cyber-green/30 to-transparent w-full h-[2px] -top-[1px] left-0 group-hover:animate-[sweep_1.8s_ease_infinite]" />
                <div className="w-10 h-10 rounded-xl bg-cyber-green/10 border border-cyber-green/30 flex items-center justify-center text-cyber-green mb-1 shadow-[0_0_15px_rgba(0,255,170,0.15)]">
                  <ShoppingBag size={16} />
                </div>
                <h3 className="text-base font-bold text-white tracking-wider font-display">E-Commerce Stores</h3>
                <p className="text-[11px] leading-relaxed text-gray-400 flex-1">
                  Gorgeous storefronts optimized for blazing-fast speed, flawless layout transitions, and maximum conversion rates.
                </p>
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-cyber-green font-bold tracking-widest">
                  <span>FLAT RATE</span>
                  <span>Starting at ₹15,000 / $1,500</span>
                </div>
              </motion.div>

              {/* Card 5 */}
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                className="group relative rounded-2xl p-8 bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 hover:border-cyber-amber/40 transition-all duration-500 backdrop-blur-xl overflow-hidden flex flex-col gap-4"
              >
                <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-cyber-amber/10 to-transparent pointer-events-none transition-all group-hover:opacity-80" />
                <div className="absolute bg-gradient-to-r from-transparent via-cyber-amber/30 to-transparent w-full h-[2px] -top-[1px] left-0 group-hover:animate-[sweep_1.8s_ease_infinite]" />
                <div className="w-10 h-10 rounded-xl bg-cyber-amber/10 border border-cyber-amber/30 flex items-center justify-center text-cyber-amber mb-1 shadow-[0_0_15px_rgba(255,170,0,0.15)] animate-mesh-float">
                  <Paintbrush size={16} />
                </div>
                <h3 className="text-base font-bold text-white tracking-wider font-display">UI/UX Redesigns</h3>
                <p className="text-[11px] leading-relaxed text-gray-400 flex-1">
                  Breathe new life into your existing site. We analyze drop-offs, rebuild messy layouts, and elevate your entire aesthetic.
                </p>
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-cyber-amber font-bold tracking-widest">
                  <span>FLAT RATE</span>
                  <span>Starting at ₹8,000 / $800</span>
                </div>
              </motion.div>

              {/* Card 6 */}
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                className="group relative rounded-2xl p-8 bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 hover:border-cyber-blue/40 transition-all duration-500 backdrop-blur-xl overflow-hidden flex flex-col gap-4"
              >
                <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-cyber-blue/10 to-transparent pointer-events-none transition-all group-hover:opacity-80" />
                <div className="absolute bg-gradient-to-r from-transparent via-cyber-blue/30 to-transparent w-full h-[2px] -top-[1px] left-0 group-hover:animate-[sweep_1.8s_ease_infinite]" />
                <div className="w-10 h-10 rounded-xl bg-cyber-blue/10 border border-cyber-blue/30 flex items-center justify-center text-cyber-blue mb-1 shadow-[0_0_15px_rgba(0,170,255,0.15)]">
                  <RefreshCw size={16} />
                </div>
                <h3 className="text-base font-bold text-white tracking-wider font-display">Monthly Retainer</h3>
                <p className="text-[11px] leading-relaxed text-gray-400 flex-1">
                  On-demand design and development updates whenever you need them. Perfect for fast-growing startups and agile agencies.
                </p>
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-cyber-blue font-bold tracking-widest">
                  <span>ONGOING RETAIN</span>
                  <span>Starting at ₹4,000 / $400/mo</span>
                </div>
              </motion.div>

            </div>
          </div>
        </section>
        {/* ── THE LOGISTICS ENGINE / PROCESS ── */}
        <section id="process" className="relative px-6 md:px-12 py-16 md:py-20 border-y border-white/5">
          <div className="max-w-6xl mx-auto flex flex-col gap-14 relative z-10 font-mono">
            <div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight font-display text-white" style={{ lineHeight: "1.1" }}>
                From idea to live in days, not months.
              </h2>
            </div>

            {/* Glowing vertical-to-horizontal timeline cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4 pt-4 text-xs">
              
              {/* Step 1 */}
              <div className="relative rounded-2xl p-6 bg-white/[0.01] border border-white/5 backdrop-blur-xl flex flex-col gap-4 group hover:border-cyber-blue/30 transition-all duration-300">
                <span className="text-4xl font-black font-orbitron text-white/5 group-hover:text-cyber-blue/20 transition-colors">01</span>
                <h3 className="text-sm font-bold text-white font-display">Discovery Call</h3>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  A 30-minute deep dive into your goals, your target audience, and exactly what success looks like.
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative rounded-2xl p-6 bg-white/[0.01] border border-white/5 backdrop-blur-xl flex flex-col gap-4 group hover:border-cyber-purple/30 transition-all duration-300">
                <span className="text-4xl font-black font-orbitron text-white/5 group-hover:text-cyber-purple/20 transition-colors">02</span>
                <h3 className="text-sm font-bold text-white font-display font-sans">Proposal & Quote</h3>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  You get a crystal-clear scope, a fast timeline, and an honest flat-rate quote — no hourly billing or surprise fees.
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative rounded-2xl p-6 bg-white/[0.01] border border-white/5 backdrop-blur-xl flex flex-col gap-4 group hover:border-cyber-rose/30 transition-all duration-300">
                <span className="text-4xl font-black font-orbitron text-white/5 group-hover:text-cyber-rose/20 transition-colors">03</span>
                <h3 className="text-sm font-bold text-white font-display">Design Sprint</h3>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  We deliver your first interactive wireframe draft in 48–72 hours. Built for fluid layout speed.
                </p>
              </div>

              {/* Step 4 */}
              <div className="relative rounded-2xl p-6 bg-white/[0.01] border border-white/5 backdrop-blur-xl flex flex-col gap-4 group hover:border-cyber-amber/30 transition-all duration-300">
                <span className="text-4xl font-black font-orbitron text-white/5 group-hover:text-cyber-amber/20 transition-colors">04</span>
                <h3 className="text-sm font-bold text-white font-display">Revise & Refine</h3>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Get unlimited feedback revisions until you're absolutely in love with your design. Your word is final.
                </p>
              </div>

              {/* Step 5 */}
              <div className="relative rounded-2xl p-6 bg-white/[0.01] border border-white/5 backdrop-blur-xl flex flex-col gap-4 group hover:border-cyber-green/30 transition-all duration-300">
                <span className="text-4xl font-black font-orbitron text-white/5 group-hover:text-cyber-green/20 transition-colors">05</span>
                <h3 className="text-sm font-bold text-white font-display">Launch & Handoff</h3>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  We deploy to your domain, run speed diagnostics, and hand over clean code and comprehensive documentation.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ── SELECTED WORK / SPATIAL HOLOGRAM PROJECTION DISPLAY ── */}
        <section id="work" className="px-6 md:px-12 py-16 md:py-20 relative">
          <div className="max-w-6xl mx-auto flex flex-col gap-14 relative z-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
              <div>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight font-display text-white" style={{ lineHeight: "1.1" }}>
                  Built to be remembered.
                </h2>
              </div>
              
              {/* Spatial control wheels */}
              <div className="flex gap-2 font-mono">
                <button 
                  onClick={() => setActiveSlide((activeSlide - 1 + totalSlides) % totalSlides)}
                  className="w-10 h-10 rounded-xl border border-white/10 bg-[#030308]/60 backdrop-blur-xl flex items-center justify-center hover:bg-cyber-blue/15 hover:text-white hover:border-cyber-blue/40 transition-all cursor-pointer"
                >
                  <ChevronLeft size={16} />
                </button>
                <button 
                  onClick={() => setActiveSlide((activeSlide + 1) % totalSlides)}
                  className="w-10 h-10 rounded-xl border border-white/10 bg-[#030308]/60 backdrop-blur-xl flex items-center justify-center hover:bg-cyber-blue/15 hover:text-white hover:border-cyber-blue/40 transition-all cursor-pointer"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* 3D PERSPECTIVE HOLOGRAPHIC CONTAINER */}
            <div 
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="relative w-full rounded-2xl border border-white/5 bg-[#03030c]/50 backdrop-blur-2xl p-1 md:p-2 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] select-none"
            >
              
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none z-10" />

              <div className="relative w-full min-h-[460px] md:min-h-[480px]">
                {slides.map((slide, index) => {
                  const isActive = index === activeSlide;
                  return (
                    <div 
                      key={slide.num}
                      className={`absolute inset-0 p-6 md:p-10 transition-all duration-700 ease-in-out flex flex-col justify-between ${
                        isActive ? 'opacity-100 scale-100 pointer-events-auto [transform:rotateX(0deg)]' : 'opacity-0 scale-95 pointer-events-none [transform:rotateX(8deg)_translateY(20px)]'
                      }`}
                      style={{ transformStyle: 'preserve-3d', perspective: '1200px' }}
                    >
                      {/* Premium 2035 Browser Hologram Mockup */}
                      <div className="flex-1 rounded-2xl border border-white/10 bg-[#03030b]/90 overflow-hidden flex flex-col shadow-2xl relative">
                        
                        {/* Upper Telemetry Bar */}
                        <div className="px-5 py-3 bg-white/[0.02] border-b border-light/5 flex items-center justify-between font-mono text-[9px]">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-cyber-rose animate-pulse" />
                            <span className="text-gray-500 uppercase">SYS_SECURE_CHANNEL</span>
                          </div>
                          <div className="bg-black/40 rounded-lg py-1 px-4 text-center text-cyber-blue tracking-widest truncate font-semibold">
                            {slide.mockupType === "campus" ? "campusprime.in" : `${slide.label.toLowerCase().replace(/\s+/g, '')}.node`}
                          </div>
                          <div className="text-gray-500 hidden sm:block">INDEX: {slide.num}</div>
                        </div>

                        {/* Custom viewport */}
                        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden bg-gradient-to-tr from-black via-[#03030b] to-[#0d011c]">
                          
                          {/* Inner glowing grids */}
                          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:16px_16px]" />

                          <div className="flex justify-between items-center text-xs font-mono">
                            <span className="font-extrabold text-white text-sm tracking-widest font-display flex items-center gap-1.5">
                              <Zap size={12} className="text-cyber-blue animate-pulse" /> {slide.label}
                            </span>
                            <div className="flex gap-4 text-gray-500 text-[10px]">
                              <span>STABILITY_PASS</span>
                              <span>SEC_LEVEL_6</span>
                            </div>
                          </div>

                          <div className="my-auto max-w-lg mt-6 relative z-10">
                            <span className="inline-block text-[9px] font-mono tracking-[0.22em] text-cyber-blue py-0.5 px-2 rounded bg-cyber-blue/5 border border-cyber-blue/20 uppercase mb-3">
                              {slide.badge}
                            </span>
                            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-none mb-3 font-display">
                              {slide.title}
                            </h3>
                            <p className="text-xs text-gray-400 font-mono leading-relaxed">
                              {slide.sub}
                            </p>
                          </div>

                          {/* Render dynamic spatial blocks */}
                          {slide.stats && (
                            <div className="grid grid-cols-4 gap-4 pt-4 border-t border-white/5 mt-auto relative z-10 font-mono">
                              {slide.stats.map((s, idx) => (
                                <div key={idx}>
                                  <span className="block text-sm md:text-lg font-black text-white font-orbitron">{s.value}</span>
                                  <span className="text-[8px] text-gray-500 tracking-wider uppercase">{s.label}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {slide.products && (
                            <div className="flex gap-3 pt-4 border-t border-white/5 mt-auto relative z-10 font-mono">
                              {slide.products.map((p, idx) => (
                                <div key={idx} className="flex-1 p-3 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col items-center gap-1 hover:border-cyber-rose/30 transition-colors">
                                  <span className="text-lg">{p.icon}</span>
                                  <span className="text-[9px] text-gray-400">{p.name}</span>
                                  <span className="text-xs font-black text-cyber-rose">{p.price}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {slide.chart && (
                            <div className="flex flex-col gap-2 pt-4 border-t border-white/5 mt-auto relative z-10 font-mono">
                              <span className="text-[9px] text-gray-500 tracking-widest uppercase">AMPLIFY CORE COGNITIVE STREAM</span>
                              <div className="flex gap-1.5 items-end h-16 w-full max-w-xs">
                                <div className="flex-1 bg-cyber-blue/10 rounded-t h-1/3" />
                                <div className="flex-1 bg-cyber-blue/30 rounded-t h-2/3 animate-pulse" />
                                <div className="flex-1 bg-cyber-blue/20 rounded-t h-1/2" />
                                <div className="flex-1 bg-gradient-to-t from-cyber-rose to-cyber-purple rounded-t h-[90%]" />
                                <div className="flex-1 bg-cyber-purple/20 rounded-t h-[60%]" />
                                <div className="flex-1 bg-cyber-blue/40 rounded-t h-[40%]" />
                              </div>
                            </div>
                          )}

                          {slide.skills && (
                            <div className="flex gap-1.5 flex-wrap mt-auto relative z-10 font-mono">
                              {slide.skills.map((sk) => (
                                <span key={sk} className="text-[9px] px-2.5 py-1 rounded-lg bg-cyber-purple/10 border border-cyber-purple/20 text-cyber-purple font-semibold uppercase tracking-wider">
                                  {sk}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Lower projection dashboard panel */}
              <div className="px-6 md:px-10 py-4 border-t border-white/5 bg-black/50 backdrop-blur-xl flex items-center justify-between z-20 relative font-mono">
                <div>
                  <span className="text-sm font-black text-white font-display">
                    {slides[activeSlide].label}
                  </span>
                  <span className="text-[10px] text-gray-500 tracking-wide ml-4 hidden sm:inline">
                    [{slides[activeSlide].tag}]
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  {slides[activeSlide].url ? (
                    <a 
                      href={slides[activeSlide].url} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="px-3.5 py-1.5 rounded-xl border border-cyber-blue/40 bg-cyber-blue/5 text-[10px] text-cyber-blue font-semibold tracking-wider uppercase flex items-center gap-1 hover:bg-cyber-blue/15 transition-all"
                    >
                      LIVE HANDSHAKE <ExternalLink size={10} />
                    </a>
                  ) : (
                    <span className="text-[8px] tracking-widest text-cyber-rose font-bold uppercase py-1 px-2.5 rounded bg-cyber-rose/10 border border-cyber-rose/20 animate-pulse">
                      READY FOR SYNC
                    </span>
                  )}
                  <span className="text-xs text-cyber-blue font-bold font-orbitron">
                    {slides[activeSlide].num}
                  </span>
                </div>
              </div>

            </div>

            {/* Slider Dot Matrix navigation with precise layout */}
            <div className="flex justify-center gap-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === activeSlide ? 'w-8 bg-cyber-blue shadow-[0_0_12px_var(--color-cyber-blue)]' : 'bg-gray-700 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ARCHITECTURE SECTION ── */}
        <section id="faq" className="px-6 md:px-12 py-16 md:py-20 relative border-t border-white/5 bg-[#030308]">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(0,242,254,0.012)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyber-purple/5 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-4xl mx-auto relative z-10">
            {/* Header / Subtitle badge */}
            <div id="faq-header" className="text-center flex flex-col items-center gap-3 mb-16">
              <span className="text-[10px] text-cyber-blue font-mono tracking-[0.25em] uppercase px-3 py-1 bg-cyber-blue/5 border border-cyber-blue/25 rounded-md shadow-[0_0_15px_rgba(0,242,254,0.1)]">
                ✦ SECURE FAQ DIRECTORY
              </span>
              <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white mt-1">
                Frequently Asked <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue via-[#a5b4fc] to-cyber-purple font-normal italic font-serif">
                  Questions.
                </span>
              </h2>
              <p className="max-w-md text-xs text-gray-400 font-mono mt-2 leading-relaxed">
                Clarifying our high-speed development pipelines, custom pricing logic, and bespoke design procedures.
              </p>
            </div>

            {/* Accordion container */}
            <div id="faq-accordion-list" className="flex flex-col gap-4">
              {faqData.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div 
                    id={`faq-item-${index}`}
                    key={index}
                    className={`rounded-2xl border transition-all duration-300 backdrop-blur-2xl overflow-hidden ${
                      isOpen 
                        ? "bg-[#03030c]/70 border-cyber-blue/35 shadow-[0_0_25px_rgba(0,170,255,0.08)]" 
                        : "bg-[#030308]/40 border-white/5 hover:border-white/10 hover:bg-[#03030a]/60"
                    }`}
                  >
                    <button
                      id={`faq-btn-${index}`}
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className="w-full text-left px-5 md:px-7 py-5 flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <div className="flex gap-4 items-center">
                        <span className={`font-orbitron font-extrabold text-[10px] md:text-xs shrink-0 tracking-widest ${
                          isOpen ? "text-cyber-blue" : "text-gray-500"
                        }`}>
                          [0{index + 1}]
                        </span>
                        <span className="text-xs md:text-sm font-bold text-gray-200 hover:text-white transition-colors tracking-wide font-mono">
                          {faq.question}
                        </span>
                      </div>
                      
                      <div className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center border transition-all duration-300 ${
                        isOpen 
                          ? "bg-cyber-blue/10 border-cyber-blue text-cyber-blue" 
                          : "bg-white/[0.02] border-white/10 text-gray-400"
                      }`}>
                        <ChevronDown 
                          size={14} 
                          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-answer-container-${index}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                          <div className="px-5 md:px-7 pb-6 pt-1 border-t border-white/[0.03] text-gray-400 leading-relaxed font-mono text-[11px] md:text-xs">
                            <p className="text-gray-400">
                              {faq.answer}
                            </p>
                            {/* Accent indicator line inside */}
                            <div className="w-6 h-[1.5px] bg-cyber-blue/40 mt-4 rounded" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── SPATIAL PORTAL OUTRO / SECURE FINAL CTA ── */}
        <section className="relative px-6 md:px-12 py-16 md:py-24 text-center overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-blue/5 rounded-full blur-[140px] pointer-events-none" />
          
          <div className="max-w-4xl mx-auto flex flex-col gap-6 relative z-10">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight font-display text-white" style={{ lineHeight: "1.1" }}>
              Let's build something worth<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-purple font-normal italic font-serif">
                talking about.
              </span>
            </h2>
            <p className="max-w-md mx-auto text-xs md:text-sm leading-relaxed text-gray-400 font-mono">
              Join the waitlist today and get an on-demand, free 30-minute strategy call + custom website audit.
            </p>

            <div className="mt-6">
              <a 
                href="#waitlist" 
                onMouseEnter={ringHoverEnter}
                onMouseLeave={ringHoverLeave}
                className="inline-block relative py-4 px-10 rounded-xl bg-gradient-to-r from-cyber-blue to-cyber-purple text-black font-extrabold text-xs font-mono tracking-widest uppercase hover:opacity-90 shadow-[0_0_35px_rgba(0,170,255,0.45)] transition-all"
              >
                Claim Your Free Audit →
              </a>
            </div>

            <p className="text-[8px] text-gray-500 tracking-[0.22em] font-mono uppercase mt-4">
              NO COMMITMENT · RESPONSE WITHIN 24H · FREE STRATEGY AUDIT INCLUDED
            </p>
          </div>
        </section>

        {/* ── FUTURE FOOTER TRANSP0RT ── */}
        <footer className="px-6 md:px-12 py-10 border-t border-white/5 bg-[#010103] flex flex-col sm:flex-row justify-between items-center gap-6 relative z-10 text-[10px] text-gray-500 font-mono tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <span className="font-extrabold font-orbitron text-cyber-blue">18spar</span>
            <span>CUSTOM DESIGN STUDIO</span>
          </div>

          <p>© 2026 18spar. All rights reserved.</p>

          <p>
            <a href="mailto:content2u.sj@gmail.com" className="hover:text-cyber-blue transition-colors hover:underline text-white">
              content2u.sj@gmail.com
            </a>
          </p>
        </footer>

      </main>

    </div>
  );
}
