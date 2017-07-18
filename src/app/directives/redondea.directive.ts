import { Directive ,ElementRef, Input } from '@angular/core';

@Directive({ selector: '[redondea-imagen]' })
export class Redondea {
    constructor(el:ElementRef) {
          el.nativeElement.style.border.radius = 50;

     }
}