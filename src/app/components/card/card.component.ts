import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  // Define @Input properties to accept data from the parent component
  @Input() imageSrc: string = 'https://via.placeholder.com/300';
  @Input() gifSrc: string =
    'https://media.giphy.com/media/26BRBupa9n9c15V76/giphy.gif';
  @Input() title: string = 'Amazing Card Title';
  @Input() description: string =
    'This is a wonderful description of the card content.';
  @Input() buttonLabel: string = 'Learn More';
}
