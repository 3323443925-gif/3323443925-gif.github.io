import { useEffect, useRef } from 'react';
import { Mesh, Program, Renderer, Triangle } from 'ogl';
import { useReducedMotion } from 'motion/react';
import { CSS_FALLBACK_BACKGROUND, GRADIENT_PALETTE, fragmentShader, hexToRgb, vertexShader } from '../gl/mesh';

interface MeshGradientProps {
  seed: number;
  className?: string;
}

export default function MeshGradient({ seed, className = '' }: MeshGradientProps) {
  const reduced = useReducedMotion();
  const parentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const parent = parentRef.current;
    if (!parent || reduced) return;

    let renderer: Renderer;
    try {
      const mobile = window.innerWidth < 768;
      renderer = new Renderer({
        dpr: mobile ? 1 : Math.min(window.devicePixelRatio, 1.5),
        alpha: false,
        antialias: false,
      });
    } catch {
      return; // 保留 CSS 渐变回退
    }
    const gl = renderer.gl;
    if (!gl) return;

    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.opacity = '0';
    canvas.style.transition = 'opacity 0.8s ease';
    parent.appendChild(canvas);

    const geometry = new Triangle(gl);
    const uniforms = {
      uTime: { value: 0 },
      uRes: { value: [1, 1] },
      uMouse: { value: [0.7, 0.6] },
      uStrength: { value: 0 },
      uSeed: { value: seed },
      uBase: { value: hexToRgb(GRADIENT_PALETTE.base) },
      uC0: { value: hexToRgb(GRADIENT_PALETTE.c0) },
      uC1: { value: hexToRgb(GRADIENT_PALETTE.c1) },
      uC2: { value: hexToRgb(GRADIENT_PALETTE.c2) },
      uC3: { value: hexToRgb(GRADIENT_PALETTE.c3) },
      uC4: { value: hexToRgb(GRADIENT_PALETTE.c4) },
    };
    const program = new Program(gl, { vertex: vertexShader, fragment: fragmentShader, uniforms });
    const mesh = new Mesh(gl, { geometry, program });

    const setSize = () => {
      const w = parent.clientWidth || 1;
      const h = parent.clientHeight || 1;
      renderer.setSize(w, h);
      uniforms.uRes.value = [w, h];
    };
    setSize();
    const ro = new ResizeObserver(setSize);
    ro.observe(parent);

    const fine = window.matchMedia('(pointer: fine)').matches;
    const mouse = { x: 0.7, y: 0.6 };
    const target = { x: 0.7, y: 0.6 };
    let strength = 0;
    let strengthTarget = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const inside =
        e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      target.x = (e.clientX - rect.left) / rect.width;
      target.y = 1 - (e.clientY - rect.top) / rect.height;
      strengthTarget = inside ? 1 : 0;
    };
    if (fine) window.addEventListener('pointermove', onPointerMove, { passive: true });

    let raf = 0;
    let running = false;
    let inView = true;
    let tabVisible = !document.hidden;
    let firstFrame = true;
    const start = performance.now();

    const loop = (now: number) => {
      if (!running) return;
      const time = (now - start) / 1000;
      uniforms.uTime.value = time;
      if (!fine) {
        target.x = 0.5 + 0.28 * Math.sin(time * 0.21);
        target.y = 0.55 + 0.2 * Math.sin(time * 0.17);
        strengthTarget = 0.6;
      }
      mouse.x += (target.x - mouse.x) * 0.045;
      mouse.y += (target.y - mouse.y) * 0.045;
      strength += (strengthTarget - strength) * 0.045;
      uniforms.uMouse.value = [mouse.x, mouse.y];
      uniforms.uStrength.value = strength;
      renderer.render({ scene: mesh });
      if (firstFrame) {
        firstFrame = false;
        canvas.style.opacity = '1';
      }
      raf = requestAnimationFrame(loop);
    };

    const sync = () => {
      const shouldRun = inView && tabVisible;
      if (shouldRun && !running) {
        running = true;
        raf = requestAnimationFrame(loop);
      } else if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? true;
        sync();
      },
      { threshold: 0 },
    );
    io.observe(parent);
    const onVisibility = () => {
      tabVisible = !document.hidden;
      sync();
    };
    document.addEventListener('visibilitychange', onVisibility);
    sync();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      if (fine) window.removeEventListener('pointermove', onPointerMove);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      canvas.remove();
    };
  }, [seed, reduced]);

  return (
    <div ref={parentRef} aria-hidden="true" className={`pointer-events-none overflow-hidden ${className}`}>
      <div
        className="absolute inset-0"
        style={{ backgroundColor: GRADIENT_PALETTE.base, backgroundImage: CSS_FALLBACK_BACKGROUND }}
      />
    </div>
  );
}
