import { Component } from '@angular/core';
import { ScrollTo } from '../../shared/scroll-to';

@Component({
  selector: 'app-hello',
  imports: [ScrollTo],
  styleUrl: './hello.scss',
  template: `
    <section id="hello" class="sec hero">
      <p class="eyebrow"><b>01</b><u></u>HELLO, WORLD</p>

      <h1>
        Turning ideas<br />
        into <span class="acc">digital<br />experiences.</span>
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

      <div class="strip mono dim">
        <span>FULL-STACK DEVELOPMENT &nbsp;/&nbsp; CREATIVE PROBLEM SOLVING</span>
        <span class="sans">A little further down ↓</span>
      </div>
    </section>
  `,
})
export class Hello {}
