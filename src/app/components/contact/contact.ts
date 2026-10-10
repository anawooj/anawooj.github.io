import { Component } from '@angular/core';
import { Glow } from '../../shared/glow';
import { ScrollTo } from '../../shared/scroll-to';

@Component({
  selector: 'app-contact',
  imports: [Glow, ScrollTo],
  styleUrl: './contact.scss',
  template: `
    <section id="contact" class="sec">
      <div class="cta" appGlow>
        <p class="eyebrow"><b>05</b><u></u>LET'S CONNECT</p>

        <h2>
          Have something in mind?<br />
          <span class="acc">Let's make it happen.</span>
        </h2>

        <p class="body">
          A project, a role, or just a good conversation. I'm always happy to connect with people building
          thoughtful things.
        </p>

        <div class="mail">
          <a class="email" href="mailto:hello@alexmorgan.dev">hello@alexmorgan.dev <span class="arr">↗</span></a>

          <span class="soc">
            <a href="#">GitHub <span class="arr">↗</span></a>
            <a href="#">LinkedIn <span class="arr">↗</span></a>
          </span>
        </div>
      </div>

      <footer class="mono dim">
        <span>© 2026 Alex Morgan</span>
        <span class="sans">Built with intention. A little stardust, too. ✦</span>
        <a class="sans" href="#hello" appScrollTo="hello">Back to top ↑</a>
      </footer>
    </section>
  `,
})
export class Contact {}
