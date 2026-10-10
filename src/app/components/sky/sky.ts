import { afterNextRender, Component, DestroyRef, ElementRef, inject, viewChild } from '@angular/core';

interface Star {
  x: number;
  y: number;
  z: number; // depth: 0 = far, 1 = near
  r: number;
  phase: number;
  speed: number;
}

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

const NEBULAE = [
  { x: 0.2, y: 0.35, radius: 0.5, rgb: '124,92,255' },
  { x: 0.85, y: 0.7, radius: 0.45, rgb: '70,110,255' },
] as const;

@Component({
  selector: 'app-sky',
  template: '<canvas #canvas></canvas>',
  styles: `
    :host {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      background: radial-gradient(ellipse at 75% 10%, #1b1235 0%, #0b0916 45%, #06050c 100%);
    }

    canvas {
      display: block;
      width: 100%;
      height: 100%;
    }
  `,
})
export class Sky {
  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  private stars: Star[] = [];
  private meteors: Meteor[] = [];
  private width = 0;
  private height = 0;
  private dpr = 1;
  private frame = 0;

  private mouseX = 0;
  private mouseY = 0;
  private targetX = 0;
  private targetY = 0;
  private scrollY = 0;

  private reduceMotion = false; // read in the browser only (no matchMedia during SSR)

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      this.reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

      const onMove = (e: MouseEvent) => {
        this.targetX = e.clientX / innerWidth - 0.5;
        this.targetY = e.clientY / innerHeight - 0.5;
      };
      const onScroll = () => (this.scrollY = scrollY);

      this.resize();
      addEventListener('resize', this.resize);
      addEventListener('mousemove', onMove);
      addEventListener('scroll', onScroll, { passive: true });
      this.frame = requestAnimationFrame(this.draw);

      destroyRef.onDestroy(() => {
        cancelAnimationFrame(this.frame);
        removeEventListener('resize', this.resize);
        removeEventListener('mousemove', onMove);
        removeEventListener('scroll', onScroll);
      });
    });
  }

  private readonly resize = () => {
    const el = this.canvas().nativeElement;
    this.dpr = Math.min(devicePixelRatio || 1, 2);
    this.width = innerWidth;
    this.height = innerHeight;
    el.width = this.width * this.dpr;
    el.height = this.height * this.dpr;

    const count = Math.floor((this.width * this.height) / 5500);
    this.stars = Array.from({ length: count }, () => {
      const z = Math.random();
      return {
        x: Math.random(),
        y: Math.random(),
        z,
        r: 0.3 + z * 1.3,
        phase: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 1.5,
      };
    });
  };

  private readonly draw = (now: number) => {
    const ctx = this.canvas().nativeElement.getContext('2d')!;
    const time = now / 1000;

    this.mouseX += (this.targetX - this.mouseX) * 0.04;
    this.mouseY += (this.targetY - this.mouseY) * 0.04;

    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, this.width, this.height);

    this.drawNebulae(ctx, time);
    this.drawStars(ctx, time);
    this.drawMeteors(ctx);

    ctx.globalAlpha = 1;
    this.frame = requestAnimationFrame(this.draw);
  };

  private drawNebulae(ctx: CanvasRenderingContext2D, time: number) {
    for (const n of NEBULAE) {
      const x = n.x * this.width + Math.sin(time * 0.08 + n.x * 9) * 60 - this.mouseX * 40;
      const y = n.y * this.height + Math.cos(time * 0.07 + n.y * 9) * 40;
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, n.radius * this.width);
      gradient.addColorStop(0, `rgba(${n.rgb},.10)`);
      gradient.addColorStop(1, `rgba(${n.rgb},0)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, this.width, this.height);
    }
  }

  private drawStars(ctx: CanvasRenderingContext2D, time: number) {
    const { width: w, height: h } = this;

    for (const s of this.stars) {
      const x = (((s.x * w + time * s.z * 4 - this.mouseX * s.z * 30) % w) + w) % w;
      const y = (((s.y * h - this.scrollY * s.z * 0.08 - this.mouseY * s.z * 30) % h) + h) % h;
      const twinkle = this.reduceMotion ? 0.7 : 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(time * s.speed + s.phase));

      ctx.globalAlpha = twinkle * (0.4 + s.z * 0.6);
      ctx.fillStyle = s.z > 0.85 ? '#cdbdff' : '#ffffff';
      ctx.beginPath();
      ctx.arc(x, y, s.r, 0, Math.PI * 2);
      ctx.fill();

      // cross-shaped glint on the brightest stars
      if (s.z > 0.93) {
        ctx.globalAlpha *= 0.35;
        ctx.fillRect(x - 5, y - 0.3, 10, 0.6);
        ctx.fillRect(x - 0.3, y - 5, 0.6, 10);
      }
    }
  }

  private drawMeteors(ctx: CanvasRenderingContext2D) {
    if (!this.reduceMotion && Math.random() < 0.004) {
      this.meteors.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height * 0.5,
        vx: 9 + Math.random() * 5,
        vy: 4 + Math.random() * 3,
        life: 1,
      });
    }

    this.meteors = this.meteors.filter((m) => m.life > 0);

    for (const m of this.meteors) {
      const tailX = m.x - m.vx * 9;
      const tailY = m.y - m.vy * 9;
      const gradient = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
      gradient.addColorStop(0, `rgba(220,205,255,${m.life})`);
      gradient.addColorStop(1, 'rgba(220,205,255,0)');

      ctx.globalAlpha = 1;
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(m.x, m.y);
      ctx.lineTo(tailX, tailY);
      ctx.stroke();

      m.x += m.vx;
      m.y += m.vy;
      m.life -= 0.018;
    }
  }
}
