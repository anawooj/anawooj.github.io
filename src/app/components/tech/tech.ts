import { Component } from '@angular/core';
import { Glow } from '../../shared/glow';

interface Tool {
  badge: string;
  name: string;
  desc: string;
}

interface ToolGroup {
  icon: string;
  title: string;
  items: Tool[];
}

const TOOLS: ToolGroup[] = [
  {
    icon: '</>',
    title: 'Frontend',
    items: [
      { badge: 'TS', name: 'TypeScript', desc: 'Type-safe foundations' },
      { badge: 'R', name: 'React & Next.js', desc: 'Interfaces that feel effortless' },
      { badge: 'tw', name: 'Tailwind CSS', desc: 'Consistent, responsive styling' },
    ],
  },
  {
    icon: '⛁',
    title: 'Backend & data',
    items: [
      { badge: 'JS', name: 'Node.js', desc: 'Reliable APIs and services' },
      { badge: 'Py', name: 'Python', desc: 'Automation and data workflows' },
      { badge: 'Pg', name: 'PostgreSQL', desc: 'Structured data, built to scale' },
    ],
  },
  {
    icon: '>_',
    title: 'Workflow & delivery',
    items: [
      { badge: 'git', name: 'Git & GitHub', desc: 'Versioned, collaborative work' },
      { badge: '>_', name: 'Docker & Vercel', desc: 'From local to live' },
      { badge: 'F', name: 'Figma & Vitest', desc: 'Designed with care. Tested, too.' },
    ],
  },
];

@Component({
  selector: 'app-tech',
  imports: [Glow],
  styleUrl: './tech.scss',
  template: `
    <section id="tech" class="sec">
      <p class="eyebrow"><b>03</b><u></u>MY TOOLKIT</p>

      <h2>The tools behind the craft.</h2>

      <div class="grid">
        @for (group of tools; track group.title) {
          <div class="card" appGlow>
            <h4>
              <span class="acc">{{ group.icon }}</span>
              {{ group.title }}
            </h4>

            @for (tool of group.items; track tool.name) {
              <div class="tool">
                <span class="badge mono">{{ tool.badge }}</span>
                <div>
                  <strong>{{ tool.name }}</strong>
                  <small>{{ tool.desc }}</small>
                </div>
              </div>
            }
          </div>
        }
      </div>
    </section>
  `,
})
export class Tech {
  protected readonly tools = TOOLS;
}
