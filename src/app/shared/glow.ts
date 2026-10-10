import { Directive, ElementRef, inject } from '@angular/core';

/** Adds a soft highlight that follows the cursor (styles live in styles.scss under `.glow`). */
@Directive({
  selector: '[appGlow]',
  host: {
    class: 'glow',
    '(mousemove)': 'onMove($event)',
  },
})
export class Glow {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  protected onMove(event: MouseEvent) {
    const rect = this.el.getBoundingClientRect();
    this.el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    this.el.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }
}
