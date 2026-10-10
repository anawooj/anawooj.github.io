import { Component } from '@angular/core';
import { Glow } from '../../shared/glow';

interface Project {
  name: string;
  kind: string;
  tag: string;
  bg: string;
  fg: string;
  desc: string;
  stack: string[];
  meta: string;
}

const PROJECTS: Project[] = [
  {
    name: 'Pulse',
    kind: 'ANALYTICS PLATFORM',
    tag: 'Your business, at a glance.',
    bg: '#1c1630',
    fg: '#e9e4ff',
    desc: 'Making complex data feel simple. A real-time analytics dashboard with a clear view of revenue, customers, and the metrics that matter.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL'],
    meta: 'Full-stack development · Data visualization · Responsive UI',
  },
  {
    name: 'Atlas Journal',
    kind: 'EDITORIAL EXPERIENCE',
    tag: 'A slower way to see the world.',
    bg: '#ecebe0',
    fg: '#222',
    desc: 'A quieter corner of the internet. A content-driven travel journal with immersive storytelling, a custom CMS, and a focus on accessibility.',
    stack: ['React', 'Sanity', 'Tailwind'],
    meta: 'Frontend development · CMS integration · Accessible design',
  },
  {
    name: 'Orbit',
    kind: 'COLLABORATION TOOL',
    tag: 'Make room for great work.',
    bg: '#e9e4ff',
    fg: '#1a1330',
    desc: 'Less busywork, more momentum. A collaborative project workspace with drag-and-drop boards, live updates, and a little room to breathe.',
    stack: ['React', 'Node.js', 'WebSockets'],
    meta: 'Full-stack development · Real-time sync · Authentication',
  },
];

@Component({
  selector: 'app-projects',
  imports: [Glow],
  styleUrl: './projects.scss',
  template: `
    <section id="projects" class="sec">
      <p class="eyebrow"><b>04</b><u></u>SELECTED WORK</p>

      <h2>Ideas shipped into the world.</h2>

      <div class="grid">
        @for (project of projects; track project.name; let i = $index) {
          <article class="proj">
            <div class="thumb" appGlow [style.background]="project.bg">
              <div class="mock" [style.color]="project.fg">
                <small>{{ project.name.toLowerCase() }}</small>
                <b>{{ project.tag }}</b>
              </div>
            </div>

            <p class="mono dim">0{{ i + 1 }} / {{ project.kind }}</p>
            <h3>{{ project.name }} <span class="arr">↗</span></h3>
            <p class="body sm">{{ project.desc }}</p>

            <div class="chips">
              @for (tech of project.stack; track tech) {
                <span class="mono">{{ tech }}</span>
              }
            </div>

            <p class="mono dim tiny">{{ project.meta }}</p>

            <p class="links">
              <a href="#">Live demo <span class="arr">↗</span></a>
              <a href="#">Source code <span class="arr">↗</span></a>
            </p>
          </article>
        }
      </div>
    </section>
  `,
})
export class Projects {
  protected readonly projects = PROJECTS;
}
