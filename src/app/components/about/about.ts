import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <section id="about" class="sec">
      <p class="eyebrow"><b>02</b><u></u>A BIT ABOUT ME</p>

      <h2>Curious by nature.<br />Builder by choice.</h2>

      <p class="body">
        I love the space where a good idea becomes something people can actually use. I build fast, accessible web
        products with clean interfaces and even cleaner code.
      </p>
      <p class="body">
        From the first sketch to the final deployment, I care about the details: how it feels, how it scales, and how
        it makes someone's day a little easier.
      </p>

      <p class="acc small">✧ Off-screen: coffee, night walks, and one more side project.</p>
    </section>
  `,
})
export class About {}
