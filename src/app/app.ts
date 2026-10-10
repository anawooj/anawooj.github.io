import { Component } from '@angular/core';
import { About } from './components/about/about';
import { Contact } from './components/contact/contact';
import { Hello } from './components/hello/hello';
import { Projects } from './components/projects/projects';
import { Side } from './components/side/side';
import { Sky } from './components/sky/sky';
import { Tech } from './components/tech/tech';
import { Top } from './components/top/top';

@Component({
  selector: 'app-root',
  imports: [Sky, Top, Side, Hello, About, Tech, Projects, Contact],
  styleUrl: './app.scss',
  template: `
    <app-sky />
    <app-top />
    <app-side />

    <main>
      <app-hello />
      <app-about />
      <app-tech />
      <app-projects />
      <app-contact />
    </main>
  `,
})
export class App {}
