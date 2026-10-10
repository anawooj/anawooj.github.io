import { afterNextRender, Component, DestroyRef, inject, signal } from '@angular/core';
import { ScrollTo } from '../../shared/scroll-to';

const WORDS = [
  'the web.',
  'the world.',
  'scale.',
  'impact.',
  'fun.',
  'production.',
  'research.',
  'people.',
  'me.',
  'you.',
];

const TYPE_MS = 150;
const DELETE_MS = 50;
const HOLD_MS = 1800; // pause on a finished word
const GAP_MS = 350; // pause on an empty line

@Component({
  selector: 'app-hello',
  imports: [ScrollTo],
  styleUrl: './hello.scss',
  template: `
    <section id="hello" class="sec hero">
      <p class="eyebrow"><b>01</b><u></u>HELLO, WORLD</p>

      <h1>
        Building things for<br />
        <span class="typed acc">
          {{ text() }}<span class="caret" aria-hidden="true"></span>
        </span>
      </h1>

      <p class="lead">
        I'm Alex, a full-stack developer who brings thoughtful design and reliable engineering to the same orbit.
      </p>

      <div class="btns">
        <a class="btn primary" href="#projects" appScrollTo="projects">
          Explore my work <span class="arr down">↓</span>
        </a>
        <a class="btn ghost" href="#contact" appScrollTo="contact">
          Let's talk <span class="arr">↗</span>
        </a>
      </div>
    </section>
  `,
})
export class Hello {
  protected readonly text = signal(WORDS[0]);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      // no typing loop for people who prefer reduced motion: show the first word
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      let wordIndex = 0;
      let charCount = WORDS[0].length;
      let deleting = true; // first word is already on screen, so start by erasing it
      let timer: ReturnType<typeof setTimeout>;

      const tick = () => {
        const word = WORDS[wordIndex];
        let delay: number;

        if (deleting) {
          charCount--;
          delay = DELETE_MS;
          if (charCount === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % WORDS.length;
            delay = GAP_MS;
          }
        } else {
          charCount++;
          delay = TYPE_MS;
          if (charCount === word.length) {
            deleting = true;
            delay = HOLD_MS;
          }
        }

        this.text.set(WORDS[wordIndex].slice(0, charCount));
        timer = setTimeout(tick, delay);
      };

      timer = setTimeout(tick, HOLD_MS);
      destroyRef.onDestroy(() => clearTimeout(timer));
    });
  }
}
