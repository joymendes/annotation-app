import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  @Input() buttonText: string = '';
  @Input() icon: string = '';
  @Output() onFirstButtonClick = new EventEmitter<void>();

  firstButtonClick(): void {
    this.onFirstButtonClick.emit();
  }
}
