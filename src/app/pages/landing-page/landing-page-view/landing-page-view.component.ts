import { Component, HostListener, OnInit } from '@angular/core';
import { StarLayer } from 'ngx-parallax-stars';

@Component({
  selector: 'app-landing-page-view',
  templateUrl: './landing-page-view.component.html',
  styleUrl: './landing-page-view.component.css',
})
export class LandingPageViewComponent implements OnInit {
  selectedZodiac = 0;
  ngOnInit(): void {
    const sections = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          } else {
            entry.target.classList.remove('show');
          }
        });
      },
      {
        threshold: 0.6,
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });
  }

  layers: StarLayer[] = [
    {
      color: '#ffffff',
      speed: 20,
      density: 0.5,
      size: 2,
      direction: 'up',
      blur: 5,
      glow: 1,
      isRound: false,
    },
    {
      color: '#ffffff',
      speed: 20,
      density: 0.5,
      size: 2,
      direction: 'up',
      blur: 1,
      glow: 2,
      isRound: false,
    },
    {
      color: '#ffffff',
      speed: 20,
      density: 0.5,
      size: 2,
      direction: 'up',
      blur: 0,
      glow: 5,
      isRound: false,
    },
  ];

  scrollY: number = 0;

  cards: string[] = [
    'Card 1',
    'Card 2',
    'Card 3',
    'Card 4',
    'Card 5',
    'Card 6',
    'Card 7',
    'Card 8',
    'Card 9',
    'Card 10',
    'Card 11',
    'Card 12',
  ];

  rotationDegree: number;
  rotationAngle: number;

  constructor() {
    this.rotationDegree = 360 / this.cards.length;
    this.rotationAngle = 0;
  }
  rotateLeft() {
    this.rotationAngle -= this.rotationDegree; // Decrease the angle to rotate counterclockwise
    console.log(this.rotationAngle); // For debugging
  }

  rotateRight() {
    this.rotationAngle += this.rotationDegree; // Increase the angle to rotate clockwise
    console.log(this.rotationAngle); // For debugging
  }

  @HostListener('window:scroll', [])
  onScroll() {
    // Update scroll position
    this.scrollY = window.scrollY;

    // Here you can adjust the star layers based on scrollY if needed
    this.updateStarLayers(this.scrollY);
  }

  private updateStarLayers(scrollY: number) {
    // Optionally adjust star layers' properties based on scrollY
    // For instance, increase density or change speed based on scroll position
  }
}
