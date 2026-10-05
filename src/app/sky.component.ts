import { Component, ElementRef, NgZone, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';

interface Star { x: number; y: number; z: number; r: number; p: number; s: number; }
interface Shoot { x: number; y: number; vx: number; vy: number; life: number; }

@Component({
  selector: 'app-sky',
  template: '<canvas #c></canvas>',
  styles: [`:host{position:fixed;inset:0;z-index:0;pointer-events:none;
    background:radial-gradient(ellipse at 75% 10%,#1b1235 0%,#0b0916 45%,#06050c 100%)}
    canvas{width:100%;height:100%;display:block}`]
})
export class SkyComponent implements AfterViewInit, OnDestroy {
  @ViewChild('c', { static: true }) ref!: ElementRef<HTMLCanvasElement>;
  private raf = 0; private stars: Star[] = []; private shoots: Shoot[] = [];
  private mx = 0; private my = 0; private tx = 0; private ty = 0; private sy = 0;
  private w = 0; private h = 0; private dpr = 1;
  private reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  constructor(private zone: NgZone) {}

  private move = (e: MouseEvent) => { this.tx = e.clientX / innerWidth - .5; this.ty = e.clientY / innerHeight - .5; };
  private scroll = () => { this.sy = scrollY; };
  private resize = () => {
    const c = this.ref.nativeElement; this.dpr = Math.min(devicePixelRatio || 1, 2);
    this.w = innerWidth; this.h = innerHeight;
    c.width = this.w * this.dpr; c.height = this.h * this.dpr;
    const n = Math.floor(this.w * this.h / 5500);
    this.stars = Array.from({ length: n }, () => {
      const z = Math.random();
      return { x: Math.random(), y: Math.random(), z, r: .3 + z * 1.3, p: Math.random() * 6.28, s: .5 + Math.random() * 1.5 };
    });
  };

  ngAfterViewInit() {
    this.resize();
    addEventListener('resize', this.resize); addEventListener('mousemove', this.move); addEventListener('scroll', this.scroll, { passive: true });
    this.zone.runOutsideAngular(() => this.loop(0));
  }
  ngOnDestroy() {
    cancelAnimationFrame(this.raf);
    removeEventListener('resize', this.resize); removeEventListener('mousemove', this.move); removeEventListener('scroll', this.scroll);
  }

  private loop = (t: number) => {
    const ctx = this.ref.nativeElement.getContext('2d')!;
    const { w, h, dpr } = this; const time = t / 1000;
    this.mx += (this.tx - this.mx) * .04; this.my += (this.ty - this.my) * .04;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);

    // drifting nebula glows
    for (const [cx, cy, rad, col] of [[.2, .35, .5, '124,92,255'], [.85, .7, .45, '70,110,255']] as const) {
      const x = cx * w + Math.sin(time * .08 + cx * 9) * 60 - this.mx * 40, y = cy * h + Math.cos(time * .07 + cy * 9) * 40;
      const g = ctx.createRadialGradient(x, y, 0, x, y, rad * w);
      g.addColorStop(0, `rgba(${col},.10)`); g.addColorStop(1, `rgba(${col},0)`);
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    }
    // stars: twinkle, mouse + scroll parallax, slow drift
    for (const s of this.stars) {
      const px = ((s.x * w + time * s.z * 4 - this.mx * s.z * 30) % w + w) % w;
      const py = ((s.y * h - this.sy * s.z * .08 - this.my * s.z * 30) % h + h) % h;
      const a = this.reduce ? .7 : .35 + .65 * (.5 + .5 * Math.sin(time * s.s + s.p));
      ctx.globalAlpha = a * (.4 + s.z * .6);
      ctx.fillStyle = s.z > .85 ? '#cdbdff' : '#ffffff';
      ctx.beginPath(); ctx.arc(px, py, s.r, 0, 6.283); ctx.fill();
      if (s.z > .93) { ctx.globalAlpha *= .35; ctx.fillRect(px - 5, py - .3, 10, .6); ctx.fillRect(px - .3, py - 5, .6, 10); }
    }
    // shooting stars
    if (!this.reduce && Math.random() < .004) this.shoots.push({ x: Math.random() * w, y: Math.random() * h * .5, vx: 9 + Math.random() * 5, vy: 4 + Math.random() * 3, life: 1 });
    this.shoots = this.shoots.filter(s => s.life > 0);
    for (const s of this.shoots) {
      const g = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 9, s.y - s.vy * 9);
      g.addColorStop(0, `rgba(220,205,255,${s.life})`); g.addColorStop(1, 'rgba(220,205,255,0)');
      ctx.globalAlpha = 1; ctx.strokeStyle = g; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x - s.vx * 9, s.y - s.vy * 9); ctx.stroke();
      s.x += s.vx; s.y += s.vy; s.life -= .018;
    }
    ctx.globalAlpha = 1;
    this.raf = requestAnimationFrame(this.loop);
  };
}
