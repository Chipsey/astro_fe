import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-zodiac-card',
  templateUrl: './zodiac-card.component.html',
  styleUrl: './zodiac-card.component.css',
})
export class ZodiacCardComponent {
  @Input() imageSrc: string = 'https://via.placeholder.com/300';
  @Input() title: string = 'Amazing Card Title';
  @Input() description: string =
    'This is a wonderful description of the card content.';
  @Input() buttonLabel: string = 'Learn More';
}
