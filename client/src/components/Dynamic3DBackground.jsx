import { useState, useEffect, useRef } from 'react';

export function Dynamic3DBackground({ activeTab, customBgConfig }) {
  const canvasRef = useRef(null);

  // Background config with fallback defaults
  const config = customBgConfig || {
    theme: 'auto', // 'auto', 'galaxy3d', 'neonwaves', 'crystals3d', 'aurora3d', 'cybergrid', 'custom_image'
    customUrl: '',
    customType: 'image', // 'image' or 'video'
    opacity: 0.85,
    blur: 0,
    speed: 1.0,
  };

  // Determine active 3D theme based on tab if theme is 'auto'
  const effectiveTheme = config.theme === 'auto' ? (
    activeTab === 'dashboard' ? 'neonwaves' :
    activeTab === 'schedule' ? 'crystals3d' :
    activeTab === 'goals' ? 'aurora3d' :
    activeTab === 'summary' || activeTab === 'docs' ? 'cybergrid' : 'galaxy3d'
  ) : config.theme;

  useEffect(() => {
    if (config.theme === 'custom_image' && config.customUrl) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Pause background canvas rendering during scroll for 60fps smooth scrolling
    let isScrolling = false;
    let scrollTimeout = null;
    const handleScroll = () => {
      isScrolling = true;
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 200);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Lightweight ambient particles (12 particles max)
    const particleCount = 12;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * 1000 + 1,
        radius: Math.random() * 2 + 0.8,
        color: ['#f472b6', '#c084fc', '#818cf8', '#38bdf8', '#fef08a'][i % 5],
        speedZ: (Math.random() * 1.5 + 0.5) * config.speed,
        angle: Math.random() * Math.PI * 2,
      });
    }

    let waveAngle = 0;
    let lastFrameTime = 0;
    const TARGET_FPS = 24; // Smooth, ultra-low CPU background
    const FRAME_INTERVAL = 1000 / TARGET_FPS;

    const render = (timestamp) => {
      // Zero CPU/GPU usage when tab is hidden or when user is scrolling
      if (document.hidden || isScrolling) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Throttle frame rate
      if (timestamp - lastFrameTime < FRAME_INTERVAL) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      lastFrameTime = timestamp;
      ctx.clearRect(0, 0, width, height);

      // Render Theme-Specific 3D Canvas Visuals
      if (effectiveTheme === 'galaxy3d') {
        const cx = width / 2;
        const cy = height / 2;

        particles.forEach((p) => {
          p.z -= p.speedZ * 1.5;
          if (p.z <= 0) {
            p.z = 1000;
            p.x = Math.random() * width - width / 2;
            p.y = Math.random() * height - height / 2;
          }

          const k = 400 / p.z;
          const px = p.x * k + cx;
          const py = p.y * k + cy;

          if (px >= 0 && px <= width && py >= 0 && py <= height) {
            const size = Math.max(0.5, (1 - p.z / 1000) * p.radius * 2.5);
            const alpha = Math.min(1, (1 - p.z / 1000) * 0.9);

            ctx.beginPath();
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = alpha;
            // shadowBlur bị tắt vì cực kỳ tốn GPU trên mỗi frame
            ctx.fill();
          }
        });
      } else if (effectiveTheme === 'neonwaves') {
        ctx.globalAlpha = 0.35;
        ctx.strokeStyle = '#c084fc';
        ctx.lineWidth = 1.5;
        waveAngle += 0.02 * config.speed;

        const gridStep = 90;
        for (let x = 0; x < width; x += gridStep) {
          ctx.beginPath();
          for (let y = 0; y < height; y += 45) {
            const z = Math.sin(x * 0.005 + waveAngle) * Math.cos(y * 0.005 + waveAngle) * 35;
            const drawX = x + z * 0.3;
            const drawY = y + z * 0.5;
            if (y === 0) ctx.moveTo(drawX, drawY);
            else ctx.lineTo(drawX, drawY);
          }
          ctx.stroke();
        }
      } else if (effectiveTheme === 'aurora3d') {
        waveAngle += 0.01 * config.speed;
        const grad = ctx.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0, `hsla(${(waveAngle * 20) % 360}, 80%, 20%, 0.4)`);
        grad.addColorStop(0.5, `hsla(${(waveAngle * 20 + 90) % 360}, 80%, 15%, 0.3)`);
        grad.addColorStop(1, `hsla(${(waveAngle * 20 + 180) % 360}, 80%, 10%, 0.4)`);

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      } else if (effectiveTheme === 'crystals3d') {
        waveAngle += 0.015 * config.speed;
        particles.forEach((p, idx) => {
          p.y -= 0.8 * config.speed;
          if (p.y < -height / 2) p.y = height / 2;

          const px = p.x + width / 2 + Math.sin(waveAngle + idx) * 20;
          const py = p.y + height / 2;

          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(waveAngle + idx);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = 0.4;
          // shadowBlur tắt để tối ưu

          ctx.beginPath();
          ctx.moveTo(0, -p.radius * 5);
          ctx.lineTo(p.radius * 4, 0);
          ctx.lineTo(0, p.radius * 5);
          ctx.lineTo(-p.radius * 4, 0);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        });
      } else if (effectiveTheme === 'cybergrid') {
        ctx.globalAlpha = 0.25;
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1;
        waveAngle += 0.03 * config.speed;

        for (let i = 0; i < width; i += 60) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i, height);
          ctx.stroke();
        }
        for (let j = (waveAngle * 30) % 60; j < height; j += 60) {
          ctx.beginPath();
          ctx.moveTo(0, j);
          ctx.lineTo(width, j);
          ctx.stroke();
        }
      }

      

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [effectiveTheme, config.speed, config.theme, config.customUrl]);

  return (
    <div
      className="no-print pointer-events-none fixed inset-0 z-0 overflow-hidden select-none transition-all duration-700"
      style={{
        opacity: config.opacity !== undefined ? config.opacity : 0.85,
        filter: config.blur ? `blur(${config.blur}px)` : 'none',
        willChange: 'transform', // GPU compositing hint
      }}
    >
      {/* Render Custom Image or Video Background with Horizontal Continuous 3D Scrolling if Image set */}
      {config.theme === 'custom_image' && config.customUrl ? (
        config.customType === 'video' ? (
          <video
            src={config.customUrl}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          />
        ) : (
          /* Horizontal 3D Endless Parallax Panning Image Background */
          <div className="relative h-full w-full overflow-hidden">
            <div
              className="absolute inset-0 flex h-full w-[200%] animate-horizontalPan"
              style={{
                backgroundImage: `url("${config.customUrl}")`,
                backgroundRepeat: 'repeat-x',
                backgroundSize: 'contain',
              }}
            />
          </div>
        )
      ) : (
        /* Dynamic 3D WebGL / HTML5 Canvas Element with Horizontal Running Elements */
        <canvas ref={canvasRef} className="h-full w-full block" />
      )}
    </div>
  );
}
