import { afterNextRender, Component, DestroyRef, inject, signal } from '@angular/core';
import { ScrollTo } from '../../shared/scroll-to';

const SECTIONS = [
  { id: 'hello', label: 'Hello' },
  { id: 'about', label: 'About me' },
  { id: 'tech', label: 'Tech stack' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
] as const;

@Component({
  selector: 'app-side',
  imports: [ScrollTo],
  styleUrl: './side.scss',
  template: `
    <aside class="side">
      <ul>
        @for (section of sections; track section.id) {
          <li [class.active]="active() === section.id">
            <a [href]="'#' + section.id" [appScrollTo]="section.id">
              <span class="dot"></span>
              {{ section.label }}
            </a>
          </li>
        }
      </ul>
    </aside>
  `,
})
export class Side {
  protected readonly sections = SECTIONS;
  protected readonly active = signal<string>(SECTIONS[0].id);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      // a section becomes active when it crosses the middle of the viewport
      const observer = new IntersectionObserver(
        (entries) => entries.filter((e) => e.isIntersecting).forEach((e) => this.active.set(e.target.id)),
        { rootMargin: '-45% 0px -50% 0px' },
      );

      document.querySelectorAll('section.sec').forEach((el) => observer.observe(el));
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
