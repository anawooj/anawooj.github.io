import { Directive, input } from '@angular/core';

/** Smooth-scrolls to the element with the given id instead of jumping via the href hash. */
@Directive({
  selector: '[appScrollTo]',
  host: { '(click)': 'onClick($event)' },
})
export class ScrollTo {
  readonly appScrollTo = input.required<string>();

  protected onClick(event: Event) {
    event.preventDefault();
    document.getElementById(this.appScrollTo())?.scrollIntoView({ behavior: 'smooth' });
  }
}
