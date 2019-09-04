import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

/**
 * This directive class is used to control the toggle dropdown behaviour
 */
@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.open') isOpen = false;

  @HostListener('document:click', ['$event']) toggleDropDown(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }

  constructor(private elRef: ElementRef) {}
}
