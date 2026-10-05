import { Component, AfterViewInit, OnDestroy, signal } from '@angular/core';
import { SkyComponent } from './sky.component';

@Component({
  selector: 'app-root',
  imports: [SkyComponent],
  template: `
  <app-sky />
  <header class="top">
    <a class="logo" href="#hello" (click)="go($event,'hello')"><span class="spark">✦</span> alex morgan <em>/ dev</em></a>
    <nav><a href="#projects" (click)="go($event,'projects')">Projects</a>
      <span class="pill"><i></i>Open to opportunities</span></nav>
  </header>

  <aside class="side">
    <p class="mono dim">EXPLORING / 0{{ index() + 1 }}</p>
    <ul>
      @for (s of sections; track s.id; let i = $index) {
        <li [class.active]="active() === s.id">
          <a [href]="'#' + s.id" (click)="go($event, s.id)"><span class="dot"></span>{{ s.label }}
            @if (active() === s.id) { <small class="mono">0{{ i + 1 }}</small> }</a>
        </li>
      }
    </ul>
  </aside>

  <main>
    <section id="hello" class="sec hero">
      <p class="eyebrow"><b>01</b><u></u>HELLO, WORLD</p>
      <h1>Turning ideas<br>into <span class="acc">digital<br>experiences.</span></h1>
      <p class="lead">I'm Alex, a full-stack developer who brings thoughtful design and reliable engineering to the same orbit.</p>
      <div class="btns">
        <a class="btn primary" href="#projects" (click)="go($event,'projects')">Explore my work <span class="arr down">↓</span></a>
        <a class="btn ghost" href="#contact" (click)="go($event,'contact')">Let's talk <span class="arr">↗</span></a>
      </div>
      <div class="strip mono dim"><span>FULL-STACK DEVELOPMENT &nbsp;/&nbsp; CREATIVE PROBLEM SOLVING</span><span class="sans">A little further down ↓</span></div>
    </section>

    <section id="about" class="sec">
      <p class="eyebrow"><b>02</b><u></u>A BIT ABOUT ME</p>
      <h2>Curious by nature.<br>Builder by choice.</h2>
      <p class="body">I love the space where a good idea becomes something people can actually use. I build fast, accessible web products with clean interfaces and even cleaner code.</p>
      <p class="body">From the first sketch to the final deployment, I care about the details: how it feels, how it scales, and how it makes someone's day a little easier.</p>
      <p class="acc small">✧ Off-screen: coffee, night walks, and one more side project.</p>
    </section>

    <section id="tech" class="sec">
      <p class="eyebrow"><b>03</b><u></u>MY TOOLKIT</p>
      <h2>The tools behind the craft.</h2>
      <div class="grid3">
        @for (g of tools; track g.title) {
          <div class="card glow" (mousemove)="glow($event)">
            <h4><span class="acc">{{ g.icon }}</span> {{ g.title }}</h4>
            @for (t of g.items; track t.name) {
              <div class="tool"><span class="badge mono">{{ t.badge }}</span>
                <div><strong>{{ t.name }}</strong><small>{{ t.desc }}</small></div></div>
            }
          </div>
        }
      </div>
    </section>

    <section id="projects" class="sec">
      <p class="eyebrow"><b>04</b><u></u>SELECTED WORK</p>
      <h2>Ideas shipped into the world.</h2>
      <div class="grid2">
        @for (p of projects; track p.name; let i = $index) {
          <article class="proj">
            <div class="thumb glow" (mousemove)="glow($event)" [style.background]="p.bg">
              <div class="mock" [style.color]="p.fg"><small>{{ p.name.toLowerCase() }}</small><b>{{ p.tag }}</b></div>
            </div>
            <p class="mono dim">0{{ i + 1 }} / {{ p.kind }}</p>
            <h3>{{ p.name }} <span class="arr">↗</span></h3>
            <p class="body sm">{{ p.desc }}</p>
            <div class="chips">@for (c of p.stack; track c) { <span class="mono">{{ c }}</span> }</div>
            <p class="mono dim tiny">{{ p.meta }}</p>
            <p class="links"><a href="#">Live demo <span class="arr">↗</span></a><a href="#">Source code <span class="arr">↗</span></a></p>
          </article>
        }
      </div>
    </section>

    <section id="contact" class="sec">
      <div class="cta glow" (mousemove)="glow($event)">
        <p class="eyebrow"><b>05</b><u></u>LET'S CONNECT</p>
        <h2>Have something in mind?<br><span class="acc">Let's make it happen.</span></h2>
        <p class="body">A project, a role, or just a good conversation. I'm always happy to connect with people building thoughtful things.</p>
        <div class="mail"><a class="email" href="mailto:hello@alexmorgan.dev">hello@alexmorgan.dev <span class="arr">↗</span></a>
          <span class="soc"><a href="#">GitHub <span class="arr">↗</span></a><a href="#">LinkedIn <span class="arr">↗</span></a></span></div>
      </div>
      <footer class="mono dim"><span>© 2026 Alex Morgan</span><span class="sans">Built with intention. A little stardust, too. ✦</span>
        <a href="#hello" (click)="go($event,'hello')" class="sans">Back to top ↑</a></footer>
    </section>
  </main>`
})
export class AppComponent implements AfterViewInit, OnDestroy {
  sections = [
    { id: 'hello', label: 'Hello' }, { id: 'about', label: 'About me' }, { id: 'tech', label: 'Tech stack' },
    { id: 'projects', label: 'Projects' }, { id: 'contact', label: 'Contact' }];
  active = signal('hello');
  index = () => this.sections.findIndex(s => s.id === this.active());
  private io?: IntersectionObserver;

  tools = [
    { icon: '</>', title: 'Frontend', items: [
      { badge: 'TS', name: 'TypeScript', desc: 'Type-safe foundations' },
      { badge: 'R', name: 'React & Next.js', desc: 'Interfaces that feel effortless' },
      { badge: 'tw', name: 'Tailwind CSS', desc: 'Consistent, responsive styling' }] },
    { icon: '⛁', title: 'Backend & data', items: [
      { badge: 'JS', name: 'Node.js', desc: 'Reliable APIs and services' },
      { badge: 'Py', name: 'Python', desc: 'Automation and data workflows' },
      { badge: 'Pg', name: 'PostgreSQL', desc: 'Structured data, built to scale' }] },
    { icon: '>_', title: 'Workflow & delivery', items: [
      { badge: 'git', name: 'Git & GitHub', desc: 'Versioned, collaborative work' },
      { badge: '>_', name: 'Docker & Vercel', desc: 'From local to live' },
      { badge: 'F', name: 'Figma & Vitest', desc: 'Designed with care. Tested, too.' }] }];

  projects = [
    { name: 'Pulse', kind: 'ANALYTICS PLATFORM', tag: 'Your business, at a glance.', bg: '#1c1630', fg: '#e9e4ff',
      desc: 'Making complex data feel simple. A real-time analytics dashboard with a clear view of revenue, customers, and the metrics that matter.',
      stack: ['Next.js', 'TypeScript', 'PostgreSQL'], meta: 'Full-stack development · Data visualization · Responsive UI' },
    { name: 'Atlas Journal', kind: 'EDITORIAL EXPERIENCE', tag: 'A slower way to see the world.', bg: '#ecebe0', fg: '#222',
      desc: 'A quieter corner of the internet. A content-driven travel journal with immersive storytelling, a custom CMS, and a focus on accessibility.',
      stack: ['React', 'Sanity', 'Tailwind'], meta: 'Frontend development · CMS integration · Accessible design' },
    { name: 'Orbit', kind: 'COLLABORATION TOOL', tag: 'Make room for great work.', bg: '#e9e4ff', fg: '#1a1330',
      desc: 'Less busywork, more momentum. A collaborative project workspace with drag-and-drop boards, live updates, and a little room to breathe.',
      stack: ['React', 'Node.js', 'WebSockets'], meta: 'Full-stack development · Real-time sync · Authentication' }];

  ngAfterViewInit() {
    this.io = new IntersectionObserver(es => {
      for (const e of es) if (e.isIntersecting) this.active.set(e.target.id);
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('section.sec').forEach(s => this.io!.observe(s));
  }
  ngOnDestroy() { this.io?.disconnect(); }

  go(e: Event, id: string) { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }
  glow(e: MouseEvent) {
    const el = e.currentTarget as HTMLElement, r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`); el.style.setProperty('--my', `${e.clientY - r.top}px`);
  }
}
