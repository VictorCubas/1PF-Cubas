import { Directive, ElementRef, Input, Renderer2, SimpleChange } from '@angular/core';

@Directive({
  selector: '[appFontSize]'
})
export class FontSizeDirective {

  @Input() 
  appFontSize = "20px";

  constructor(private elementRef: ElementRef, private renderer2: Renderer2) {
  }

  ngOnChanges(changes: SimpleChange): void {
    this.renderer2.setStyle(this.elementRef.nativeElement, 'font-size', this.appFontSize);
  }

  ngAfterViewInit(): void {
    this.renderer2.setStyle(this.elementRef.nativeElement, 'font-size', this.appFontSize);
  }
}
