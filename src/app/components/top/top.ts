import { Component } from '@angular/core';
import { ScrollTo } from '../../shared/scroll-to';

@Component({
  selector: 'app-top',
  imports: [ScrollTo],
  styleUrl: './top.scss',
  template: `
    <header class="top">
      <a class="logo" href="#hello" appScrollTo="hello">
        <span class="spark">✦</span>
        alex morgan
        <em>/ dev</em>
      </a>

      <nav>
        <a href="#projects" appScrollTo="projects">Projects</a>
        <span class="pill"><i></i>Open to opportunities</span>
      </nav>
    </header>
  `,
})
export class Top {}
